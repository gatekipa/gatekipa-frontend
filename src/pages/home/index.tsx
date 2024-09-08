import FeatureCard from "@/components/features/home/featureCard";
import Navbar from "@/components/features/home/navbar";
import StepCard from "@/components/features/home/stepCard";
import Testimonial from "@/components/features/home/testimonials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  featureCardList,
  stepCardList,
  testimonialList,
} from "@/constants/data";
import { ArrowBigRight } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gradient-to-r from-primary to-slate-950 text-white">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-7 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Seamless Visitor & Employee Management, Anytime, Anywhere
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Gatekipa makes it easy to manage visitors and staff, enhancing
                  security and streamlining your operations.
                </p>
              </div>
              <Button variant="getStarted" size="lg">
                Get Started for Free
                <ArrowBigRight className="ml-4" size={28} />
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
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
                  Try Gatekipa for Free Today!
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Start managing your visitors and employees more efficiently.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-2">
                  <Input placeholder="Enter your email" type="email" />
                  <Button variant="getStarted" size="lg">
                    Get Started for Free
                    <ArrowBigRight className="ml-4" size={28} />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Gatekipa. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;
