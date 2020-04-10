package com.lunchtime;

//TODO remove unused imports. You can use Ctrl+Alt+O in Intellij before committing changes
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(
    //TODO One time will be enough
    exclude = {SecurityAutoConfiguration.class, SecurityAutoConfiguration.class})
public class LunchTimeApplication {

    public static void main(String[] args) {
        SpringApplication.run(LunchTimeApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                    .addMapping("/api/**")
                    .allowedMethods("POST", "PUT", "GET", "DELETE")
                    //TODO it would be better to have this list of urls in some property file. In such case,
                    // you will be able to modify
                    // this list without creating new PR, for example for prod env, you will need only ssh
                    .allowedOrigins("http://localhost:3000");
            }

            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                registry.addResourceHandler("/api/**")
                    .addResourceLocations("classpath:/static/");
            }
        };
    }
}
