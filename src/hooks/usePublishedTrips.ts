import { useEffect, useState } from "react";
import { getPublishedTrips, type Trip } from "@/services/trip";

export function usePublishedTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrips() {
      try {
        const data = await getPublishedTrips();
        setTrips(data);
      } catch (error) {
        console.error("Failed to load published trips", error);
      } finally {
        setLoading(false);
      }
    }

    loadTrips();
  }, []);

  return {
    trips,
    loading,
  };
}
