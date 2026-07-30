import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface ItineraryDay {
  id?: string;
  day: number;
  title: string;
  description: string;
  image: string;
}

export async function getItinerary(tripId: string) {
  const q = query(
    collection(db, "trips", tripId, "itinerary"),
    orderBy("day")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ItineraryDay[];
}

export async function addItineraryDay(
  tripId: string,
  data: Omit<ItineraryDay, "id">
) {
  await addDoc(
    collection(db, "trips", tripId, "itinerary"),
    data
  );
}

export async function updateItineraryDay(
  tripId: string,
  dayId: string,
  data: Partial<ItineraryDay>
) {
  await updateDoc(
    doc(db, "trips", tripId, "itinerary", dayId),
    data
  );
}

export async function deleteItineraryDay(
  tripId: string,
  dayId: string
) {
  await deleteDoc(
    doc(db, "trips", tripId, "itinerary", dayId)
  );
}
