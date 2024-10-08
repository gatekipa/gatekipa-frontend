import FeatureCard from "@/components/features/home/featureCard";
import Navbar from "@/components/features/home/navbar";
import StepCard from "@/components/features/home/stepCard";
import Testimonial from "@/components/features/home/testimonials";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  featureCardList,
  stepCardList,
  testimonialList,
} from "@/constants/data";
import { ArrowBigRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gradient-to-r from-primary to-slate-950 text-white">
        <section className="w-full py-24 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-7 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Seamless Visitor & Employee Management, Anytime, Anywhere
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Gatekipas makes it easy to manage visitors and staff,
                  enhancing security and streamlining your operations.
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
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-950">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {featureCardList.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {stepCardList.map((step, index) => (
                <StepCard
                  key={index}
                  step={index + 1}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-950">
              Customer Testimonials
            </h2>
            <div className="grid gap-10 sm:grid-cols-2">
              {testimonialList.map((testimonial, index) => (
                <Testimonial
                  key={index}
                  reviewer={testimonial.reviewer}
                  text={testimonial.text}
                  logo={testimonial.logo}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Try Gate Kipa for Free Today!
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Start managing your visitors and employees more efficiently.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form
                  className="flex flex-col gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate(`/auth/register?email=${email}`);
                  }}
                >
                  <Input
                    placeholder="Please enter your email to get started"
                    type="email"
                    className="text-xs text-gray-900 focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-#17CF97 dark:focus:border-white"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button variant="getStarted" size="lg" type="submit">
                    Get Started for Free
                    <ArrowBigRight className="ml-4" size={28} />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
