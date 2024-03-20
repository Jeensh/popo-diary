package com.poscodx.main.auth;

import com.poscodx.main.model.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final String USER_SERVER = "http://localhost:8085";
    @Override
    public UserDetails loadUserByUsername(String username) {
        MultiValueMap<String, String> paramMap = new LinkedMultiValueMap<>();
        String url = USER_SERVER + "/auth";
        paramMap.add("username", username);
        ResponseEntity<UserDTO> responseEntity =
                new RestTemplate().postForEntity(url, paramMap, UserDTO.class);

        UserDTO userDTO = responseEntity.getBody();
        if (userDTO == null || userDTO.getId() == null) {
            return null;
        }

        return new UserDetailsImpl(userDTO);
    }
}