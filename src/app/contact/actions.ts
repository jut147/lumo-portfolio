"use server"; // Mark this file as containing Server Actions

import { z } from "zod";

// Define the same schema used on the client for server-side validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

// Define the type for the action's return state
export type ContactFormState = {
  message: string;
  status: "success" | "error" | "idle";
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  // prevState: ContactFormState,
  formData: FormData // Restore original type
): Promise<ContactFormState> {
  // [Remove diagnostic logging]
  // Extract data from FormData
  const rawData = {
    // Use .get() directly as it should be FormData
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  // Validate the data
  const validatedFields = contactFormSchema.safeParse(rawData);

  // If validation fails, return errors
  if (!validatedFields.success) {
    console.error("Server-side validation failed:", validatedFields.error.flatten().fieldErrors);
    return {
      message: "Validation failed. Please check the fields.",
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // If validation succeeds, process the data (e.g., save to DB, send email)
  try {
    console.log("Server Action: Received validated data:", validatedFields.data);

    // --- Placeholder for actual submission logic ---
    // Example: await saveToDatabase(validatedFields.data);
    // Example: await sendEmail(validatedFields.data);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // --- End Placeholder ---

    return { message: "Message submitted successfully!", status: "success" };

  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { message: "An unexpected error occurred. Please try again.", status: "error" };
  }
}