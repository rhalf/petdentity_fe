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
  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    startAt(searchText),
    endAt(searchText + "\uf8ff"),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const next = async ({ columnName, orderDirection, limitNumber }) => {
  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    startAfter(indexes.lastItem),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const prev = async ({ columnName, orderDirection, limitNumber }) => {
  const q = await query(
    collectionRef,
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

export const getByUid = async (uid) => {
  const q = await query(collectionRef, where("uid", "==", uid));
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

export const create = async (item) => {
  item.createdAt = Timestamp.fromDate(new Date());
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

export const count = async () => {
  const snapshot = await getCountFromServer(collectionRef);
  return snapshot.data().count;
};

//Pet
export const getAllByPet = async (pet, param) => {
  const q = await query(
    collectionRef,
    where("pet", "==", pet.id),
    orderBy(param.columnName, param.orderDirection),
    startAt(param.searchText),
    endAt(param.searchText + "\uf8ff"),
    limit(param.limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const getAllByPetNext = async ({ id }, param) => {
  const q = await query(
    collectionRef,
    where("pet", "==", id),
    orderBy(param.columnName, param.orderDirection),
    startAfter(indexes.lastItem),
    limit(param.limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const getAllByPetPrev = async ({ id }, param) => {
  const q = await query(
    collectionRef,
    where("pet", "==", id),
    orderBy(param.columnName, param.orderDirection),
    endBefore(indexes.firstItem),
    limitToLast(param.limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const addUnitToPet = async (pet, item) => {
  item.pet = pet.id;
  item.updatedAt = Timestamp.fromDate(new Date());
  const documentRef = doc(firestore, collectionName, item.id);
  return await setDoc(documentRef, item);
};

export const removeUnitFromPet = async (item) => {
  item.pet = null;
  item.updatedAt = Timestamp.fromDate(new Date());
  const documentRef = doc(firestore, collectionName, item.id);
  return await setDoc(documentRef, item);
};
//owner
export const searchByOwner = async ({
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
  if (!snapshots.empty) indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const nextByOwner = async ({
  columnName,
  orderDirection,
  limitNumber,
}) => {
  const { uid } = await getCurrentUser();
  const q = await query(
    collectionRef,
    where("owner", "==", uid),
    orderBy(columnName, orderDirection),
    startAfter(indexes.lastItem),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const prevByOwner = async ({
  columnName,
  orderDirection,
  limitNumber,
}) => {
  const { uid } = await getCurrentUser();
  const q = await query(
    collectionRef,
    where("owner", "==", uid),
    orderBy(columnName, orderDirection),
    endBefore(indexes.firstItem),
    limitToLast(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const getAllByOwner = async () => {
  const { uid } = await getCurrentUser();
  const q = await query(collectionRef, where("owner", "==", uid));
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const removeOwner = async (item) => {
  item.updatedAt = Timestamp.fromDate(new Date());
  item.owner = null;
  const documentRef = doc(firestore, collectionName, item.id);
  return await setDoc(documentRef, item);
};

export const countByOwner = async () => {
  const { uid } = await getCurrentUser();
  const q = query(collectionRef, where("owner", "==", uid));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

//Owner
export const getByOwnerAndId = async (id) => {
  const { uid } = await getCurrentUser();

  const q = await query(
    collectionRef,
    where("owner", "==", uid),
    where("uid", "==", id),
    limit(1)
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

//BatchAdd
export const batchAdd = async (items) => {
  var batch = writeBatch(firestore);

  items.forEach((item) => {
    const documentRef = doc(collectionRef);
    batch.set(documentRef, item);
  });

  return await batch.commit();
};
