package com.idle.imfine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ImfineApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImfineApplication.class, args);
	}
}
