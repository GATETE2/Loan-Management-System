package loan.app.loan.app.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;

import loan.app.loan.app.model.Payment;
import loan.app.loan.app.service.PaymentService;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public Page<Payment> getAllPayments(@RequestParam(required = false) Double amountPaid,
                                        @RequestParam(required = false) Integer loanId,
                                        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.util.Date datePaid,
                                        Pageable pageable) {
        if (amountPaid != null) return paymentService.findByAmountPaid(amountPaid, pageable);
        if (loanId != null) return paymentService.findByLoanId(loanId, pageable);
        if (datePaid != null) return paymentService.findByDatePaid(datePaid, pageable);
        return paymentService.getAllPayments(pageable);
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable int id) {
        return paymentService.getPaymentById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable int id) {
        paymentService.deletePayment(id);
    }
}
