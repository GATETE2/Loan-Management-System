package loan.app.loan.app.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import loan.app.loan.app.model.LoanType;
import loan.app.loan.app.repository.LoanTypeRepository;

import java.util.List;

@Service
public class LoanTypeService {
    @Autowired
    private LoanTypeRepository loanTypeRepository;

    public List<LoanType> getAllLoanTypes() {
        return loanTypeRepository.findAll();
    }

    public LoanType getLoanTypeById(int id) {
        return loanTypeRepository.findById(id).orElse(null);
    }

    public LoanType saveLoanType(LoanType loanType) {
        return loanTypeRepository.save(loanType);
    }

    public void deleteLoanType(int id) {
        loanTypeRepository.deleteById(id);
    }

    public Page<LoanType> getAllLoanTypes(Pageable pageable) {
        return loanTypeRepository.findAll(pageable);
    }

    public Page<LoanType> findByTypeName(String typeName, Pageable pageable) {
        return loanTypeRepository.findByTypeNameIgnoreCaseContaining(typeName, pageable);
    }

    public Page<LoanType> findByDescription(String description, Pageable pageable) {
        return loanTypeRepository.findByDescriptionIgnoreCaseContaining(description, pageable);
    }
}
