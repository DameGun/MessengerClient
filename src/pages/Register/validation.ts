import * as yup from 'yup';

export const RegisterSchema = yup.object({
  email: yup.string().trim().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .trim()
    .length(8, 'Password must be exactly 8 characters')
    .required('Password required'),
});
