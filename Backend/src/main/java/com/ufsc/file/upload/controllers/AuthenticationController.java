package com.ufsc.file.upload.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ufsc.file.upload.repositories.UserRepository;
import com.ufsc.file.upload.util.DTO.AuthDTO;
import com.ufsc.file.upload.util.DTO.LoginResponseDTO;
import com.ufsc.file.upload.util.DTO.UserRegisterDTO;
import com.ufsc.file.upload.util.security.TokenService;
import com.ufsc.file.upload.models.User;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

//@Valid
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

     @Autowired
    private TokenService tokenService;


    @PostMapping("/login")
    public ResponseEntity <LoginResponseDTO> onLogin(@RequestBody  AuthDTO authDTO ) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(authDTO.login(), authDTO.password());
        var authentication = authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) authentication.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity <Void> onRegister(@RequestBody UserRegisterDTO userRegisterDTO) {
        if(userRepository.findByLogin(userRegisterDTO.login()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(userRegisterDTO.password());
        User newUser = new User(userRegisterDTO.login(), encryptedPassword, userRegisterDTO.role());

        userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }
    
}
