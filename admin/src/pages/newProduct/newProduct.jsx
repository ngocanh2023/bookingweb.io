import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import "./newProduct.css";

const NewProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    distance: "",
    desc: "",
    type: "",
    address: "",
    title: "",
    price: "",
    featured: false,
    rooms: "",
    images: [],
  });

  console.log("formData", formData);
  console.log("formData.images", formData.images[0], formData?.images);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, featured: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("distance", formData.distance);
    formDataToSend.append("desc", formData.desc);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("featured", formData.featured);
    formDataToSend.append("rooms", formData.rooms);

    for (let i = 0; i < formData.images.length; i++) {
      formDataToSend.append("images", formData.images[i]);
    }

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Form data saved successfully");
        navigate("/hotels");
      } else {
        throw new Error("An error occurred while saving the form data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the form data");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="features">
        <Sidebar />
        <div className="newProContainer">
          <h3>Add New Hotel</h3>
          <form onSubmit={handleSubmit}>
            <div className="nameInp">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            /></div>
            <div className="cityInp">
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
            /></div>
            <div className="distanceInp">
            <input
              type="number"
              name="distance"
              placeholder="Distance"
              onChange={handleChange}
            /></div>
            <div className="descInp">
            <textarea
              name="desc"
              placeholder="Description"
              onChange={handleChange}
            /></div>
            <div className="typeInp">
            <input
              type="text"
              name="type"
              placeholder="Type"
              onChange={handleChange}
            /></div>
            <div className="addressInp">
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
            /></div>
            <div className="titleInp">
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
            /></div>
            <div className="priceInp">
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
            /></div>
            <div className="featuredInp">
            
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleCheckboxChange}
            /><label>Featured</label> 
            </div>
            <div className="roomInp">
            <input
              type="number"
              name="rooms"
              placeholder="Rooms"
              onChange={handleChange}
            /></div>
            <div className="imageInp">
            <input
              type="file"
              name="images"
              onChange={handleFileChange}
              multiple
            />
            </div>
            <div className="submitBtn">
            <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
