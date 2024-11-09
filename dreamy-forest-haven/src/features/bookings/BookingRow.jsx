import styled from "styled-components";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useCheckout from "../check-in-out/useCheckout";
import { format, isToday } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { HiEye } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDeleteBooking } from "../check-in-out/useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const { checkout, isCheckout } = useCheckout();
  const { mutate: deleteBooking, isPending: isDeleteBooking } =
    useDeleteBooking();
  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Modal>
        <Cabin>{cabinName}</Cabin>

        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>

        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </Stacked>

        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

        <Amount>{formatCurrency(totalPrice)}</Amount>

        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              More details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiUsers />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiOutlineLogout />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckout}
              >
                Check out
              </Menus.Button>
            )}
            <Modal.Open opens='delete-booking-row'>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name='delete-booking-row'>
          <ConfirmDelete
            resourceName='booking'
            disabled={isDeleteBooking}
            onConfirm={() =>
              deleteBooking(bookingId, {
                onSettled: () => navigate(-1),
              })
            }
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
