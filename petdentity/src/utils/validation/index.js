export default {
  required: (value) => {
    if (!!value) return true;
    return "Required field";
  },
};
