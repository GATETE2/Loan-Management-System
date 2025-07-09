package loan.app.loan.app.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import loan.app.loan.app.model.Guarantor;
import java.util.List;

public interface GuarantorRepository extends JpaRepository<Guarantor, Integer> {
    List<Guarantor> findByNameIgnoreCaseContainingOrEmailIgnoreCaseContainingOrPhoneIgnoreCaseContaining(String name, String email, String phone);
    Page<Guarantor> findByNameIgnoreCaseContaining(String name, Pageable pageable);
    Page<Guarantor> findByEmailIgnoreCaseContaining(String email, Pageable pageable);
    Page<Guarantor> findByPhoneIgnoreCaseContaining(String phone, Pageable pageable);
}
