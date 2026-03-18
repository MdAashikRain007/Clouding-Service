package com.Ak.CloudService.service;

import com.Ak.CloudService.dto.ProfileDTO;
import com.Ak.CloudService.document.ProfileDocument;
import com.Ak.CloudService.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserCreditsService userCreditsService;

    // ================= CREATE PROFILE =================
    public ProfileDTO createProfile(ProfileDTO profileDTO){

        if(profileRepository.existsByClerkId(profileDTO.getClerkId())){
            return updateProfile(profileDTO);
        }

        ProfileDocument profile = ProfileDocument.builder()
                .clerkId(profileDTO.getClerkId())
                .email(profileDTO.getEmail())
                .firstName(profileDTO.getFirstName())
                .lastName(profileDTO.getLastName())
                .photoUrl(profileDTO.getPhotoUrl())
                .credits(5)
                .createdAt(Instant.now())
                .build();

        profileRepository.save(profile);

        // ensure user credits record exists (will create if missing)
        try {
            userCreditsService.getUserCredits(profileDTO.getClerkId());
        } catch (Exception ignored) {}
        return ProfileDTO.builder()
                .id(profile.getId())
                .clerkId(profile.getClerkId())
                .email(profile.getEmail())
                .firstName(profile.getFirstName())
                .lastName(profile.getLastName())
                .photoUrl(profile.getPhotoUrl())
                .credits(profile.getCredits())
                .createdAt(profile.getCreatedAt())
                .build();
    }

    // ================= UPDATE PROFILE =================
    public ProfileDTO updateProfile(ProfileDTO profileDTO){

        ProfileDocument existingProfile = profileRepository.findByClerkId(profileDTO.getClerkId());

        if(existingProfile == null){
            return null;
        }

        if(profileDTO.getEmail() != null && !profileDTO.getEmail().isEmpty()){
            existingProfile.setEmail(profileDTO.getEmail());
        }

        if(profileDTO.getFirstName() != null && !profileDTO.getFirstName().isEmpty()){
            existingProfile.setFirstName(profileDTO.getFirstName());
        }

        if(profileDTO.getLastName() != null && !profileDTO.getLastName().isEmpty()){
            existingProfile.setLastName(profileDTO.getLastName());
        }

        if(profileDTO.getPhotoUrl() != null && !profileDTO.getPhotoUrl().isEmpty()){
            existingProfile.setPhotoUrl(profileDTO.getPhotoUrl());
        }

        profileRepository.save(existingProfile);

        return ProfileDTO.builder()
                .id(existingProfile.getId())
                .clerkId(existingProfile.getClerkId())
                .email(existingProfile.getEmail())
                .firstName(existingProfile.getFirstName())
                .lastName(existingProfile.getLastName())
                .credits(existingProfile.getCredits())
                .createdAt(existingProfile.getCreatedAt())
                .photoUrl(existingProfile.getPhotoUrl())
                .build();
    }

    // ================= DELETE PROFILE =================
    public void deleteProfile(String clerkId){
        ProfileDocument existingProfile = profileRepository.findByClerkId(clerkId);

        if(existingProfile != null){
            profileRepository.delete(existingProfile);
        }
    }

    // ================= CHECK EXISTS =================
    public boolean existsByClerkId(String clerkId){
        return profileRepository.existsByClerkId(clerkId);
    }

    // ================= GET CURRENT PROFILE =================
    public ProfileDocument getCurrentProfile(){

        if(SecurityContextHolder.getContext().getAuthentication() == null){
            throw new UsernameNotFoundException("User not authenticated");
        }

        String clerkId = SecurityContextHolder.getContext().getAuthentication().getName();

        ProfileDocument profile = profileRepository.findByClerkId(clerkId);

        // 🔥 IMPORTANT FIX
        if(profile == null){
            profile = ProfileDocument.builder()
                    .clerkId(clerkId)
                    .credits(5)
                    .createdAt(Instant.now())
                    .build();

            profileRepository.save(profile);
        } else {
            // keep profile credits in sync with the user credits document
            try {
                Integer uc = userCreditsService.getUserCredits(clerkId).getCredits();
                if(uc != null) {
                    profile.setCredits(uc);
                    profileRepository.save(profile);
                }
            } catch (Exception ignored) {}
        }

        return profile;
    }
}