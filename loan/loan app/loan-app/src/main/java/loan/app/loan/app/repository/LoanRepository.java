package loan.app.loan.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import loan.app.loan.app.model.Loan;
import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Integer> {
    List<Loan> findByStatusIgnoreCaseContaining(String status);
    Page<Loan> findByStatusIgnoreCaseContaining(String status, Pageable pageable);
    Page<Loan> findByAmount(double amount, Pageable pageable);
    Page<Loan> findByInterestRate(float interestRate, Pageable pageable);
    Page<Loan> findByUser_UserId(int userId, Pageable pageable);
    Page<Loan> findByLoanType_LoanTypeId(int loanTypeId, Pageable pageable);
    Page<Loan> findByGuarantor_GuarantorId(int guarantorId, Pageable pageable);
}
