import { useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import "./newProduct.css";

const NewProduct = () => {
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
  // const [imageInfo, setImageInfo] = useState();

  // console.log("imageInfo", imageInfo);

  const navigate = useNavigate();

  // let items = JSON.parse(localStorage.getItem("urls")) || [];
  // console.log("items", items);

  // function saveData(data) {
  //   if (data !== "") {
  //     var a;
  //     a = JSON.parse(localStorage.getItem("urls")) || [];
  //     a.push(data);
  //     localStorage.setItem("urls", JSON.stringify(a));
  //   }
  // }

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
      navigate("/hotels");
    }
  };

  const postData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      city: city,
      distance: distance,
      desc: desc,
      type: type,
      address: address,
      title: title,
      price: price,
      featured: featured,
      rooms: rooms,
      photos: photos,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("http://localhost:5000/hotels/newProduct", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result", result);
      })
      .catch((error) => console.log("error", error));
  };

  const renderList = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      photos: photos,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/hotels/images", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
  };
  // const getListPhotos = () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   fetch("http://localhost:5000/hotels/images", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       console.log(result);
  //       setImageInfo(result);
  //     })
  //     .catch((error) => console.error(error));
  // };

  // useEffect(() => {
  //   getListPhotos()
  // }, [])

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
                      placeholder="My Hotel"
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
                      placeholder="New York"
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
                      placeholder="500"
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
                      placeholder="Description"
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
                      placeholder="Hotel"
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
                      placeholder="Elton st,216"
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
                      placeholder="The best Hotel"
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
                      placeholder="100"
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
            {/* <div className="imageURL">{imageInfo}</div> */}
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
                  postData();
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

export default NewProduct;
