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
					lane = new ParkingLane("Car", 5, i + 1);
					break;
				case 1:
					lane = new ParkingLane("Bike", 5, i + 1);
					break;
				case 2:
					lane = new ParkingLane("Bus", 5, i + 1);
					break;
				case 3:
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
			let parkingFloor = new ParkingFloor(i + 1, 4);
			this.totalFloor.push(parkingFloor);
		}
	}

	//? findSlot()

	findSlot(vehicleType) {
		for (let floor of this.totalFloor) {
			for (let lane of floor.floor) {
				if (lane.vehicleType == vehicleType) {
					for (let slot of lane.Lane) {
						if (slot.isBooked == false) {
							// return slot;
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
		let find = this.findSlot(vehicle.type);
		// console.log(find);
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

let vehicle = new Truck("Atanu", "WB64 AB 1234");
let pabloParking = new PabloParking(4);
let val = pabloParking.bookSlot(vehicle);
// console.log("val: ", val);

console.log("pabloParking: ", pabloParking);

// let parkingFloor = new ParkingFloor(1, 4);
// console.log("parkingFloor: ", parkingFloor);

// let parkingLane = new ParkingLane("Car", 5);
// console.log("parkingLane: ", parkingLane);

// let car = new Car("atanu", "123");
// console.log("vehicle: ", vehicle);
// console.log("car: ", car);

// const pabloParking = new PabloParking();
// console.log("pabloParking: ", pabloParking);
