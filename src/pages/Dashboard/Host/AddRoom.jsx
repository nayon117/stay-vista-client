import { Helmet } from "react-helmet-async";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import { useState } from "react";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import { addRoom } from "../../../api/rooms";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadedButtonText] = useState("Upload image");
  const navigate = useNavigate();

  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const to = dates.endDate;
    const from = dates.startDate;
    const price = form.price.value;
    const guests = form.total_guest.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const bedrooms = form.bedrooms.value;
    const image = form.image.files[0];
    const image_url = await imageUpload(image);
    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    const roomData = {
      location,
      category,
      title,
      to,
      from,
      price,
      guests,
      bathrooms,
      description,
      bedrooms,
      image: image_url?.data?.display_url,
      host,
    };

    try {
      setLoading(true);
       await addRoom(roomData);
      setUploadedButtonText("uploaded");
      toast.success("Room Added successfully");
      navigate("/dashboard/my-listings");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } 
   
  };

  // handle data ranges from react date range calender
  const handleDates = (ranges) => {
    setDates(ranges.selection);
  };

  const handleImageChange = (image) => {
    setUploadedButtonText(image.name);
  };

  return (
    <div>
      <Helmet>
        <title>Add Room | Dashboard </title>
      </Helmet>

      {/* form */}
      <AddRoomForm
        handleSubmit={handleSubmit}
        handleDates={handleDates}
        handleImageChange={handleImageChange}
        dates={dates}
        loading={loading}
        uploadButtonText={uploadButtonText}
      ></AddRoomForm>
    </div>
  );
};
export default AddRoom;
