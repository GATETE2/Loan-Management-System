package loan.app.loan.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import loan.app.loan.app.model.User;
import loan.app.loan.app.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Page<User> getAllUsers(@RequestParam(required = false) String name,
                                  @RequestParam(required = false) String email,
                                  @RequestParam(required = false) String phone,
                                  @RequestParam(required = false) String role,
                                  Pageable pageable) {
        if (name != null) return userService.findByName(name, pageable);
        if (email != null) return userService.findByEmail(email, pageable);
        if (phone != null) return userService.findByPhone(phone, pageable);
        if (role != null) return userService.findByRole(role, pageable);
        return userService.getAllUsers(pageable);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
    }
}
