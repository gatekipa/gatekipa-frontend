import { fetchFeatures } from "@/app/features/pricing/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";

const useFeatures = () => {
  const dispatch = useAppDispatch();

  const { modules, permissions, loading } = useAppSelector(
    (state) => state.pricing
  );

  useEffect(() => {
    dispatch(fetchFeatures({ type: "MODULE" }));
    dispatch(fetchFeatures({ type: "PERMISSION" }));
  }, []);

  // Inside each module, I want to have all the permissions

  const transformedModules = modules.map((module) => {
    return {
      ...module,
      permissions,
    };
  });

  return { transformedModules, loading: loading["FETCH_FEATURES"] };
};

export default useFeatures;
