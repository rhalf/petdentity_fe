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

import { toObject, toArray, getIndexes } from "../indexes";

const collectionName = "governments";
const collectionRef = collection(firestore, collectionName);

let indexes;

export const search = async (params) => {
  const { searchText, columnName, orderDirection, limitNumber } = params;
  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    startAt(searchText),
    endAt(searchText + "\uf8ff"),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const more = async (params) => {
  const { columnName, orderDirection, limitNumber } = params;
  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    startAfter(indexes.lastItem),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);
  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const all = async (params) => {
  const { columnName, orderDirection } = params;
  const q = await query(collectionRef, orderBy(columnName, orderDirection));
  const snapshots = await getDocs(q);
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
  return await addDoc(collectionRef, item);
};

export const update = async (item) => {
  item.updatedAt = Timestamp.fromDate(new Date());
  const documentRef = doc(firestore, collectionName, item.id);
  return await setDoc(documentRef, item);
};

export const remove = async (item) => {
  const documentRef = doc(firestore, collectionName, item.id);
  return await deleteDoc(documentRef);
};

export const count = async () => {
  const q = query(collectionRef);
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};
