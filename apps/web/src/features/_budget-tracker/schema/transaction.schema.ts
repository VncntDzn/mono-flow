import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number({ required_error: 'Number is required' }),
  transaction_name: z
    .string()
    .trim()
    .min(1, { message: 'Transaction name is required' }),
  description: z.string().trim().optional(),
  category: z.string({ required_error: 'Category is required' }),
  is_recurring: z.boolean({ required_error: 'Recurring is required' }),
  type: z.string({ required_error: 'Type is required' }),
});
