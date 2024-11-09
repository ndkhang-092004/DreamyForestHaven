import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export default function useSignup() {
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success(
        "Account has been created! Please verify account email, we already sent an verify email to that email address!"
      );
    },
  });
  return { mutate, isPending };
}
