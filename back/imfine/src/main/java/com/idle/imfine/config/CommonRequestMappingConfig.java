package com.idle.imfine.config;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CommonRequestMappingConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new CommonRequestMappingInterceptor());
    }

    private static class CommonRequestMappingInterceptor implements HandlerInterceptor {

        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
                throws IOException {
            // Define common request mapping logic here
            System.out.println("여기를 들어오긴 하니?");
            String url = request.getRequestURI();
            if (url.startsWith("/api")) {
                System.out.println("여기느/????");
                response.sendRedirect(url.substring(4));
                return true;
            } else {
                return false;
            }
        }
    }
}