// ? Vehicle
class Vehicle {
	constructor(owner, reg_n, type) {
		this.owner = owner;
		this.reg_n = reg_n;
		this.type = type;
	}
}

// ? car
class Car extends Vehicle {
	constructor(owner, reg_n) {
		super(owner, reg_n, "Car");
	}
}

//? Jeep
class Jeep extends Vehicle {
	constructor(owner, reg_n) {
		super(owner, reg_n, "Jeep");
	}
}
// ? Bus
class Bus extends Vehicle {
	constructor(owner, reg_n) {
		super(owner, reg_n, "Bus");
	}
}

// ? Bike
class Bike extends Vehicle {
	constructor(owner, reg_n) {
		super(owner, reg_n, "Bike");
	}
}

//? Truck
class Truck extends Vehicle {
	constructor(owner, reg_n) {
		super(owner, reg_n, "Truck");
	}
}

// TODO vehicleSlot
class VehicleSlot {
	constructor(vehicleType, slotNumber) {
		this.vehicleType = vehicleType;
		this.slotNumber = slotNumber;
		this.isBooked = false;
	}
}

// TODO parkingLane
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
// TODO ParkingFloor component
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

// ToDO => make the pabloParking class
class PabloParking {
	constructor(maxFloor) {
		this.totalFloor = [];
		for (let i = 0; i < maxFloor; i++) {
			let parkingFloor = new ParkingFloor(i + 1, 5);
			this.totalFloor.push(parkingFloor);
		}
	}
}
// * ----------------------------findSLoFromClass----------------------------
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
	return false;
}

//* ------------------------------------BookSlot()------------------------------------

function bookSlot(vehicle) {
	let find = findSlotForClass(vehicle.type, vehicle);
	if (!find) {
		console.error("We have no slot for vehicle type " + vehicleType);
	} else {
		console.log(
			`${vehicle.owner}, Sir You got Slot for your ${vehicle.type}`,
		);
		find.slot.isBooked = true;
		// localStorage.setItem("pp", JSON.stringify(pabloParking));
		return find;
	}
}

//* -------------------------------DOM manupulataion-------------------------------
const vehicleType = document.querySelector("#vehicleType");
const vehicleList = document.querySelector("#vehicle");
let type;
vehicleType.onmouseover = (event) => {
	vehicleList.style.display = "flex";
};

vehicleType.onmouseout = (event) => {
	vehicleList.style.display = "none";
};

vehicleList.onclick = (event) => {
	if (event.target.nodeName === "LI") {
		vehicleList.style.display = "none";
		type = event.target.textContent;
		vehicleType.children[0].textContent = type;
	}
	// console.log("type: ", type);
};

//* ------------------PabloParking intialized------------------
let pabloParking =
	JSON.parse(localStorage.getItem("pabloParking")) || new PabloParking(4);
console.log("pabloParking: ", pabloParking);

// *--------------------- FindSlot function from DOM---------------------
const findSlot = () => {
	const form = document.querySelector("form");
	const name = form.name.value;
	const reg_num = form.reg_num.value;
	const vehicle_type = type;

	let temp = [name, reg_num, vehicle_type];
	console.log("temp: ", temp);
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
	let val = bookSlot(vehicle);
	colorBookedSlots(val);
	localStorage.setItem("pabloParking", JSON.stringify(pabloParking));
	// console.log({ name, reg_num, vehicle_type });
};

// TODO ==>

const visualSearchParkingPlace = (laneNumber, slotNumber, vehicleImg) => {
	let lane = document.querySelector(`#lane${laneNumber}`);
	lane = lane.children;
	console.log({ lane });
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
	}, 800);
};

// visualSearchParkingPlace(4, 1, "Jeep");

//*  -------------------------color BookedSlots-------------------------

const colorBookedSlots = (data) => {
	console.log("data: ", data);

	console.log("data: ", data.floor);

	console.log("pabloParking: ", pabloParking.totalFloor[0]);
	0;
	let countlane = 1;
	for (let lane of pabloParking.totalFloor[data.floor - 1].floor) {
		let countslot = 1;
		for (let slot of lane.Lane) {
			if (slot.isBooked) {
				if (countlane == data.lane) continue;
				let temp = document.querySelector(`#lane${countlane}`);
				temp = temp.children[countslot - 1].childNodes[1];
				temp.style.opacity = "1";
				console.log(temp);
			}
			countslot++;
		}
		countlane++;
	}
	visualSearchParkingPlace(
		data.lane,
		data.slot.slotNumber,
		data.slot.vehicleType,
	);
};
