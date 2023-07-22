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

const collectionName = "units";
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
  if (snapshots.empty) throw new Error("Emtpy page!");

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

export const getAllByOwner = async () => {
  const { uid } = await getCurrentUser();
  const q = await query(collectionRef, where("owner", "==", uid));
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

export const create = async (item) => {
  item.createdAt = Timestamp.fromDate(new Date());

  return await addDoc(collectionRef, item);
};

export const update = async (item) => {
  document.updatedAt = Timestamp.fromDate(new Date());
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
  const { uid } = await getCurrentUser();
  const q = query(collectionRef, where("owner", "==", uid));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};
