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

import { getCurrentUser } from "@/utils/firebase";

const collectionName = "pets";
const collectionRef = collection(firestore, collectionName);

let indexes;

export const search = async ({
  searchText,
  columnName,
  orderDirection,
  limitNumber,
}) => {
  const { uid } = await getCurrentUser();
  const q = await query(
    collectionRef,
    where("owner", "==", uid),
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

export const next = async ({ columnName, orderDirection, limitNumber }) => {
  const { uid } = await getCurrentUser();
  const q = await query(
    collectionRef,
    where("owner", "==", uid),
    orderBy(columnName, orderDirection),
    startAfter(indexes.lastItem),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (snapshots.empty) throw new Error("Last page!");

  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const prev = async ({ columnName, orderDirection, limitNumber }) => {
  const { uid } = await getCurrentUser();
  const q = await query(
    collectionRef,
    where("owner", "==", uid),
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
  const documentRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(documentRef);
  return toObject(snapshot);
};

export const create = async (document) => {
  const { uid } = await getCurrentUser();
  document.createdAt = Timestamp.fromDate(new Date());
  document.owner = uid;
  return await addDoc(collectionRef, document);
};

export const update = async (document) => {
  document.updateAt = Timestamp.fromDate(new Date());
  const documentRef = doc(firestore, collectionName, document.id);
  return await setDoc(documentRef, document);
};

export const remove = async (document) => {
  const documentRef = doc(firestore, collectionName, document.id);
  return await deleteDoc(documentRef);
};

export const count = async () => {
  const snapshot = await getCountFromServer(collectionRef);
  return snapshot.data().count;
};

export const countByOwner = async () => {
  const { uid } = await getCurrentUser();
  const q = query(collectionRef, where("owner", "==", uid));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};
