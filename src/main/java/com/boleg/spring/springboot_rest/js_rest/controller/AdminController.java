package com.boleg.spring.springboot_rest.js_rest.controller;

import com.boleg.spring.springboot_rest.js_rest.entity.Role;
import com.boleg.spring.springboot_rest.js_rest.entity.User;
import com.boleg.spring.springboot_rest.js_rest.service.RoleService;
import com.boleg.spring.springboot_rest.js_rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;


@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String getAllUsers(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("roles", roleService.getAllRoles());
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("user", user);
        model.addAttribute("userRoles", user.getRoles());
        model.addAttribute("newUser", new User());
        return "users";
    }

    @PostMapping("/users")
    public String createUser(@Valid @ModelAttribute("user") User user,
                             @RequestParam(value = "rolesNames") String[] roles) {
        Set<Role> rolesSet = new HashSet<>();
        for (String roleName : roles) {
            rolesSet.add(roleService.getByRoleName(roleName));
        }
        user.setRoles(rolesSet);
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PostMapping("/users/{userId}")
    public String updateUser(@PathVariable("userId") Long id, @ModelAttribute("user") User user,
                             @RequestParam(value = "userRoles") String[] roles) {
        Set<Role> rolesSet = new HashSet<>();
        for (String roleName : roles) {
            rolesSet.add(roleService.getByRoleName(roleName));
        }
        user.setRoles(rolesSet);
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @PostMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
        return "redirect:/admin";
    }
}
