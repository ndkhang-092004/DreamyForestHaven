import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useDarkMode } from "../context/DarkModeContext";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <StyledHeaderMenu>
        <li
          data-tooltip-id='appearance-modes'
          data-tooltip-content={isDarkMode ? "Light mode" : "Dark Mode"}
          data-tooltip-place='bottom'
          data-tooltip-variant={isDarkMode ? "dark" : "light"}
        >
          <DarkModeToggle />
        </li>
        <li
          data-tooltip-id='account'
          data-tooltip-content='Your Account'
          data-tooltip-place='bottom'
          data-tooltip-variant={isDarkMode ? "dark" : "light"}
        >
          <ButtonIcon onClick={() => navigate("/account")}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li
          data-tooltip-id='logout'
          data-tooltip-content='Log Out'
          data-tooltip-place='bottom'
        >
          <Logout />
        </li>
      </StyledHeaderMenu>
      <Tooltip id='appearance-modes' border='2px solid rgb(222, 222, 222)' />
      <Tooltip id='account' border='2px solid rgb(222, 222, 222)' />
      <Tooltip
        id='logout'
        style={{ backgroundColor: "rgb(250, 23, 23)", color: "#ffffff" }}
      />
    </>
  );
}
