import { z } from 'zod';

export const signupSchema = z.object({
  first_name: z.string().trim().min(1, { message: 'First name is required' }),
  last_name: z.string().trim().min(1, { message: 'Last name is required' }),
  email: z.string().trim().email({ message: 'Please enter a valid email' }),
  password: z.string().trim().min(6, { message: 'Minimum length is 6' }),
});
