import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export default function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Checked out booking #${data.id} successfully`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkout, isCheckout };
}
