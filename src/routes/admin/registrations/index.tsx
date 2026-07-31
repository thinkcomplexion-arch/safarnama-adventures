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
  deleteRegistration,
  type Registration,
} from "@/services/registration";


export const Route = createFileRoute("/admin/registration/")({
  component: RegistrationManagement,
});



function RegistrationManagement() {


  const [trips, setTrips] =
    useState<Trip[]>([]);


  const [selectedTrip, setSelectedTrip] =
    useState<Trip | null>(null);


  const [registrations, setRegistrations] =
    useState<Registration[]>([]);


  const [loading, setLoading] =
    useState(true);





  useEffect(() => {

    async function load() {

      const data =
        await getAllTrips();


      setTrips(data);

      setLoading(false);

    }


    load();

  }, []);







  async function openTrip(trip: Trip) {

    setSelectedTrip(trip);


    const data =
      await getTripRegistrations(
        trip.id
      );


    setRegistrations(data);

  }







  async function verifyPayment(
    registrationId: string
  ) {

    if (!selectedTrip)
      return;


    await updatePaymentStatus(
      selectedTrip.id,
      registrationId,
      "verified"
    );


    await openTrip(selectedTrip);

  }








  async function removeRegistration(
    id: string
  ) {

    if (!selectedTrip)
      return;


    const confirmDelete =
      window.confirm(
        "Delete this registration?"
      );


    if (!confirmDelete)
      return;



    await deleteRegistration(
      selectedTrip.id,
      id
    );


    await openTrip(selectedTrip);

  }







  return (

    <AdminLayout>


      <div className="
        w-full
        space-y-8
        p-6
      ">


        <h1 className="
          text-3xl
          font-bold
        ">

          Registration Management

        </h1>





        <div className="
          grid
          gap-8
          lg:grid-cols-4
        ">





          {/* TRIPS */}


          <div>


            <h2 className="
              mb-4
              text-xl
              font-bold
            ">

              Trips

            </h2>




            <div>


            {
              loading

              ?

              <p>
                Loading...
              </p>


              :


              trips.map(trip => (


                <button

                  key={trip.id}

                  onClick={() =>
                    openTrip(trip)
                  }


                  className={`
                    w-full
                    border-b
                    p-4
                    text-left
                    transition
                    hover:bg-muted

                    ${
                      selectedTrip?.id === trip.id
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


          </div>









          {/* REGISTRATIONS */}



          <div className="
            lg:col-span-3
          ">


          {
            selectedTrip

            ?

            <>


            <h2 className="
              mb-6
              text-2xl
              font-bold
            ">

              {selectedTrip.title} Registrations

            </h2>





            {
              registrations.length === 0

              ?

              <p>
                No registrations found.
              </p>


              :


              registrations.map(reg => (


                <div

                  key={reg.id}

                  className="
                    border-b
                    py-6
                  "

                >



                  <h3 className="
                    mb-4
                    text-lg
                    font-bold
                  ">

                    Customer Details

                  </h3>





                  <div className="
                    grid
                    gap-3
                    md:grid-cols-2
                  ">


                  {
                    Object.entries(
                      reg.responses
                    ).map(([key,value]) => (


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
                    flex
                    flex-wrap
                    gap-6
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

                      <b>
                        {reg.payment.advanceStatus || "pending"}
                      </b>

                    </p>




                    <p>

                      Remaining:

                      {" "}

                      <b>
                        {reg.payment.remainingStatus || "pending"}
                      </b>

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

                      onClick={() =>
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

                    onClick={() =>
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
