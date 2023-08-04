export const toObject = (snapshot) => {
  if (Object.hasOwnProperty(snapshot, "exists"))
    if (!snapshot.exists) return null;

  return { id: snapshot.id, ...snapshot.data() };
};

export const toArray = (snapshots) => {
  if (snapshots.empty) return [];
  return snapshots.docs.map((snapshot) => {
    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  });
};

export const getIndexes = (snapshots) => {
  const firstIndex = 0;
  const lastIndex = snapshots.docs.length - 1;

  const firstItem = snapshots.docs[firstIndex];
  const lastItem = snapshots.docs[lastIndex];

  return { firstItem, lastItem };
};
