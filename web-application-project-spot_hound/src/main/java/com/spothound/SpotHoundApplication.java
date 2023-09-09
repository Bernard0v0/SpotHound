package com.spothound;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



//@SpringBootApplication
//@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@SpringBootApplication
public class SpotHoundApplication {
	public static void main(String[] args) {
		SpringApplication.run(SpotHoundApplication.class, args);


	}
}
