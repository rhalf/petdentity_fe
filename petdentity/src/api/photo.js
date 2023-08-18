import { storage } from "@/plugins/firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const fileSize = 512;
const totalSize = fileSize * 1000;

export const uploadOwnerProfile = async (uid, files) => {
  const profilePath = "/photos/owners";
  const file = files[0];

  if (file.size > totalSize)
    throw new Error(`Photo should not exceed ${fileSize} KB!`);

  const storageRef = ref(storage, `${profilePath}/${uid}/profile`);

  const snapshots = await uploadBytes(storageRef, file);

  return await getDownloadURL(snapshots.ref);
};

// export const uploadPhotos = async (uid, files) => {
// const photosPath = "/photos";
//   const storageRef = ref(storage, `${photosPath}/${uid}/${files[0].name}`);
//   return await uploadBytes(storageRef, files[0]);
// };

export const uploadPetProfile = async (id, files) => {
  const profilePath = "/photos/pets";
  const file = files[0];

  if (file.size > totalSize)
    throw new Error(`Photo should not exceed ${fileSize} KB!`);

  const storageRef = ref(storage, `${profilePath}/${id}/profile`);

  const snapshots = await uploadBytes(storageRef, file);

  return await getDownloadURL(snapshots.ref);
};

export const uploadGovernmentProfile = async (id, files) => {
  const profilePath = "/photos/governments";
  const file = files[0];

  if (file.size > totalSize)
    throw new Error(`Photo should not exceed ${fileSize} KB!`);

  const storageRef = ref(storage, `${profilePath}/${id}/profile`);

  const snapshots = await uploadBytes(storageRef, file);

  return await getDownloadURL(snapshots.ref);
};
