package loan.app.loan.app.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import jakarta.annotation.PostConstruct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import loan.app.loan.app.model.User;
import loan.app.loan.app.repository.UserRepository;
import loan.app.loan.app.model.Role;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Value("${spring.security.user.admin}")
    private String adminEmail;
    @Value("${spring.security.user.admin.password}")
    private String adminPassword;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @PostConstruct
    public void createAdminIfNotExists() {
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail(adminEmail);
            admin.setPhone("0000000000");
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
        }
    }

    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public Page<User> findByName(String name, Pageable pageable) {
        return userRepository.findByNameIgnoreCaseContaining(name, pageable);
    }

    public Page<User> findByEmail(String email, Pageable pageable) {
        return userRepository.findByEmailIgnoreCaseContaining(email, pageable);
    }

    public Page<User> findByPhone(String phone, Pageable pageable) {
        return userRepository.findByPhoneIgnoreCaseContaining(phone, pageable);
    }

    public Page<User> findByRole(String role, Pageable pageable) {
        return userRepository.findByRole(Role.valueOf(role.toUpperCase()), pageable);
    }
}
