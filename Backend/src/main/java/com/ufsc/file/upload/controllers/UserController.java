package com.ufsc.file.upload.controllers;

    

 import com.ufsc.file.upload.models.User;
import com.ufsc.file.upload.services.imp.UserImp;
import com.ufsc.file.upload.util.DTO.UserDTO;

import java.net.URI;
import java.util.List;

//import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.DeleteMapping;///
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@RestController
@CrossOrigin("*")
public class UserController {
	
     private final UserImp userImp;
    
     @Autowired
     public UserController(UserImp userImp){
         this.userImp = userImp;
     }
    
        
        
	@PutMapping(value = "/users/{id}")
	public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user){
		User updateUser = userImp.update(id, user);
		return ResponseEntity.ok().body(updateUser);
	}
	
	
	@DeleteMapping(value = "/users/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id){
		userImp.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PostMapping(value = "/users")
	public ResponseEntity<User> save (@RequestBody User user) {
		return new ResponseEntity<>(userImp.save(user), HttpStatus.CREATED);
	}
	
	
	// @PostMapping(value = "/users")
	// public ResponseEntity<UserDTO> create(@RequestBody UserDTO userDTO ){
	// 	return new ResponseEntity<>(userImp.create(userDTO), HttpStatus.CREATED);		
	// }
        
        

	
	 @GetMapping(value = "/users")
	 public ResponseEntity<List<User>> findAll(){
		
	 	List<User> users = userImp.findAll();		
		return ResponseEntity.ok().body(users);		
	 }
	
	@GetMapping(value = "/users/{id}")
	public ResponseEntity<User> findById(@PathVariable Long id){
		
		User user = userImp.findById(id);
		return ResponseEntity.ok().body(user);		
		
	}
	
	
}


