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

	//? findSlot()

	findSlot(vehicleType, vehicle) {
		for (let floor of this.totalFloor) {
			for (let lane of floor.floor) {
				if (lane.vehicleType == vehicleType) {
					for (let slot of lane.Lane) {
						if (slot.isBooked == false) {
							slot.vehicle = vehicle;
							console.log(slot);
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

	//? BookSlot()

	bookSlot(vehicle) {
		let find = this.findSlot(vehicle.type, vehicle);
		if (!find) {
			console.error("We have no slot for vehicle type " + vehicleType);
		} else {
			console.log(
				`${vehicle.owner}, Sir You got Slot for your ${vehicle.type}`,
			);
			find.slot.isBooked = true;
			console.log(find);
		}
	}
}

//? DOM manupulataion
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
		// console.log("vehicleType: ", vehicleType.children);
		// console.log("li");
	}
	// console.log("type: ", type);
};

//? FindSlot function from dom
//?PabloParking intialized
const pabloParking = new PabloParking(4);

const findSlot = () => {
	// console.log("findSlot");
	const form = document.querySelector("form");
	const name = form.name.value;
	const reg_num = form.reg_num.value;
	const vehicle_type = type;

	let temp = [name, reg_num, vehicle_type];
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
	pabloParking.bookSlot(vehicle);
	console.log({ name, reg_num, vehicle_type });
};

// let vehicle = new Truck("Atanu", "WB64 AB 1234");
// let pabloParking = new PabloParking(4);
// let val = pabloParking.bookSlot(vehicle);
// console.log("pabloParking: ", pabloParking);
// console.log("vehicle: ", vehicle);
// console.log("val: ", val);

// console.log("pabloParking: ", pabloParking);

// let parkingFloor = new ParkingFloor(1, 4);
// console.log("parkingFloor: ", parkingFloor);

// let parkingLane = new ParkingLane("Car", 5);
// console.log("parkingLane: ", parkingLane);

// let car = new Car("atanu", "123");
// console.log("vehicle: ", vehicle);
// console.log("car: ", car);

// const pabloParking = new PabloParking();
// console.log("pabloParking: ", pabloParking);

// TODO ==>

// let lane1 = document.querySelector("#lane1");
// let lane = lane1.children;

// let count = 0;
// let id = setInterval(() => {
// 	//* if(count>0){ before el white }
// 	if (count > 0) {
// 		lane[count - 1].style.background = "white";
// 	}
// 	//* if(count===0){last el white}
// 	else {
// 		lane[lane.length - 1].style.background = "white";
// 	}
// 	lane[count].style.background = "cyan";
// 	//* count incremented by 1
// 	count++;
// 	if (count === lane.length) {
// 		count = 0;
// 	}
// }, 500);

// let count = lane.length - 1;
// let id = setInterval(() => {
// 	if (count === -1) {
// 		lane[count + 1].style.background = "white";
// 		count = lane.length - 1;
// 	}
// 	if (count < lane.length - 1) {
// 		lane[count + 1].style.background = "white";
// 	}
// 	lane[count].style.background = "cyan";
// 	count--;
// }, 500);

// let count = lane.length - 1;
// let id = setInterval(() => {
// 	if (count === -1) {
// 		lane[count + 1].style.background = "white";
// 		count = lane.length - 1;
// 	}
// 	if (count < lane.length - 1) {
// 		lane[count + 1].style.background = "white";
// 	}
// 	if (count == 2) {
// 		clearInterval(id);
// 	}
// 	lane[count].style.background = "cyan";
// 	count--;
// }, 500);

// let countlane = lane.length - 1;
// let id1 = setInterval(() => {
// 	let val = lane[countlane].childNodes[1];
// 	if (countlane == 2) {
// 		val.src = "./images/motorbike (2).png";
// 		val.style.opacity = 1;
// 	}
// 	countlane--;
// }, 800);

// let countLane = 0;
// const id1 = setInterval(() => {
// 	let val = lane[countLane].childNodes[1];
// 	if (countLane === 2) {
// val.src = "./images/motorbike (2).png";
// val.style.opacity = 1;
// 	}
// 	console.log("lane: ", val);
// 	countLane++;
// 	if (countLane == lane.length) {
// 		countLane = 0;
// 	}
// }, 500);
