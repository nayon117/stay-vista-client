import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Shared/Loader";
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import Header from "../../components/RoomDetails/Header";
import RoomInfo from "../../components/RoomDetails/RoomInfo";
import RoomReservation from "../../components/RoomDetails/RoomReservation";

const RoomDetails = () => {
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState({});
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch("/rooms.json")
      .then((res) => res.json())
      .then((data) => {
        const singleRoom = data.find((room) => room._id === id);
        setRoom(singleRoom);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader></Loader>;

  return (
    <Container>
      <Helmet>
        <title>{room?.title}</title>
      </Helmet>
     {room && <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          {/* header */}
          <Header room={room}></Header>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-12">
          {/* room info */}
          <RoomInfo room={room}></RoomInfo>
          <div className="md:col-span-3 order-first md:order-last">
            {/* calender */}
            <RoomReservation room={room}></RoomReservation>
          </div>
        </div>
      </div>}
    </Container>
  );
};
export default RoomDetails;
