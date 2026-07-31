import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";

import {
  getAllTrips,
  type Trip,
} from "@/services/trips";

import {
  saveTripForm,
  getTripForm,
  type RegistrationField,
} from "@/services/registration";


export const Route = createFileRoute("/admin/forms/")({
  component: RegistrationFormsPage,
});


function RegistrationFormsPage() {

  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState("");
  const [formExists, setFormExists] = useState(false);

const [loadingForm, setLoadingForm] = useState(false);

  const [fields, setFields] = useState<RegistrationField[]>([
    {
      id: "fullName",
      label: "Full Name",
      type: "text",
      required: true,
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "phone",
      required: true,
    },
  ]);


  const [advancePercentage, setAdvancePercentage] =
    useState(50);

  const [upiId, setUpiId] =
    useState("");

  const [whatsappNumber, setWhatsappNumber] =
    useState("");



  useEffect(()=>{

    async function loadTrips(){

      const data = await getAllTrips();

      setTrips(data);

    }

    loadTrips();

  },[]);



  function addField(){

    setFields([
      ...fields,
      {
        id: crypto.randomUUID(),
        label: "New Field",
        type: "text",
        required: false,
      }
    ]);

  }
async function loadTripForm(tripId: string) {

  setLoadingForm(true);

  const form = await getTripForm(tripId);

  if (form) {

    setFields(form.fields);

    setAdvancePercentage(form.advancePercentage);

    setUpiId(form.upiId);

    setWhatsappNumber(form.paymentVerificationWhatsApp);

    setFormExists(true);

  } else {

    setFormExists(false);

    setFields([]);

    setAdvancePercentage(50);

    setUpiId("");

    setWhatsappNumber("");

  }

  setLoadingForm(false);

}


  function removeField(id:string){

    setFields(
      fields.filter(
        field=>field.id!==id
      )
    );

  }



  function updateField(
    id:string,
    key:keyof RegistrationField,
    value:any
  ){

    setFields(
      fields.map(field=>
        field.id===id
        ?
        {
          ...field,
          [key]:value,
        }
        :
        field
      )
    );

  }



  async function saveForm(){

    if(!selectedTrip){

      alert("Please select a trip");

      return;

    }


    await saveTripForm(
      selectedTrip,
      {
        fields,
        paymentEnabled:true,
        advancePercentage,
        upiId,
        paymentVerificationWhatsApp:
          whatsappNumber,
      }
    );


    alert("Registration form saved");

  }



  return (

    <AdminLayout>

      <div className="space-y-8">


        <div>

          <h1 className="text-3xl font-bold">
            Registration Form Builder
          </h1>

          <p className="text-muted-foreground mt-2">
            Create custom booking forms for every trip.
          </p>

        </div>



        <div className="rounded-3xl border bg-card p-6 space-y-6">


          <div>

            <label className="font-semibold">
              Select Trip
            </label>

            <select
              value={selectedTrip}
              onChange={async (e) => {

  const tripId = e.target.value;

  setSelectedTrip(tripId);

  if (tripId) {
    await loadTripForm(tripId);
  }

}}
              className="mt-2 w-full rounded-xl border p-3"
            >

              <option value="">
                Choose Trip
              </option>


              {trips.map(trip=>(

                <option
                  key={trip.id}
                  value={trip.id}
                >
                  {trip.title}
                </option>

              ))}

            </select>

          </div>



          <div className="space-y-4">


            <div className="flex justify-between">

              <h2 className="text-xl font-bold">
                Form Fields
              </h2>


              <button
                onClick={addField}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white"
              >
                <Plus size={18}/>
                Add Field
              </button>

            </div>



            {fields.map(field=>(

              <div
                key={field.id}
                className="rounded-xl border p-4 space-y-3"
              >

                <input
                  value={field.label}
                  onChange={(e)=>
                    updateField(
                      field.id,
                      "label",
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border p-2"
                />



                <select
                  value={field.type}
                  onChange={(e)=>
                    updateField(
                      field.id,
                      "type",
                      e.target.value
                    )
                  }
                  className="rounded-lg border p-2"
                >

                  <option value="text">
                    Text
                  </option>

                  <option value="number">
                    Number
                  </option>

                  <option value="phone">
                    Phone
                  </option>

                  <option value="email">
                    Email
                  </option>

                  <option value="textarea">
                    Text Area
                  </option>

                </select>



                <button
                  onClick={()=>
                    removeField(field.id)
                  }
                  className="flex items-center gap-2 text-red-500"
                >

                  <Trash2 size={16}/>
                  Remove

                </button>


              </div>

            ))}


          </div>




          <div className="space-y-4">

            <h2 className="text-xl font-bold">
              Payment Settings
            </h2>


            <input
              type="number"
              value={advancePercentage}
              onChange={(e)=>
                setAdvancePercentage(
                  Number(e.target.value)
                )
              }
              placeholder="Advance Percentage"
              className="w-full rounded-xl border p-3"
            />


            <input
              value={upiId}
              onChange={(e)=>
                setUpiId(e.target.value)
              }
              placeholder="UPI ID"
              className="w-full rounded-xl border p-3"
            />


            <input
              value={whatsappNumber}
              onChange={(e)=>
                setWhatsappNumber(e.target.value)
              }
              placeholder="WhatsApp Number with country code"
              className="w-full rounded-xl border p-3"
            />


          </div>




          <button
            onClick={saveForm}
            className="rounded-xl bg-primary px-6 py-3 text-white"
          >
            Save Registration Form
          </button>


        </div>


      </div>


    </AdminLayout>

  );

      }
