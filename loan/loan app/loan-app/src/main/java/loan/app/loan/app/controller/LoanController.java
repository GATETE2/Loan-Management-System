package loan.app.loan.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import loan.app.loan.app.model.Loan;
import loan.app.loan.app.service.LoanService;

import java.util.List;

@RestController
@RequestMapping("/loans")
public class LoanController {
    @Autowired
    private LoanService loanService;

    @GetMapping
    public Page<Loan> getAllLoans(@RequestParam(required = false) String status,
                                  @RequestParam(required = false) Double amount,
                                  @RequestParam(required = false) Float interestRate,
                                  @RequestParam(required = false) Integer userId,
                                  @RequestParam(required = false) Integer loanTypeId,
                                  @RequestParam(required = false) Integer guarantorId,
                                  Pageable pageable) {
        if (status != null) return loanService.findByStatus(status, pageable);
        if (amount != null) return loanService.findByAmount(amount, pageable);
        if (interestRate != null) return loanService.findByInterestRate(interestRate, pageable);
        if (userId != null) return loanService.findByUserId(userId, pageable);
        if (loanTypeId != null) return loanService.findByLoanTypeId(loanTypeId, pageable);
        if (guarantorId != null) return loanService.findByGuarantorId(guarantorId, pageable);
        return loanService.getAllLoans(pageable);
    }

    @GetMapping("/{id}")
    public Loan getLoanById(@PathVariable int id) {
        return loanService.getLoanById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Loan createLoan(@RequestBody Loan loan) {
        return loanService.saveLoan(loan);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteLoan(@PathVariable int id) {
        loanService.deleteLoan(id);
    }
}
