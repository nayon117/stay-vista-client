/* eslint-disable react/prop-types */
import { formatDistance } from "date-fns";
import { useState } from "react";
import Button from "../Button/Button";
import Calender from "./Calender";
import BookingModal from "../Modal/BookingModal";
import useAuth from "../../hooks/useAuth";

const RoomReservation = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
   

  const closeModal = () => {
    setIsOpen(false);
  };

  const [value, setValue] = useState({
    startDate: new Date(room?.from),
    endDate: new Date(room?.to),
    key: "selection",
  });

  const totalDays = parseInt(
    formatDistance(new Date(room?.to), new Date(room?.from)).split(" ")[0]
  );
  const totalPrice = totalDays * room?.price;
  

  const handleDateChange = ranges => {
    console.log(ranges)
    setValue({
      startDate: new Date(room?.from),
      endDate: new Date(room?.to),
      key: 'selection',
    })
  }

  const [bookingInfo, setBookingInfo] = useState({
    guest: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    host: room?.host?.email,
    location: room?.location,
    price: totalPrice,
    to: value.endDate,
    from: value.startDate,
    title: room?.title,
    roomId: room?._id,
    image: room?.image,
  })

  return (
    <div className="border-[1px] border-neutral-200 rounded-xl overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-bold">$ {room?.price}</div>
        <div className="font-light text-neutral-600">per night</div>
      </div>
      <hr />
      <div className="flex justify-center  ">
        <Calender handleDateChange={handleDateChange} value={value}></Calender>
      </div>
      <hr />
      <div className="p-4">
        <Button disabled={room?.host?.email===user?.email || room.booked} onClick={() => setIsOpen(true)} label={"Reserve"}></Button>
      </div>
      <hr />
      <div className="p-4 flex justify-between items-center text-lg font-bold">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
      <BookingModal closeModal={closeModal} isOpen={isOpen} bookingInfo={bookingInfo} />
    </div>
  );
};
export default RoomReservation;
