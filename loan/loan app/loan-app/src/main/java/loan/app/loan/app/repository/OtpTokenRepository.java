package loan.app.loan.app.repository;

import loan.app.loan.app.model.OtpToken;
import loan.app.loan.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpTokenRepository extends JpaRepository<OtpToken, Long> {
    Optional<OtpToken> findByUserAndCode(User user, String code);
    Optional<OtpToken> findByUser(User user);
    void deleteByUser(User user);
} 