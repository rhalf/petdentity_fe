import * as yup from 'yup'

// export const schema = {
//   required(value) {
//     if (value) return true
//     return 'Field is required!'
//   },
//   password(value) {
//     const length = 6
//     if (value?.length >= length) return true
//     return `Password needs to be at least ${length} characters.`
//   },

//   email(value) {
//     if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
//     return 'Must be a valid e-mail.'
//   }
// }

export const schema = yup.object({
  password: yup.string().required().min(6),
  email: yup.string().required().email()
})
