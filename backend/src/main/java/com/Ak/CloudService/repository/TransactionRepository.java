package com.Ak.CloudService.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.Ak.CloudService.document.TransactionDocument;

public interface TransactionRepository extends MongoRepository<TransactionDocument, String> {
    List<TransactionDocument> findByClerkId(String clerkId);
}
