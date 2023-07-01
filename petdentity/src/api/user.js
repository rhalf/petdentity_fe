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
  startAfter,
  startAt,
  limit,
  limitToLast,
  endAt,
} from "firebase/firestore";

import { toUtcTimestamp } from "@/utils/vue";
import { toObject, toArray } from "./index";

const collectionName = "users";

export const search = async ({
  searchText,
  columnName,
  orderDirection,
  limitNumber,
}) => {
  const collectionRef = collection(firestore, collectionName);
  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    startAt(searchText),
    endAt(searchText + "\uf8ff"),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

export const next = async ({
  lastItem,
  columnName,
  orderDirection,
  limitNumber,
}) => {
  const collectionRef = collection(firestore, collectionName);

  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    startAfter(lastItem),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

export const prev = async ({
  firstItem,
  columnName,
  orderDirection,
  limitNumber,
}) => {
  const collectionRef = collection(firestore, collectionName);
  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    endBefore(firstItem),
    limitToLast(limitNumber)
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

// const getAll = async () => {
//   const users = [];
//   const collectionRef = collection(firestore, collectionName);
//   const snapshots = await getDocs(collectionRef);
//   snapshots.forEach(async (snapshots) => {
//     let user = { id: snapshots.id, ...snapshots.data() };
//     user.role = await getDoc(user.role.path);
//     user.status = await getDoc(user.status.path);
//     users.push(user);
//   });
//   return users;
// };

export const get = async (id) => {
  const docRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() };
  else return null;
};

// const getByUid = async (id) => {
//   const colRef = collection(firestore, collectionName);

//   const q = await query(colRef, where("id", "==", id));
//   const snapshots = await getDocs(q);

//   if (snapshots.empty) return null;

//   var snapshot = snapshots.docs[0];

//   var user = {
//     id: snapshot.id,
//     ...snapshot.data(),
//   };
//   return user;
// };

export const create = async (user) => {
  const docRef = doc(firestore, collectionName, user.id);
  return setDoc(docRef, user);
};

// const createDefault = async (id) => {
//   let user = { id: id };
//   const docRoleRef = doc(auth, "roles", 0);
//   const docStatusRef = doc(auth, "statuses", 0);
//   user.role = docRoleRef;
//   user.status = docStatusRef;
//   return create(user);
// };

export const update = async (user) => {
  const docRef = doc(firestore, collectionName, user.id);
  const result = await setDoc(docRef, user);
  return result;
};

export const remove = async (user) => {
  const docRef = doc(firestore, collectionName, user.id);
  return await deleteDoc(docRef, user);
};
