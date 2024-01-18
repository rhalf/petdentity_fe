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

import { toObject, toArray, getIndexes } from "../indexes";

const collectionName = "units";
const collectionRef = collection(firestore, collectionName);

let indexes;

export const search = async (government, params) => {
  const { id } = government;
  const { searchText, columnName, orderDirection, limitNumber } = params;
  const q = await query(
    collectionRef,
    where("government", "==", id),
    orderBy(columnName, orderDirection),
    startAt(searchText),
    endAt(searchText + "\uf8ff"),
    limit(limitNumber)
  );

  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const more = async (government, params) => {
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

// export const prev = async (government, params) => {
//   const { id } = government;
//   const { columnName, orderDirection, limitNumber } = params;
//   const q = await query(
//     collectionRef,
//     where("government", "==", id),
//     orderBy(columnName, orderDirection),
//     endBefore(indexes.firstItem),
//     limitToLast(limitNumber)
//   );
//   const snapshots = await getDocs(q);
//   if (!snapshots.empty) indexes = getIndexes(snapshots);
//   return toArray(snapshots);
// };

export const all = async (uid) => {
  const q = await query(collectionRef, where("government", "==", uid));
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const add = async (government, unit) => {
  const { id: governmentId } = government;

  unit.updatedAt = Timestamp.fromDate(new Date());
  unit.government = governmentId;
  const documentRef = doc(firestore, collectionName, unit.id);
  return await setDoc(documentRef, unit);
};

export const remove = async (item) => {
  item.updatedAt = Timestamp.fromDate(new Date());
  item.government = null;
  const documentRef = doc(firestore, collectionName, item.id);
  return await setDoc(documentRef, item);
};

export const count = async (government) => {
  const { id } = government;
  const q = query(collectionRef, where("government", "==", id));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

export const byGovernmentAndUnit = async (government, unitUid) => {
  const { id: governmentId } = government;
  const q = await query(
    collectionRef,
    where("government", "==", governmentId),
    where("uid", "==", unitUid),
    limit(1)
  );
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

export const unitsByGovernment = async (government) => {
  const { id } = government;

  const q = await query(collectionRef, where("government", "==", id));
  const snapshots = await getDocs(q);

  if (!snapshots.empty) return toArray(snapshots);
  else return [];
};
