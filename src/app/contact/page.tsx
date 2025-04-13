"use client"; // Required for form handling hooks

import * as React from "react"; // Import React for useState
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
// Remove direct Supabase client import, as it's handled by the action
import { submitContactForm } from "./actions"; // Import the Server Action

import { Button } from "@/components/ui/button";
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

export default function ContactPage() {
  const [isLoading, setIsLoading] = React.useState(false); // Add loading state

  // Define the form using react-hook-form
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Define the submit handler using the Server Action
  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    setIsLoading(true); // Set loading true
    try {
      const result = await submitContactForm(values); // Call the server action

      if (result.success) {
        toast.success(result.message, {
           description: "Thank you for contacting us. We'll get back to you soon.",
        });
        form.reset(); // Reset form on success
      } else {
        // Handle potential validation errors returned from server
        const description = result.errors 
          ? result.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('\n') 
          : "Please check your input and try again.";
        toast.error(result.message, {
          description: description,
        });
      }
    } catch (error) {
      // Catch unexpected errors during the action call
      console.error("Error calling submitContactForm action:", error);
      toast.error("An unexpected error occurred.", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false); // Set loading false regardless of outcome
    }
  }

  return (
    // Removed max-w and mx-auto, kept padding
    <div className="pt-20 pb-16 max-w-6xl mx-auto px-4">
      <h1 className="mb-8 md:mb-12 text-center text-4xl font-bold">Contact Us</h1> {/* Standardized mb */}
      <p className="mb-8 md:mb-12 text-center text-lg text-muted-foreground"> {/* Standardized mb */}
        Have a question or want to work together? Send us a message!
      </p>

      <div className="mx-auto max-w-md">
        <Form {...form}>
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Pass loading state to Button */}
            <Button type="submit" className="w-full" loading={isLoading}>
              Send Message 
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
