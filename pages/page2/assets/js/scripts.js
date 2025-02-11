// Select elements
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat");
const countElement = document.getElementById("count");
const totalElement = document.getElementById("total");
const busSelect = document.getElementById("bus");
const destinationText = document.getElementById("destination");
const cancelReservationBtn = document.getElementById("cancel-reservation");
const confirmButton = document.getElementById("reserve-five-seats");

// Load reserved seats from local storage
function loadReservedSeats() {
    const reservedSeats = JSON.parse(localStorage.getItem("reservedSeats")) || [];
    
    seats.forEach((seat, index) => {
        if (reservedSeats.includes(index)) {
            seat.classList.add('sold');
        }
    });

    updateSelectedCount();
}

// Save reserved seats to local storage
function saveReservedSeats() {
    const reservedSeats = [...document.querySelectorAll(".row .seat.sold")].map(seat => [...seats].indexOf(seat));
    localStorage.setItem("reservedSeats", JSON.stringify(reservedSeats));
}

// Update selected seat count and total price
function updateSelectedCount() {
    const selectedSeats = Array.from(seats).filter(seat => seat.classList.contains('selected'));
    countElement.textContent = selectedSeats.length;
    totalElement.textContent = selectedSeats.length * parseInt(busSelect.value);
}

// Event listener for seat selection
seats.forEach(seat => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('sold')) {
            seat.classList.toggle('selected');
            updateSelectedCount();
        }
    });
});

// Event listener for bus selection change
busSelect.addEventListener('change', () => {
    loadReservedSeats(); // Load reserved seats for the selected bus
});

// Event listener for confirming the reservation
confirmButton.addEventListener('click', () => {
    const selectedSeats = Array.from(seats).filter(seat => seat.classList.contains('selected'));
    
    if (selectedSeats.length === 0) {
        alert("Please select at least one seat to reserve.");
        return;
    }
    
    selectedSeats.forEach(seat => {
        seat.classList.remove('selected');
        seat.classList.add('sold');
    });
    
    saveReservedSeats();
    updateSelectedCount();
    alert("Seats reserved successfully!");
});

// Load data on page load
loadReservedSeats();
