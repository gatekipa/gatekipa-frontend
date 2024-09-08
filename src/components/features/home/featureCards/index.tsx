import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card className="transition-transform duration-300 ease-in-out transform cursor-pointer shadow-lg hover:scale-105">
      <CardContent className="flex flex-col items-center p-6">
        {icon}
        <div className="space-y-3">
          <h3 className="mt-4 text-xl font-bold text-center">{title}</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
