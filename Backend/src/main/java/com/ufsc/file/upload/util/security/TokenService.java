package com.ufsc.file.upload.util.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.ufsc.file.upload.models.User;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    
    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("auth0-api")
                    .withSubject((String) user.getLogin())
                    .withExpiresAt(getExpirationDate())
                    // .withClaim("roles", user.getAuthorities())
                    .sign(algorithm);
            
            return token;
            
        } catch (JWTCreationException e) {
            throw new RuntimeException( "Error on create token jwt", e);
        }
        
    }

    public String validateToken(String token) {
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                       .withIssuer("auth0-api")
                       .build()
                       .verify(token)
                       .getSubject();
        }catch (JWTVerificationException e) {
            return "";
        }
    }

    private Instant getExpirationDate() {
            return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
        }


}
