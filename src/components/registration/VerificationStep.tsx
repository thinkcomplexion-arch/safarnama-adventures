interface VerificationStepProps {
  whatsappNumber: string;
  tripName: string;
  amount: number;
  userName: string;
}


export function VerificationStep({
  whatsappNumber,
  tripName,
  amount,
  userName,
}: VerificationStepProps) {


  function openWhatsApp() {

    const message =
`Hello Safarnama Team,

I have registered for:

Trip:
${tripName}

Name:
${userName}

Payment Amount:
₹${amount}

I have completed the payment and I am sending my payment screenshot for verification.

Please verify my payment.

Thank you.`;


    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


    window.open(
      whatsappUrl,
      "_blank"
    );

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
        Payment Verification
      </h2>



      <p className="
        text-muted-foreground
      ">
        Your payment has been submitted.
        Send your payment screenshot on WhatsApp
        for verification.
      </p>



      <button
        onClick={openWhatsApp}
        className="
          w-full
          rounded-xl
          bg-green-600
          py-3
          text-white
        "
      >
        Send Screenshot on WhatsApp
      </button>


    </div>

  );

}
