"use server"; // Mark this file as containing Server Actions

import { z } from "zod";
import { supabase } from "@/lib/supabaseClient"; // Import Supabase client

// Define the schema for validation within the Server Action
// (Even though client-side validation exists, server-side is crucial for security)
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

// Define the return type for the action
interface SubmitContactFormResult {
  success: boolean;
  message: string;
  errors?: z.ZodIssue[]; // Optional: return validation errors
}

export async function submitContactForm(
  formData: unknown // Use unknown for initial input
): Promise<SubmitContactFormResult> {
  // 1. Validate the form data using the schema
  const validationResult = contactFormSchema.safeParse(formData);

  if (!validationResult.success) {
    console.error("Server-side validation failed:", validationResult.error.issues);
    return {
      success: false,
      message: "Invalid form data provided.",
      errors: validationResult.error.issues,
    };
  }

  // 2. Extract validated data
  const { name, email, message } = validationResult.data;

  // 3. Insert data into Supabase
  const { error } = await supabase
    .from('form_submissions')
    .insert([{ name, email, message }]);

  // 4. Handle potential database errors
  if (error) {
    console.error("Error inserting into Supabase:", error);
    return {
      success: false,
      message: "Database error: Failed to save submission.",
    };
  }

  // 5. Return success
  console.log("Server Action: Form submitted successfully", { name, email }); // Log on server
  return {
    success: true,
    message: "Message sent successfully!",
  };
}
