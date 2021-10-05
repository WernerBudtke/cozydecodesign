const ProductCard = (props) => {
  console.log(props);
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="top"></div>
          <div className="bottom">
            <div className="details">
              <h1>Mugasd</h1>
              <p>$150</p>
            </div>
          </div>
        </div>
        <div className="inside">
          <div className="icon">SALE</div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
