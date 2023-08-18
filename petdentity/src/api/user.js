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

import { toObject, toArray, getIndexes } from "./index";

const collectionName = "users";
const collectionRef = collection(firestore, collectionName);

let indexes;

export const search = async ({
  searchText,
  columnName,
  orderDirection,
  limitNumber,
}) => {
  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    startAt(searchText),
    endAt(searchText + "\uf8ff"),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (snapshots.empty) throw new Error("Empty page!");

  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const next = async ({
  lastItem,
  columnName,
  orderDirection,
  limitNumber,
}) => {
  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    startAfter(indexes.lastItem),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (snapshots.empty) throw new Error("Last page!");

  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const prev = async ({
  firstItem,
  columnName,
  orderDirection,
  limitNumber,
}) => {
  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    endBefore(indexes.firstItem),
    limitToLast(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (snapshots.empty) throw new Error("First page!");

  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const get = async (id) => {
  const docRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() };
  else return null;
};

export const create = async (item) => {
  item.createdAt = Timestamp.fromDate(new Date());
  const docRef = doc(firestore, collectionName, item.id);
  return setDoc(docRef, item);
};

export const update = async (item) => {
  item.updatedAt = Timestamp.fromDate(new Date());

  // item.birthDate = Timestamp.fromDate(item.profile.birthDate);

  const docRef = doc(firestore, collectionName, item.id);
  const result = await setDoc(docRef, item);
  return result;
};

export const remove = async (item) => {
  const docRef = doc(firestore, collectionName, item.id);
  return await deleteDoc(docRef, item);
};

export const count = async () => {
  const snapshot = await getCountFromServer(collectionRef);
  return snapshot.data().count;
};
