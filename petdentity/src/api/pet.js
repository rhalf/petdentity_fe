import { firestore } from "@/plugins/firebase";
import { Timestamp } from "firebase/firestore";
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

import { toObject, toArray, getIndexes } from "./indexes";

const collectionName = "pets";
const collectionRef = collection(firestore, collectionName);

let indexes;

// export const search = async (user, params) => {
//   const { id } = user;
//   const { searchText, columnName, orderDirection, limitNumber } = params;

//   const q = await query(
//     collectionRef,
//     where("owner", "==", id),
//     orderBy(columnName, orderDirection),
//     startAt(searchText),
//     endAt(searchText + "\uf8ff"),
//     limit(limitNumber)
//   );
//   const snapshots = await getDocs(q);
//   if (snapshots.empty) throw new Error("Empty page!");

//   indexes = getIndexes(snapshots);
//   return toArray(snapshots);
// };

// export const next = async ({ columnName, orderDirection, limitNumber }) => {
//   const { uid } = await getCurrentUser();
//   const q = await query(
//     collectionRef,
//     where("owner", "==", uid),
//     orderBy(columnName, orderDirection),
//     startAfter(indexes.lastItem),
//     limit(limitNumber)
//   );
//   const snapshots = await getDocs(q);
//   if (snapshots.empty) throw new Error("Last page!");

//   indexes = getIndexes(snapshots);
//   return toArray(snapshots);
// };

// export const prev = async ({ columnName, orderDirection, limitNumber }) => {
//   const { uid } = await getCurrentUser();
//   const q = await query(
//     collectionRef,
//     where("owner", "==", uid),
//     orderBy(columnName, orderDirection),
//     endBefore(indexes.firstItem),
//     limitToLast(limitNumber)
//   );

//   const snapshots = await getDocs(q);
//   if (snapshots.empty) throw new Error("First page!");

//   indexes = getIndexes(snapshots);
//   return toArray(snapshots);
// };

export const get = async (id) => {
  const documentRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(documentRef);
  return toObject(snapshot);
};

export const update = async (item) => {
  item.updateAt = Timestamp.fromDate(new Date());
  const documentRef = doc(firestore, collectionName, item.id);
  return await setDoc(documentRef, item);
};

export const remove = async (item) => {
  const documentRef = doc(firestore, collectionName, item.id);
  return await deleteDoc(documentRef);
};

// export const create = async (item) => {
//   const { uid } = await getCurrentUser();
//   item.createdAt = Timestamp.fromDate(new Date());
//   item.owner = uid;
//   return await addDoc(collectionRef, item);
// };

// export const count = async () => {
//   const snapshot = await getCountFromServer(collectionRef);
//   return snapshot.data().count;
// };

// // export const countByOwner = async () => {
// //   const { uid } = await getCurrentUser();
// //   const q = query(collectionRef, where("owner", "==", uid));
// //   const snapshot = await getCountFromServer(q);
// //   return snapshot.data().count;
// // };
