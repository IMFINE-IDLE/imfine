package com.idle.imfine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@EnableScheduling
@EnableAsync
public class ImfineApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImfineApplication.class, args);
	}
}
