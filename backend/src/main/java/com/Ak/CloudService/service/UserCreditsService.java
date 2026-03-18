package com.Ak.CloudService.service;

import org.springframework.stereotype.Service;

import com.Ak.CloudService.document.ProfileDocument;
import com.Ak.CloudService.document.UserCredits;
import com.Ak.CloudService.repository.ProfileRepository;
import com.Ak.CloudService.repository.UserCreditsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserCreditsService {
    private final UserCreditsRepository userCreditsRepository;
    private final ProfileRepository profileRepository;


    public UserCredits createInitialCredits(String clerkId){
        UserCredits userCredits = UserCredits.builder()
                .clerkId(clerkId)
                .credits(5)
                .plan("BASIC")
                .build();
       return userCreditsRepository.save(userCredits);
    }

    public UserCredits addCredits(int amount){
        UserCredits uc = getUserCredits();
        if(uc.getCredits() == null) uc.setCredits(0);
        uc.setCredits(uc.getCredits() + amount);
        UserCredits saved = userCreditsRepository.save(uc);
        // update the profile document credits directly if profile exists
        try {
            ProfileDocument profile = profileRepository.findByClerkId(uc.getClerkId());
            if (profile != null) {
                profile.setCredits(saved.getCredits());
                profileRepository.save(profile);
            }
        } catch (Exception ignored) {}
        return saved;
    }

    public UserCredits getUserCredits(String clerkId){
        return  userCreditsRepository.findByClerkId(clerkId)
                .orElseGet(()->createInitialCredits(clerkId));
    }
    public UserCredits getUserCredits(){
        // when called without explicit clerkId, infer from security context
        String clerkId;
        if (org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication() != null) {
            clerkId = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getName();
        } else {
            throw new RuntimeException("User not authenticated");
        }
        return getUserCredits(clerkId);
    }
    public  Boolean hasEnoughCredits(int requireCredits){
        UserCredits userCredits = getUserCredits();
        return userCredits.getCredits()>=requireCredits;
    }

    public UserCredits consumeCredit(){
        UserCredits userCredits = getUserCredits();
        if(userCredits.getCredits()==null){
            return null;
        }

        int updated = userCredits.getCredits() - 1;
        userCredits.setCredits(updated);
        UserCredits saved = userCreditsRepository.save(userCredits);

        // update profile document credits as well
        try {
            ProfileDocument profile = profileRepository.findByClerkId(userCredits.getClerkId());
            if (profile != null) {
                profile.setCredits(updated);
                profileRepository.save(profile);
            }
        } catch (Exception ignored) {}

        return saved;
    }
}
