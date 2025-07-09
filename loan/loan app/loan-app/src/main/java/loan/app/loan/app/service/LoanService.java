package loan.app.loan.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import loan.app.loan.app.model.Loan;
import loan.app.loan.app.repository.LoanRepository;

import java.util.List;

@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public Loan getLoanById(int id) {
        return loanRepository.findById(id).orElse(null);
    }

    public Loan saveLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    public void deleteLoan(int id) {
        loanRepository.deleteById(id);
    }

    public Page<Loan> getAllLoans(Pageable pageable) {
        return loanRepository.findAll(pageable);
    }

    public Page<Loan> findByStatus(String status, Pageable pageable) {
        return loanRepository.findByStatusIgnoreCaseContaining(status, pageable);
    }

    public Page<Loan> findByAmount(Double amount, Pageable pageable) {
        return loanRepository.findByAmount(amount, pageable);
    }

    public Page<Loan> findByInterestRate(Float interestRate, Pageable pageable) {
        return loanRepository.findByInterestRate(interestRate, pageable);
    }

    public Page<Loan> findByUserId(Integer userId, Pageable pageable) {
        return loanRepository.findByUser_UserId(userId, pageable);
    }

    public Page<Loan> findByLoanTypeId(Integer loanTypeId, Pageable pageable) {
        return loanRepository.findByLoanType_LoanTypeId(loanTypeId, pageable);
    }

    public Page<Loan> findByGuarantorId(Integer guarantorId, Pageable pageable) {
        return loanRepository.findByGuarantor_GuarantorId(guarantorId, pageable);
    }
}
