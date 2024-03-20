package com.poscodx.user.service;

import com.poscodx.user.model.User;
import com.poscodx.user.model.dto.UserDTO;
import com.poscodx.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {
    private final UserRepository userRepository;

    public UserDTO findByUsername(String username) {
        UserDTO userDTO = new UserDTO();
        User user = userRepository.findUserByUsername(username);

        if(user != null){
            userDTO.setDTO(user);
        }

        return userDTO;
    }

    public UserDTO login(String username, String password){
        User user = userRepository.findUserByUsernameAndPassword(username, password);

        UserDTO userDTO = new UserDTO();
        if(user != null)
            userDTO.setDTO(user);
        return userDTO;
    }

    @Transactional
    public void deleteUserById(Long id){
        userRepository.deleteById(id);
    }

    @Transactional
    public void deleteUserByUsername(String username) {userRepository.deleteUserByUsername(username);}

    @Transactional
    public void register(UserDTO userDTO){
        User user = new User();
        String username = userDTO.getUsername();
        String pw = userDTO.getPassword();
        String name = userDTO.getName();

        user.setUsername(username);
        user.setPassword(pw);
        user.setName(name);
        userRepository.save(user);
    }
}
