package loan.app.loan.app.service;

import loan.app.loan.app.model.*;
import loan.app.loan.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GlobalSearchService {
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

    public Map<String, Object> search(String query) {
        Map<String, Object> result = new HashMap<>();
        result.put("users", userRepository.findByNameIgnoreCaseContainingOrEmailIgnoreCaseContainingOrPhoneIgnoreCaseContaining(query, query, query));
        result.put("loans", loanRepository.findByStatusIgnoreCaseContaining(query));
        try {
            double amount = Double.parseDouble(query);
            result.put("payments", paymentRepository.findByAmountPaid(amount));
        } catch (NumberFormatException e) {
            result.put("payments", List.of());
        }
        result.put("loanTypes", loanTypeRepository.findByTypeNameIgnoreCaseContainingOrDescriptionIgnoreCaseContaining(query, query));
        result.put("guarantors", guarantorRepository.findByNameIgnoreCaseContainingOrEmailIgnoreCaseContainingOrPhoneIgnoreCaseContaining(query, query, query));
        return result;
    }
} 