import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const ListPricingPage: React.FC = () => {
  return (
    <Card>
      <div className="flex justify-between p-5">
        <h2 className="text-2xl font-semibold">Pricing Plans</h2>
        <Link to="/dashboard/pricing/create">
          <Button>Create</Button>
        </Link>
      </div>
      <CardContent></CardContent>
    </Card>
  );
};

export default ListPricingPage;
