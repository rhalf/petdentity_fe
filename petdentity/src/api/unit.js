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

const search = async (searchName, columnName, orderDirection, limitNumber) => {
  const collectionRef = collection(firestore, collectionName);
  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    startAt(searchName),
    endAt(searchName + "\uf8ff"),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

const next = async (lastVisible, columnName, orderDirection, limitNumber) => {
  const collectionRef = collection(firestore, collectionName);

  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    startAfter(lastVisible),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

const prev = async (firstVisible, columnName, orderDirection, limitNumber) => {
  const collectionRef = collection(firestore, collectionName);
  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    endBefore(firstVisible),
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

const create = async (document) => {
  document.createdAt = toUtcTimestamp(new Date());
  const collectionRef = collection(firestore, collectionName);
  return await addDoc(collectionRef, document);
};

const update = async (document) => {
  const documentRef = doc(firestore, collectionName, document.id);
  return await setDoc(documentRef, document);
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
