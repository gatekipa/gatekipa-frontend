import { motion } from "framer-motion";
import { sellingPoints } from "@/constants/data";
import Navbar from "@/components/features/home/navbar";
import Footer from "@/components/shared/footer";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <motion.div
        className="max-w-4xl mx-auto  bg-gradient-to-b from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-bold text-center text-primary mb-8 mt-20"
          {...fadeInUp}
        >
          About Us
        </motion.h1>

        <motion.section
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
          {...fadeInUp}
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Our Mission
          </h2>
          <p className="text-muted-foreground">
            At Gatekipa, our mission is to revolutionize the way businesses
            manage their visitors and employees. We believe that efficient,
            secure, and user-friendly tools are the backbone of a smooth
            operation, no matter the industry. With Gatekipa, we strive to
            provide solutions that enhance security, improve productivity, and
            give businesses more control over their day-to-day activities.
          </p>
        </motion.section>

        <motion.section
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
          {...fadeInUp}
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Our Story
          </h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2024, Gatekipa started with a vision to simplify visitor
            and employee management for businesses of all sizes. We noticed that
            many organizations were still relying on outdated methods to manage
            visitors and track employee attendance, which led to inefficiencies
            and security gaps. Our solution was born out of the need for a
            smarter, digital approach.
          </p>
          <p className="text-muted-foreground">
            Since then, we have grown into a trusted partner for businesses
            across various industries, helping them streamline their operations
            and focus on what matters most: providing exceptional service.
          </p>
        </motion.section>

        <motion.section
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
          {...fadeInUp}
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Team</h2>
          <p className="text-muted-foreground">
            Gatekipa is driven by a diverse team of innovators, developers, and
            business professionals with a shared goal of improving workplace
            efficiency. Our passion for technology and customer satisfaction is
            at the heart of everything we do.
          </p>
        </motion.section>

        <motion.section
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
          {...fadeInUp}
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Why Gatekipa?
          </h2>
          <ul className="space-y-4">
            {sellingPoints.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          className="bg-white rounded-lg shadow-lg p-6"
          {...fadeInUp}
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">Join Us</h2>
          <p className="text-muted-foreground mb-4">
            Join the growing number of businesses that trust Gatekipa to manage
            their visitors and employees.
          </p>
          <a
            href="mailto:Support@gatekipas.com"
            className="inline-block bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
          >
            Contact Us for a Demo
          </a>
        </motion.section>
      </motion.div>
      <Footer />
    </div>
  );
}
