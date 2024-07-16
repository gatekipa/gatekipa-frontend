import { useAppDispatch } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const visitFormSchema = z.object({
  purposeOfVisit: z.string().min(3),
  personToMeet: z.string().min(3),
  personToMeetEmail: z.string().email(),
  personToMeetMobileNo: z.string().min(10),
});

export type IVisitForm = z.infer<typeof visitFormSchema>;

const VisitsToolbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const form = useForm<IVisitForm>({
    resolver: zodResolver(visitFormSchema),
    defaultValues: {
      purposeOfVisit: "",
      personToMeet: "",
      personToMeetEmail: "",
      personToMeetMobileNo: "",
    },
  });

  const onSubmit = useCallback(async (values: IVisitForm) => {
    try {
      //   await dispatch(addVisitorThunk(values)).unwrap();
      form.reset();
      //   toast.success("Added Visitor Successfully");
    } catch (err) {
      //   toast.error(err as string);
    }
  }, []);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button size="sm">
            <EnvelopeOpenIcon className="mr-2" />
            Create
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Create New Visit</DialogTitle>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="purposeOfVisit"
                      render={({ field }) => (
                        <FormItem>
                          <Label id="purposeOfVisit" className="text-sm">
                            Purpose of Visit
                          </Label>
                          <FormControl>
                            <Input
                              id="purposeOfVisit"
                              type="text"
                              placeholder="Please enter your purpose of visit"
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
                      name="personToMeet"
                      render={({ field }) => (
                        <FormItem>
                          <Label id="personToMeet" className="text-sm">
                            Person To Meet
                          </Label>
                          <FormControl>
                            <Input
                              id="personToMeet"
                              type="text"
                              placeholder="Please enter the name of the person to meet"
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
                      name="personToMeetEmail"
                      render={({ field }) => (
                        <FormItem>
                          <Label id="personToMeetEmail" className="text-sm">
                            Email
                          </Label>
                          <FormControl>
                            <Input
                              id="personToMeetEmail"
                              type="email"
                              placeholder="Please enter email address of the person to meet"
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
                      name="personToMeetMobileNo"
                      render={({ field }) => (
                        <FormItem>
                          <Label id="personToMeetMobileNo" className="text-sm">
                            Mobile Number
                          </Label>
                          <FormControl>
                            <Input
                              id="personToMeetMobileNo"
                              type="text"
                              placeholder="Please enter mobile number of the person"
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
                </div>
                <div className="mt-4">
                  <Button className="w-full" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VisitsToolbar;
