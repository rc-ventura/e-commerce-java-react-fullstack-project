package com.ufsc.file.upload.services;

import com.ufsc.file.upload.models.Produto;
import com.ufsc.file.upload.models.User;
import com.ufsc.file.upload.util.DTO.UserDTO;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;



public interface UserService {
	

	
    //public UserDTO create(User user);

	public User update(Long id, User user) ;
		
     
	public String deleteById(Long id) ;
           
    
	public Produto save(User user) ;
	
	
	public List<User> findAll();

    public UserDetails findByLogin(String username);
	

	public User findById(Long id) ;		
		
	
	
}
