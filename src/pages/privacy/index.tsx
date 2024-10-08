import Navbar from "@/components/features/home/navbar";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { privacyPolicies } from "@/constants/data";
import { Shield, Mail } from "lucide-react";
import React from "react";

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto  py-12 px-4 sm:px-6 lg:px-8">
        <Card className="mb-8 mt-20">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground mb-6">
              At Gatekipas, we value your privacy. This policy outlines how we
              collect, use, and protect your personal information when you use
              our services.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {privacyPolicies.map((policy, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  {policy.icon}
                  <span className="ml-2">{policy.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  {policy.content.map((_policy, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground">
                      {_policy}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about our privacy policy, please contact
              us at:
            </p>
            <Button variant="outline" className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              support@gatekipas.com
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
