import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().required().email(),
  password1: yup.string().required().min(6),
  password2: yup.string().required().min(6)
})
