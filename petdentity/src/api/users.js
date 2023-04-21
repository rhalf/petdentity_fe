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
} from "firebase/firestore";

const collectionName = "users";

const getAll = async () => {
  const users = [];
  const collectionRef = collection(firestore, collectionName);
  const snapshots = await getDocs(collectionRef);
  snapshots.forEach(async (snapshots) => {
    let user = { id: snapshots.id, ...snapshots.data() };
    user.role = await getDoc(user.role.path);
    user.status = await getDoc(user.status.path);
    users.push(user);
  });
  return users;
};

const get = async (id) => {
  const docRef = doc(firestore, collectionName, id);
  const snapshots = await getDoc(docRef);

  let user = { id: snapshots.id, ...snapshots.data() };
  user.role = (await getDoc(user.role)).data();
  user.status = (await getDoc(user.status)).data();
  return user;
};

const getByUid = async (uid) => {
  const colRef = collection(firestore, collectionName);

  const q = await query(colRef, where("uid", "==", uid));
  const snapshots = await getDocs(q);

  var snapshot = snapshots.docs[0];
  var user = {
    id: snapshot.id,
    ...snapshot.data(),
  };

  user.role = (await getDoc(user.role)).data();
  user.status = (await getDoc(user.status)).data();
  return user;
};

const create = async (uid, name) => {
  const docRoleRef = doc(firestore, "roles", "dDNB8z8K9qvl9MuEP3Wk");
  const docStatusRef = doc(firestore, "statuses", "hftlETVZoIEVppU33iqv");

  const user = {
    uid: uid,
    name: name,
    role: docRoleRef,
    status: docStatusRef,
  };

  const colRef = collection(firestore, collectionName);
  return addDoc(colRef, user);
};

// const createDefault = async (id) => {
//   let user = { id: id };
//   const docRoleRef = doc(auth, "roles", 0);
//   const docStatusRef = doc(auth, "statuses", 0);
//   user.role = docRoleRef;
//   user.status = docStatusRef;
//   return create(user);
// };

const update = async (user) => {
  const docRef = doc(firestore, collectionName, user.id);
  const result = await setDoc(docRef, user);
  return result;
};

const remove = async (user) => {
  const docRef = doc(firestore, collectionName, user.id);
  return await deleteDoc(docRef, user);
};

export { getAll, get, getByUid, create, update, remove };
