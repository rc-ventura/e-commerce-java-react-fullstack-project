package com.ufsc.file.upload.util.security;

import java.io.IOException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ufsc.file.upload.repositories.UserRepository;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    @Autowired
    UserRepository userRepository;

    // @Override
    // protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    //         throws ServletException, IOException {
    //     var token = recoverToken(request);
    //     if(token != null) {
    //         var login = tokenService.validateToken(token);
    //         UserDetails user = userRepository.findByLogin(login);

    //         var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
    //         SecurityContextHolder.getContext().setAuthentication(authentication);
    //     }

    //     filterChain.doFilter(request, response);
                
   // }

   @Override
    protected void doFilterInternal(jakarta.servlet.http.HttpServletRequest request,
            jakarta.servlet.http.HttpServletResponse response, jakarta.servlet.FilterChain filterChain)
            throws jakarta.servlet.ServletException, IOException {
            
         var token = recoverToken(request);
        if(token != null) {
            var login = tokenService.validateToken(token);
            UserDetails user = userRepository.findByLogin(login);

            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
                
    }    


    private String recoverToken(jakarta.servlet.http.HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ",  "");
    }
    

}
