import { firestore } from "@/plugins/firebase";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const collectionName = "animals";

const search = async (searchName, orderDirection, limitNumber, afterNumber) => {
  const colRef = collection(firestore, collectionName);
  const q = await query(
    colRef,
    orderBy("name", orderDirection),
    limit(limitNumber),
    startAfter(afterNumber)
  );
  const snapshots = await getDocs(q);

  console.log(snapshots.docs);

  if (snapshots.empty) return null;

  const animals = snapshots.docs.map((snapshot) => {
    return {
      id: snapshot.id,
      ...snapshot.data(),
      breedCount: snapshot.data()?.breeds.length,
    };
  });

  return animals;
};

const get = async (uid) => {
  const docRef = doc(firestore, collectionName, uid);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) return { uid: snapshot.uid, ...snapshot.data() };
  else return null;
};

const getByUid = async (uid) => {
  const colRef = collection(firestore, collectionName);

  const q = await query(colRef, where("uid", "==", uid));
  const snapshots = await getDocs(q);

  if (snapshots.empty) return null;

  var snapshot = snapshots.docs[0];

  var user = {
    uid: snapshot.uid,
    ...snapshot.data(),
  };
  return user;
};

const create = async (animal) => {
  const colRef = collection(firestore, collectionName);
  return addDoc(colRef, animal);
};

// const createDefault = async (uid) => {
//   let user = { uid: uid };
//   const docRoleRef = doc(auth, "roles", 0);
//   const docStatusRef = doc(auth, "statuses", 0);
//   user.role = docRoleRef;
//   user.status = docStatusRef;
//   return create(user);
// };

const update = async (user) => {
  const docRef = doc(firestore, collectionName, user.uid);
  const result = await setDoc(docRef, user);
  return result;
};

const remove = async (user) => {
  const docRef = doc(firestore, collectionName, user.uid);
  return await deleteDoc(docRef, user);
};

export { search, get, getByUid, create, update, remove };
