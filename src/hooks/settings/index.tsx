import { fetchUserSettingsThunk } from "@/app/features/settings/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";

const useSettings = () => {
  const dispatch = useAppDispatch();

  const {
    userSettings,
    isLoading: { FETCH_SETTINGS },
  } = useAppSelector((state) => state.setting);

  useEffect(() => {
    dispatch(fetchUserSettingsThunk());
  }, []);

  return { userSettings, loading: FETCH_SETTINGS };
};

export default useSettings;
