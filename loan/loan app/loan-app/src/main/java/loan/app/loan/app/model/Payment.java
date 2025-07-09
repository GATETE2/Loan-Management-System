package loan.app.loan.app.model;


import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int payment_id;

    @ManyToOne
    @JoinColumn(name = "loan_id")
    private Loan loan;

    private double amountPaid;
    private Date datePaid;

    // Getters and Setters
    public int getPaymentId() {
        return payment_id;
    }

    public void setPaymentId(int payment_id) {
        this.payment_id = payment_id;
    }

    public Loan getLoan() {
        return loan;
    }

    public void setLoan(Loan loan) {
        this.loan = loan;
    }

    public double getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(double amountPaid) {
        this.amountPaid = amountPaid;
    }

    public Date getDatePaid() {
        return datePaid;
    }

    public void setDatePaid(Date datePaid) {
        this.datePaid = datePaid;
    }
}
