package loan.app.loan.app.service;

import loan.app.loan.app.model.PasswordResetToken;
import loan.app.loan.app.model.User;
import loan.app.loan.app.repository.PasswordResetTokenRepository;
import loan.app.loan.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Date;
import java.util.Optional;

@Service
public class PasswordResetService {
    private static final int EXPIRY_MINUTES = 30;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;

    public void createAndSendToken(User user) {
        String token = generateToken();
        Date expiry = new Date(System.currentTimeMillis() + EXPIRY_MINUTES * 60 * 1000);
        tokenRepository.deleteByUser(user);
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setUser(user);
        resetToken.setToken(token);
        resetToken.setExpiryDate(expiry);
        tokenRepository.save(resetToken);
        String resetLink = "http://localhost:8081/auth/reset-password?token=" + token;
        emailService.sendEmail(user.getEmail(), "Password Reset Request", "Click the link to reset your password: " + resetLink + "\nThis link is valid for 30 minutes.");
    }

    public Optional<PasswordResetToken> validateToken(String token) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isPresent() && tokenOpt.get().getExpiryDate().after(new Date())) {
            return tokenOpt;
        }
        return Optional.empty();
    }

    public void invalidateToken(PasswordResetToken token) {
        tokenRepository.delete(token);
    }

    private String generateToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
} 