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
  startAt,
  startAfter,
  endAt,
  endBefore,
  limitToLast,
  getCountFromServer,
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
//     let document = { id: snapshots.id, ...snapshots.data() };
//     document.role = await getDoc(document.role.path);
//     document.status = await getDoc(document.status.path);
//     users.push(document);
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

//   var document = {
//     id: snapshot.id,
//     ...snapshot.data(),
//   };
//   return document;
// };

export const create = async (document) => {
  const docRef = doc(firestore, collectionName, document.id);
  return setDoc(docRef, document);
};

// const createDefault = async (id) => {
//   let document = { id: id };
//   const docRoleRef = doc(auth, "roles", 0);
//   const docStatusRef = doc(auth, "statuses", 0);
//   document.role = docRoleRef;
//   document.status = docStatusRef;
//   return create(document);
// };

export const update = async (document) => {
  const docRef = doc(firestore, collectionName, document.id);
  const result = await setDoc(docRef, document);
  return result;
};

export const remove = async (document) => {
  const docRef = doc(firestore, collectionName, document.id);
  return await deleteDoc(docRef, document);
};
