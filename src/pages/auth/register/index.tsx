import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import RegistrationForm from "../../../components/features/auth/registrationForm";
import { fetchCompanyThunk } from "@/app/features/company/thunk";
import VerifyEmailForm from "@/components/features/auth/verifyEmailForm";
import VerifyEmailTokenForm from "@/components/features/auth/verifyEmailTokenForm";
import { resetRegisterUser } from "@/app/features/auth/slice";

const RegistrationPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    registerUser: { isVerificationEmailSent, isEmailVerified },
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCompanyThunk());
  }, []);

  useEffect(() => {
    dispatch(resetRegisterUser());
  }, []);

  if (!isVerificationEmailSent) {
    return <VerifyEmailForm />;
  } else if (isVerificationEmailSent && !isEmailVerified) {
    return <VerifyEmailTokenForm />;
  } else {
    return <RegistrationForm />;
  }
};

export default RegistrationPage;
