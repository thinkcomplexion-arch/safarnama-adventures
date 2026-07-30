import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Image,
  MapPin,
  Save,
} from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { getTripById, type Trip } from "@/services/trips";


export const Route = createFileRoute(
  "/admin/trips/$tripId/itinerary"
)({
  component: ItineraryBuilder,
});


interface DayPlan {
  id: number;
  title: string;
  description: string;
  images: string[];
  activities: string[];
}



function ItineraryBuilder() {

  const { tripId } = Route.useParams();

  const [trip, setTrip] = useState<Trip | null>(null);

  const [days, setDays] = useState<DayPlan[]>([]);



  useEffect(() => {

    async function loadTrip() {

      const data = await getTripById(tripId);

      setTrip(data);

    }

    loadTrip();

  }, [tripId]);




  function addDay() {

    setDays((prev)=>[
      ...prev,
      {
        id: Date.now(),
        title:`Day ${prev.length + 1}`,
        description:"",
        images:[""],
        activities:[""],
      }
    ]);

  }



  function deleteDay(id:number){

    setDays((prev)=>
      prev.filter(day=>day.id!==id)
    );

  }



  function updateDay(
    id:number,
    field:keyof DayPlan,
    value:any
  ){

    setDays(prev=>
      prev.map(day=>
        day.id===id
        ? {...day,[field]:value}
        : day
      )
    );

  }




  return (

    <AdminLayout>

      <div className="space-y-8">


        <div>
          <h1 className="text-3xl font-bold">
            Itinerary Creator
          </h1>

          <p className="mt-2 text-muted-foreground">
            {trip?.title || "Loading trip..."}
          </p>
        </div>




        <button
          onClick={addDay}
          className="
          flex items-center gap-2 
          rounded-xl bg-primary 
          px-5 py-3 
          text-primary-foreground
          "
        >

          <Plus size={18}/>
          Add New Day

        </button>





        <div className="space-y-6">


        {days.map((day,index)=>(


          <div
            key={day.id}
            className="
            rounded-3xl 
            border 
            bg-card 
            p-6 
            shadow-lg
            space-y-5
            "
          >


            <div className="flex items-center justify-between">


              <h2 className="text-2xl font-bold">
                Day {index+1}
              </h2>


              <button
                onClick={()=>deleteDay(day.id)}
                className="text-red-500"
              >
                <Trash2/>
              </button>


            </div>





            <input
              value={day.title}
              onChange={(e)=>
                updateDay(
                  day.id,
                  "title",
                  e.target.value
                )
              }
              placeholder="Day title"
              className="
              w-full rounded-xl border 
              px-4 py-3
              "
            />





            <textarea
              value={day.description}
              onChange={(e)=>
                updateDay(
                  day.id,
                  "description",
                  e.target.value
                )
              }
              rows={5}
              placeholder="Describe this day's journey..."
              className="
              w-full rounded-xl border 
              px-4 py-3
              "
            />






            <div>

              <div className="flex items-center gap-2 font-semibold">

                <Image size={18}/>
                Images

              </div>


              {day.images.map((img,i)=>(

                <input
                  key={i}
                  value={img}
                  onChange={(e)=>{

                    const images=[...day.images];

                    images[i]=e.target.value;

                    updateDay(
                      day.id,
                      "images",
                      images
                    );

                  }}
                  placeholder="Image URL"
                  className="
                  mt-3 w-full rounded-xl border px-4 py-3
                  "
                />

              ))}


            </div>







            <div>

              <div className="flex items-center gap-2 font-semibold">

                <MapPin size={18}/>
                Activities

              </div>



              {day.activities.map((activity,i)=>(

                <input
                  key={i}
                  value={activity}
                  onChange={(e)=>{

                    const activities=[
                      ...day.activities
                    ];

                    activities[i]=e.target.value;


                    updateDay(
                      day.id,
                      "activities",
                      activities
                    );

                  }}
                  placeholder="Example: Visit valley, Trekking..."
                  className="
                  mt-3 w-full rounded-xl border px-4 py-3
                  "
                />

              ))}


            </div>




          </div>


        ))}


        </div>






        {days.length>0 && (

          <button
            className="
            flex items-center gap-2
            rounded-xl
            bg-green-600
            px-6 py-3
            text-white
            "
          >

            <Save size={18}/>
            Save Itinerary

          </button>

        )}




      </div>


    </AdminLayout>

  );

    }
