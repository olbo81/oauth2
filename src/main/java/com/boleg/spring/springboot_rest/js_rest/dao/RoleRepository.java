package com.boleg.spring.springboot_rest.js_rest.dao;


import com.boleg.spring.springboot_rest.js_rest.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByRole(String roleName);

}
