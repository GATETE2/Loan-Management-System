package loan.app.loan.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import loan.app.loan.app.model.User;
import java.util.Optional;
import java.util.List;
import loan.app.loan.app.model.Role;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    List<User> findByNameIgnoreCaseContainingOrEmailIgnoreCaseContainingOrPhoneIgnoreCaseContaining(String name, String email, String phone);
    Page<User> findByNameIgnoreCaseContaining(String name, Pageable pageable);
    Page<User> findByEmailIgnoreCaseContaining(String email, Pageable pageable);
    Page<User> findByPhoneIgnoreCaseContaining(String phone, Pageable pageable);
    Page<User> findByRole(Role role, Pageable pageable);
}
