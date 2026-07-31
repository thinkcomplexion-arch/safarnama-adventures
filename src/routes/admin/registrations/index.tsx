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






  async function refresh(){

    if(selectedTrip){

      await openTrip(selectedTrip);

    }

  }






  async function verifyPayment(
    id:string
  ){

    if(!selectedTrip)
      return;


    await updatePaymentStatus(
      selectedTrip.id,
      id,
      "verified"
    );


    refresh();

  }







  async function rejectPayment(
    id:string
  ){

    if(!selectedTrip)
      return;


    await updatePaymentStatus(
      selectedTrip.id,
      id,
      "rejected"
    );


    refresh();

  }







  async function markAdvancePaid(
    id:string
  ){

    if(!selectedTrip)
      return;


    await updateAdvancePayment(
      selectedTrip.id,
      id,
      "paid"
    );


    refresh();

  }







  async function markRemainingPaid(
    id:string
  ){

    if(!selectedTrip)
      return;


    await updateRemainingPayment(
      selectedTrip.id,
      id,
      "paid"
    );


    refresh();

  }







  async function removeRegistration(
    id:string
  ){

    if(!selectedTrip)
      return;


    const ok =
      window.confirm(
        "Delete this registration?"
      );


    if(!ok)
      return;



    await deleteRegistration(
      selectedTrip.id,
      id
    );


    refresh();

  }







  function getContactData(
    reg:Registration
  ){

    let phone = "";
    let email = "";
    let name = "";


    Object.entries(
      reg.responses
    ).forEach(([key,value])=>{


      const valueString =
        String(value);



      if(
        key.toLowerCase()
        .includes("name")
      ){

        name=valueString;

      }



      if(
        key.toLowerCase()
        .includes("phone")
        ||
        key.toLowerCase()
        .includes("mobile")
        ||
        key.toLowerCase()
        .includes("whatsapp")
      ){

        phone=valueString;

      }



      if(
        key.toLowerCase()
        .includes("email")
      ){

        email=valueString;

      }


    });



    return {
      phone,
      email,
      name
    };

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





          <div>


            <h2 className="
              mb-4
              text-xl
              font-bold
            ">

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
                    block
                    w-full
                    border-b
                    p-4
                    text-left
                    hover:bg-muted

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
                registrations.length===0

                ?

                <p>
                  No registrations found.
                </p>


                :


                registrations.map(reg=>{


                  const contact =
                    getContactData(reg);



                  return (

                  <div
                    key={reg.id}
                    className="
                      border-b
                      py-8
                    "
                  >



                    <h3 className="
                      mb-4
                      text-xl
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
                      ).map(([key,value])=>(


                        <p key={key}>

                          <b>
                            {key}:
                          </b>

                          {" "}

                          {
                            typeof value==="boolean"
                            ?
                            value
                            ?
                            "Yes"
                            :
                            "No"
                            :
                            String(value)
                          }

                        </p>


                      ))

                    }


                    </div>







                    {
                      contact.phone && (

                        <a
                          href={`https://wa.me/${contact.phone}`}
                          target="_blank"
                          className="
                            mt-5
                            inline-block
                            rounded-lg
                            bg-green-600
                            px-4
                            py-2
                            text-white
                          "
                        >

                          WhatsApp

                        </a>

                      )
                    }






                    {
                      contact.email && (

                        <a
                          href={`mailto:${contact.email}`}
                          className="
                            ml-3
                            inline-block
                            rounded-lg
                            bg-blue-600
                            px-4
                            py-2
                            text-white
                          "
                        >

                          Email

                        </a>

                      )
                    }








                    <div className="
                      mt-6
                      space-y-3
                    ">



                      <p>

                        Total Amount:
                        {" "}
                        ₹{reg.payment.totalAmount}

                      </p>



                      <p>

                        Advance Amount:
                        {" "}
                        ₹{reg.payment.advanceAmount}

                      </p>



                      <p>

                        Payment Status:
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
                      mt-6
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





                      {
                        reg.payment.status !== "rejected"

                        &&

                        <button

                          onClick={()=>
                            rejectPayment(reg.id)
                          }

                          className="
                            rounded-lg
                            bg-yellow-600
                            px-4
                            py-2
                            text-white
                          "

                        >

                          Reject

                        </button>

                      }






                      {
                        reg.payment.advanceStatus !== "paid"

                        &&

                        <button

                          onClick={()=>
                            markAdvancePaid(reg.id)
                          }

                          className="
                            rounded-lg
                            bg-purple-600
                            px-4
                            py-2
                            text-white
                          "

                        >

                          Mark Advance Paid

                        </button>

                      }







                      {
                        reg.payment.remainingStatus !== "paid"

                        &&

                        <button

                          onClick={()=>
                            markRemainingPaid(reg.id)
                          }

                          className="
                            rounded-lg
                            bg-indigo-600
                            px-4
                            py-2
                            text-white
                          "

                        >

                          Mark Remaining Paid

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


                  );


                })

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
