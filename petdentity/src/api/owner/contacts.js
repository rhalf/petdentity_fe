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

import { getCurrentUser } from "@/utils/firebase";

const collectionName = "contacts";
const collectionRef = collection(firestore, collectionName);

let indexes;

export const search = async (user, params) => {
  const { id } = user;
  const { searchText, columnName, orderDirection, limitNumber } = params;

  const q = await query(
    collectionRef,
    where("owner", "==", id),
    orderBy(columnName, orderDirection),
    startAt(searchText),
    endAt(searchText + "\uf8ff"),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const next = async (user, params) => {
  const { id } = user;
  const { columnName, orderDirection, limitNumber } = params;

  const q = await query(
    collectionRef,
    where("owner", "==", id),
    orderBy(columnName, orderDirection),
    startAfter(indexes.lastItem),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const prev = async (user, params) => {
  const { id } = user;
  const { columnName, orderDirection, limitNumber } = params;

  const q = await query(
    collectionRef,
    where("owner", "==", id),
    orderBy(columnName, orderDirection),
    endBefore(indexes.firstItem),
    limitToLast(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const all = async (user, params) => {
  const { id } = user;
  const { columnName, orderDirection } = params;
  const q = await query(
    collectionRef,
    where("owner", "==", id),
    orderBy(columnName, orderDirection)
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

export const create = async (user, item) => {
  const { id } = user;
  item.owner = id;
  item.createdAt = Timestamp.fromDate(new Date());
  return await addDoc(collectionRef, item);
};

export const createForContact = async (id, item) => {
  item.createdAt = Timestamp.fromDate(new Date());
  item.contact = id;
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

export const count = async (user) => {
  const { id } = user;
  const q = query(collectionRef, where("owner", "==", id));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};
