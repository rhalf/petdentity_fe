// export const useModel = (props, emit) => {
//   return {
//     get() {
//       return props.modelValue;
//     },
//     set(value) {
//       return emit("update:modelValue", value);
//     },
//   };
// };

// import { toRefs } from "vue";

// const props = defineProps({ address: String });

// const propsRef = toRefs(props);

// const emit = defineEmits(["update:address"]);

// const address = computed(syncProp("address", emit, propsRef));

export const useModel = (props, emit, propName) => {
  return {
    get() {
      return props[propName]?.value;
    },
    set(value) {
      emit(`update:${propName}`, value);
    },
  };
};

export const syncProp = (props, emit, propName) =>
  useModel(props, emit, propName);

import dayjs from "dayjs";
export const toStringDate = (date) => {
  return dayjs(date).format("MMM DD, YYYY");
};

export const getBirthDate = (date) => {
  const now = dayjs(new Date());
  const dt = dayjs(date);
  return now.diff(dt, "Year");
};
