import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiOutlineLogout } from "react-icons/hi";

export default function Logout() {
  const { mutate: logout, isPending: isLogout } = useLogout();

  return (
    <ButtonIcon disabled={isLogout} onClick={logout}>
      {isLogout ? (
        <SpinnerMini />
      ) : (
        <>
          <HiOutlineLogout color='white' />
          Logout
        </>
      )}
    </ButtonIcon>
  );
}
