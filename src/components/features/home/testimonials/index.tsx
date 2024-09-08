import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type TestimonialProps = {
  text: string;
  reviewer: string;
  logo: string;
};

const Testimonial: React.FC<TestimonialProps> = ({ reviewer, text, logo }) => {
  return (
    <Card className="transition-transform duration-300 ease-in-out transform cursor-pointer shadow-lg hover:scale-105">
      <CardContent className="p-6">
        <p className="mb-4 italic font-slab__roboto">"{text}"</p>
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-6 h-6 rounded-full" />
          <p className="font-semibold text-sm text-primary"> - {reviewer}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Testimonial;
