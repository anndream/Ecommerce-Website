import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UserDetails({ user, setUser, setLoaded }) {
	const history = useHistory();
	const [editable, setEditable] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const updateUser = async () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				firstName: user.name.firstName,
				lastName: user.name.lastName,
				phone: user.phone,
				email: user.email,
				orders: user.orders,
			}),
		};
		const result = await (
			await fetch("/editUserDetails", requestOptions)
		).json();
		if (result.response === false) {
			setShowModal(true);
		}
	};

	const cancelOrder = async (orderId) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				orderId: orderId,
			}),
		};
		const result = await (await fetch("/cancelOrder", requestOptions)).json();
		console.log("CO_response:", result.response);
		if (result.response) {
			let ordersList = user.orders;
			ordersList = ordersList.filter(
				(orderElement) => orderElement._id !== orderId
			);
			console.log("ordersList", ordersList);
			setUser({
				...user,
				orders: ordersList,
			});
		} else {
			setShowModal(true);
		}
	};

	const handleClose = () => {
		setShowModal(false);
		setShowDeleteModal(false);
	};

	const handleUserDelete = async (e) => {
		e.preventDefault();
		let orders = user.orders;
		for (let i = 0; i < orders.length; i++) {
			if (orders[i].deliveryStatus === false) {
				setShowDeleteModal(true);
				return;
			}
		}
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({}),
		};
		const result = await (await fetch("/deleteUser", requestOptions)).json();
		if (result.response === false) {
			setShowModal(true);
		} else {
			setLoaded(false);
			history.push("/login");
			history.go();
		}
	};
	return (
		<>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>OOPS!!</Modal.Title>
				</Modal.Header>
				<Modal.Body>Session Timeout</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose} href="/login">
						Login
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={showDeleteModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Failed To Delete !</Modal.Title>
				</Modal.Header>
				<Modal.Body>You have Pending Orders</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						close
					</Button>
				</Modal.Footer>
			</Modal>

			<div className="product flex-container userbackground">
				<div className="flex-child1 rounded userbackground">
					<h1>Your Orders</h1>
					{user.orders !== undefined && user.orders.length > 0 ? (
						<div>
							{user.orders
								.slice(0)
								.reverse()
								.map((element, index) => {
									return (
										<div key={index} className="orderContainer">
											<h3>
												Order No. {index + 1}
												<button
													onClick={() =>
														cancelOrder(
															user.orders[user.orders.length - index - 1]._id
														)
													}
													className="cancelOrderButton mr-5 float-right"
												>
													{user.orders[user.orders.length - index - 1]
														.deliveryStatus === true
														? "Return Product"
														: "Cancel Order"}
												</button>
											</h3>
											<p>
												<b>Date Of Order : </b>
												{element.dateOfOrder
													.toString()
													.substring(
														0,
														element.dateOfOrder.toString().length - 30
													)}
											</p>
											<p>
												<b>Order ID : </b>
												{element._id}
											</p>
											{element.order.map((item, i) => {
												return (
													<div
														className="ordersList flex-container p-2"
														key={i}
													>
														<div className="flex-child5">
															<img
																src={item.item.imageURL}
																alt="item"
																className="orderImgs"
															/>
														</div>
														<div className="flex-child6">
															<b>{item.item.itemName}</b>, Cost :{" "}
															{item.item.cost}, Qty : {item.Qty}
															<br />
															<span className="text-muted">
																{item.item.description}
															</span>
														</div>
													</div>
												);
											})}
											<b>Total Cost:</b>
											{user.orders[user.orders.length - index - 1].totalCost}
											<p>
												<b>Delivery Status : </b>
												{user.orders[user.orders.length - index - 1]
													.deliveryStatus === true ? (
													<span className="delivered">Delivered.</span>
												) : (
													<span className="pending">Pending...</span>
												)}
											</p>
										</div>
									);
								})}
						</div>
					) : (
						<>
							<img
								src="https://www.mageworx.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/2/6/26_extended_orders_grid.png"
								alt="Order list empty"
								className="mx-auto d-block"
							/>
							<p className="text-center text-muted lead">
								Looks like your order list is empty.
							</p>
						</>
					)}
				</div>
				<div className="flex-child2 userdetails sticky-top">
					<h1>User Details</h1>
					<br />
					<form className="userform">
						{editable ? (
							<h6
								className="edituser"
								onClick={() => {
									setEditable(false);
									updateUser();
								}}
							>
								Update
							</h6>
						) : (
							<h6
								className="edituser"
								onClick={() => {
									setEditable(true);
								}}
							>
								Edit
							</h6>
						)}

						<div className="form-group">
							<h5>Personal Information</h5>
							<input
								type="text"
								className="mr-2"
								value={user.name.firstName || ""}
								name="FirstName"
								disabled={editable ? "" : "disabled"}
								onChange={(e) => {
									setUser({
										...user,
										name: {
											firstName: e.target.value,
											lastName: user.name.lastName,
										},
									});
								}}
							/>
							<input
								type="text"
								value={user.name.lastName || ""}
								name="LastName"
								disabled={editable ? "" : "disabled"}
								onChange={(e) => {
									setUser({
										...user,
										name: {
											firstName: user.name.firstName,
											lastName: e.target.value,
										},
									});
								}}
							/>
						</div>
						<br />
						<div className="form-group">
							<h5>Email address</h5>

							<input
								type="text"
								value={user.email || ""}
								name="Email"
								disabled={editable ? "" : "disabled"}
								onChange={(e) => {
									setUser({ ...user, email: e.target.value });
								}}
							/>
						</div>
						<br />
						<div className="form-group">
							<h5>Mobile Number</h5>

							<input
								type="text"
								value={user.phone || ""}
								name="Phno"
								disabled={editable ? "" : "disabled"}
								onChange={(e) => {
									setUser({ ...user, phone: e.target.value });
								}}
							/>
						</div>
						<button className="btn btn-danger" onClick={handleUserDelete}>
							Delete User
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default UserDetails;
