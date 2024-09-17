import React from "react";
import Navbar from "@/components/features/home/navbar";
import PlanCard from "@/components/features/pricing/planCards";
import { Button } from "@/components/ui/button";
import usePricingPlans from "@/hooks/pricing";
import { ArrowBigRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { gradients } from "../pricing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/shared/footer";

const faqs: { question: string; answer: string }[] = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time based on your needs.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, all plans include a 14-day free trial with no credit card required.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards and online payment methods.",
  },
];

const PricingLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { plans } = usePricingPlans();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gradient-to-r from-primary to-slate-950 text-white">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-7 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Pricing Plans for the Modern Workplace
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Streamline your visitor management with Gatekipas. Choose a
                  plan that scales with your business.
                </p>
              </div>
              <Button
                variant="getStarted"
                size="lg"
                onClick={() => navigate(`/auth/register`)}
              >
                Get Started for Free
                <ArrowBigRight className="ml-4" size={28} />
              </Button>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-14 lg:py-16 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-5 text-gray-950">
              Choose Your Plan{" "}
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Select the perfect plan for your needs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-end items-center">
              {plans.map((item, index) => (
                <PlanCard
                  key={item.plan.id}
                  plan={item.plan}
                  assignedFeatures={item.assignedFeatures}
                  gradientClass={gradients[index % gradients.length]}
                />
              ))}
            </div>
          </div>
        </section>
        <section id="faqs">
          <div className="container px-4 md:px-6 md:py-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-5">
              Frequently Asked Questions
            </h2>
            <div className="mt-20">
              <div className="flex justify-center items-center space-y-6 gap-5">
                {faqs.map((faq, index) => (
                  <Card key={index} className="overflow-hidden  w-full">
                    <CardHeader className="bg-gray-50 py-4">
                      <CardTitle className="text-sm">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="py-4">
                      <p className="text-gray-700 text-xs">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="cta"
          className="w-full py-12 md:py-14 lg:py-16 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-7 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-950">
                Start Your Free Trial Today
              </h2>
              <Button
                variant="getStarted"
                size="lg"
                onClick={() => navigate(`/auth/register`)}
              >
                Get Started for Free
                <ArrowBigRight className="ml-4" size={28} />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingLandingPage;
