import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queyDate = subDays(new Date(), numDays).toISOString();

  const { data, isPending } = useQuery({
    queryFn: () => getStaysAfterDate(queyDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = data?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { data, isPending, confirmedStays, numDays };
}

export default useRecentStays;
