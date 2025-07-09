package loan.app.loan.app.service;

import loan.app.loan.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LoanRepository loanRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private LoanTypeRepository loanTypeRepository;
    @Autowired
    private GuarantorRepository guarantorRepository;

    public Map<String, Object> getSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalUsers", userRepository.count());
        summary.put("totalLoans", loanRepository.count());
        summary.put("totalPayments", paymentRepository.count());
        summary.put("totalLoanTypes", loanTypeRepository.count());
        summary.put("totalGuarantors", guarantorRepository.count());
        summary.put("outstandingLoans", loanRepository.findByStatusIgnoreCaseContaining("PENDING").size());
        summary.put("approvedLoans", loanRepository.findByStatusIgnoreCaseContaining("APPROVED").size());
        summary.put("rejectedLoans", loanRepository.findByStatusIgnoreCaseContaining("REJECTED").size());
        return summary;
    }
} 