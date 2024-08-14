import { useAppSelector } from '@/app/hooks';
import CompanyRegistrationForm from '@/components/features/auth/companyRegistrationForm';
import VerifyEmailForm from '@/components/features/auth/verifyEmailForm';
import React from 'react';

const CompanyRegistrationPage: React.FC = () => {
  const {
    registerUser: { isVerificationEmailSent },
  } = useAppSelector((state) => state.auth);
  return !isVerificationEmailSent ? (
    <VerifyEmailForm />
  ) : (
    <CompanyRegistrationForm />
  );
};

export default CompanyRegistrationPage;
