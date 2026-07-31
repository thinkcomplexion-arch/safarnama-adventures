import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { PaymentStep } from "@/components/registration/PaymentStep";
import { VerificationStep } from "@/components/registration/VerificationStep";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import {
  getTripForm,
  createRegistration,
  type RegistrationField,
  type TripFormConfig,
} from "@/services/registration";

import {
  getTripById,
  type Trip,
} from "@/services/trips";


export const Route = createFileRoute("/trips/$tripId/register")({
  head: () => ({
    meta: [
      {
        title: "Trip Registration — Safarnama",
      },
    ],
  }),
  component: RegistrationPage,
});



function RegistrationPage() {

  const { tripId } = Route.useParams();


  const [trip,setTrip] =
    useState<Trip | null>(null);


  const [fields,setFields] =
    useState<RegistrationField[]>([]);


  const [formConfig,setFormConfig] =
    useState<TripFormConfig | null>(null);



  const [formData,setFormData] =
    useState<Record<string,any>>({});



  const [loading,setLoading] =
    useState(true);



  const [step,setStep] =
    useState(1);



  const [submitting,setSubmitting] =
    useState(false);




  useEffect(()=>{

    async function loadData(){

      const tripData =
        await getTripById(tripId);


      const form =
        await getTripForm(tripId);



      setTrip(tripData);



      if(form){

        setFields(form.fields);

        setFormConfig(form);

      }



      setLoading(false);

    }


    loadData();


  },[tripId]);





  function handleChange(
    id:string,
    value:any
  ){

    setFormData(prev=>({

      ...prev,

      [id]:value,

    }));

  }





  async function handleSubmit(){


    for(const field of fields){

      if(
        field.required &&
        !formData[field.id]
      ){

        alert(
          `${field.label} is required`
        );

        return;

      }

    }



    try{


      setSubmitting(true);



      await createRegistration(

        tripId,

        {

          responses:formData,


          payment:{

            totalAmount:
              trip?.price || 0,


            advanceAmount:0,


            status:"pending",

          }

        }

      );



      setStep(2);


    }
    catch(error){

      console.error(error);


      alert(
        "Something went wrong"
      );


    }
    finally{

      setSubmitting(false);

    }

  }





  if(loading){

    return(

      <>

        <Navbar/>


        <div className="
          p-20
          text-center
        ">

          Loading registration...

        </div>


        <Footer/>

      </>

    );

  }





  return (

    <>

      <Navbar/>


      <main className="
        mx-auto
        max-w-3xl
        px-6
        py-24
      ">


        <div className="
          rounded-3xl
          border
          bg-card
          p-8
          shadow-soft
        ">



          <h1 className="
            text-4xl
            font-bold
          ">

            Register for {trip?.title}

          </h1>




          <p className="
            mt-3
            text-muted-foreground
          ">

            Fill your details to continue.

          </p>





          {
            step === 1 && (

              <div className="
                mt-8
                space-y-5
              ">



                {
                  fields.map(field=>(


                    <div key={field.id}>


                      <label className="
                        mb-2
                        block
                        font-medium
                      ">


                        {field.label}


                        {
                          field.required && (

                            <span>
                              {" "}*
                            </span>

                          )
                        }


                      </label>





                      {
                        field.type === "textarea" && (

                          <textarea

                            className="
                              w-full
                              rounded-xl
                              border
                              p-3
                            "

                            onChange={(e)=>
                              handleChange(
                                field.id,
                                e.target.value
                              )
                            }

                          />

                        )
                      }





                      {
                        field.type === "select" && (

                          <select

                            className="
                              w-full
                              rounded-xl
                              border
                              p-3
                            "

                            onChange={(e)=>
                              handleChange(
                                field.id,
                                e.target.value
                              )
                            }

                          >


                            <option value="">
                              Select {field.label}
                            </option>



                            {
                              field.options?.map(option=>(

                                <option
                                  key={option}
                                  value={option}
                                >

                                  {option}

                                </option>

                              ))
                            }



                          </select>

                        )
                      }






                      {
                        field.type === "checkbox" && (

                          <input

                            type="checkbox"


                            onChange={(e)=>
                              handleChange(
                                field.id,
                                e.target.checked
                              )
                            }

                          />

                        )
                      }







                      {
                        field.type !== "textarea" &&
                        field.type !== "select" &&
                        field.type !== "checkbox" && (


                          <input

                            type={
                              field.type === "phone"
                              ?
                              "number"
                              :
                              field.type
                            }


                            className="
                              w-full
                              rounded-xl
                              border
                              p-3
                            "


                            onChange={(e)=>
                              handleChange(
                                field.id,
                                e.target.value
                              )
                            }


                          />

                        )
                      }



                    </div>


                  ))
                }



                <button

                  disabled={submitting}

                  onClick={handleSubmit}


                  className="
                    mt-8
                    rounded-xl
                    bg-primary
                    px-6
                    py-3
                    text-white
                  "

                >

                  {
                    submitting
                    ?
                    "Submitting..."
                    :
                    "Proceed to Payment"
                  }


                </button>



              </div>

            )
          }







          {
            step === 2 && (

              <div className="mt-8">


                <PaymentStep

                  tripId={tripId}

                  tripPrice={
                    trip?.price || 0
                  }

                  onPaymentDone={()=>
                    setStep(3)
                  }

                />


              </div>

            )
          }







          {
            step === 3 && (

              <div className="mt-8">


                <VerificationStep


                  whatsappNumber={
                    formConfig?.paymentVerificationWhatsApp || ""
                  }


                  tripName={
                    trip?.title || ""
                  }


                  amount={
                    trip?.price || 0
                  }


                  userName={
                    formData.fullName || "Guest"
                  }


                />


              </div>

            )
          }







          <Link

            to="/trips/$tripId"

            params={{
              tripId
            }}


            className="
              mt-5
              block
              text-center
              text-sm
            "

          >

            Back to trip details

          </Link>



        </div>


      </main>



      <Footer/>


    </>

  );


    }
