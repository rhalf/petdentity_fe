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

import { getCurrentUser } from "@/utils/firebase";

const collectionName = "governments";

// const collectionRef = collection(firestore, collectionName);

// let indexes;

// like
export const like = async (government) => {
  const { id } = government;
  const { uid } = await getCurrentUser();

  const item = {};
  item.createdAt = Timestamp.fromDate(new Date());

  const likeRef = collectionName + "/" + id + "/likes/";

  const documentRef = doc(firestore, likeRef, uid);

  return await setDoc(documentRef, item);
};

export const unlike = async (government) => {
  const { id } = government;
  const { uid } = await getCurrentUser();

  const item = {};
  item.createdAt = Timestamp.fromDate(new Date());

  const likeRef = collectionName + "/" + id + "/likes/";

  const documentRef = doc(firestore, likeRef, uid);

  return await deleteDoc(documentRef);
};

export const isLike = async (government) => {
  const { id } = government;
  const { uid } = await getCurrentUser();

  const likeRef = collectionName + "/" + id + "/likes/";

  const documentRef = doc(firestore, likeRef, uid);

  const snapshot = await getDoc(documentRef);

  return snapshot.exists();
};

export const countLikes = async (government) => {
  const { id } = government;

  const likesRef = collection(firestore, collectionName + "/" + id + "/likes");
  const q = query(likesRef);
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};
