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

const collectionName = "vaccines";
const collectionRef = collection(firestore, collectionName);

let indexes;

export const search = async (
  id,
  { searchText, columnName, orderDirection, limitNumber }
) => {
  const q = await query(
    collectionRef,
    where("pet", "==", id),
    orderBy(columnName, orderDirection),
    startAt(searchText),
    endAt(searchText + "\uf8ff"),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (snapshots.empty) throw new Error("Emtpy page!");

  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const next = async (id, { columnName, orderDirection, limitNumber }) => {
  const q = await query(
    collectionRef,
    where("pet", "==", id),
    orderBy(columnName, orderDirection),
    startAfter(indexes.lastItem),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (snapshots.empty) throw new Error("Last page!");

  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const prev = async (id, { columnName, orderDirection, limitNumber }) => {
  const q = await query(
    collectionRef,
    where("pet", "==", id),
    orderBy(columnName, orderDirection),
    endBefore(indexes.firstItem),
    limitToLast(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (snapshots.empty) throw new Error("First page!");

  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const getAll = async (id, { columnName, orderDirection }) => {
  const q = await query(
    collectionRef,
    where("pet", "==", id),
    orderBy(columnName, orderDirection)
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
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

//Pet
export const getAllByPet = async (id, param) => {
  const q = await query(
    collectionRef,
    where("pet", "==", id),
    orderBy(param.columnName, param.orderDirection),
    startAt(param.searchText),
    endAt(param.searchText + "\uf8ff"),
    limit(param.limitNumber)
  );
  const snapshots = await getDocs(q);

  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const getAllByPetNext = async (id, param) => {
  const q = await query(
    collectionRef,
    where("pet", "==", id),
    orderBy(param.columnName, param.orderDirection),
    startAfter(indexes.lastItem),
    limit(param.limitNumber)
  );
  const snapshots = await getDocs(q);
  if (snapshots.empty) throw new Error("Last page!");

  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const getAllByPetPrev = async (id, param) => {
  const q = await query(
    collectionRef,
    where("pet", "==", id),
    orderBy(param.columnName, param.orderDirection),
    endBefore(indexes.firstItem),
    limitToLast(param.limitNumber)
  );
  const snapshots = await getDocs(q);
  if (snapshots.empty) throw new Error("First page!");

  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const countByPet = async (id) => {
  const q = query(collectionRef, where("pet", "==", id));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};
