import type { ItinerarySection } from "@/services/itinerary";

interface Props {
  section: ItinerarySection;
}

export function ItinerarySectionView({ section }: Props) {

  const styles = {
    places: {
      icon: "📍",
      gradient: "from-emerald-400/30 to-green-400/10",
    },

    meals: {
      icon: "🍽️",
      gradient: "from-orange-400/30 to-yellow-400/10",
    },

    stay: {
      icon: "🏨",
      gradient: "from-blue-400/30 to-indigo-400/10",
    },

    transport: {
      icon: "🚌",
      gradient: "from-cyan-400/30 to-sky-400/10",
    },

    highlights: {
      icon: "⭐",
      gradient: "from-purple-400/30 to-pink-400/10",
    },

    tips: {
      icon: "💡",
      gradient: "from-teal-400/30 to-green-400/10",
    },

    description: {
      icon: "✨",
      gradient: "from-white/20 to-white/5",
    },

  }[section.type || "description"];



  return (

    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        bg-gradient-to-br
        ${styles.gradient}
        p-6
        transition-all
        duration-700
        animate-in
        fade-in
        slide-in-from-bottom-5
      `}
    >


      {/* Floating Glow */}
      <div
        className="
          absolute
          -right-10
          -top-10
          h-40
          w-40
          rounded-full
          bg-white/20
          blur-3xl
          transition
          duration-700
          group-hover:scale-150
        "
      />



      <div className="relative flex gap-5">


        {/* Icon */}

        <div
          className="
            flex
            h-16
            w-16
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-white/20
            text-3xl
            backdrop-blur-xl
            shadow-lg
            transition
            duration-500
            group-hover:rotate-6
          "
        >
          {styles.icon}
        </div>



        <div className="flex-1">


          <h3
            className="
              text-2xl
              font-black
              text-white
              md:text-3xl
            "
          >
            {section.title || "Experience"}
          </h3>



          <p
            className="
              mt-1
              text-xs
              uppercase
              tracking-[0.25em]
              text-white/60
            "
          >
            {section.type || "custom"}
          </p>



          {section.content && (

            <p
              className="
                mt-5
                text-lg
                leading-relaxed
                text-white/90
                whitespace-pre-line
              "
            >
              {section.content}
            </p>

          )}


        </div>


      </div>


    </div>

  );
}
