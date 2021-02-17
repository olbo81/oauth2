package com.boleg.spring.springboot_rest.js_rest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class LoginController {

    @GetMapping("/login")
    public String login(Model model) {
        return "login";
    }
}
