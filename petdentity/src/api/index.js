export const toObject = (snapshot) => {
  if (Object.hasOwnProperty(snapshot, "exists"))
    if (!snapshot.exists) return null;

  return { ...snapshot.data(), id: snapshot.id };
};

export const toArray = (snapshots) => {
  if (snapshots.empty) return [];
  return snapshots.docs.map((snapshot) => {
    return {
      ...snapshot.data(),
      id: snapshot.id,
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
