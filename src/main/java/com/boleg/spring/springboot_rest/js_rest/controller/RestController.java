package com.boleg.spring.springboot_rest.js_rest.controller;


import com.boleg.spring.springboot_rest.js_rest.dto.UserDto;
import com.boleg.spring.springboot_rest.js_rest.entity.Role;
import com.boleg.spring.springboot_rest.js_rest.entity.User;
import com.boleg.spring.springboot_rest.js_rest.security.CustomOAuth2User;
import com.boleg.spring.springboot_rest.js_rest.service.RoleService;
import com.boleg.spring.springboot_rest.js_rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {

    private final UserService userService;
    private final RoleService roleService;


    @Autowired
    public RestController(UserService userService, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.roleService = roleService;
    }


//    //Для тестирования того, кто приходит
//    @RequestMapping(value = "/usergoogle")
//    public User user (Authentication authentication) {
//        CustomOAuth2User principal = (CustomOAuth2User) authentication.getPrincipal();
//        String email = (String) principal.getAttributes().get("email");
//        String
//        System.out.println(email);
//        return user;
//    }

    @GetMapping("/admin/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return users != null && !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/admin/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User user = userService.getUserById(id);
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user")
    public User getUser(@AuthenticationPrincipal User user) {
        return user;
    }

    @GetMapping("/users/new")
    public User newUser() {
        User blankUser = new User();
        blankUser.setRoles(new HashSet<>(roleService.getAllRoles()));
        return blankUser;
    }

    @PostMapping("/admin/users")
    public ResponseEntity<User> createUser(@RequestBody UserDto userDto) {
        Set<Role> roleSet = new HashSet<>();
        for (String roleName : userDto.getRolesNames()) {
            roleSet.add(roleService.getByRoleName(roleName));
        }
        User user = new User(userDto);
        user.setRoles(roleSet);
        userService.saveUser(user);
        return new ResponseEntity<>(userService.findByEmail(user.getEmail()), HttpStatus.CREATED);
    }

    @PutMapping("/admin/users/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable("userId") Long id,
                                           @RequestBody UserDto userDto) {
        Set<Role> rolesSet = new HashSet<>();
        for (String roleName : userDto.getRolesNames()) {
            rolesSet.add(roleService.getByRoleName(roleName));
        }
        User user = new User(userDto);
        user.setRoles(rolesSet);
        user.setId(id);
        userService.updateUser(user);
        User updatedUser = userService.getUserById(id);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/admin/users/{userId}")
    public ResponseEntity<List<User>> delete(@PathVariable Long userId) {
        userService.deleteUserById(userId);
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
