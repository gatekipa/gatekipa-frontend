import { useAppDispatch } from "@/app/hooks";
import RegistrationForm from "../../../components/features/auth/registrationForm";
import { useEffect } from "react";
import { fetchCompanyThunk } from "@/app/features/company/thunk";

const RegistrationPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCompanyThunk());
  }, []);

  return <RegistrationForm />;
};

export default RegistrationPage;
