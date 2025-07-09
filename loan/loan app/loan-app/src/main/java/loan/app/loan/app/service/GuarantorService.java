package loan.app.loan.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import loan.app.loan.app.model.Guarantor;
import loan.app.loan.app.repository.GuarantorRepository;

import java.util.List;

@Service // Add this annotation
public class GuarantorService {
    @Autowired
    private GuarantorRepository guarantorRepository;

    public List<Guarantor> getAllGuarantors() {
        return guarantorRepository.findAll();
    }

    public Guarantor getGuarantorById(int id) {
        return guarantorRepository.findById(id).orElse(null);
    }

    public Guarantor saveGuarantor(Guarantor guarantor) {
        return guarantorRepository.save(guarantor);
    }

    public void deleteGuarantor(int id) {
        guarantorRepository.deleteById(id);
    }

    public Page<Guarantor> getAllGuarantors(Pageable pageable) {
        return guarantorRepository.findAll(pageable);
    }

    public Page<Guarantor> findByName(String name, Pageable pageable) {
        return guarantorRepository.findByNameIgnoreCaseContaining(name, pageable);
    }

    public Page<Guarantor> findByEmail(String email, Pageable pageable) {
        return guarantorRepository.findByEmailIgnoreCaseContaining(email, pageable);
    }

    public Page<Guarantor> findByPhone(String phone, Pageable pageable) {
        return guarantorRepository.findByPhoneIgnoreCaseContaining(phone, pageable);
    }
}

