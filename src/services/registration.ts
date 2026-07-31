import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase";


// -----------------------------
// Registration Field Types
// -----------------------------

export type RegistrationFieldType =
  | "text"
  | "number"
  | "email"
  | "phone"
  | "textarea"
  | "select"
  | "checkbox";


export interface RegistrationField {
  id: string;
  label: string;
  type: RegistrationFieldType;
  required: boolean;
  options?: string[];
}


// -----------------------------
// Trip Registration Form Config
// -----------------------------

export interface TripFormConfig {

  tripId: string;

  fields: RegistrationField[];

  paymentEnabled: boolean;

  advancePercentage: number;

  upiId: string;

  paymentVerificationWhatsApp: string;

  createdAt?: unknown;

  updatedAt?: unknown;
}


// -----------------------------
// Registration Data
// -----------------------------

export type PaymentStatus =
  | "pending"
  | "verified"
  | "rejected";


export interface Registration {

  id: string;

  tripId: string;

  responses: Record<string, unknown>;

  payment: {

    totalAmount: number;

    advanceAmount: number;

    status: PaymentStatus;

  };

  createdAt?: unknown;

  verifiedAt?: unknown;
}



// =================================================
// FORM MANAGEMENT
// =================================================


// Get registration form of a trip

export async function getTripForm(
  tripId: string
): Promise<TripFormConfig | null> {

  const ref = doc(db, "tripForms", tripId);

  const snapshot = await getDoc(ref);


  if (!snapshot.exists()) {
    return null;
  }


  return {
    tripId,
    ...(snapshot.data() as Omit<TripFormConfig, "tripId">),
  };
}



// Create / Update registration form

export async function saveTripForm(
  tripId: string,
  data: Omit<
    TripFormConfig,
    "tripId" | "createdAt" | "updatedAt"
  >
) {

  const ref = doc(db, "tripForms", tripId);


  return setDoc(
    ref,
    {
      ...data,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    {
      merge: true,
    }
  );
}



// Delete registration form

export async function deleteTripForm(
  tripId: string
) {

  return deleteDoc(
    doc(db, "tripForms", tripId)
  );

}



// =================================================
// REGISTRATION MANAGEMENT
// =================================================


// Create user registration

export async function createRegistration(

  tripId: string,

  data: Omit<Registration, "id" | "tripId">

) {

  const registrationsRef = collection(
    db,
    "trips",
    tripId,
    "registrations"
  );


  return addDoc(
    registrationsRef,
    {
      ...data,

      tripId,

      createdAt: serverTimestamp(),

    }
  );

}



// Get all registrations of a trip

export async function getTripRegistrations(

  tripId: string

): Promise<Registration[]> {


  const ref = collection(
    db,
    "trips",
    tripId,
    "registrations"
  );


  const snapshot = await getDocs(ref);



  return snapshot.docs.map((doc) => ({

    id: doc.id,

    ...(doc.data() as Omit<Registration, "id">),

  }));

}



// Update payment status

export async function updatePaymentStatus(

  tripId: string,

  registrationId: string,

  status: PaymentStatus

) {


  const ref = doc(
    db,
    "trips",
    tripId,
    "registrations",
    registrationId
  );



  return updateDoc(

    ref,

    {

      "payment.status": status,

      ...(status === "verified"
        ? {
            verifiedAt: serverTimestamp(),
          }
        : {}),

    }

  );

}



// Delete registration

export async function deleteRegistration(

  tripId: string,

  registrationId: string

) {


  return deleteDoc(

    doc(
      db,
      "trips",
      tripId,
      "registrations",
      registrationId
    )

  );

}
