import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AdminLayout } from "@/components/admin/AdminLayout";

import {
  getAllTrips,
  type Trip,
} from "@/services/trips";

import {
  getTripRegistrations,
  updatePaymentStatus,
  updateAdvancePayment,
  updateRemainingPayment,
  deleteRegistration,
  type Registration,
} from "@/services/registration";


export const Route = createFileRoute("/admin/registration/")({
  component: RegistrationManagement,
});


function RegistrationManagement() {


  const [trips,setTrips] =
    useState<Trip[]>([]);


  const [selectedTrip,setSelectedTrip] =
    useState<Trip | null>(null);


  const [registrations,setRegistrations] =
    useState<Registration[]>([]);


  const [loading,setLoading] =
    useState(true);



  useEffect(()=>{


    async function load(){

      const data =
        await getAllTrips();


      setTrips(data);

      setLoading(false);

    }


    load();


  },[]);




  async function openTrip(trip:Trip){


    setSelectedTrip(trip);



    const data =
      await getTripRegistrations(
        trip.id
      );


    setRegistrations(data);


  }





  async function verifyPayment(
    registrationId:string
  ){

    if(!selectedTrip)
      return;


    await updatePaymentStatus(
      selectedTrip.id,
      registrationId,
      "verified"
    );


    openTrip(selectedTrip);

  }





  async function removeRegistration(
    id:string
  ){

    if(!selectedTrip)
      return;


    await deleteRegistration(
      selectedTrip.id,
      id
    );


    openTrip(selectedTrip);

  }





  return (

    <AdminLayout>

      <div className="space-y-8">


        <h1 className="text-3xl font-bold">
          Registration Management
        </h1>



        <div className="
          grid
          gap-6
          lg:grid-cols-3
        ">


          {/* TRIPS */}


          <div className="
            rounded-2xl
            border
            bg-card
            p-5
          ">


            <h2 className="text-xl font-bold mb-4">
              Trips
            </h2>


            {
              loading

              ?

              <p>
                Loading...
              </p>


              :

              trips.map(trip=>(


                <button

                  key={trip.id}

                  onClick={()=>
                    openTrip(trip)
                  }


                  className={`
                    mb-3
                    w-full
                    rounded-xl
                    border
                    p-4
                    text-left
                    ${
                      selectedTrip?.id===trip.id
                      ?
                      "bg-primary text-white"
                      :
                      ""
                    }
                  `}

                >

                  <p className="font-semibold">
                    {trip.title}
                  </p>


                  <p className="text-sm">
                    {trip.location}
                  </p>


                </button>


              ))

            }


          </div>





          {/* REGISTRATIONS */}



          <div className="
            lg:col-span-2
            rounded-2xl
            border
            bg-card
            p-5
          ">



            {
              selectedTrip

              ?

              <>


              <h2 className="
                text-2xl
                font-bold
                mb-5
              ">

                {selectedTrip.title}

                {" "}Registrations

              </h2>



              {
                registrations.length===0

                ?

                <p>
                  No registrations found.
                </p>


                :


                registrations.map(reg=>(


                  <div

                    key={reg.id}

                    className="
                      mb-5
                      rounded-xl
                      border
                      p-5
                    "

                  >



                    <h3 className="
                      font-bold
                      text-lg
                    ">

                      Customer Details

                    </h3>



                    <div className="
                      mt-3
                      space-y-2
                    ">


                    {
                      Object.entries(
                        reg.responses
                      ).map(
                        ([key,value])=>(


                        <p key={key}>

                          <span className="font-semibold">
                            {key}:
                          </span>

                          {" "}
                          {String(value)}

                        </p>


                      ))

                    }


                    </div>




                    <div className="
                      mt-5
                      rounded-xl
                      bg-muted
                      p-4
                    ">


                      <p>
                        Payment:
                        {" "}
                        <b>
                          {reg.payment.status}
                        </b>
                      </p>



                      <p>
                        Advance:
                        {" "}
                        {reg.payment.advanceStatus || "pending"}
                      </p>



                      <p>
                        Remaining:
                        {" "}
                        {reg.payment.remainingStatus || "pending"}
                      </p>


                    </div>




                    <div className="
                      mt-5
                      flex
                      flex-wrap
                      gap-3
                    ">



                      {
                        reg.payment.status !== "verified"
                        &&

                        <button

                          onClick={()=>
                            verifyPayment(reg.id)
                          }

                          className="
                            rounded-lg
                            bg-green-600
                            px-4
                            py-2
                            text-white
                          "

                        >

                          Verify Payment

                        </button>

                      }




                      <button

                        onClick={()=>
                          removeRegistration(reg.id)
                        }

                        className="
                          rounded-lg
                          bg-red-600
                          px-4
                          py-2
                          text-white
                        "

                      >

                        Delete

                      </button>



                    </div>


                  </div>


                ))

              }


              </>


              :

              <p>
                Select a trip to view registrations.
              </p>

            }



          </div>



        </div>



      </div>


    </AdminLayout>

  );

            }
