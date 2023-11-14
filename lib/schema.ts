import { z } from 'zod'

export const FormDataSchema = z.object({
  /*firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),*/
  phone: z.string().min(1, 'Phone is required'),
  date: z.string().min(1, 'Date is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  name: z.string().min(1, 'Completed name is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required')
})