
import { z } from 'zod'

export const FormDataSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  name: z.string().min(1, 'Completed name is required'),
  phone: z.string().min(1, 'Phone is required'),
  note: z.string().min(1, 'Zip is required')
})

export const FormDataSchemaUser = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address')
})

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;