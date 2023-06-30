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
  startAfter,
  startAt,
  limit,
  limitToLast,
  endAt,
} from "firebase/firestore";

import { toUtcTimestamp } from "@/utils/vue";
import { toObject, toArray } from "./index";

const collectionName = "users";

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

// const getAll = async () => {
//   const users = [];
//   const collectionRef = collection(firestore, collectionName);
//   const snapshots = await getDocs(collectionRef);
//   snapshots.forEach(async (snapshots) => {
//     let user = { uid: snapshots.uid, ...snapshots.data() };
//     user.role = await getDoc(user.role.path);
//     user.status = await getDoc(user.status.path);
//     users.push(user);
//   });
//   return users;
// };

const get = async (uid) => {
  const docRef = doc(firestore, collectionName, uid);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) return { uid: snapshot.uid, ...snapshot.data() };
  else return null;
};

const getByUid = async (uid) => {
  const colRef = collection(firestore, collectionName);

  const q = await query(colRef, where("uid", "==", uid));
  const snapshots = await getDocs(q);

  if (snapshots.empty) return null;

  var snapshot = snapshots.docs[0];

  var user = {
    uid: snapshot.uid,
    ...snapshot.data(),
  };
  return user;
};

const create = async (uid, data) => {
  const user = {
    uid: uid,
    ...data,
  };
  const docRef = doc(firestore, collectionName, uid);
  return setDoc(docRef, user);
};

// const createDefault = async (uid) => {
//   let user = { uid: uid };
//   const docRoleRef = doc(auth, "roles", 0);
//   const docStatusRef = doc(auth, "statuses", 0);
//   user.role = docRoleRef;
//   user.status = docStatusRef;
//   return create(user);
// };

const update = async (user) => {
  const docRef = doc(firestore, collectionName, user.uid);
  const result = await setDoc(docRef, user);
  return result;
};

const remove = async (user) => {
  const docRef = doc(firestore, collectionName, user.uid);
  return await deleteDoc(docRef, user);
};

export { search, next, prev, get, getByUid, create, update, remove };
