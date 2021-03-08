package com.boleg.spring.springboot_rest.js_rest.controller;

import com.boleg.spring.springboot_rest.js_rest.dao.RoleRepository;
import com.boleg.spring.springboot_rest.js_rest.dao.UserRepository;
import com.boleg.spring.springboot_rest.js_rest.entity.Role;
import com.boleg.spring.springboot_rest.js_rest.entity.User;
import com.boleg.spring.springboot_rest.js_rest.security.CustomOAuth2User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashSet;
import java.util.Set;


@Controller
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping()
    public String user(@AuthenticationPrincipal User user, Model model) {
        model.addAttribute("user", user);
        model.addAttribute("roles", user.getRoles());
        return "user";
    }


    @GetMapping("/oauth")
    public String user(Authentication authentication, Model model) {
        CustomOAuth2User principal = (CustomOAuth2User) authentication.getPrincipal();
        String email = (String) principal.getAttributes().get("email");
        User user = userRepository.findByEmail(email);
        if (user == null) {
            Set<Role> rolesSet = new HashSet<>();
            rolesSet.add(roleRepository.findByRole("ROLE_USER"));
            User newUser = new User();
            newUser.setName((String) principal.getAttributes().get("given_name"));
            newUser.setSurname((String) principal.getAttributes().get("family_name"));
            newUser.setEmail(email);
            newUser.setRoles(rolesSet);
            newUser.setPassword(passwordEncoder.encode("1"));
            userRepository.save(newUser);
            user = userRepository.findByEmail(email);
        }
        model.addAttribute("user", user);
        model.addAttribute("roles", user.getRoles());
        return "oauth";
    }
}
