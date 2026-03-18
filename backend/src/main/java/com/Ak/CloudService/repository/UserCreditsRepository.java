package com.Ak.CloudService.repository;

import com.Ak.CloudService.document.UserCredits;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserCreditsRepository extends MongoRepository<UserCredits,String> {
    Optional<UserCredits> findByClerkId(String clerkId);
}
