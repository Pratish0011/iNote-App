import { z } from "zod";
  
      export const mySchema = z.object({
                username: z
                .string({required_error: "Username is required"})
                .trim()
                .min(3,{message: "Username must be more than 3 characters"}),

                email: z
                .string({required_error: "Email is required"})
                .trim()
                .email({message: "Please enter a valid email"})
                .endsWith(".com"),

                password: z
                .string({required_error: "Password is required"})
                .trim()
                .min(6,{message: "Password must be at least 6 characters"})
       })
