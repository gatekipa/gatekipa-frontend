import useSettings from "@/hooks/settings";
import React from "react";

const SettingsPage: React.FC = () => {
  useSettings();
  return <>Settings</>;
};

export default SettingsPage;
