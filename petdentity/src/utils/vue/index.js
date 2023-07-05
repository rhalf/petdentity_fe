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

export const toUtc = (date) => {
  return dayjs(date, { utc: true });
};

export const toUtcTimestamp = (date) => {
  return toUtc(date).unix();
};
