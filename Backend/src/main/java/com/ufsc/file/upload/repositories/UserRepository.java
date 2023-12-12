package com.ufsc.file.upload.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.ufsc.file.upload.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

 UserDetails findByLogin(String login) ;
	
}