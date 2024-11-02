import { useQuery } from "@tanstack/react-query";
import { getCurrentUserAuth } from "../../services/apiAuth";

export default function useUserAuth() {
  const { isPending, data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserAuth,
  });
  return { isPending, data, isAuthenticated: data?.role === "authenticated" };
}
