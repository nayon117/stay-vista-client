/* eslint-disable react/prop-types */
// import { formatDistance } from "date-fns";
// import { useState } from "react";
import Button from "../Button/Button";
import Calender from "./Calender";

const RoomReservation = ({ room }) => {

    // const [value, setValue] = useState({
    //     startDate: new Date(room?.from),
    //     endDate: new Date(room?.to),
    //     key:'selection'
    // })
    
    // const totalDays = parseInt(formatDistance(new Date(room?.to), new Date(room?.from)).split(' ')[0])
    // const totalPrice = totalDays * room?.price
    // console.log(totalPrice);

  return (
    <div className="border-[1px] border-neutral-200 rounded-xl overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-bold">$ {room?.price}</div>
        <div className="font-light text-neutral-600">per night</div>
      </div>
      <hr />
      <div className="flex justify-center  ">
        <Calender></Calender>
      </div>
      <hr />
      <div className="p-4">
        <Button label={'Reserve'}></Button>
          </div>
          <hr />
          <div className="p-4 flex justify-between items-center text-lg font-bold">
              <div>Total</div>
              <div>$ {room?.price }</div>
          </div>
    </div>
  );
};
export default RoomReservation;
