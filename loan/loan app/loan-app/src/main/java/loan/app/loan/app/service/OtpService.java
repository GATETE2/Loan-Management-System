package loan.app.loan.app.service;

import loan.app.loan.app.model.OtpToken;
import loan.app.loan.app.model.User;
import loan.app.loan.app.repository.OtpTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Date;
import java.util.Optional;

@Service
public class OtpService {
    private static final int OTP_LENGTH = 6;
    private static final int OTP_EXPIRY_MINUTES = 5;

    @Autowired
    private OtpTokenRepository otpTokenRepository;
    @Autowired
    private EmailService emailService;

    public String generateOtp() {
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public void createAndSendOtp(User user) {
        String otp = generateOtp();
        Date expiry = new Date(System.currentTimeMillis() + OTP_EXPIRY_MINUTES * 60 * 1000);
        otpTokenRepository.deleteByUser(user);
        OtpToken otpToken = new OtpToken();
        otpToken.setUser(user);
        otpToken.setCode(otp);
        otpToken.setExpiryDate(expiry);
        otpTokenRepository.save(otpToken);
        emailService.sendEmail(user.getEmail(), "Your 2FA OTP Code", "Your OTP code is: " + otp + " (valid for 5 minutes)");
    }

    public boolean validateOtp(User user, String code) {
        Optional<OtpToken> otpOpt = otpTokenRepository.findByUserAndCode(user, code);
        if (otpOpt.isPresent()) {
            OtpToken otpToken = otpOpt.get();
            if (otpToken.getExpiryDate().after(new Date())) {
                otpTokenRepository.deleteByUser(user);
                return true;
            } else {
                otpTokenRepository.deleteByUser(user);
            }
        }
        return false;
    }
} 