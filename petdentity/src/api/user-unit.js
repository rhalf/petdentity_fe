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

const collectionName = "units";

export const search = async (
  id,
  { searchText, columnName, orderDirection, limitNumber }
) => {
  const collectionRef = collection(firestore, collectionName);
  const q = await query(
    collectionRef,
    where("owner", "==", id),
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

export const get = async (id) => {
  const documentRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(documentRef);
  return toObject(snapshot);
};

export const create = async (item) => {
  item.createdAt = toUtcTimestamp(new Date());
  const collectionRef = collection(firestore, collectionName);
  return await addDoc(collectionRef, item);
};

export const update = async (item) => {
  item.updatedAt = toUtcTimestamp(new Date());
  const documentRef = doc(firestore, collectionName, item.id);
  return await setDoc(documentRef, item);
};

export const remove = async (document) => {
  document.owner = null;
  return update(document);
  // const documentRef = doc(firestore, collectionName, document.id);
  // return await deleteDoc(documentRef);
};

export const count = async () => {
  const collectionRef = collection(firestore, collectionName);
  const snapshot = await getCountFromServer(collectionRef);
  return snapshot.data().count;
};
