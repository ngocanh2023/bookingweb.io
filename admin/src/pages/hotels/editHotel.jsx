import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

import "./addHotels.css"

const EditHotel = () => {
  const [editHotelData, setEditHotel] = useState([]);
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
  const navigate = useNavigate();

  console.log("editHotelData", editHotelData);

  const url = window.location.pathname.slice(19);
  console.log("url", url);

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
    formDataToSend.append("editId", url);
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
      const response = await fetch(
        "http://localhost:5000/hotels/postNewEditHotel",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

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

  const fetchEditData = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("http://localhost:5000/hotels/newEditProduct", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setEditHotel(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    fetchEditData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="features">
        <Sidebar />
        <div className="newProContainer">
          <div className="proTitle">EDIT HOTEL</div>
          {editHotelData && (
            <form onSubmit={handleSubmit}>
              <div className="productTotal">
                <div className="total1">
                  <div className="productName">
                    <div className="nameTitle">Name</div>
                    <div className="nameInput">
                      <input
                        type="text"
                        name="name"
                        placeholder={editHotelData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="productCity">
                    <div className="cityTitle">City</div>
                    <div className="cityInput">
                      <input
                        type="text"
                        name="city"
                        placeholder={editHotelData.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="productDistance">
                    <div className="distanceTitle">
                      Distance From City Center
                    </div>
                    <div className="distanceInput">
                      <input
                        type="text"
                        name="distance"
                        placeholder={editHotelData.distance}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="productDescription">
                    <div className="descriptionTitle">Description</div>
                    <div className="descriptionInput">
                      <input
                        type="text"
                        name="desc"
                        placeholder={editHotelData.desc}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="productImage">
                    <div className="imageTitle">Images</div>
                    <div className="imgInp">
                      <input
                        type="file"
                        name="images"
                        onChange={handleFileChange}
                        multiple
                      />
                    </div>
                  </div>
                </div>
                <div className="total2">
                  <div className="productType">
                    <div className="typeTitle">Type</div>
                    <div className="typeInput">
                      <input
                        type="text"
                        name="type"
                        placeholder={editHotelData.type}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="productAddress">
                    <div className="addressTitle">Address</div>
                    <div className="addressInput">
                      <input
                        type="text"
                        name="address"
                        placeholder={editHotelData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="productTitle">
                    <div className="bestTitle">Title</div>
                    <div className="titleInput">
                      <input
                        type="text"
                        name="title"
                        placeholder={editHotelData.title}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="productPrice">
                    <div className="priceTitle">Price</div>
                    <div className="priceInput">
                      <input
                        type="number"
                        name="price"
                        placeholder={editHotelData.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="productFeatured">
                    <div className="featuredTitle">Featured</div>
                    <div className="feaInp">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleCheckboxChange}
                      />
                      <label>Featured</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="productRoom">
                <div className="roomTitle">Rooms</div>
                <div className="roomInput">
                  <textarea
                    type="text"
                    name="rooms"
                    placeholder="2 BedRooms 
                                1 BedRoom 
                                Basement Double Room
                                Superior Basement Room
                                Delivery Room 
                            "
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="btnSubmit">
              <button type="submit">Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
