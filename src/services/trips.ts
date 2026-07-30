import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase"; // Change this path if your firebase file is elsewhere

export type TripStatus = "draft" | "published" | "archived";

export interface Trip {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  duration: string;
  difficulty: string;
  season: string;
  image: string;
  status: TripStatus;

  createdAt?: unknown;
  updatedAt?: unknown;
}

/**
 * Fetch all published trips
 * Used by the public website.
 */
export async function getPublishedTrips(): Promise<Trip[]> {
  const q = query(
    collection(db, "trips"),
    where("status", "==", "published")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Trip, "id">),
  }));
}

/**
 * Fetch all trips
 * Used in Admin Dashboard.
 */
export async function getAllTrips(): Promise<Trip[]> {
  const snapshot = await getDocs(collection(db, "trips"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Trip, "id">),
  }));
}

/**
 * Fetch one trip by ID
 */
export async function getTripById(id: string): Promise<Trip | null> {
  const tripRef = doc(db, "trips", id);

  const snapshot = await getDoc(tripRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<Trip, "id">),
  };
}

/**
 * Create Trip
 */
export async function createTrip(
  trip: Omit<Trip, "id" | "createdAt" | "updatedAt">
) {
  return addDoc(collection(db, "trips"), {
    ...trip,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Update Trip
 */
export async function updateTrip(
  id: string,
  data: Partial<Trip>
) {
  const tripRef = doc(db, "trips", id);

  return updateDoc(tripRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Publish Trip
 */
export async function publishTrip(id: string) {
  return updateTrip(id, {
    status: "published",
  });
}

/**
 * Move Trip to Draft
 */
export async function draftTrip(id: string) {
  return updateTrip(id, {
    status: "draft",
  });
}

/**
 * Archive Trip
 */
export async function archiveTrip(id: string) {
  return updateTrip(id, {
    status: "archived",
  });
}

/**
 * Permanently Delete Trip
 */
export async function deleteTrip(id: string) {
  return deleteDoc(doc(db, "trips", id));
}
