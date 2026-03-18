package com.Ak.CloudService.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;

import com.Ak.CloudService.document.FileMetadataDocument;
import com.Ak.CloudService.document.ProfileDocument;
import com.Ak.CloudService.repository.FileMetadataRepository;

class FileMetadataServiceTests {
    @Mock
    private ProfileService profileService;
    @Mock
    private UserCreditsService userCreditsService;
    @Mock
    private FileMetadataRepository fileMetadataRepository;
    @InjectMocks
    private FileMetadataService fileMetadataService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getDownloadableFile_publicFile_ok() {
        FileMetadataDocument file = FileMetadataDocument.builder()
                .id("1")
                .clerkId("owner")
                .isPublic(true)
                .fileLocation("/tmp/x")
                .name("a.txt")
                .build();
        when(fileMetadataRepository.findById("1")).thenReturn(Optional.of(file));

        // no profile lookup needed
        var dto = fileMetadataService.getDownloadableFile("1");
        assertEquals("a.txt", dto.getName());
    }

    @Test
    void getDownloadableFile_notOwnerNotPublic_throws() {
        FileMetadataDocument file = FileMetadataDocument.builder()
                .id("2")
                .clerkId("owner")
                .isPublic(false)
                .fileLocation("/tmp/x")
                .name("b.txt")
                .build();
        when(fileMetadataRepository.findById("2")).thenReturn(Optional.of(file));

        ProfileDocument current = ProfileDocument.builder().clerkId("other").build();
        when(profileService.getCurrentProfile()).thenReturn(current);

        Exception ex = assertThrows(RuntimeException.class, () -> {
            fileMetadataService.getDownloadableFile("2");
        });
        assertTrue(ex.getMessage().contains("not accessible"));
    }
}
