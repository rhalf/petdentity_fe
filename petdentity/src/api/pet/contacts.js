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

const collectionName = "pet-contacts";
const collectionRef = collection(firestore, collectionName);

let indexes;

export const search = async (pet, params) => {
  const { id } = pet;
  const { searchText, columnName, orderDirection, limitNumber } = params;
  const q = await query(
    collectionRef,
    where("pet", "==", id),
    orderBy(columnName, orderDirection),
    startAt(searchText),
    endAt(searchText + "\uf8ff"),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);

  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const more = async (pet, params) => {
  const { id } = pet;
  const { columnName, orderDirection, limitNumber } = params;
  const q = await query(
    collectionRef,
    where("pet", "==", id),
    orderBy(columnName, orderDirection),
    startAfter(indexes.lastItem),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const create = async (pet, item) => {
  const { id } = pet;
  item.pet = id;
  item.updatedAt = Timestamp.fromDate(new Date());
  return await addDoc(collectionRef, item);
};

export const remove = async (item) => {
  // const { id } = pet;
  // item.pet = null;
  // item.updatedAt = Timestamp.fromDate(new Date());
  const documentRef = doc(firestore, collectionName, item.id);
  return await deleteDoc(documentRef, item);
};
