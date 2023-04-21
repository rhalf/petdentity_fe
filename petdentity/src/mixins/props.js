export const baseProps = {
  name: {
    type: String,
    default: ''
  },
  classes: {
    type: String,
    default: ''
  },
  variant: {
    default: 'elevated'
  },
  required: {
    type: Boolean,
    default: false
  },

  ripple: {
    type: Boolean,
    default: false
  },
  tile: {
    type: Boolean,
    default: false
  },
  bold: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },

  clearable: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  underlined: {
    type: Boolean,
    default: false
  },

  width: {
    type: [Number, String],
    default: null
  },
  maxWidth: {
    type: [Number, String],
    default: null
  },
  minWidth: {
    type: [Number, String],
    default: null
  },

  height: {
    type: [Number, String],
    default: null
  },
  maxHeight: {
    type: [Number, String],
    default: null
  },
  minHeight: {
    type: [Number, String],
    default: null
  },

  elevation: {
    type: Number,
    default: null
  },

  color: {
    type: String,
    default: null
  },
  outlined: Boolean,
  visible: Boolean
}

export const inputProps = {
  modelValue: {
    default: null
  },
  name: String,

  type: {
    type: String,
    default: undefined
  },
  placeholder: {
    type: String
  },
  label: {
    type: String
  },
  filled: {
    type: Boolean,
    default: false
  },

  readonly: {
    type: Boolean,
    default: false
  },
  prependIcon: {
    type: String,
    default: undefined
  },
  prependInnerIcon: {
    type: String,
    default: undefined
  },
  appendIcon: {
    type: String,
    default: undefined
  },
  appendInnerIcon: {
    type: String,
    default: undefined
  },
  hint: {
    type: String,
    default: undefined
  },
  persistentHint: {
    type: Boolean,
    default: false
  }
}

export const buttonProps = {}
