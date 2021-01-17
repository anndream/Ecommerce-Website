import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
	root: {
		width: "auto",
		height: "auto",
		flexDirection: "column",
		justifyContent: "center",
	},
	img: {
		margin: "1rem 0 0 0",
		objectFit: "scale-down",
	},
});

const ProductCard = ({ product, cart, setCart }) => {
	const classes = useStyles();

	const history = useHistory();

	const {
		itemName,
		_id: id,
		cost,
		imageURL,
		rating,
		numberOfRatings,
	} = product;

	return (
		<div className="col-lg-2 col-md-3 col-sm-6 product-card">
			<div className="homeCard">
				<div
					onClick={() => {
						console.log("Product Details:", product);
						history.push(`/productDetails/${product._id}`);
					}}
				>
					<div className="mb-3">
						<CardMedia
							component="img"
							alt={itemName}
							src={imageURL}
							className={classes.img}
							title={itemName}
						/>
					</div>
					<b>{itemName}</b>
					<div className="cardContent">
						Rating:{" "}
						{rating ? (
							<span
								className={
									rating < 2 ? "rating1" : rating < 4 ? "rating2" : "rating3"
								}
							>
								<b>{rating}</b>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="30"
									fill="currentColor"
									className="bi bi-star"
									viewBox="0 3 16 16"
								>
									<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
								</svg>
							</span>
						) : (
							"This Item has not been rated yet."
						)}
						<span className="text-muted ml-2 numRatings">
							({numberOfRatings} {numberOfRatings === 1 ? "rating" : "ratings"})
						</span>
					</div>
					<div className="cardContent">
						<b>Rs {cost}</b>
						<span className="originalCost text-muted">
							Rs {Math.round(cost / 0.8)}
						</span>
						<span className="discount">(20% OFF)</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;

/****************************************************************OLD CARD********************************************************** */
/*
<div className="homeCard bg-white flex-container col-lg-3">
        <img className="itemImg" alt={itemName} src={imageURL} />
        <div className="justify-content-center">
          <h2>{product.itemName}</h2>
          <p>{description}</p>
          <p>Rs {cost}</p>
          <p>
            Rating:{" "}
            {rating ? (
              <span
                className={
                  rating < 2 ? "rating1" : rating < 4 ? "rating2" : "rating3"
                }
              >
                <b>{rating}</b>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="30"
                  fill="currentColor"
                  className="bi bi-star"
                  viewBox="0 3 16 16"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>
              </span>
            ) : (
              "This Item has not been rated yet."
            )}
            <span className="text-muted ml-2">
              ({numberOfRatings} {numberOfRatings === 1 ? "rating" : "ratings"})
            </span>
          </p>
        </div>
        <div className="cardButton">
          <button
            type="button"
            className="btn btn-primary "
            onClick={() => (buttonState ? null : addToCart(product))}
          >
            {isAuth ? (
              buttonState ? (
                <Link to="/cart" className="btn text-white">
                  Go to Cart
                </Link>
              ) : (
                "Add to Cart"
              )
            ) : (
              <Link to="/login" className="btn text-white">
                Add to Cart
              </Link>
            )}
            <span className="m-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart-plus-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM4 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm7 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      */