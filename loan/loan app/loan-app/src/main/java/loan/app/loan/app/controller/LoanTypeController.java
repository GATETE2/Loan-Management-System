package loan.app.loan.app.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import loan.app.loan.app.model.LoanType;
import loan.app.loan.app.service.LoanTypeService;

import java.util.List;

@RestController
@RequestMapping("/loantypes")
public class LoanTypeController {
    @Autowired
    private LoanTypeService loanTypeService;

    @GetMapping
    public Page<LoanType> getAllLoanTypes(@RequestParam(required = false) String typeName,
                                          @RequestParam(required = false) String description,
                                          Pageable pageable) {
        if (typeName != null) return loanTypeService.findByTypeName(typeName, pageable);
        if (description != null) return loanTypeService.findByDescription(description, pageable);
        return loanTypeService.getAllLoanTypes(pageable);
    }

    @GetMapping("/{id}")
    public LoanType getLoanTypeById(@PathVariable int id) {
        return loanTypeService.getLoanTypeById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public LoanType createLoanType(@RequestBody LoanType loanType) {
        return loanTypeService.saveLoanType(loanType);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteLoanType(@PathVariable int id) {
        loanTypeService.deleteLoanType(id);
    }
}
