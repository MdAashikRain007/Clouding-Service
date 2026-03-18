package com.Ak.CloudService.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.Ak.CloudService.document.FileMetadataDocument;
import com.Ak.CloudService.document.ProfileDocument;
import com.Ak.CloudService.dto.FileMetadataDTO;
import com.Ak.CloudService.repository.FileMetadataRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileMetadataService {

    private final ProfileService profileService;
    private final UserCreditsService userCreditsService;
    private final FileMetadataRepository fileMetadataRepository;
    private final TransactionService transactionService;

    public List<FileMetadataDTO> uploadFiles(MultipartFile[] files) throws IOException {

        ProfileDocument currentProfile = profileService.getCurrentProfile();
        List<FileMetadataDocument> savedFiles = new ArrayList<>();

        if (!userCreditsService.hasEnoughCredits(files.length)) {
            throw new RuntimeException("Not enough credits to upload files");
        }

        Path uploadPath = Paths.get("upload").toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

        for (MultipartFile file : files) {

            String fileName = UUID.randomUUID() + "." +
                    StringUtils.getFilenameExtension(file.getOriginalFilename());

            Path targetLocation = uploadPath.resolve(fileName);

            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            FileMetadataDocument metadata = FileMetadataDocument.builder()
                    .fileLocation(targetLocation.toString())
                    .name(file.getOriginalFilename())
                    .size(file.getSize())
                    .type(file.getContentType())
                    .clerkId(currentProfile.getClerkId())
                    .isPublic(false)
                    .uploadedAt(LocalDateTime.now())
                    .build();

            FileMetadataDocument saved = fileMetadataRepository.save(metadata);

            userCreditsService.consumeCredit();
            transactionService.logUpload(currentProfile.getClerkId());

            savedFiles.add(saved);
        }

        return savedFiles.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private FileMetadataDTO mapToDTO(FileMetadataDocument file) {
        return FileMetadataDTO.builder()
                .id(file.getId())
                .fileLocation(file.getFileLocation())
                .name(file.getName())
                .size(file.getSize())
                .type(file.getType())
                .clerkId(file.getClerkId())
                .isPublic(file.getIsPublic())
                .uploadedAt(file.getUploadedAt())
                .build();
    }

    public List<FileMetadataDTO> getFiles() {

        ProfileDocument currentProfile = profileService.getCurrentProfile();

        List<FileMetadataDocument> files =
                fileMetadataRepository.findByClerkId(currentProfile.getClerkId());

        return files.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public FileMetadataDTO getPublicFile(String id) {

        FileMetadataDocument file = fileMetadataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));

        if (!file.getIsPublic()) {
            throw new RuntimeException("File is not public");
        }

        return mapToDTO(file);
    }

    public FileMetadataDTO getDownloadableFile(String id) {

        FileMetadataDocument file = fileMetadataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));

        // allow download if file is public
        if (file.getIsPublic()) {
            return mapToDTO(file);
        }

        // for private files, check if owned by current user
        ProfileDocument current = profileService.getCurrentProfile();
        if (current == null || !file.getClerkId().equals(current.getClerkId())) {
            throw new RuntimeException("File is not accessible");
        }

        return mapToDTO(file);
    }

    public void deleteFile(String id) {

        ProfileDocument currentProfile = profileService.getCurrentProfile();

        FileMetadataDocument file = fileMetadataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));

        if (!file.getClerkId().equals(currentProfile.getClerkId())) {
            throw new RuntimeException("File does not belong to current user");
        }

        try {

            Path filePath = Paths.get(file.getFileLocation());
            Files.deleteIfExists(filePath);

            fileMetadataRepository.delete(file);

        } catch (IOException e) {
            throw new RuntimeException("Error deleting file");
        }
    }

    public FileMetadataDTO togglePublic(String id) {

        ProfileDocument current = profileService.getCurrentProfile();
        FileMetadataDocument file = fileMetadataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));

        if (current == null || !file.getClerkId().equals(current.getClerkId())) {
            throw new RuntimeException("File does not belong to current user");
        }

        file.setIsPublic(!file.getIsPublic());

        fileMetadataRepository.save(file);

        return mapToDTO(file);
    }
}