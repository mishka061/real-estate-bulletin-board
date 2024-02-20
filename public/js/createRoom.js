document.addEventListener("DOMContentLoaded", function () {
  let apartments = document.querySelectorAll(".apartments-type");
  let numberOfRooms1 = document.querySelector("#numberOfRooms1");
  let numberOfRooms2 = document.querySelector("#numberOfRooms2");
  let numberOfRooms3 = document.querySelector("#numberOfRooms3");
  let numberOfRooms4 = document.querySelector("#numberOfRooms4");
  let studia = document.querySelector(".studia");

  for (let i = 0; i < apartments.length; i++) {
    apartments[i].addEventListener("click", function () {
      console.log(".apartments-type");
      if (i == 0) {
        numberOfRooms1.style.display = "block";
        numberOfRooms2.style.display = "none";
        numberOfRooms3.style.display = "none";
        numberOfRooms4.style.display = "none";
      } else if (i == 1) {
        numberOfRooms1.style.display = "block";
        numberOfRooms2.style.display = "block";
        numberOfRooms3.style.display = "none";
        numberOfRooms4.style.display = "none";
      } else if (i == 2) {
        numberOfRooms1.style.display = "block";
        numberOfRooms2.style.display = "block";
        numberOfRooms3.style.display = "block";
        numberOfRooms4.style.display = "none";
      } else if (i == 3) {
        numberOfRooms1.style.display = "block";
        numberOfRooms2.style.display = "block";
        numberOfRooms3.style.display = "block";
        numberOfRooms4.style.display = "block";
      }
    });
    studia.addEventListener("click", function () {
      numberOfRooms1.style.display = "none";
      numberOfRooms2.style.display = "none";
      numberOfRooms3.style.display = "none";
      numberOfRooms4.style.display = "none";
    });
  }
});
