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
  documentId,
} from "firebase/firestore";

import { toObject, toArray, getIndexes } from "../indexes";

import { getCurrentUser } from "@/utils/firebase";
import { unitsByGovernment } from "./units";

const collectionName = "pets";
const collectionRef = collection(firestore, collectionName);

let indexes;

export const search = async (government, params) => {
  const units = await unitsByGovernment(government);
  const petList = units.map((unit) => {
    if (!unit.pet) return null;
    return unit.pet;
  });

  const { searchText, columnName, orderDirection, limitNumber } = params;

  const q = await query(
    collectionRef,
    where("id", "in", petList),
    orderBy(columnName, orderDirection),
    startAt(searchText),
    endAt(searchText + "\uf8ff"),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const next = async (government, params) => {
  const { id } = government;
  const { columnName, orderDirection, limitNumber } = params;

  const q = await query(
    collectionRef,
    where("government", "==", id),
    orderBy(columnName, orderDirection),
    startAfter(indexes.lastItem),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const prev = async (government, params) => {
  const { id } = government;
  const { columnName, orderDirection, limitNumber } = params;

  const q = await query(
    collectionRef,
    where("government", "==", id),
    orderBy(columnName, orderDirection),
    endBefore(indexes.firstItem),
    limitToLast(limitNumber)
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

export const create = async (item) => {
  const { uid } = await getCurrentUser();
  item.createdAt = Timestamp.fromDate(new Date());
  item.owner = uid;
  return await addDoc(collectionRef, item);
};

export const update = async (item) => {
  item.updateAt = Timestamp.fromDate(new Date());
  const documentRef = doc(firestore, collectionName, item.id);
  return await setDoc(documentRef, item);
};

export const remove = async (item) => {
  const documentRef = doc(firestore, collectionName, item.id);
  return await deleteDoc(documentRef);
};

export const count = async (government) => {
  const units = await unitsByGovernment(government);

  const petList = units.map((unit) => {
    if (!unit.pet) return null;
    return unit.pet;
  });

  if (!petList.length) return 0;

  const q = await query(collectionRef, where("id", "in", petList));

  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};
