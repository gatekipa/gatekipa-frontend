import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const CreatePricingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <div className="flex items-center p-5 gap-4">
        <ArrowLeft
          className="cursor-pointer size-6 hover:opacity-70"
          onClick={() => navigate("/dashboard/pricing")}
        />
        <h2 className="text-2xl font-semibold">Create Pricing Plan</h2>
      </div>
      <CardContent></CardContent>
    </Card>
  );
};

export default CreatePricingPage;
