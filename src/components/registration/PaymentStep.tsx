import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import {
  Smartphone,
  WalletCards,
  Copy,
  Check,
} from "lucide-react";

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

  const [copied, setCopied] =
    useState(false);



  useEffect(() => {

    async function loadPaymentData() {

      const form =
        await getTripForm(tripId);


      if (!form) return;


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




  function openUPI() {

    if (upiLink) {
      window.location.href = upiLink;
    }

  }



  function copyUPI() {

    if (!config?.upiId) return;


    navigator.clipboard.writeText(
      config.upiId
    );


    setCopied(true);


    setTimeout(() => {
      setCopied(false);
    }, 2000);

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
        Complete Payment
      </h2>



      <div className="
        rounded-xl
        bg-muted
        p-4
      ">

        <p className="text-sm text-muted-foreground">
          Pay Advance Amount
        </p>


        <p className="
          text-3xl
          font-bold
        ">
          ₹{amount}
        </p>

      </div>




      {
        config?.upiId &&

        <>


          <div className="
            flex
            justify-center
            rounded-2xl
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

              <Smartphone size={28}/>

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

              <WalletCards size={28}/>

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

              <WalletCards size={28}/>

              <span className="text-sm">
                Paytm
              </span>

            </button>


          </div>





          <div className="
            rounded-xl
            border
            p-4
          ">


            <p className="
              mb-2
              text-sm
              font-medium
            ">
              UPI ID
            </p>



            <div className="
              flex
              w-full
              items-center
              gap-2
            ">


              <div className="
                min-w-0
                flex-1
                rounded-lg
                border
                bg-muted
                px-3
                py-3
              ">

                <p className="
                  truncate
                  text-sm
                ">
                  {config.upiId}
                </p>

              </div>




              <button
                onClick={copyUPI}
                className="
                  flex
                  shrink-0
                  items-center
                  gap-2
                  rounded-lg
                  bg-primary
                  px-4
                  py-3
                  text-white
                "
              >

                {
                  copied
                  ?
                  <Check size={16}/>
                  :
                  <Copy size={16}/>
                }


                {
                  copied
                  ?
                  "Copied"
                  :
                  "Copy"
                }


              </button>


            </div>


          </div>


        </>

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
