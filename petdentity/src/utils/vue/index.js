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

export const getAge = (date) => {
  const now = dayjs(new Date());
  const dt = dayjs(date);

  const days = now.diff(dt, "days");
  const months = now.diff(dt, "month");
  const years = now.diff(dt, "year");

  return { years: years, months: months % 12, days: days % 30 };
};

export const toStringAge = (age) => {
  const { years, months, days } = age;
  return `${years}y, ${months}m, ${days}d`;
};

// export const toUtc = (date) => {
//   return dayjs(date, { utc: true });
// };

// export const toUtcTimestamp = (date) => {
//   return toUtc(date).unix();
// };

// import { readFile } from "fs/promises";
// export const readJsonFile = async (path) => {
//   const file = await readFile(path, "utf8");
//   return JSON.parse(file);
// };
// import { readJsonFile } from "@/utils/vue";
// const countries = readJsonFile("@/data/countries.json");
// const philippines = readJsonFile("@/data/philippines.json");
