package com.boleg.spring.springboot_rest.js_rest.dto;

public class UserDto {

    private Long id;
    private String name;
    private String surname;
    private String phone;
    private String email;
    private String password;
    private String[] rolesNames;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String[] getRolesNames() {
        return rolesNames;
    }

    public void setRolesNames(String[] rolesNames) {
        this.rolesNames = rolesNames;
    }
}
