"use client"; // Required for form handling hooks

import React, { useState, useTransition } from "react"; // Remove useEffect, Import useState, useTransition
// Remove useFormState, keep useFormStatus for now (or manage pending state manually)
// Remove unused useFormStatus import
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { submitContactForm } from "./actions"; // Import only the action
// Define local state type similar to ContactFormState
type FormStatus = "idle" | "pending" | "success" | "error";
type LocalFormState = {
  message: string;
  status: FormStatus;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

import { Button } from "@/components/ui/button"; // Keep Button import
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea

// Define the form schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

// Submit button can now take pending state as a prop
interface SubmitButtonProps {
  isPending: boolean;
}
function SubmitButton({ isPending }: SubmitButtonProps) {
  return (
    <Button type="submit" className="w-full" disabled={isPending}>
      {isPending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export default function ContactPage() {
  // Local state for submission status
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<LocalFormState>({ message: "", status: "idle" });

  // Define the form using react-hook-form (still useful for client-side validation)
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Define the submit handler to call the server action
  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    startTransition(async () => {
      setFormState({ message: "", status: "pending" }); // Set pending state

      // Create FormData
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("message", values.message);

      try {
        const result = await submitContactForm(formData);
        setFormState(result); // Update local state with result from action

        if (result.status === "success") {
          toast.success("Message Sent!", { description: result.message });
          form.reset();
        } else {
          toast.error("Submission Failed", { description: result.message || "Please check the form for errors." });
          // Update local state with errors for display
          setFormState(prev => ({ ...prev, errors: result.errors }));
        }
      } catch (error) {
        console.error("Client-side error calling action:", error);
        const errorState = { message: "An unexpected error occurred.", status: "error" as FormStatus };
        setFormState(errorState);
        toast.error("Error", { description: errorState.message });
      }
    });
  }

  return (
    // Use direct padding and max-width, significantly increased vertical padding
    <div className="px-4 lg:px-8 py-32 md:py-48 max-w-screen-2xl mx-auto"> {/* Further Increased py */}
      <h1 className="mb-12 md:mb-16 text-center text-4xl font-bold">Contact Us</h1> {/* Further Increased mb */}
      <p className="mb-16 md:mb-20 text-center text-lg text-muted-foreground"> {/* Further Increased mb */}
        Have a question or want to work together? Send us a message!
      </p>

      <div className="mx-auto max-w-md">
        <Form {...form}>
          {/* Use react-hook-form's handleSubmit */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage>{/* RHF Client-side error */}</FormMessage>
                  {/* Display server-side error from local state */}
                  {formState.errors?.name && <p className="text-sm font-medium text-destructive">{formState.errors.name[0]}</p>}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage>{/* RHF Client-side error */}</FormMessage>
                  {/* Display server-side error from local state */}
                  {formState.errors?.email && <p className="text-sm font-medium text-destructive">{formState.errors.email[0]}</p>}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us how we can help..."
                      className="resize-none" // Optional: prevent resizing
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{/* RHF Client-side error */}</FormMessage>
                  {/* Display server-side error from local state */}
                  {formState.errors?.message && <p className="text-sm font-medium text-destructive">{formState.errors.message[0]}</p>}
                </FormItem>
              )}
            />
            {/* Pass pending state to SubmitButton */}
            <SubmitButton isPending={isPending} />
            {/* Display general server error message from local state */}
            {formState.status === 'error' && !formState.errors && (
               <p className="text-sm font-medium text-destructive">{formState.message}</p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
