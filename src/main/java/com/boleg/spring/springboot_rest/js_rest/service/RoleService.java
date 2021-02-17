package com.boleg.spring.springboot_rest.js_rest.service;



import com.boleg.spring.springboot_rest.js_rest.entity.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();

    void saveRole(Role role);

    void deleteRoleById(Long id);

    Role getRoleById(Long id);

    Role getByRoleName(String roleName);
}
