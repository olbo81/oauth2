package com.boleg.spring.springboot_rest.js_rest.dao;


import com.boleg.spring.springboot_rest.js_rest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
