package loan.app.loan.app.controller;

import loan.app.loan.app.model.User;
import loan.app.loan.app.model.Role;
import loan.app.loan.app.repository.UserRepository;
import loan.app.loan.app.security.jwt.JwtUtil;
import loan.app.loan.app.service.PasswordResetService;
import loan.app.loan.app.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordResetService passwordResetService;
    @Autowired
    private OtpService otpService;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> loginRequest) {
        User user = userRepository.findByEmail(loginRequest.get("email")).orElse(null);
        if (user == null || !passwordEncoder.matches(loginRequest.get("password"), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        otpService.createAndSendOtp(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "OTP sent to your email");
        response.put("email", user.getEmail());
        return response;
    }

    @PostMapping("/verify-2fa")
    public Map<String, String> verify2fa(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        User user = userRepository.findByEmail(email).orElseThrow();
        if (!otpService.validateOtp(user, otp)) {
            throw new RuntimeException("Invalid or expired OTP");
        }
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole().name());
        return response;
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> registerRequest) {
        User user = new User();
        user.setName(registerRequest.get("name"));
        user.setEmail(registerRequest.get("email"));
        user.setPhone(registerRequest.get("phone"));
        user.setPassword(passwordEncoder.encode(registerRequest.get("password")));
        user.setRole(Role.valueOf(registerRequest.getOrDefault("role", "CUSTOMER")));
        userRepository.save(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        return response;
    }

    @PostMapping("/request-reset")
    public Map<String, String> requestReset(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new RuntimeException("No user found with this email");
        }
        try {
            passwordResetService.createAndSendToken(user);
        } catch (MailException e) {
            throw new RuntimeException("Failed to send email");
        }
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password reset link sent to your email");
        return response;
    }

    @PostMapping("/reset-password")
    public Map<String, String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        var tokenOpt = passwordResetService.validateToken(token);
        if (tokenOpt.isEmpty()) {
            throw new RuntimeException("Invalid or expired token");
        }
        User user = tokenOpt.get().getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        passwordResetService.invalidateToken(tokenOpt.get());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password reset successful");
        return response;
    }
} 