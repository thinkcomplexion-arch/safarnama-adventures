import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

import {
  SiGooglepay,
  SiPhonepe,
  SiPaytm,
} from "react-icons/si";

import {
  getTripForm,
  type TripFormConfig,
} from "@/services/registration";


interface PaymentStepProps {
  tripId: string;
  tripPrice: number;
}


export function PaymentStep({
  tripId,
  tripPrice,
}: PaymentStepProps) {


  const [config, setConfig] =
    useState<TripFormConfig | null>(null);


  const [amount, setAmount] =
    useState(0);


  const [upiLink, setUpiLink] =
    useState("");



  useEffect(() => {

    async function loadPaymentData() {

      const form =
        await getTripForm(tripId);


      if (!form) return;


      setConfig(form);


      const advance =
        Math.round(
          (tripPrice * form.advancePercentage) / 100
        );


      setAmount(advance);



      if (form.upiId) {

        const link =
          `upi://pay?pa=${form.upiId}&pn=Safarnama&am=${advance}&cu=INR`;

        setUpiLink(link);

      }

    }


    loadPaymentData();

  }, [tripId, tripPrice]);




  function copyUPI(){

    if(config?.upiId){

      navigator.clipboard.writeText(
        config.upiId
      );

      alert("UPI ID copied");

    }

  }




  function openUPI(){

    if(upiLink){

      window.location.href = upiLink;

    }

  }




  return (

    <div className="
      space-y-6
      rounded-3xl
      border
      bg-card
      p-6
    ">


      <h2 className="
        text-2xl
        font-bold
      ">
        Payment
      </h2>



      <div className="
        rounded-xl
        border
        p-4
      ">

        <p>
          Advance Amount
        </p>


        <p className="
          text-3xl
          font-bold
          mt-2
        ">
          ₹{amount}
        </p>


      </div>




      {
        config?.upiId && (

          <>


            <div className="
              flex
              justify-center
              rounded-xl
              bg-white
              p-5
            ">

              <QRCode
                value={upiLink}
                size={220}
              />

            </div>




            <div className="
              grid
              grid-cols-3
              gap-3
            ">


              <button
                onClick={openUPI}
                className="
                  flex
                  flex-col
                  items-center
                  gap-2
                  rounded-xl
                  border
                  p-4
                  hover:bg-accent
                "
              >

                <SiGooglepay size={35}/>

                <span className="text-sm">
                  Google Pay
                </span>

              </button>





              <button
                onClick={openUPI}
                className="
                  flex
                  flex-col
                  items-center
                  gap-2
                  rounded-xl
                  border
                  p-4
                  hover:bg-accent
                "
              >

                <SiPhonepe size={35}/>

                <span className="text-sm">
                  PhonePe
                </span>

              </button>





              <button
                onClick={openUPI}
                className="
                  flex
                  flex-col
                  items-center
                  gap-2
                  rounded-xl
                  border
                  p-4
                  hover:bg-accent
                "
              >

                <SiPaytm size={35}/>

                <span className="text-sm">
                  Paytm
                </span>

              </button>


            </div>





            <div className="
              rounded-xl
              border
              p-4
              overflow-hidden
            ">


              <p className="mb-2 font-medium">
                UPI ID
              </p>


              <div className="
                flex
                gap-2
                items-center
              ">


                <input
                  value={config.upiId}
                  readOnly
                  className="
                    min-w-0
                    flex-1
                    rounded-lg
                    border
                    px-3
                    py-2
                    text-sm
                  "
                />



                <button
                  onClick={copyUPI}
                  className="
                    shrink-0
                    rounded-lg
                    bg-primary
                    px-4
                    py-2
                    text-white
                  "
                >
                  Copy
                </button>


              </div>


            </div>


          </>

        )

      }





      {
        !config?.upiId && (

          <p className="
            text-muted-foreground
          ">
            Payment is not available for this trip.
          </p>

        )
      }




      <button
        className="
          w-full
          rounded-xl
          bg-primary
          py-3
          text-white
        "
      >
        I Have Paid
      </button>


    </div>

  );

}
