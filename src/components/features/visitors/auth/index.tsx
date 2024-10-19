import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

enum VisitorAuthState {
  EXISTING = "EXISTING",
  NEW = "NEW",
  DEFAULT = "DEFAULT",
}

const visitorSignInFormSchema = z.object({
  email: z.string(),
  mobile: z.string(),
});

const visitorSignUpFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  mobile: z.string(),
});

export type VisitorSignInForm = z.infer<typeof visitorSignInFormSchema>;
export type VisitorSignUpForm = z.infer<typeof visitorSignUpFormSchema>;

const VisitorAuth: React.FC = () => {
  const [userType, setUserType] = useState<VisitorAuthState>(
    VisitorAuthState.DEFAULT
  );

  const signInForm = useForm<VisitorSignInForm>({
    resolver: zodResolver(visitorSignInFormSchema),
    defaultValues: {
      email: "",
      mobile: "",
    },
    mode: "onChange",
  });

  const signUpForm = useForm<VisitorSignUpForm>({
    resolver: zodResolver(visitorSignUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
    },
    mode: "onChange",
  });

  const visitorSignUpHandler = useCallback((values: VisitorSignUpForm) => {
    try {
      console.log("values :>> ", values);

      signInForm.reset();
      toast.success("Sign up successful");
      setUserType(VisitorAuthState.DEFAULT);
    } catch (error) {
      toast.success("Sign up successful");
    }
  }, []);

  const visitorSigninHandler = useCallback((values: VisitorSignInForm) => {
    try {
      console.log("values :>> ", values);

      signInForm.reset();
      toast.success("Sign in successful");
      setUserType(VisitorAuthState.DEFAULT);
    } catch (error) {
      toast.success("Sign in successful");
    }
  }, []);

  const defaultContent = (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Visitor</h2>
      <p className="text-center text-muted-foreground">
        Are you an existing or a new visitor?
      </p>
      <div className="flex flex-col space-y-4">
        <Button
          onClick={() => setUserType(VisitorAuthState.EXISTING)}
          className="bg-slate-600 text-white"
        >
          I'm an existing user
        </Button>
        <Button onClick={() => setUserType(VisitorAuthState.NEW)}>
          I'm a new visitor
        </Button>
      </div>
    </div>
  );

  const existingContent = (
    <Form {...signInForm}>
      <form
        onSubmit={signInForm.handleSubmit(visitorSigninHandler)}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <div className="space-y-2">
          <FormField
            control={signInForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="email" className="text-xs">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="Please enter your email address"
                    autoComplete="off"
                    className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={signInForm.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="mobile" className="text-xs">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    id="mobile"
                    placeholder="Please enter your phone number"
                    autoComplete="off"
                    className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setUserType(VisitorAuthState.DEFAULT)}
        >
          Back
        </Button>
      </form>
    </Form>
  );

  const newContent = (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(visitorSignUpHandler)}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <div className="space-y-2">
          <FormField
            control={signUpForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="firstName" className="text-xs">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="firstName"
                    placeholder="Please enter your first name"
                    autoComplete="off"
                    className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={signUpForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="lastName" className="text-xs">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="lastName"
                    placeholder="Please enter your last name"
                    autoComplete="off"
                    className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={signUpForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="email" className="text-xs">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="Please enter your email address"
                    autoComplete="off"
                    className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={signUpForm.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="mobile" className="text-xs">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    id="mobile"
                    placeholder="Please enter your phone number"
                    autoComplete="off"
                    className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setUserType(VisitorAuthState.DEFAULT)}
        >
          Back
        </Button>
      </form>
    </Form>
  );

  return (
    <Card>
      <CardContent className="p-5">
        {userType === VisitorAuthState.DEFAULT
          ? defaultContent
          : userType === VisitorAuthState.EXISTING
          ? existingContent
          : newContent}
      </CardContent>
    </Card>
  );
};

export default VisitorAuth;
