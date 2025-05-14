package com.superaipadel.backend.config;

import com.superaipadel.backend.model.Role;
import com.superaipadel.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles if they don't exist
        initRoles();
    }

    private void initRoles() {
        if (roleRepository.count() == 0) {
            Role userRole = new Role();
            userRole.setName(Role.ERole.ROLE_USER);

            Role adminRole = new Role();
            adminRole.setName(Role.ERole.ROLE_ADMIN);

            Role superAdminRole = new Role();
            superAdminRole.setName(Role.ERole.ROLE_SUPER_ADMIN);

            roleRepository.save(userRole);
            roleRepository.save(adminRole);
            roleRepository.save(superAdminRole);

            System.out.println("Roles initialized");
        }
    }
}
