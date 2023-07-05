import colors from "vuetify/lib/util/colors";

// console.log(colors.amber);

export default {
  dark: true,
  colors: {
    background: "#000000",
    surface: "#1a1a1a",
    // primary: '#FADA3A',
    // primary: "#FFCC33",
    primary: colors.amber.base,
    primaryDarken1: colors.amber.darken2,
    secondary: colors.amber.lighten3,
    // 'secondary-darken-1': '#018786',

    // disabled: colors.grey.lighten1,
    disabled: colors.amber.lighten4,
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};
