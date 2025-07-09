package loan.app.loan.app.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import loan.app.loan.app.model.LoanType;
import java.util.List;

public interface LoanTypeRepository extends JpaRepository<LoanType, Integer> {
    List<LoanType> findByTypeNameIgnoreCaseContainingOrDescriptionIgnoreCaseContaining(String typeName, String description);
    Page<LoanType> findByTypeNameIgnoreCaseContaining(String typeName, Pageable pageable);
    Page<LoanType> findByDescriptionIgnoreCaseContaining(String description, Pageable pageable);
}
