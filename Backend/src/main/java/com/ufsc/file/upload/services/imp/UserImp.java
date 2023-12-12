package com.ufsc.file.upload.services.imp;

import com.ufsc.file.upload.exceptions.EntityNotFoundException;
import com.ufsc.file.upload.models.FileStorage;
import com.ufsc.file.upload.models.User;
import com.ufsc.file.upload.models.User;
import com.ufsc.file.upload.repositories.FileStorageRepository;
import com.ufsc.file.upload.repositories.UserRepository;
import com.ufsc.file.upload.repositories.UserRepository;
import com.ufsc.file.upload.util.DTO.UserDTO;
import java.util.List;
import java.util.NoSuchElementException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


@Service
public class UserImp {
	
	 @Autowired
	 private UserRepository userRepository; 
	
       
	
        
	public User update(Long id, User User) {
		try{
                    User UserEntity = userRepository.getReferenceById(id);
        
		
		UserEntity.setfullName(User.getfullName());
		UserEntity.setLogin(User.getLogin());
		UserEntity.setPassword(User.getPassword());
        
        
		return userRepository.save(UserEntity);		
	}catch (Exception e){
        throw new RuntimeException(e.getMessage(), e);
        }
        }

	
	
	public void deleteById(Long id) {
            if(!userRepository.existsById(id)){
            throw new EntityNotFoundException(id);
        }
            userRepository.deleteById(id);
	}
	
	// public UserDTO create(User user) {
    //     UserDTO userDTO = new UserDTO();
    //     userDTO.convert(user);
    //     userRepository.save(user);
    //     return userDTO;
        
    // }
        
	public User save(User user) {
		return userRepository.save(user);
	}
	
 	public List<User> findAll(){
		return userRepository.findAll();
	}

	public User findById(Long id) {		
		try {
			return userRepository.findById(id).get();
		
        } catch(NoSuchElementException e) {
			throw new EntityNotFoundException(id);
		}
	}

// public UserDetails findByLogin (String login) {

}


