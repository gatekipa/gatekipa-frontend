import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addVisitorThunk } from "@/app/features/company/thunk";
import { toast } from "sonner";
import { User2 } from "lucide-react";
//import LoadingButton from "@/components/shared/loadingButton";

const visitorFormSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  emailAddress: z.string().email(),
  mobileNo: z.string().regex(/^\+1\d{10}$/, {
    message:
      "Invalid phone number. It should be in the format +1XXXXXXXXXX (11 digits)",
  }),
});

export type IVisitorForm = z.infer<typeof visitorFormSchema>;

type VisitorToolbarProps = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const VisitorToolbar: React.FC<VisitorToolbarProps> = ({
  open,
  onClose,
  onOpen,
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.company);

  const form = useForm<IVisitorForm>({
    resolver: zodResolver(visitorFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      mobileNo: "",
    },
  });

  const onSubmit = useCallback(async (values: IVisitorForm) => {
    try {
      await dispatch(addVisitorThunk(values)).unwrap();
      form.reset();
      toast.success("Visitor created successfully");
      onClose();
    } catch (err) {
      toast.error(err as string);
    }
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
          onClose();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" onClick={onOpen}>
          <User2 className="mr-2" size={16} />
          New Visitor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Create New Visitor</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="firstName" className="text-sm">
                          First Name
                        </Label>
                        <FormControl>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Please enter your first name"
                            autoComplete="off"
                            className="text-xs focus:outline-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="lastName">Last Name</Label>
                        <FormControl>
                          <Input
                            id="lastName"
                            type="text"
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
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="emailAddress"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="email">Email</Label>
                        <FormControl>
                          <Input
                            id="emailAddress"
                            type="email"
                            placeholder="Please enter your email address"
                            autoComplete="off"
                            className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="mobileNo"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="mobileNo">Mobile Number</Label>
                        <FormControl>
                          <Input
                            id="mobileNo"
                            type="text"
                            placeholder="Please enter your mobile number"
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

                <div className="mt-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!form.formState.isValid || loading}
                  >
                    {loading ? "Saving..." : "Create"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VisitorToolbar;
