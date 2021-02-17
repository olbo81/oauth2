package com.boleg.spring.springboot_rest.js_rest.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final LoginSuccessHandler successUserHandler;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SecurityConfig(@Qualifier("userServiceImpl") UserDetailsService userDetailsService,
                          LoginSuccessHandler successUserHandler, PasswordEncoder passwordEncoder1) {
        this.userDetailsService = userDetailsService;
        this.successUserHandler = successUserHandler;
        this.passwordEncoder = passwordEncoder1;
    }


    @Autowired
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http

                .authorizeRequests()
                .antMatchers("/login").anonymous()
                .antMatchers("/admin/**").access("hasRole('ADMIN')")
                .antMatchers("/user").access("hasAnyRole('ADMIN', 'USER')")
                .anyRequest().authenticated()

                .and()
                .formLogin().loginPage("/login")
                .successHandler(new LoginSuccessHandler())
                .loginProcessingUrl("/login")
                .usernameParameter("j_username")
                .passwordParameter("j_password")
                .permitAll()

                .and()
                .logout()
                .permitAll()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login?logout")
                .and()
                .csrf().disable();
    }
}