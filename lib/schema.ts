
import { z } from 'zod'

export const FormDataSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  name: z.string().min(1, 'Completed name is required'),
  phone: z.string().min(1, 'Phone is required'),
  note: z.string().min(1, 'Zip is required')
})

export const FormDataSchemaUser = z
  .object({
    email: z.string().email(),
    /*password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),*/
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    name: z.string().min(1, 'Completed name is required'),
    phone: z.string().min(1, 'Phone is required'),
    note: z.string().min(1, 'Zip is required')
  })
  /*.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });*/

export type TFormDataSchemaUser = z.infer<typeof FormDataSchemaUser>;