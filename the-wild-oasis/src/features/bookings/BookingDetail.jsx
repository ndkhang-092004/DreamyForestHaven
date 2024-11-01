import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import useBookingDetail from "./useBookingDetail";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import { useDeleteBooking } from "../check-in-out/useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { mutate: deleteBooking, isPending: isDeleteBooking } =
    useDeleteBooking();
  const { checkout, isCheckout } = useCheckout();
  const { isPending, bookingDetail = {} } = useBookingDetail();
  const { status, id } = bookingDetail;

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isPending) return <Spinner />;

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookingDetail} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens='delete-booking'>
            <Button>Delete</Button>
          </Modal.Open>

          <Modal.Window name='delete-booking'>
            <ConfirmDelete
              resourceName='booking'
              disabled={isDeleteBooking}
              onConfirm={() => deleteBooking(id)}
            />
          </Modal.Window>
        </Modal>

        {status === "checked-in" && (
          <Button onClick={() => checkout(id)} disabled={isCheckout}>
            Check out
          </Button>
        )}

        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
        )}

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
