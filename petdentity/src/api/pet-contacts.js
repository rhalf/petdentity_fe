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

// const collectionName = "pet-contacts";
// const collectionRef = collection(firestore, collectionName);

// let indexes;

// export const search = async (pet, params) => {
//   const { id } = pet;
//   const { searchText, columnName, orderDirection, limitNumber } = params;
//   const q = await query(
//     collectionRef,
//     where("pet", "==", id),
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

// export const next = async (pet, params) => {
//   const { id } = pet;
//   const { columnName, orderDirection, limitNumber } = params;
//   const q = await query(
//     collectionRef,
//     where("pet", "==", id),
//     orderBy(columnName, orderDirection),
//     startAfter(indexes.lastItem),
//     limit(limitNumber)
//   );
//   const snapshots = await getDocs(q);
//   if (snapshots.empty) throw new Error("Last page!");

//   indexes = getIndexes(snapshots);
//   return toArray(snapshots);
// };

// export const prev = async (pet, params) => {
//   const { id } = pet;
//   const { columnName, orderDirection, limitNumber } = params;
//   const q = await query(
//     collectionRef,
//     where("pet", "==", id),
//     orderBy(columnName, orderDirection),
//     endBefore(indexes.firstItem),
//     limitToLast(limitNumber)
//   );
//   const snapshots = await getDocs(q);
//   if (snapshots.empty) throw new Error("First page!");

//   indexes = getIndexes(snapshots);
//   return toArray(snapshots);
// };

// export const create = async (item) => {
//   item.createdAt = Timestamp.fromDate(new Date());
//   return await addDoc(collectionRef, item);
// };

// export const remove = async ({ id }) => {
//   console.log(id);
//   const documentRef = doc(firestore, collectionName, id);
//   return await deleteDoc(documentRef);
// };

// export const count = async ({ id }) => {
//   const q = query(collectionRef, where("pet", "==", id));
//   const snapshot = await getCountFromServer(q);
//   return snapshot.data().count;
// };
