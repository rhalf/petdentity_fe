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
