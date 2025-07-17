import {z} from 'zod';

const rawmaterialcategorySchema = z.object({
  name: z
    .string({required_error: 'Language is required'})
    .min(3, {message: 'Language must be at least 3 characters long'}),
});
const rawmaterialcategoryCaterorSchema = z.object({
  name: z
    .string({required_error: 'Language is required'})
    .min(3, {message: 'Language must be at least 3 characters long'}),
});

const updaterawmaterialcategorySchema = z.object({
  name: z.string().nonempty('Name is required'),
  languageId: z.string().optional(), // add this if it's missing
});
const updaterawmaterialcategoryCaterorSchema = z.object({
  name: z.string().nonempty('Name is required'),
  unit: z.string().nonempty('Unit is required'),
  category: z.string().nonempty('Category is required'),
  amount: z.string().nonempty('Amount is required'),
});
const rawmaterialExtraSchema = z.object({
  name: z.string().min(3, {message: 'Name must be at least 3 characters long'}),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, {message: 'Price must be a positive number'}),
  ),
});

export {
  rawmaterialExtraSchema,
  rawmaterialcategorySchema,
  updaterawmaterialcategorySchema,
  rawmaterialcategoryCaterorSchema,
  updaterawmaterialcategoryCaterorSchema,
};
