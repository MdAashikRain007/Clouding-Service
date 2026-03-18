package com.Ak.CloudService.repository;

import com.Ak.CloudService.document.FileMetadataDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FileMetadataRepository extends MongoRepository<FileMetadataDocument,String> {
    List<FileMetadataDocument> findByClerkId(String clerkId);
    Long countByClerkId(String clerkId);

}
