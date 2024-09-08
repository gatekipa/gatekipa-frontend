import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  ArrowBigRight,
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-primary text-white">
        <Link className="flex items-center justify-center" to="#">
          <img src={logo} alt="logo" className="w-8" />
          <span className="ml-2 text-2xl font-bold font-cursive__pacifico">
            Gatekipa
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#"
          >
            Contact Us
          </Link>
        </nav>

        <Link
          to="/auth/login"
          className="ml-4 rounded relative inline-flex group items-center justify-center px-3.5 py-1 m-1 cursor-pointer border-b-4 border-l-2 active:border-[#17CF97]active:shadow-none shadow-lg bg-gradient-to-tr from-teal-600 to-teal-500 border-teal-700 text-white"
        >
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
          <span className="relative font-semibold">Login / Sign Up</span>
        </Link>
      </header>
      <main className="flex-1 bg-primary text-white">
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
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-primary" />}
                title="Quick Check-In/Check-Out"
                description="Simplified visitor management with just a phone number or QR code."
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-primary" />}
                title="Digital Records"
                description="Store and access visitor and employee data securely in the cloud."
              />
              <FeatureCard
                icon={<Bell className="h-10 w-10 text-primary" />}
                title="Host Notifications"
                description="Notify hosts when visitors arrive via in-app or SMS notifications."
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-primary" />}
                title="Shift Scheduling & Payroll Integration"
                description="Manage staff shifts and integrate with payroll systems seamlessly."
              />
              <FeatureCard
                icon={<AlertTriangle className="h-10 w-10 text-primary" />}
                title="Emergency Reporting"
                description="Generate lists of everyone currently in the building in case of emergencies."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-primary" />}
                title="Customizable Dashboards"
                description="Get a complete overview of visitor and employee activity with detailed analytics."
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Sign Up and Set Up</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Create an account and configure Gatekipa to suit your
                    business.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Check-In Visitors</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Use digital check-in/check-out for visitors with ease.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Track and Report</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Generate comprehensive reports and manage staff shifts.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Customer Testimonials
            </h2>
            <div className="grid gap-10 sm:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <p className="mb-4 italic">
                    "Gatekipa helped us streamline visitor check-ins and made
                    shift management a breeze."
                  </p>
                  <p className="font-semibold">- Company Name</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="mb-4 italic">
                    "We love how easy it is to track employee attendance and
                    generate payroll reports."
                  </p>
                  <p className="font-semibold">- User Review</p>
                </CardContent>
              </Card>
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
                  <Button
                    className="bg-primary text-primary-foreground"
                    type="submit"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
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

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center p-6">
        {icon}
        <h3 className="mt-4 text-xl font-bold">{title}</h3>
        <p className="text-center text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export default HomePage;
