import { Mail, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { conditions } from "@/constants/data";
import Navbar from "@/components/features/home/navbar";
import Footer from "@/components/shared/footer";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8  bg-gradient-to-b from-gray-50 to-white py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="mb-8 text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mt-20"
          variants={itemVariants}
        >
          Terms and Conditions
        </motion.h1>

        <motion.div variants={itemVariants}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Welcome to Gatekipas. These Terms and Conditions govern your use
                of our website and services. By accessing or using Gatekipas,
                you agree to be bound by these Terms.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {conditions.map((section, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>
                  {index + 1}. {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{section.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                If you have any questions about these terms, please contact us
                at:
              </p>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                <Link to="mailto:support@gatekipas.com">
                  support@gatekipas.com
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="fixed bottom-4 right-4"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ChevronUp className="h-4 w-4" />
            <span className="sr-only">Back to top</span>
          </Button>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
