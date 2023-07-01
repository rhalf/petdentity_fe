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

const search = async ({
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

const next = async ({ lastItem, columnName, orderDirection, limitNumber }) => {
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

const prev = async ({ firstItem, columnName, orderDirection, limitNumber }) => {
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

const get = async (id) => {
  const documentRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(documentRef);
  return toObject(snapshot);
};

const create = async (item) => {
  item.createdAt = toUtcTimestamp(new Date());
  const collectionRef = collection(firestore, collectionName);
  return await addDoc(collectionRef, item);
};

const update = async (item) => {
  item.updatedAt = toUtcTimestamp(new Date());
  const documentRef = doc(firestore, collectionName, item.id);
  return await setDoc(documentRef, item);
};

const remove = async (id) => {
  const documentRef = doc(firestore, collectionName, id);
  return await deleteDoc(documentRef);
};

const count = async () => {
  const collectionRef = collection(firestore, collectionName);
  const snapshot = await getCountFromServer(collectionRef);
  return snapshot.data().count;
};

export { count, search, next, prev, get, create, update, remove };
