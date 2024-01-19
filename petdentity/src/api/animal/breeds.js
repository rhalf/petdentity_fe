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

const collectionName = "breeds";
const collectionRef = collection(firestore, collectionName);

let indexes;

export const search = async (animal, params) => {
  const { id } = animal;
  const { searchText, columnName, orderDirection, limitNumber } = params;
  const q = await query(
    collectionRef,
    where("animal", "==", id),
    orderBy(columnName, orderDirection),
    startAt(searchText),
    endAt(searchText + "\uf8ff"),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const more = async (animal, params) => {
  const { id } = animal;
  const { columnName, orderDirection, limitNumber } = params;
  const q = await query(
    collectionRef,
    where("animal", "==", id),
    orderBy(columnName, orderDirection),
    startAfter(indexes.lastItem),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const get = async (id) => {
  const documentRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(documentRef);
  return toObject(snapshot);
};

export const all = async (animal) => {
  const { id } = animal;
  const q = await query(
    collectionRef,
    where("animal", "==", id),
    orderBy("name", "asc")
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

export const create = async (animal, item) => {
  item.animal = animal.id;
  item.createdAt = Timestamp.fromDate(new Date());
  return await addDoc(collectionRef, item);
};

export const update = async (animal, item) => {
  item.animal = animal.id;
  item.updatedAt = Timestamp.fromDate(new Date());
  const documentRef = doc(firestore, collectionName, item.id);
  return await setDoc(documentRef, item);
};

export const remove = async (animal, item) => {
  const documentRef = doc(firestore, collectionName, item.id);
  return await deleteDoc(documentRef);
};

export const count = async (animal) => {
  const { id } = animal;
  const q = await query(collectionRef, where("animal", "==", id));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};
