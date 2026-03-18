package com.Ak.CloudService.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Ak.CloudService.dto.ProfileDTO;
import com.Ak.CloudService.service.ProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping("/register")
    public ResponseEntity<?> registerProfile(@RequestBody ProfileDTO profileDTO){
        HttpStatus status= profileService.existsByClerkId(profileDTO.getClerkId()) ? HttpStatus.OK : HttpStatus.CREATED;
        ProfileDTO savedProfile = profileService.createProfile(profileDTO);
        return ResponseEntity.status(status).body(savedProfile);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentProfile() {
        return ResponseEntity.ok(profileService.getCurrentProfile());
    }
}
