import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type StepCardProps = {
  step: number;
  title: string;
  description: string;
};

const StepCard: React.FC<StepCardProps> = ({ step, title, description }) => {
  return (
    <Card className="transition-transform duration-300 ease-in-out transform cursor-pointer shadow-lg hover:scale-105">
      <CardContent className="flex flex-col items-center p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {step}
        </div>
        <h3 className="mt-4 text-xl font-bold">{title}</h3>
        <p className="text-center text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default StepCard;
