package com.poscodx.main.config;

import com.poscodx.main.auth.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class PopoSecurityConfig {
    private final BCryptPasswordEncoder ENCODER;
    private final UserDetailsServiceImpl USER_SERVICE;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/error/**", "/user/**").permitAll()

                        .anyRequest().authenticated())
                .formLogin(formLogin -> formLogin
                        .loginPage("http://localhost:3000")
                        .loginProcessingUrl("/user/auth")
                        .usernameParameter("username")
                        .passwordParameter("password")
                        .successForwardUrl("/user/success")
                        .failureForwardUrl("/user/fail")
//                        .failureUrl("/user/fail")
                        .permitAll())
                .csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(USER_SERVICE);
        authenticationProvider.setPasswordEncoder(ENCODER);
        return authenticationProvider;
    }
}
