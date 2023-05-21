export default {
  required: (value) => {
    return !!value || 'Field is required'
  },
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid email.'
  },

  max: (value, length) => {
    return value.length > length || `Max ${length} characters`
  }

  // min  (value, length) => {
  //   console.log('value', value)
  //   return value.length < length || `Min ${length} characters`
  // }
}

// :rules="[validator.required, validator.email]"
// :rules="[validator.required]"
// import validator from '@/mixins/validator'
