package loan.app.loan.app.model;


import jakarta.persistence.*;


@Entity
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loan_id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id") // Ensure the foreign key points to app_user
    private User user;

    private double amount;
    private float interestRate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "loan_type_id")
    private LoanType loanType;

    @ManyToOne
    @JoinColumn(name = "guarantor_id")
    private Guarantor guarantor;


    // Getters and Setters
    public int getLoanId() {
        return loan_id;
    }

    public void setLoanId(int loan_id) {
        this.loan_id = loan_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public float getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(float interestRate) {
        this.interestRate = interestRate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LoanType getLoanType() {
        return loanType;
    }

    public void setLoanType(LoanType loanType) {
        this.loanType = loanType;
    }

    public Guarantor getGuarantor() {
        return guarantor;
    }

    public void setGuarantor(Guarantor guarantor) {
        this.guarantor = guarantor;
    }

}

