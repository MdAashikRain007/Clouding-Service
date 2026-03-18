package com.Ak.CloudService.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.Ak.CloudService.document.SubscriptionDocument;

public interface SubscriptionRepository extends MongoRepository<SubscriptionDocument, String> {
    SubscriptionDocument findByClerkId(String clerkId);
}
