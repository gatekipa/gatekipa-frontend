import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { isMultiFactorAuthEnabled } from "@/utils";
import { X } from "lucide-react";
import React, { useState } from "react";

const MFAWarningDialog: React.FC = () => {
  const shouldShowWarningDialog = isMultiFactorAuthEnabled();
  const [show, setShow] = useState(true);

  if (!show || shouldShowWarningDialog) return null;

  return (
    <Alert variant="warning" className="my-4">
      <X className="h-4 w-4 cursor-pointer" onClick={() => setShow(false)} />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        Your account is not secure. Please enable multi-factor authentication.
        Visit Settings Page.
      </AlertDescription>
    </Alert>
  );
};

export default MFAWarningDialog;
