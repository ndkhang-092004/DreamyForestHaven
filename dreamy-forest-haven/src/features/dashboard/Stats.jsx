import Stat from "./Stat";
import { BsFillBackpack3Fill } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, totalCabins }) {
  const numBookings = bookings.length;
  const revenue = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const numConfirmedStays = confirmedStays.length;
  const occupation = Math.round(
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * totalCabins)) *
      100
  );

  return (
    <>
      <Stat
        title='Bookings'
        color='indigo'
        value={numBookings}
        icon={<BsFillBackpack3Fill />}
      />
      <Stat
        title='Revenue'
        color='green'
        value={formatCurrency(revenue)}
        icon={<RiMoneyDollarCircleFill />}
      />
      <Stat
        title='Check ins'
        color='blue'
        value={numConfirmedStays}
        icon={<BsCalendar2CheckFill />}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        value={`${occupation < 1 ? "< 1" : occupation}%`}
        icon={<BsFillBarChartLineFill />}
      />
    </>
  );
}

export default Stats;
