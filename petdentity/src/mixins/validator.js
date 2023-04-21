export const required = (value) => {
  return !!value || 'Field is required'
}

export const counter = (value, length) => {
  return value.length <= length || `Max ${length} characters`
}
