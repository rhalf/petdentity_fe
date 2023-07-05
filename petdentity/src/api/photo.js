import { storage } from "@/plugins/firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const profilePath = "/photo/profile";
const photosPath = "/photos";

export const uploadProfilePhoto = async (uid, files) => {
  const file = files[0];

  const storageRef = ref(storage, `${profilePath}/${uid}`);

  const snapshots = await uploadBytes(storageRef, file);

  return await getDownloadURL(snapshots.ref);
};

export const uploadPhotos = async (uid, files) => {
  const storageRef = ref(storage, `${photosPath}/${uid}/${files[0].name}`);

  return await uploadBytes(storageRef, files[0]);
};
