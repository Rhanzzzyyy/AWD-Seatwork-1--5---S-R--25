const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold):not(.reserved)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const busSelect = document.getElementById("bus");
const destinationText = document.getElementById("destination");
const cancelReservationBtn = document.getElementById("cancel-reservation");
const reserveFiveSeatsBtn = document.getElementById("reserve-five-seats");

// Create Notification Element
const notification = document.createElement("div");
notification.className = "notification";
document.body.appendChild(notification);

populateUI();

let ticketPrice = +busSelect.value;

// Function to Show Notification
function showNotification(message) {
  notification.innerText = message;
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

// Save selected bus index and price
function setBusData(busIndex, busPrice) {
  localStorage.setItem("selectedBusIndex", busIndex);
  localStorage.setItem("selectedBusPrice", busPrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;
  const totalPrice = selectedSeatsCount * ticketPrice;

  count.innerText = selectedSeatsCount;
  total.innerText = totalPrice;

  setBusData(busSelect.selectedIndex, busSelect.value);

  // Show notification with total price
  if (selectedSeatsCount > 0) {
    showNotification(`You selected ${selectedSeatsCount} seat(s) for BR.$${totalPrice}`);
  } else {
    showNotification("No seats selected.");
  }
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
  const reservedSeats = JSON.parse(localStorage.getItem("reservedSeats")) || [];

  seats.forEach((seat, index) => {
    if (selectedSeats.includes(index)) {
      seat.classList.add("selected");
    }
    if (reservedSeats.includes(index)) {
      seat.classList.add("reserved");
    }
  });

  const selectedBusIndex = localStorage.getItem("selectedBusIndex");
  if (selectedBusIndex !== null) {
    busSelect.selectedIndex = selectedBusIndex;
    updateDestination();
  }
}

// Bus select event
busSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setBusData(e.target.selectedIndex, e.target.value);
  updateDestination();
  updateSelectedCount();
});

// Update destination text
function updateDestination() {
  const selectedOption = busSelect.options[busSelect.selectedIndex];
  destinationText.innerText = `Destination: ${selectedOption.dataset.destination}`;
}

// Seat click event
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("sold") && !e.target.classList.contains("reserved")) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Cancel reservation button event
cancelReservationBtn.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  selectedSeats.forEach(seat => {
    seat.classList.remove("selected");
  });

  // Cancel reservation for reserved seats
  const reservedSeats = document.querySelectorAll(".row .seat.reserved");
  reservedSeats.forEach(seat => {
    seat.classList.remove("reserved");
  });

  updateSelectedCount();
  showNotification("Reservation canceled!");
});

// Reserve 5 seats function
reserveFiveSeatsBtn.addEventListener("click", () => {
  const availableSeats = document.querySelectorAll(".row .seat:not(.sold):not(.reserved)");

  let reservedCount = 0;
  availableSeats.forEach(seat => {
    if (reservedCount < 5) {
      seat.classList.add("reserved");
      reservedCount++;
    }
  });

  updateSelectedCount();
  showNotification(`${reservedCount} seat(s) reserved!`);
});

// Initial count and total set
updateSelectedCount();
