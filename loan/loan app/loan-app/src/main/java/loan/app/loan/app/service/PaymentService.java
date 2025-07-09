package loan.app.loan.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import loan.app.loan.app.model.Payment;
import loan.app.loan.app.repository.PaymentRepository;

import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(int id) {
        return paymentRepository.findById(id).orElse(null);
    }

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public void deletePayment(int id) {
        paymentRepository.deleteById(id);
    }

    public Page<Payment> getAllPayments(Pageable pageable) {
        return paymentRepository.findAll(pageable);
    }

    public Page<Payment> findByAmountPaid(Double amountPaid, Pageable pageable) {
        return paymentRepository.findByAmountPaid(amountPaid, pageable);
    }

    public Page<Payment> findByLoanId(Integer loanId, Pageable pageable) {
        return paymentRepository.findByLoan_LoanId(loanId, pageable);
    }

    public Page<Payment> findByDatePaid(java.util.Date datePaid, Pageable pageable) {
        return paymentRepository.findByDatePaid(datePaid, pageable);
    }
}
