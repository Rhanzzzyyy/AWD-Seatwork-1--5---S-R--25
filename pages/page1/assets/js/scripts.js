
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat");
const countElement = document.getElementById("count");
const totalElement = document.getElementById("total");
const busSelect = document.getElementById("bus");
const destinationText = document.getElementById("destination");
const cancelReservationBtn = document.getElementById("cancel-reservation");
const confirmButton = document.getElementById("reserve-five-seats");


function loadReservedSeats() {
    const reservedSeats = JSON.parse(localStorage.getItem("reservedSeats")) || [];
    
    seats.forEach((seat, index) => {
        if (reservedSeats.includes(index)) {
            seat.classList.add('sold');
        }
    });

    updateSelectedCount();
}


function saveReservedSeats() {
    const reservedSeats = [...document.querySelectorAll(".row .seat.sold")].map(seat => [...seats].indexOf(seat));
    localStorage.setItem("reservedSeats", JSON.stringify(reservedSeats));
}


function updateSelectedCount() {
    const selectedSeats = Array.from(seats).filter(seat => seat.classList.contains('selected'));
    countElement.textContent = selectedSeats.length;
    totalElement.textContent = selectedSeats.length * parseInt(busSelect.value);
}


seats.forEach(seat => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('sold')) {
            seat.classList.toggle('selected');
            updateSelectedCount();
        }
    });
});


busSelect.addEventListener('change', () => {
    loadReservedSeats(); 
});


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


loadReservedSeats();
