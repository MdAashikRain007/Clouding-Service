package com.Ak.CloudService.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.Ak.CloudService.document.SubscriptionDocument;
import com.Ak.CloudService.repository.SubscriptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final ProfileService profileService;

    public SubscriptionDocument getCurrentSubscription() {
        String clerkId = profileService.getCurrentProfile().getClerkId();
        return subscriptionRepository.findByClerkId(clerkId);
    }

    public SubscriptionDocument purchasePlan(String plan, int addedCredits, double amount) {
        String clerkId = profileService.getCurrentProfile().getClerkId();
        SubscriptionDocument current = subscriptionRepository.findByClerkId(clerkId);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiry = now.plusMonths(1);
        if (current == null) {
            current = SubscriptionDocument.builder()
                    .clerkId(clerkId)
                    .plan(plan)
                    .startedAt(now)
                    .expiresAt(expiry)
                    .build();
        } else {
            current.setPlan(plan);
            current.setStartedAt(now);
            current.setExpiresAt(expiry);
        }
        return subscriptionRepository.save(current);
    }
}
