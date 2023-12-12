package com.ufsc.file.upload.controllers;

import org.springframework.beans.factory.annotation.Autowired;
//import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ufsc.file.upload.util.DTO.AuthDTO;

@RestController
@RequestMapping("/login")
public class AuthenticationController {

//@Valid
    @Autowired
    private AuthenticationManager manager;


    @PostMapping
    public ResponseEntity <String> signUp(@RequestBody  AuthDTO authDTO ) {
        var token = new UsernamePasswordAuthenticationToken(authDTO.login(), authDTO.password());
        var authentication = manager.authenticate(token);

        return ResponseEntity.ok().build();
    }
    
}
