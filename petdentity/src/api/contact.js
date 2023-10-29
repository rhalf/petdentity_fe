// import { firestore } from "@/plugins/firebase";
// import { Timestamp } from "firebase/firestore";
// import {
//   collection,
//   getDocs,
//   getDoc,
//   setDoc,
//   addDoc,
//   deleteDoc,
//   doc,
//   query,
//   where,
//   orderBy,
//   limit,
//   startAt,
//   startAfter,
//   endAt,
//   endBefore,
//   limitToLast,
//   getCountFromServer,
// } from "firebase/firestore";

// import { toObject, toArray, getIndexes } from "./indexes";

// import { getCurrentUser } from "@/utils/firebase";

// const collectionName = "contacts";
// const collectionRef = collection(firestore, collectionName);

// let indexes;

// export const search = async (params) => {
//   const { searchText, columnName, orderDirection, limitNumber } = params;
//   const { uid } = await getCurrentUser();

//   const q = await query(
//     collectionRef,
//     where("owner", "==", uid),
//     orderBy(columnName, orderDirection),
//     startAt(searchText),
//     endAt(searchText + "\uf8ff"),
//     limit(limitNumber)
//   );
//   const snapshots = await getDocs(q);
//   if (snapshots.empty) throw new Error("Empty page!");

//   indexes = getIndexes(snapshots);
//   return toArray(snapshots);
// };

// export const next = async (params) => {
//   const { columnName, orderDirection, limitNumber } = params;
//   const { uid } = await getCurrentUser();
//   const q = await query(
//     collectionRef,
//     where("owner", "==", uid),
//     orderBy(columnName, orderDirection),
//     startAfter(indexes.lastItem),
//     limit(limitNumber)
//   );
//   const snapshots = await getDocs(q);
//   if (snapshots.empty) throw new Error("Last page!");

//   indexes = getIndexes(snapshots);
//   return toArray(snapshots);
// };

// export const prev = async (params) => {
//   const { columnName, orderDirection, limitNumber } = params;
//   const { uid } = await getCurrentUser();
//   const q = await query(
//     collectionRef,
//     where("owner", "==", uid),
//     orderBy(columnName, orderDirection),
//     endBefore(indexes.firstItem),
//     limitToLast(limitNumber)
//   );
//   const snapshots = await getDocs(q);
//   if (snapshots.empty) throw new Error("First page!");

//   indexes = getIndexes(snapshots);
//   return toArray(snapshots);
// };

// export const all = async ({ columnName, orderDirection }) => {
//   const { uid } = await getCurrentUser();
//   const q = await query(
//     collectionRef,
//     where("owner", "==", uid),
//     orderBy(columnName, orderDirection)
//   );
//   const snapshots = await getDocs(q);
//   return toArray(snapshots);
// };

// export const create = async (item) => {
//   const { uid } = await getCurrentUser();
//   item.owner = uid;
//   item.createdAt = Timestamp.fromDate(new Date());
//   return await addDoc(collectionRef, item);
// };

// export const createForContact = async (id, item) => {
//   item.createdAt = Timestamp.fromDate(new Date());
//   item.contact = id;
//   return await addDoc(collectionRef, item);
// };

// export const update = async (item) => {
//   item.updatedAt = Timestamp.fromDate(new Date());
//   const documentRef = doc(firestore, collectionName, item.id);
//   return await setDoc(documentRef, item);
// };

// export const remove = async (item) => {
//   const documentRef = doc(firestore, collectionName, item.id);
//   return await deleteDoc(documentRef);
// };

// export const count = async (user) => {
//   const { id } = user;
//   const q = query(collectionRef, where("owner", "==", id));
//   const snapshot = await getCountFromServer(q);
//   return snapshot.data().count;
// };

// //Pet
// export const getAllByPet = async ({ id }, param) => {
//   const q = await query(
//     collectionRef,
//     where("pet", "==", id),
//     orderBy(param.columnName, param.orderDirection),
//     startAt(param.searchText),
//     endAt(param.searchText + "\uf8ff"),
//     limit(param.limitNumber)
//   );
//   const snapshots = await getDocs(q);

//   indexes = getIndexes(snapshots);
//   return toArray(snapshots);
// };

// export const getAllByPetNext = async ({ id }, param) => {
//   const q = await query(
//     collectionRef,
//     where("pet", "==", id),
//     orderBy(param.columnName, param.orderDirection),
//     startAfter(indexes.lastItem),
//     limit(param.limitNumber)
//   );
//   const snapshots = await getDocs(q);
//   if (snapshots.empty) throw new Error("Last page!");

//   indexes = getIndexes(snapshots);
//   return toArray(snapshots);
// };

// export const getAllByPetPrev = async ({ id }, param) => {
//   const q = await query(
//     collectionRef,
//     where("pet", "==", id),
//     orderBy(param.columnName, param.orderDirection),
//     endBefore(indexes.firstItem),
//     limitToLast(param.limitNumber)
//   );
//   const snapshots = await getDocs(q);
//   if (snapshots.empty) throw new Error("First page!");

//   indexes = getIndexes(snapshots);
//   return toArray(snapshots);
// };

// export const addContactToPet = async (pet, item) => {
//   item.pet = pet.id;
//   item.updatedAt = Timestamp.fromDate(new Date());
//   const documentRef = doc(firestore, collectionName, item.id);
//   return await setDoc(documentRef, item);
// };

// export const removeContactFromPet = async (item) => {
//   item.pet = null;
//   item.updatedAt = Timestamp.fromDate(new Date());
//   const documentRef = doc(firestore, collectionName, item.id);
//   return await setDoc(documentRef, item);
// };
