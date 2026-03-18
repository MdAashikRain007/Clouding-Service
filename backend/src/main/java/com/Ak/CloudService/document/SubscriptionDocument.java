package com.Ak.CloudService.document;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Document(collection = "subscriptions")
public class SubscriptionDocument {
    @Id
    private String id;
    private String clerkId;
    private String plan;
    private LocalDateTime startedAt;
    private LocalDateTime expiresAt;
}
