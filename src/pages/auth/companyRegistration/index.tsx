import { useAppSelector } from '@/app/hooks';
import CompanyRegistrationForm from '@/components/features/auth/companyRegistrationForm';
import VerifyEmailForm from '@/components/features/auth/verifyEmailForm';
import VerifyEmailTokenForm from '@/components/features/auth/verifyEmailTokenForm';
import React from 'react';

const CompanyRegistrationPage: React.FC = () => {
  const {
    registerUser: { isVerificationEmailSent, isEmailVerified },
  } = useAppSelector((state) => state.auth);

  if (!isVerificationEmailSent) {
    return <VerifyEmailForm />;
  } else if (isVerificationEmailSent && !isEmailVerified) {
    return <VerifyEmailTokenForm />;
  } else {
    return <CompanyRegistrationForm />;
  }
};

export default CompanyRegistrationPage;
