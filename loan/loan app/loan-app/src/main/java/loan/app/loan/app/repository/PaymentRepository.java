package loan.app.loan.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Date;

import loan.app.loan.app.model.Payment;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findByAmountPaid(double amountPaid);
    Page<Payment> findByAmountPaid(double amountPaid, Pageable pageable);
    Page<Payment> findByLoan_LoanId(int loanId, Pageable pageable);
    Page<Payment> findByDatePaid(Date datePaid, Pageable pageable);
}
