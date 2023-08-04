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

const collectionName = "addresses";
const collectionRef = collection(firestore, collectionName);

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
    // startAt(searchText),
    // endAt(searchText + "\uf8ff"),
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
  const q = await query(
    collectionRef,
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

export const create = async (item) => {
  item.createdAt = Timestamp.fromDate(new Date());
  item.owner = uid;
  return await addDoc(collectionRef, item);
};

export const update = async (item) => {
  document.updatedAt = Timestamp.fromDate(new Date());
  const documentRef = doc(firestore, collectionName, item.id);
  return await setDoc(documentRef, item);
};

export const remove = async (document) => {
  const documentRef = doc(firestore, collectionName, document.id);
  return await deleteDoc(documentRef);
};

export const count = async () => {
  const q = query(collectionRef, where("owner", "==", uid));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};
