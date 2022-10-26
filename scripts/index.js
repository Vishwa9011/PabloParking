// ? ==> Creating Vehicle Class
class Vehicle {
	constructor(owner, reg_n, type) {
		this.owner = owner;
		this.reg_n = reg_n;
		this.type = type;
	}
}

// ? ==> Extending the from Vehicle Class car
class Car extends Vehicle {
	constructor(owner, reg_n) {
		super(owner, reg_n, "Car");
	}
}

//? ==> Extending the from Vehicle Class Jeep
class Jeep extends Vehicle {
	constructor(owner, reg_n) {
		super(owner, reg_n, "Jeep");
	}
}
// ? ==> Extending the from Vehicle Class Bus
class Bus extends Vehicle {
	constructor(owner, reg_n) {
		super(owner, reg_n, "Bus");
	}
}

// ? ==> Extending the from Vehicle Class Bike
class Bike extends Vehicle {
	constructor(owner, reg_n) {
		super(owner, reg_n, "Bike");
	}
}

//? ==> Extending the from Vehicle Class Truck
class Truck extends Vehicle {
	constructor(owner, reg_n) {
		super(owner, reg_n, "Truck");
	}
}

// TODO ==> Creating the vehicleSlot component Class
class VehicleSlot {
	constructor(vehicleType, slotNumber) {
		this.vehicleType = vehicleType;
		this.slotNumber = slotNumber;
		this.isBooked = false;
	}
}

// TODO ==> Creating the parkingLane component Class
class ParkingLane {
	// #maxSlots;
	constructor(vehicleType, maxSlots, laneNumber) {
		this.vehicleType = vehicleType;
		this.laneNumber = laneNumber;
		this.Lane = [];
		for (let i = 0; i < maxSlots; i++) {
			let slot = new VehicleSlot(vehicleType, i + 1);
			this.Lane.push(slot);
		}
	}
}
// TODO ==> Creating the ParkingFloor component Class
class ParkingFloor {
	constructor(floorNumber, maxLane) {
		this.floorNumber = floorNumber;
		this.floor = [];
		for (let i = 0; i < maxLane; i++) {
			let lane;
			switch (i) {
				case 0:
					lane = new ParkingLane("Bike", 5, i + 1);
					break;
				case 1:
					lane = new ParkingLane("Jeep", 5, i + 1);
					break;
				case 2:
					lane = new ParkingLane("Car", 5, i + 1);
					break;
				case 3:
					lane = new ParkingLane("Bus", 5, i + 1);
					break;
				case 4:
					lane = new ParkingLane("Truck", 5, i + 1);
					break;
			}
			this.floor.push(lane);
		}
	}

	// addLane() {}
}

// TODO ==> make the pabloParking class
class PabloParking {
	constructor(maxFloor) {
		this.totalFloor = [];
		for (let i = 0; i < maxFloor; i++) {
			let parkingFloor = new ParkingFloor(i + 1, 5);
			this.totalFloor.push(parkingFloor);
		}
	}
}
// TODO ==> ----------------------------findSLoFromClass----------------------------
function findSlotForClass(vehicleType, vehicle) {
	for (let floor of pabloParking.totalFloor) {
		for (let lane of floor.floor) {
			if (lane.vehicleType == vehicleType) {
				for (let slot of lane.Lane) {
					if (slot.isBooked == false) {
						slot.vehicle = vehicle;
						return {
							slot: slot,
							floor: floor.floorNumber,
							lane: lane.laneNumber,
						};
					}
				}
			}
		}
	}

	// IF all condition will false then return
	return false;
}

//TODO ==> -----------------BookSlot()-----------------

function bookSlot(vehicle) {
	let find = findSlotForClass(vehicle.type, vehicle);
	if (!find) {
		console.error("We have no slot for vehicle type " + vehicleType);
	} else {
		console.log(
			`${vehicle.owner}, Sir You got Slot for your ${vehicle.type}`,
		);
		find.slot.isBooked = true;
		return find;
	}
}

//TODO ==> ------------DOM manupulataion------------
const vehicleType = document.querySelector("#vehicleType");
const vehicleList = document.querySelector("#vehicle");
let type;

// vehicaleType Mouseover
vehicleType.onmouseover = (event) => {
	vehicleList.style.display = "flex";
};

// vehicaleType Mouseout
vehicleType.onmouseout = (event) => {
	vehicleList.style.display = "none";
};

// vehicaleType Click
vehicleList.onclick = (event) => {
	let selected_vehicle = document.querySelector(".form-enhancer img");

	if (event.target.nodeName === "LI") {
		vehicleList.style.display = "none";
		type = event.target.textContent;
		selected_vehicle.src = `./images/${type}.png`;
		vehicleType.children[0].textContent = type;
	}
	// console.log("type: ", type);
};

// TODO ==> ------------------PabloParking intialized------------------
let pabloParking =
	JSON.parse(localStorage.getItem("pabloParking")) || new PabloParking(4);
console.log("pabloParking: ", pabloParking);

// TODO ==> ----------------- FindSlot function from DOM-----------------
const findSlot = () => {
	const form = document.querySelector("form");
	const name = form.name.value;
	const reg_num = form.reg_num.value;
	const vehicle_type = type;

	let temp = [name, reg_num, vehicle_type];
	// console.log("temp: ", temp);
	if (temp.includes(undefined) || temp.includes("")) {
		alert();
		return;
	}

	let vehicle;
	switch (vehicle_type) {
		case "Jeep":
			vehicle = new Jeep(name, reg_num);
			break;
		case "Bike":
			vehicle = new Bike(name, reg_num);
			break;
		case "Car":
			vehicle = new Car(name, reg_num);
			break;
		case "Bus":
			vehicle = new Bus(name, reg_num);
			break;
		case "Truck":
			vehicle = new Truck(name, reg_num);
			break;
	}

	// Calling bookSlot()
	let val = bookSlot(vehicle);

	// Overlay from dom element
	document.querySelector(".overlay-searching").style.display = "flex";
	clearInterval(defaultVisual);

	// SetTimeOut for show the parking visualization
	setTimeout(() => {
		document.querySelector(".overlay-searching").style.display = "none";
		colorBookedSlots(val);
	}, 3500);

	// Setting the Data into localStorage to retreve past data
	localStorage.setItem("pabloParking", JSON.stringify(pabloParking));
	// console.log({ name, reg_num, vehicle_type });
};

// TODO ==> VisualizationParking System for Particular Lane
const visualSearchParkingPlace = (laneNumber, slotNumber) => {
	let lane = document.querySelector(`#lane${laneNumber}`);
	lane = lane.children;
	// console.log({ lane });
	let count = 0;
	let id = setInterval(() => {
		if (count > 0) {
			lane[count - 1].style.background = "white";
		}
		lane[count].style.background = "cyan";
		count++;
		if (count == slotNumber) {
			clearInterval(id);
		}
	}, 500);
	let countlane = 0;
	let id1 = setInterval(() => {
		let val = lane[countlane].childNodes[1];
		countlane++;
		val.style.opacity = 1;
		if (countlane == slotNumber) {
			clearInterval(id1);
		}
	}, 700);
};

// TODO ==> --------------Make Beautiful GIF Look--------------
let defaultVisual = setInterval(() => {
	let val = Math.ceil(Math.random() * 5);
	let val2 = Math.floor(Math.random() * 5);
	visualSearchParkingPlace(Math.abs(val - val2) || 1, val);
	clearVisualization();
}, 3500);

// TODO==> -----------------color BookedSlots-----------------
const colorBookedSlots = (data) => {
	// Cleaning the parkingFloor
	clearVisualization();

	//Debugging
	// console.log("data: ", data);
	// console.log("data: ", data.floor);
	// console.log("pabloParking: ", pabloParking.totalFloor[0]);

	// we are append img of slot insteead vehicleType slot which is given by the user
	let countlane = 1;
	for (let lane of pabloParking.totalFloor[data.floor - 1].floor) {
		let countslot = 1;
		for (let slot of lane.Lane) {
			if (slot.isBooked) {
				if (countlane == data.lane) continue;
				let temp = document.querySelector(`#lane${countlane}`);
				temp = temp.children[countslot - 1].childNodes[1];
				temp.style.opacity = "1";
				// console.log(temp);
			}
			countslot++;
		}
		countlane++;
	}
	// Invoking the visualSearchParkingPlace for the given type of vehicle
	visualSearchParkingPlace(
		data.lane,
		data.slot.slotNumber,
		data.slot.vehicleType,
	);

	// Creating Receipt for the User
	createReceipt(data);
};

//TODO ==> Clear visualization for clear the parking and then showing the data
const clearVisualization = () => {
	let floor = document.querySelector("#floor");
	// console.log(floor.children);
	for (let lane of floor.children) {
		for (let slot of lane.children) {
			slot.children[0].style.opacity = ".2";
			slot.style.background = "white";
		}
	}
};

// TODO ==>  Implementation for Creating the Recipt Data
const createReceipt = (data) => {
	console.log("data: ", data);

	// Dom Manupulataion For the receipt
	const receipt_no = document.querySelector(".recipt span");
	const date = document.querySelector(".date span");
	const name = document.querySelector(".name span");
	const reg_num = document.querySelector(".reg_num span");
	const type_r = document.querySelector(".type span");
	const floor_r = document.querySelector(".floor span");
	const Lane = document.querySelector(".Lane span");
	const Slot = document.querySelector(".Slot span");
	const promo = document.querySelector(".promo input");
	const price = document.querySelector(".totalPrice span");
	const promo_btn = document.querySelector(".apply_promo button");
	const pay = document.querySelector(".pay button > span");

	// Receipt
	receipt_no.innerHTML = `PP${Math.floor(Math.random() * 1000)}`;

	//Date
	const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const currDate = new Date();
	date.innerHTML = `${currDate.getDate()} ${month[currDate.getMonth()]}, ${currDate.getFullYear()}`;

	// Destructuring
	const { floor, slot: { vehicle: { owner, reg_n, type }, slotNumber }, lane } = data

	name.innerHTML = owner;
	reg_num.innerHTML = reg_n;
	type_r.innerHTML = type;
	floor_r.innerHTML = floor;
	Lane.innerHTML = lane;
	Slot.innerHTML = slotNumber;

	// pricing
	const pricing = {
		Bike : 10,
		Car : 50,
		Jeep : 80,
		Bus : 120,
		Truck : 150
	}

	price.innerHTML = `₹ ${pricing[type]}.00/-`
	
	pay.innerHTML = `₹ ${pricing[type]}.00/-`
	
	//PromoCode
	promo_btn.onclick = () => {
		if (promo.value == "PABLO30") {
			price.innerHTML = `₹ ${pricing[type] * .7}.00/-`;
			pay.innerHTML = `₹ ${pricing[type] * .7}.00/-`
		}
	}

	
};
