import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Shared/Loader";
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";

const RoomDetails = () => {
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState({});
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch("/rooms.json")
      .then((res) => res.json())
        .then(data => {
            const singleRoom = data.find(room => room._id === id)
            setRoom(singleRoom)
        setLoading(false)
    })
  }, [id]);

  if (loading) return <Loader></Loader>;

  return (
      <Container>
          <Helmet>
              <title>{room?.title }</title>
          </Helmet>
          <div>
              <div className="flex flex-col gap-6">
                  {/* header */}
              </div>
              <div>
                  {/* room info */}
              </div>
              {/* calender */}
          </div>
    </Container>
  );
};
export default RoomDetails;
