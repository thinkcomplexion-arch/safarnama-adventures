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
// Payment Types
// -----------------------------

export type PaymentStatus =
  | "pending"
  | "verified"
  | "rejected";


export type PaymentStage =
  | "pending"
  | "paid";



// -----------------------------
// Registration Data
// -----------------------------

export interface Registration {


  id: string;


  tripId: string;


  responses: Record<string, unknown>;



  payment: {


    totalAmount: number;


    advanceAmount: number;


    status: PaymentStatus;



    // New payment tracking

    advanceStatus?: PaymentStage;


    remainingStatus?: PaymentStage;


  };



  createdAt?: unknown;


  verifiedAt?: unknown;


}



// =================================================
// FORM MANAGEMENT
// =================================================



export async function getTripForm(
  tripId:string
):Promise<TripFormConfig | null>{


  const ref = doc(
    db,
    "tripForms",
    tripId
  );


  const snapshot = await getDoc(ref);



  if(!snapshot.exists()){

    return null;

  }



  return {

    tripId,

    ...(snapshot.data() as Omit<
      TripFormConfig,
      "tripId"
    >),

  };


}





export async function saveTripForm(

  tripId:string,

  data:Omit<
    TripFormConfig,
    "tripId" |
    "createdAt" |
    "updatedAt"
  >

){


  const ref = doc(
    db,
    "tripForms",
    tripId
  );



  return setDoc(

    ref,

    {

      ...data,

      updatedAt:serverTimestamp(),

      createdAt:serverTimestamp(),

    },


    {
      merge:true,
    }

  );

}





export async function deleteTripForm(
  tripId:string
){

  return deleteDoc(

    doc(
      db,
      "tripForms",
      tripId
    )

  );

}





// =================================================
// REGISTRATION MANAGEMENT
// =================================================




export async function createRegistration(

  tripId:string,

  data:Omit<
    Registration,
    "id" |
    "tripId"
  >

){


  const registrationsRef =
    collection(
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


      createdAt:serverTimestamp(),


    }

  );


}






export async function getTripRegistrations(

  tripId:string

):Promise<Registration[]>{


  const ref =
    collection(

      db,

      "trips",

      tripId,

      "registrations"

    );



  const snapshot =
    await getDocs(ref);




  return snapshot.docs.map(doc => ({


    id:doc.id,


    ...(doc.data() as Omit<
      Registration,
      "id"
    >),


  }));


}







// =================================================
// ADMIN - ALL REGISTRATIONS
// =================================================



export async function getAllTripRegistrations(){

  
  const tripsSnapshot =
    await getDocs(
      collection(
        db,
        "trips"
      )
    );



  const registrations:any[] = [];




  for(
    const tripDoc of tripsSnapshot.docs
  ){


    const registrationsSnapshot =
      await getDocs(

        collection(

          db,

          "trips",

          tripDoc.id,

          "registrations"

        )

      );



    registrationsSnapshot.docs.forEach(
      (regDoc)=>{


        registrations.push({


          id:regDoc.id,


          tripId:tripDoc.id,


          tripName:
            tripDoc.data().title,



          ...(regDoc.data()),



        });



      }

    );



  }




  return registrations;


}







// =================================================
// PAYMENT MANAGEMENT
// =================================================



export async function updatePaymentStatus(

  tripId:string,

  registrationId:string,

  status:PaymentStatus

){


  const ref =
    doc(

      db,

      "trips",

      tripId,

      "registrations",

      registrationId

    );



  return updateDoc(

    ref,

    {


      "payment.status":
        status,



      ...(status==="verified"

      ?

      {

        verifiedAt:
          serverTimestamp(),

      }

      :

      {})



    }

  );


}







export async function updateAdvancePayment(

  tripId:string,

  registrationId:string,

  status:PaymentStage

){


  return updateDoc(

    doc(

      db,

      "trips",

      tripId,

      "registrations",

      registrationId

    ),


    {

      "payment.advanceStatus":
        status

    }

  );


}







export async function updateRemainingPayment(

  tripId:string,

  registrationId:string,

  status:PaymentStage

){


  return updateDoc(

    doc(

      db,

      "trips",

      tripId,

      "registrations",

      registrationId

    ),


    {

      "payment.remainingStatus":
        status

    }

  );


}







// =================================================
// DELETE REGISTRATION
// =================================================



export async function deleteRegistration(

  tripId:string,

  registrationId:string

){


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
