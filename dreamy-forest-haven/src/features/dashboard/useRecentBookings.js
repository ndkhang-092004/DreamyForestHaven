import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queyDate = subDays(new Date(), numDays).toISOString();

  const { data, isPending } = useQuery({
    queryFn: () => getBookingsAfterDate(queyDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { data, isPending };
}

export default useRecentBookings;
