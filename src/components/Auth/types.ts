import { FormikHelpers } from 'formik'
import { IdProp } from 'utils/idProp';

export interface SignInFormValues {
    email: string,
    password: string
}

export interface SignUpFormValues extends SignInFormValues {
  confPassword: string
}

export interface ValidationRule extends IdProp {
  text: string,
  validate(input: string): boolean
  isValid: boolean
}

export interface SignUpPasswordValidationProp {
  rules: ValidationRule[], 
  score: number,
  isPasswordEmpty: boolean
}