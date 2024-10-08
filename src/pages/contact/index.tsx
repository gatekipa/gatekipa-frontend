import Navbar from "@/components/features/home/navbar";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Mail, MessageSquare } from "lucide-react";
import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden mt-32 md:mt-0">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-gradient-to-br from-slate-700 to-black p-12 text-white">
              <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
              <p className="text-lg mb-8 leading-relaxed">
                We're here to help! If you have any questions, concerns, or
                feedback about Gatekipas, feel free to reach out to us.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6" />
                  <span className="text-lg">support@gatekipas.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-lg">We'll respond ASAP</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="h-6 w-6" />
                  <span className="text-lg">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-8">
                Whether you're looking for product support, have questions about
                your subscription, or want to provide feedback, our team is
                ready to assist you.
              </p>
              <Button
                className="group bg-gradient-to-r from-slate-700 to-black text-white font-semibold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                onClick={() =>
                  (window.location.href = "mailto:support@gatekipas.com")
                }
              >
                Email Us
                <ArrowRight className="ml-2 h-5 w-5 inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
