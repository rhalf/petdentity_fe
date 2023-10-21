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

const petCollectionName = "pets";
const petCollectionRef = collection(firestore, petCollectionName);

let indexes;

export const search = async (government, params) => {
  const units = await unitsByGovernment(government);
  const petList = units.map((unit) => unit.pet);

  const { searchText, columnName, orderDirection, limitNumber } = params;

  const q = await query(
    petCollectionRef,
    where("id", "in", petList),
    orderBy(columnName, orderDirection),
    startAt(searchText),
    endAt(searchText + "\uf8ff"),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (snapshots.empty) throw new Error("Empty page!");

  indexes = getIndexes(snapshots);
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
  if (snapshots.empty) throw new Error("Last page!");

  indexes = getIndexes(snapshots);
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
  if (snapshots.empty) throw new Error("First page!");

  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const get = async (id) => {
  const documentRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(documentRef);
  return toObject(snapshot);
};

export const create = async (document) => {
  const { uid } = await getCurrentUser();
  document.createdAt = Timestamp.fromDate(new Date());
  document.owner = uid;
  return await addDoc(collectionRef, document);
};

export const update = async (document) => {
  document.updateAt = Timestamp.fromDate(new Date());
  const documentRef = doc(firestore, collectionName, document.id);
  return await setDoc(documentRef, document);
};

export const remove = async (document) => {
  const documentRef = doc(firestore, collectionName, document.id);
  return await deleteDoc(documentRef);
};

export const count = async (government) => {
  const units = await unitsByGovernment(government);

  const petList = units.map((unit) => unit.pet);

  const q = await query(petCollectionRef, where("id", "in", petList));

  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};
