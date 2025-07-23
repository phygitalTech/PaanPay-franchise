import {z} from 'zod';

const profileSchema = z.object({
  fullname: z
    .string({required_error: 'Full Name is required'})
    .min(3, {message: 'Name must be at least 3 characters long'}),

  phoneNumber: z.preprocess(
    (val) => (typeof val === 'string' ? val.trim() : val), // Ensure it's a string before processing
    z
      .string({required_error: 'Phone Number is required'}) // Use string for length validation
      .length(10, {message: 'Phone Number must contain exactly 10 digits'}) // Ensure it's 10 digits long
      .regex(/^\d+$/, {message: 'Phone Number must contain only numbers'}), // Ensure it's numeric
  ),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({message: 'Invalid email address'}),

  address: z
    .string({required_error: 'Residential Address is required'})
    .min(5, {
      message: 'Residential Address must be at least 5 characters long',
    })
    .max(100, {message: 'Residential Address cannot exceed 100 characters'}),

  imageFile: z
    .any()
    .optional()
    .refine(
      (file) => {
        // Allow if not present (undefined or null), otherwise must be a File
        return file === undefined || file === null || file instanceof File;
      },
      {message: 'Invalid file type'},
    ),
  password: z
    .string({required_error: 'Password is required'})
    .min(8, {message: 'Password must be at least 8 characters long'})
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, {message: 'Password must contain at least one number'})
    .regex(/[@$!%*?&]/, {
      message:
        'Password must contain at least one special character (@, $, !, %, *, ?, &)',
    }),
});

export {profileSchema};
