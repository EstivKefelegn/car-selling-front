// pages/finance/utils/calculations.ts
export const calculateMonthlyPayment = (
  loanAmount: number,
  downPayment: number,
  interestRate: number,
  termMonths: number
): number => {
  const principal = loanAmount - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  
  if (monthlyRate > 0) {
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
           (Math.pow(1 + monthlyRate, termMonths) - 1);
  } else {
    return principal / termMonths;
  }
};