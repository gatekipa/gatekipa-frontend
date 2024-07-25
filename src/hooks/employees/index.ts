import { fetchEmployeesThunk } from "@/app/features/employee/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";

const useEmployees = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEmployeesThunk());
  }, [dispatch]);

  const { employees, loading } = useAppSelector((state) => state.employee);

  return { employees, loading };
};

export default useEmployees;
