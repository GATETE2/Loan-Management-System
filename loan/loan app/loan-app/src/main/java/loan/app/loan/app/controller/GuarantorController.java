package loan.app.loan.app.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import loan.app.loan.app.model.Guarantor;
import loan.app.loan.app.service.GuarantorService;

import java.util.List;

@RestController
@RequestMapping("/guarantors")
public class GuarantorController {
    @Autowired
    private GuarantorService guarantorService;

    @GetMapping
    public Page<Guarantor> getAllGuarantors(@RequestParam(required = false) String name,
                                            @RequestParam(required = false) String email,
                                            @RequestParam(required = false) String phone,
                                            Pageable pageable) {
        if (name != null) return guarantorService.findByName(name, pageable);
        if (email != null) return guarantorService.findByEmail(email, pageable);
        if (phone != null) return guarantorService.findByPhone(phone, pageable);
        return guarantorService.getAllGuarantors(pageable);
    }

    @GetMapping("/{id}")
    public Guarantor getGuarantorById(@PathVariable int id) {
        return guarantorService.getGuarantorById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Guarantor createGuarantor(@RequestBody Guarantor guarantor) {
        return guarantorService.saveGuarantor(guarantor);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteGuarantor(@PathVariable int id) {
        guarantorService.deleteGuarantor(id);
    }
}
