package com.clandestock.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ClandeStockBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClandeStockBackendApplication.class, args);
	}

}
