package com.Ak.CloudService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@EnableMongoAuditing
@SpringBootApplication
public class CloudServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CloudServiceApplication.class, args);
	}

}
