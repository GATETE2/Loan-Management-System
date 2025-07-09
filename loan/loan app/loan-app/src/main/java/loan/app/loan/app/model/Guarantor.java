package loan.app.loan.app.model;


import jakarta.persistence.*;


@Entity
public class Guarantor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int guarantor_id;

    private String name;
    private String phone;
    private String email;


    // Getters and Setters
    public int getGuarantorId() {
        return guarantor_id;
    }

    public void setGuarantorId(int guarantor_id) {
        this.guarantor_id = guarantor_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
