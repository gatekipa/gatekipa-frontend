import { Badge } from "@/components/ui/badge";
import { getCompanyPlan } from "@/utils";
import React from "react";

const Tiles: React.FC = () => {
  const data = getCompanyPlan();

  return (
    <section>
      <h2 className="text-2xl text-gray-950 font-semibold dark:text-white">
        Dashboard
      </h2>
      <div className="flex flex-col justify-center items-center my-5 gap-4 md:flex-row md:justify-start md:items-start">
        {data?.plan?.planName && (
          <div className="flex flex-col gap-y-4 bg-green-700 rounded-md shadow-lg text-white w-full p-5 cursor-pointer transition-opacity dark:bg-green-950 hover:opacity-80 md:w-1/3">
            <h3 className="text-xl font-semibold">Current Plan</h3>
            <Badge
              variant="secondary"
              className="opacity-70 uppercase w-fit dark:opacity-100 dark:bg-white dark:text-green-700"
            >
              {data?.plan?.planName}
            </Badge>
          </div>
        )}
        <div className="flex flex-col gap-y-4 bg-green-700 rounded-md shadow-lg text-white w-full p-5 cursor-pointer transition-opacity dark:bg-green-950 hover:opacity-80 md:w-1/3">
          <h3 className="text-xl font-semibold">Last Payment Date</h3>
          <Badge
            variant="secondary"
            className="opacity-70 uppercase w-fit dark:opacity-100 dark:bg-white dark:text-green-700"
          >
            {new Date(data?.lastPaymentDate!).toLocaleDateString()}
          </Badge>
        </div>
        <div className="flex flex-col gap-y-4 bg-green-700 rounded-md shadow-lg text-white w-full p-5 cursor-pointer transition-opacity dark:bg-green-950 hover:opacity-80 md:w-1/3">
          <h3 className="text-xl font-semibold">Next Payment Date</h3>
          <Badge
            variant="secondary"
            className="opacity-70 uppercase w-fit dark:opacity-100 dark:bg-white dark:text-green-700"
          >
            {new Date(data?.nextPaymentDate!).toLocaleDateString()}
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default Tiles;
