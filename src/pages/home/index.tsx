import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/auth/login");
  }, []);
  return (
    <>
      <h1>GateKipa Home Page</h1>
      <a href="/auth/login">Go to Login Screen</a>
    </>
  );
};

export default HomePage;
