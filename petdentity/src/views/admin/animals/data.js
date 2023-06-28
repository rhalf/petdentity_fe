export const headers = [
  {
    title: "Name",
    align: "start",
    sortable: false,
    key: "name",
    width: "30%",
  },
  {
    title: "Type",
    align: "start",
    sortable: false,
    key: "type",
    width: "30%",
  },
  {
    title: "Breeds",
    align: "start",
    sortable: false,
    key: "breeds.length",
    width: "30%",
  },

  {
    title: "Actions",
    align: "start",
    sortable: false,
    width: 150,
    key: "actions",
  },
];

export const items = [
  { name: "Dog", type: "Mammal", breedCount: 100 },
  { name: "Snake", type: "Reptile", breedCount: 100 },
];
