import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PaymentStep } from "@/components/registration/PaymentStep";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import {
  getTripForm,
  createRegistration,
  type RegistrationField,
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


  const [trip, setTrip] = useState<Trip | null>(null);

  const [fields, setFields] = useState<RegistrationField[]>([]);

  const [formData, setFormData] =
    useState<Record<string, any>>({});


  const [loading, setLoading] =
    useState(true);

const [step, setStep] = useState(1);
  const [submitting, setSubmitting] =
    useState(false);



  useEffect(() => {

    async function loadData(){

      const tripData =
        await getTripById(tripId);


      const form =
        await getTripForm(tripId);


      setTrip(tripData);


      if(form){
        setFields(form.fields);
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


      // payment step will come here later


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

        <div className="p-20 text-center">
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




          <div className="
            mt-8
            space-y-5
          ">


          {step === 1 && (
  <>
    {fields.map((field)=>(


            <div key={field.id}>


              <label className="
                mb-2
                block
                font-medium
              ">

                {field.label}

                {field.required && (
                  <span>
                    {" "}*
                  </span>
                )}

              </label>



              {
              field.type === "textarea"
              ?

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

              :

              <input

                type={
                  field.type==="phone"
                  ?
                  "tel"
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

              }


            </div>


          ))}

              </>
)}
          </div>




          {step === 1 && (

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

)}


{step === 2 && (

  <div className="mt-8">

    <PaymentStep
      tripId={tripId}
      tripPrice={trip?.price || 0}
    />

  </div>

)}
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
