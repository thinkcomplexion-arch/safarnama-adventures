import type { ItinerarySection } from "@/services/itinerary";

interface Props {
  section: ItinerarySection;
}

export function ItinerarySectionView({ section }: Props) {

  const icon = {
    places: "📍",
    gallery: "🖼️",
    meals: "🍽️",
    stay: "🏨",
    transport: "🚌",
    highlights: "⭐",
    tips: "💡",
    description: "✨",
  }[section.type || "description"];


  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/30
        bg-white/10
        p-6
        backdrop-blur-xl
        shadow-lg
        transition-all
        duration-500
        hover:-translate-y-1
      "
    >

      {/* Gradient Background */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-cyan-400/10
          via-purple-400/10
          to-pink-400/10
        "
      />


      <div className="relative">

        {/* Header */}
        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-white/20
              text-3xl
              shadow-md
              backdrop-blur-xl
            "
          >
            {icon}
          </div>


          <div>

            <h3
              className="
                text-2xl
                font-bold
                text-white
              "
            >
              {section.title || "Untitled Experience"}
            </h3>


            <p
              className="
                text-sm
                uppercase
                tracking-widest
                text-white/60
              "
            >
              {section.type || "experience"}
            </p>

          </div>

        </div>



        {/* Content */}
        {section.content && (
          <p
            className="
              mt-5
              text-lg
              leading-relaxed
              text-white/90
              whitespace-pre-wrap
            "
          >
            {section.content}
          </p>
        )}



        {/* Gallery Images */}
        {section.images && section.images.length > 0 && (

          <div
            className="
              mt-6
              grid
              gap-4
              sm:grid-cols-2
            "
          >

            {section.images.map((image)=>(
              <img
                key={image}
                src={image}
                alt={section.title}
                className="
                  h-60
                  w-full
                  rounded-2xl
                  object-cover
                  transition
                  duration-700
                  hover:scale-105
                "
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
}
