import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading: boolean;
  label?: string;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  label,
  ...rest
}) => {
  return (
    <Button disabled={loading} {...rest}>
      {loading ? (
        <>
          <ReloadIcon className="reload-icon" />
          Loading...
        </>
      ) : (
        label ?? "Save Changes"
      )}
    </Button>
  );
};

export default LoadingButton;
