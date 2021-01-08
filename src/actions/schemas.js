import * as Yup from "yup";

const phoneRegExp = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,50})$/
const domainNameRegExp = /^(?:[a-zA-Z0-9]+(?:\-*[a-zA-Z0-9])*\.)+[a-zA-Z0-9]{2,63}$/

// common validations
export const passwordValidation = Yup.string()
    .matches(passwordRegExp, 'Password minimum length 8, must have 1 capital letter, 1 number and 1 special character')
    .required('Required')

export const emailValidation = Yup.string().email('Invalid email').required('Required')
export const nameValidation = Yup.string().min(2).max(32).required('Required')
export const locationValidation = Yup.string().min(2).max(60)
export const userNameValidation = Yup.string().min(2).max(32).required('Required')
export const messageValidation = Yup.string().min(2).max(1000).required('Required')
export const categoryTagValidation = Yup.string().min(2).max(60).required('Required')
export const aboutValidation = Yup.string().min(2).max(1000)
export const phoneValidation = Yup.string().matches(phoneRegExp, 'Phone number is invalid')
export const urlValidation = Yup.string().matches(domainNameRegExp, 'Url is not valid')

// schemas
export const ResetPasswordSchema = Yup.object().shape({
  password: passwordValidation,
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password did not match')
    .required('Required')
})

export const LoginSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation
})

export const RegisterSchema = Yup.object().shape({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation
})

export const EmailSchema = Yup.object().shape({
  email: emailValidation
})

export const CategoryTagSchema = Yup.object().shape({
  name: categoryTagValidation
})

export const SupportSchema = Yup.object().shape({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  website: urlValidation,
  message: messageValidation
})

export const UserUpdateSchema = Yup.object().shape({
  username: userNameValidation,
  name: nameValidation,
  location: locationValidation,
  website: urlValidation,
  about: aboutValidation
})
