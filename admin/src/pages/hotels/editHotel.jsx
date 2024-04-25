import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import "../newProduct/newProduct.css";

const EditHotel = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [distance, setDistance] = useState("");
  const [desc, setDesc] = useState("");
  const [rooms, setRooms] = useState([]);
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [inform, setInform] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [editHotelData, setEditHotel] = useState([]);

  const navigate = useNavigate();

  console.log("editHotelData", editHotelData);

  let items = JSON.parse(localStorage.getItem("urls")) || [];
  // console.log("items", items);

  const url = window.location.pathname.slice(19);
  console.log("url", url);

  function saveData(data) {
    if (data !== "") {
      var a;
      a = JSON.parse(localStorage.getItem("urls")) || [];
      a.push(data);
      localStorage.setItem("urls", JSON.stringify(a));
    }
  }

  const checkValidate = () => {
    if (
      !name ||
      !city ||
      !distance ||
      !desc ||
      !photos ||
      !rooms ||
      !type ||
      !address ||
      !title ||
      !price
    ) {
      setInform(!inform);
    } else {
      // console.log("Done!");
      postEditData();
      navigate("/hotels");
    }
  };

  const postEditData = () => {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name": name,
  "city": city,
  "distance": distance,
  "desc": desc,
  "title": title,
  "price": price,
  "rooms": rooms,
  "featured": featured,
  "photos": photos,
  "address": address,
  "type": type
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:5000/hotels/postNewEditHotel", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  }


  const renderList = () => {
    items = JSON.parse(localStorage.getItem("urls")) || [];
    // console.log("itemsss", items);
    if (items) {
      items.map((item, i) => {
        // console.log("item33", item, typeof item);

        return (
          <div className="itemImage">
            <div className="imageNo">image {i + 1}</div>
            <div className="removeURL">Remove</div>
          </div>
        );
      });
    }
  };

  const fetchEditData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/hotels/newEditProduct", requestOptions)
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
          <div className="proTitle">Add New Product</div>
          <div className="total0">
            <div className="productTotal">
              <div className="total1">
                <div className="productName">
                  <div className="nameTitle">Name</div>
                  <div className="nameInput">
                    <input
                      placeholder={editHotelData.name}
                      //   value={editHotelData.name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="productCity">
                  <div className="cityTitle">City</div>
                  <div className="cityInput">
                    <input
                      placeholder={editHotelData.city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="productDistance">
                  <div className="distanceTitle">Distance From City Center</div>
                  <div className="distanceInput">
                    <input
                      placeholder={editHotelData.distance}
                      onChange={(e) => {
                        setDistance(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="productDescription">
                  <div className="descriptionTitle">Description</div>
                  <div className="descriptionInput">
                    <input
                      placeholder={editHotelData.desc}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="productImage">
                  <div className="imageTitle">Images</div>
                  <div className="imageInput">
                    <input
                      placeholder={editHotelData.photos}
                      type="url"
                      name="image"
                      onChange={(e) => {
                        setPhotos(e.target.value);
                      }}
                    />
                    <div className="addBtn">
                      <button
                        onClick={() => {
                          if (photos) {
                            saveData(photos);
                            renderList();
                          }
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="total2">
                <div className="productType">
                  <div className="typeTitle">Type</div>
                  <div className="typeInput">
                    <input
                      placeholder={editHotelData.type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="productAddress">
                  <div className="addressTitle">Address</div>
                  <div className="addressInput">
                    <input
                      placeholder={editHotelData.address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="productTitle">
                  <div className="bestTitle">Title</div>
                  <div className="titleInput">
                    <input
                      placeholder={editHotelData.title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="productPrice">
                  <div className="priceTitle">Price</div>
                  <div className="priceInput">
                    <input
                      placeholder={editHotelData.price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="productFeatured">
                  <div className="featuredTitle">Featured</div>
                  <div className="featuredInput">
                    <select
                      onChange={(e) => {
                        setFeatured(e.target.value);
                      }}
                    >
                      <option>No</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="imageURL">
              {
                // items &&
                renderList()
              }
            </div>
            <div className="productRoom">
              <div className="roomTitle">Rooms</div>
              <div className="roomInput">
                <textarea
                  placeholder="2 BedRooms 
                                1 BedRoom 
                                Basement Double Room
                                Superior Basement Room
                                Delivery Room 
                            "
                  onChange={(e) => {
                    setRooms(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            {inform && <div className="informBlank">Please fill in blank!</div>}
            <div className="sendBtn">
              <button
                onClick={() => {
                    // postEditData();
                  checkValidate();
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
