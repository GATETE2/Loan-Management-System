import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const steps = ['Loan Details', 'Personal Information', 'Documents', 'Review'];

interface LoanDetails {
  loanType: string;
  amount: number;
  purpose: string;
  term: number;
}

interface PersonalInfo {
  businessName: string;
  businessType: string;
  annualRevenue: number;
  yearsInBusiness: number;
}

interface Documents {
  businessPlan: File | null;
  financialStatements: File | null;
  taxReturns: File | null;
}

export const LoanApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    loanType: '',
    amount: 0,
    purpose: '',
    term: 12,
  });
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    businessName: '',
    businessType: '',
    annualRevenue: 0,
    yearsInBusiness: 0,
  });
  const [documents, setDocuments] = useState<Documents>({
    businessPlan: null,
    financialStatements: null,
    taxReturns: null,
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // TODO: Implement API call to submit loan application
    console.log('Submitting application:', {
      loanDetails,
      personalInfo,
      documents,
    });
    navigate('/dashboard');
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Loan Type</InputLabel>
                  <Select
                    value={loanDetails.loanType}
                    label="Loan Type"
                    onChange={(e) =>
                      setLoanDetails({ ...loanDetails, loanType: e.target.value })
                    }
                  >
                    <MenuItem value="business">Business Expansion</MenuItem>
                    <MenuItem value="equipment">Equipment Purchase</MenuItem>
                    <MenuItem value="working">Working Capital</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Loan Amount"
                  type="number"
                  value={loanDetails.amount}
                  onChange={(e) =>
                    setLoanDetails({
                      ...loanDetails,
                      amount: Number(e.target.value),
                    })
                  }
                  InputProps={{
                    startAdornment: '$',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Purpose"
                  multiline
                  rows={4}
                  value={loanDetails.purpose}
                  onChange={(e) =>
                    setLoanDetails({ ...loanDetails, purpose: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Loan Term (months)</InputLabel>
                  <Select
                    value={loanDetails.term}
                    label="Loan Term (months)"
                    onChange={(e) =>
                      setLoanDetails({
                        ...loanDetails,
                        term: Number(e.target.value),
                      })
                    }
                  >
                    <MenuItem value={12}>12 months</MenuItem>
                    <MenuItem value={24}>24 months</MenuItem>
                    <MenuItem value={36}>36 months</MenuItem>
                    <MenuItem value={48}>48 months</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Business Name"
                  value={personalInfo.businessName}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      businessName: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Business Type</InputLabel>
                  <Select
                    value={personalInfo.businessType}
                    label="Business Type"
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        businessType: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="sole">Sole Proprietorship</MenuItem>
                    <MenuItem value="partnership">Partnership</MenuItem>
                    <MenuItem value="corporation">Corporation</MenuItem>
                    <MenuItem value="llc">LLC</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Annual Revenue"
                  type="number"
                  value={personalInfo.annualRevenue}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      annualRevenue: Number(e.target.value),
                    })
                  }
                  InputProps={{
                    startAdornment: '$',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Years in Business"
                  type="number"
                  value={personalInfo.yearsInBusiness}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      yearsInBusiness: Number(e.target.value),
                    })
                  }
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Required Documents
                    </Typography>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Please upload the following documents in PDF format
                    </Alert>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          component="label"
                          fullWidth
                          sx={{ mb: 1 }}
                        >
                          Upload Business Plan
                          <input
                            type="file"
                            hidden
                            accept=".pdf"
                            onChange={(e) =>
                              setDocuments({
                                ...documents,
                                businessPlan: e.target.files?.[0] || null,
                              })
                            }
                          />
                        </Button>
                        {documents.businessPlan && (
                          <Typography variant="body2" color="success.main">
                            ✓ {documents.businessPlan.name}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          component="label"
                          fullWidth
                          sx={{ mb: 1 }}
                        >
                          Upload Financial Statements
                          <input
                            type="file"
                            hidden
                            accept=".pdf"
                            onChange={(e) =>
                              setDocuments({
                                ...documents,
                                financialStatements: e.target.files?.[0] || null,
                              })
                            }
                          />
                        </Button>
                        {documents.financialStatements && (
                          <Typography variant="body2" color="success.main">
                            ✓ {documents.financialStatements.name}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          component="label"
                          fullWidth
                          sx={{ mb: 1 }}
                        >
                          Upload Tax Returns
                          <input
                            type="file"
                            hidden
                            accept=".pdf"
                            onChange={(e) =>
                              setDocuments({
                                ...documents,
                                taxReturns: e.target.files?.[0] || null,
                              })
                            }
                          />
                        </Button>
                        {documents.taxReturns && (
                          <Typography variant="body2" color="success.main">
                            ✓ {documents.taxReturns.name}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ mt: 2 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Review Your Application
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Loan Details
                    </Typography>
                    <Typography variant="body2">
                      Type: {loanDetails.loanType}
                    </Typography>
                    <Typography variant="body2">
                      Amount: ${loanDetails.amount.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      Term: {loanDetails.term} months
                    </Typography>
                    <Typography variant="body2">
                      Purpose: {loanDetails.purpose}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Business Information
                    </Typography>
                    <Typography variant="body2">
                      Name: {personalInfo.businessName}
                    </Typography>
                    <Typography variant="body2">
                      Type: {personalInfo.businessType}
                    </Typography>
                    <Typography variant="body2">
                      Annual Revenue: ${personalInfo.annualRevenue.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      Years in Business: {personalInfo.yearsInBusiness}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Documents
                    </Typography>
                    <Typography variant="body2">
                      Business Plan: {documents.businessPlan?.name || 'Not uploaded'}
                    </Typography>
                    <Typography variant="body2">
                      Financial Statements:{' '}
                      {documents.financialStatements?.name || 'Not uploaded'}
                    </Typography>
                    <Typography variant="body2">
                      Tax Returns: {documents.taxReturns?.name || 'Not uploaded'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Loan Application
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep > 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={handleSubmit}>
              Submit Application
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}; 