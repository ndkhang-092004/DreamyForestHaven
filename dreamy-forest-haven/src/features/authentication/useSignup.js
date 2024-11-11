import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export default function useSignup() {
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account has been created!");
    },
  });
  return { mutate, isPending };
}
