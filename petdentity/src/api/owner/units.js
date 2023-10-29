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
  writeBatch,
} from "firebase/firestore";

import { toObject, toArray, getIndexes } from "../indexes";

import { getCurrentUser } from "@/utils/firebase";

const collectionName = "units";
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

export const all = async () => {
  const { uid } = await getCurrentUser();
  const q = await query(collectionRef, where("owner", "==", uid));
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const remove = async (user, item) => {
  item.updatedAt = Timestamp.fromDate(new Date());
  item.owner = null;
  const documentRef = doc(firestore, collectionName, item.id);
  return await setDoc(documentRef, item);
};

export const count = async (user) => {
  const { id } = user;
  const q = query(collectionRef, where("owner", "==", id));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

export const getAndId = async (unitId) => {
  const { uid } = await getCurrentUser();

  const q = await query(
    collectionRef,
    where("owner", "==", uid),
    where("uid", "==", unitId),
    limit(1)
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};
