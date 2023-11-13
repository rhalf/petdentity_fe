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

const collectionName = "governments";
const collectionRef = collection(firestore, collectionName);

const userCollectionName = "users";
const userCollectionRef = collection(firestore, userCollectionName);

let indexes;

export const search = async (government, params) => {
  const { searchText, columnName, orderDirection, limitNumber } = params;
  const users = await list(government);
  const userList = users.map((user) => user.id);

  const q = await query(
    userCollectionRef,
    where("id", "in", userList),
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
  const users = await list(government);
  const userList = users.map((user) => user.id);

  const { columnName, orderDirection, limitNumber } = params;
  const q = await query(
    userCollectionRef,
    where("id", "in", userList),
    orderBy(columnName, orderDirection),
    startAfter(indexes.lastItem),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const prev = async (government, params) => {
  const users = await list(government);
  const userList = users.map((user) => user.id);
  const { columnName, orderDirection, limitNumber } = params;
  const q = await query(
    userCollectionRef,
    where("id", "in", userList),
    orderBy(columnName, orderDirection),
    endBefore(indexes.firstItem),
    limitToLast(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const add = async (government, user) => {
  const { id } = government;
  const { id: userId } = user;

  const item = {};
  item.createdAt = Timestamp.fromDate(new Date());

  const usersCollection = collectionName + "/" + id + "/users/";

  const documentRef = doc(firestore, usersCollection, userId);

  return await setDoc(documentRef, item);
};

export const remove = async (government, user) => {
  const { id } = government;
  const { id: userId } = user;

  const usersCollection = collectionName + "/" + id + "/users/";

  const docRef = doc(firestore, usersCollection, userId);
  return await deleteDoc(docRef);
};

export const count = async (government) => {
  const { id } = government;

  const usersCollection = collectionName + "/" + id + "/users/";

  const q = query(collection(firestore, usersCollection));

  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

export const list = async (government) => {
  const { id } = government;

  const usersCollection = collection(
    firestore,
    collectionName + "/" + id + "/users/"
  );

  const q = await query(usersCollection);
  const snapshots = await getDocs(q);

  if (!snapshots.empty) return toArray(snapshots);
  else return [];
};

export const get = async (government, user) => {
  const { id: governmentId } = government;
  const { id: userId } = user;

  const refName = collectionName + "/" + governmentId + "/users/";

  const docRef = doc(firestore, refName, userId);

  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() };
  else return null;
};
