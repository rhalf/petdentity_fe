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

const collectionName = "breeds";
const collectionRef = collection(firestore, collectionName);

export const search = async (
  id,
  { searchText, columnName, orderDirection, limitNumber }
) => {
  const q = await query(
    collectionRef,
    where("animal", "==", id),
    orderBy(columnName, orderDirection),
    startAt(searchText),
    endAt(searchText + "\uf8ff"),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

export const next = async (
  id,
  { lastItem, columnName, orderDirection, limitNumber }
) => {
  const q = await query(
    collectionRef,
    where("animal", "==", id),
    orderBy(columnName, orderDirection),
    startAfter(lastItem),
    limit(limitNumber)
  );

  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

export const prev = async (
  id,
  { firstItem, columnName, orderDirection, limitNumber }
) => {
  const q = await query(
    collectionRef,
    where("animal", "==", id),
    orderBy(columnName, orderDirection),
    endBefore(firstItem),
    limitToLast(limitNumber)
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

export const get = async (id) => {
  const documentRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(documentRef);
  return toObject(snapshot);
};

export const getAll = async (id) => {
  const q = await query(
    collectionRef,
    where("animal", "==", id),
    orderBy("name", "asc")
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

export const create = async (item) => {
  item.createdAt = toUtcTimestamp(new Date());
  return await addDoc(collectionRef, item);
};

export const update = async (item) => {
  item.updatedAt = toUtcTimestamp(new Date());
  const documentRef = doc(firestore, collectionName, item.id);
  return await setDoc(documentRef, item);
};

export const remove = async (item) => {
  const documentRef = doc(firestore, collectionName, item.id);
  return await deleteDoc(documentRef);
};

export const count = async () => {
  const snapshot = await getCountFromServer(collectionRef);
  return snapshot.data().count;
};
