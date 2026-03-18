package com.Ak.CloudService.document;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Document(collection = "transactions")
public class TransactionDocument {
    @Id
    private String id;
    private String clerkId;
    private String type; // UPLOAD, PURCHASE, etc.
    private Integer credits;
    private Double amount;
    private LocalDateTime timestamp;
}
