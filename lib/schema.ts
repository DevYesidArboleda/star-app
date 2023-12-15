
import { z } from 'zod'

export const FormDataSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  street: z.string().min(1, 'Street is required'),
  department: z.string().min(1, 'depatament is required'),
  city: z.string().min(1, 'City is required'),
  name: z.string().min(1, ' name is required').refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), 'Name should contain only alphabets'),
  lastname: z.string().min(1, 'lastname is required').refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), 'Name should contain only alphabets'),
  phone: z.string().min(1, 'Phone is required')
})

export const FormDataSchemaUser = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    street: z.string().min(1, 'Street is required'),
    department: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    name: z.string().min(1, 'Completed name is required'),
    lastname: z.string().min(1, 'Completed name is required'),
    phone: z.string().min(1, 'Phone is required')
  })

export type TFormDataSchemaUser = z.infer<typeof FormDataSchemaUser>;