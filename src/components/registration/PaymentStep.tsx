import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

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
    useState<number>(0);


  const [upiLink, setUpiLink] =
    useState<string>("");



  useEffect(() => {

    async function loadPaymentData() {

      const form =
        await getTripForm(tripId);


      if (!form) {
        return;
      }


      setConfig(form);


      const advanceAmount =
        Math.round(
          (tripPrice * form.advancePercentage) / 100
        );


      setAmount(advanceAmount);



      if (form.upiId) {

        const link =
          `upi://pay?pa=${form.upiId}&pn=Safarnama&am=${advanceAmount}&cu=INR`;

        setUpiLink(link);

      }

    }


    loadPaymentData();

  }, [tripId, tripPrice]);




  function copyUPI() {

    if (config?.upiId) {

      navigator.clipboard.writeText(
        config.upiId
      );

      alert("UPI ID copied");

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


      <h2 className="text-2xl font-bold">
        Payment
      </h2>



      <p>
        Pay Advance Amount:
        <strong>
          {" "}₹{amount}
        </strong>
      </p>



      {
        config?.upiId

        ?

        <>


          {
            upiLink && (

              <div className="
                flex
                justify-center
                rounded-xl
                bg-white
                p-4
              ">

                <QRCode
                  value={upiLink}
                  size={220}
                />

              </div>

            )
          }



          <div className="
            rounded-xl
            border
            p-4
          ">

            <p className="font-medium">
              UPI ID
            </p>


            <div className="
              mt-2
              flex
              gap-2
            ">

              <input
                value={config.upiId}
                readOnly
                className="
                  flex-1
                  rounded-lg
                  border
                  p-2
                "
              />


              <button
                onClick={copyUPI}
                className="
                  rounded-lg
                  bg-primary
                  px-4
                  text-white
                "
              >
                Copy
              </button>


            </div>

          </div>


        </>


        :

        <p className="text-muted-foreground">
          Online payment is not available for this trip.
        </p>

      }




      <button
        className="
          rounded-xl
          bg-primary
          px-6
          py-3
          text-white
        "
      >
        I Have Paid
      </button>



    </div>

  );

}
