import * as yup from "yup";

const commonScheme = {
  required: yup.string().required("This is a required field"),
  name: yup.string().required("Name is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid Email Address")
    .required("Email Address is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .max(12, "Maximum 12 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .min(6, "Minimum 6 characters")
    .max(12, "Maximum 12 characters")
    .required("This is a required field")
    .oneOf([yup.ref("password"), null], "Passwords don't match"),
  number: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(1, "Must be greater than zero")
    .required("This is a required field")
    .typeError("Must be a number"),
};

export const signupSchema = yup.object().shape({
  fullName: commonScheme.name,
  email: commonScheme.email,
  username: commonScheme.required,
  role: commonScheme.required,
  password: commonScheme.password,
  confirmPassword: commonScheme.passwordConfirmation,
});

export const loginSchema = yup.object().shape({
  email: commonScheme.email,
  password: commonScheme.password,
});
