package com.Ak.CloudService.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Ak.CloudService.document.UserCredits;
import com.Ak.CloudService.service.UserCreditsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/credits")
@RequiredArgsConstructor
public class CreditsController {

    private final UserCreditsService userCreditsService;

    @GetMapping
    public ResponseEntity<?> getCredits() {
        UserCredits credits = userCreditsService.getUserCredits();
        return ResponseEntity.ok(credits);
    }
}
