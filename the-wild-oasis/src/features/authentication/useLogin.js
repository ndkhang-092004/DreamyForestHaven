import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuth";

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) =>
      login({
        email,
        password,
      }),

    onSuccess: () => {
      navigate("/dashboard");
    },

    onError: (error) => {
      console.log("ERROR", error);
      toast.error("Email or password incorrect, please try again!");
    },
  });

  return { mutate, isPending };
}
