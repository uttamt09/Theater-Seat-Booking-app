//Create you project here from scratch
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];

const dropDownMenu = document.getElementById("selectMovie");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const numberOfSeatsSelectedDisplay = document.getElementById("numberOfSeat");
const totalPrice = document.getElementById("totalPrice");
let currentSelectedMoviePrice = 7; //By default we have selected Flash Movie. so initial price will be $7.
let seatSelected = 0;

// Use moviesList array for displaing the Name in the dropdown menu

moviesList.forEach((obj) => {
  const opt = document.createElement("option");
  opt.textContent = `${obj.movieName} $${obj.price}`;
  opt.value = obj.movieName.toLowerCase();
  dropDownMenu.append(opt);
});

dropDownMenu.addEventListener("change", function (event) {
  let nameOfMovie = event.target.value;
  console.log(nameOfMovie);
  let object = moviesList.find(
    (obj) => obj.movieName.toLowerCase() === nameOfMovie.toLowerCase()
  );

  if (object) {
    const movieName = document.getElementById("movieName");
    movieName.textContent = object.movieName;
    const moviePrice = document.getElementById("moviePrice");
    moviePrice.textContent = `$ ${object.price}`;
    currentSelectedMoviePrice = object.price;

    displayTotalPriceAndSeat();
  }
});

//Add eventLister to each unoccupied seat

let seatNumber = 1;
const allSeats = Array.from(
  document.getElementsByClassName("seatCont")[0].getElementsByClassName("seat")
);
allSeats.forEach((element) => {
  element.id = seatNumber++;
  let seatStatus = element.classList.contains("occupied");
  if (!seatStatus) {
    element.addEventListener("click", () => {
      seatFunction(element);
    });
  }
});

function seatFunction(element) {
  let seatStatus = element.classList.contains("occupied");
  if (!seatStatus) {
    let isSelected = element.classList.contains("selected");
    if (!isSelected) {
      element.classList.add("selected");
      addSeatNumberSelected(element.id);
    } else {
      element.classList.remove("selected");
      removeSeatNumberSelected(element.id);
    }
  }
}

function addSeatNumberSelected(seatNumber) {
  seatSelected++;
  displayTotalPriceAndSeat();
  const noSelectedDisplay = selectedSeatsHolder.getElementsByTagName("span")[0];
  noSelectedDisplay.style.display = "none";
  const selectedcont = document.createElement("div");
  selectedcont.id = `seatNumber${seatNumber}`;
  selectedcont.style =
    "width:60px; height:30px; border:2px solid green; overflow:hidden; color:green; display: flex; justify-content: center; align-items: center; border-radius:5px";
  selectedcont.textContent = seatNumber;
  selectedSeatsHolder.append(selectedcont);
  console.log(seatSelected);
}

function removeSeatNumberSelected(seatNumber) {
  seatSelected--;
  displayTotalPriceAndSeat();
  if (seatSelected == 0) {
    const noSelectedDisplay =
      selectedSeatsHolder.getElementsByTagName("span")[0];
    noSelectedDisplay.style.display = "inline";
  }
  const seatDiv = document.getElementById(`seatNumber${seatNumber}`);
  seatDiv.remove();
}

function displayTotalPriceAndSeat() {
  numberOfSeatsSelectedDisplay.textContent = seatSelected;
  let currentMovieName = dropDownMenu.value;
  // currentSelectedMoviePrice = moviesList.find(obj=>obj.movieName.toLowerCase()===currentMovieName.toLowerCase()).price;
  totalPrice.textContent = `$ ${seatSelected * currentSelectedMoviePrice}`;
}

//Add eventLsiter to continue Button
proceedBtn.addEventListener("click", function (event) {
  if (seatSelected) {
    alert("Yayy! Your Seats have been booked");
    changeStatusToOccupiedAndReset();
  } else {
    alert("Oops no seat Selected");
  }
});

function changeStatusToOccupiedAndReset() {
  const allSelectedSeats = Array.from(
    document
      .getElementsByClassName("seatCont")[0]
      .getElementsByClassName("selected")
  );
  if (allSelectedSeats) {
    allSelectedSeats.forEach((el) => {
      el.classList.remove("selected");
      el.classList.add("occupied");

      const seatNumber = el.id;
      removeSeatNumberSelected(seatNumber);
    });
  }
}

//Add eventListerner to Cancel Button
cancelBtn.addEventListener("click", function (event) {
  const allSelectedSeats = Array.from(
    document
      .getElementsByClassName("seatCont")[0]
      .getElementsByClassName("selected")
  );
  if (allSelectedSeats) {
    allSelectedSeats.forEach((el) => {
      el.classList.remove("selected");

      const seatNumber = el.id;
      removeSeatNumberSelected(seatNumber);
    });
  }
});
