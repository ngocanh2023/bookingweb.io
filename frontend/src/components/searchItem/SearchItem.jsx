import "./searchItem.css";

const SearchItem = (props) => {
  const dataItem = props.dataHotel;
  // console.log("props", props, typeof props);
  // console.log("data", props.dataHotel, typeof props.dataHotel);
  // console.log({ dataItem });

  const renderList = () => {
    return (
    dataItem?.map((data, index) => (
      <div className="searchItem" key={index}>
        <img src={data.photos} alt="" className="siImg" />
        <div className="siDesc">
          <h1 className="siTitle">{data.name}</h1>
          <span className="siDistance">{data.distance}m from center</span>
          <span className="siSubtitle">{data.address}</span>
          <span className="siFeatures">{data.type}</span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>{data.rating}</span>
          </div>
          <div className="siDetailTexts">
            <span className="siPrice">${data.cheapestPrice}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <button className="siCheckButton">See availability</button>
          </div>
        </div>
      </div>
      )
      )
    )
    };

  return (<div>{renderList()}</div>)
};

export default SearchItem;
