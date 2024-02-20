document.addEventListener("DOMContentLoaded", function () {
  let dealNumbers = document.querySelectorAll(".dealNumber");
  let roomsInDeal5 = document.querySelector("#roomsInDeal5");
  let roomsInDeal6 = document.querySelector("#roomsInDeal6");
  let roomsInDeal7 = document.querySelector("#roomsInDeal7");

  for (let i = 0; i < dealNumbers.length; i++) {
    dealNumbers[i].addEventListener("click", function () {
      console.log(dealNumbers[i]);
      if (i == 0) {
        console.log(dealNumbers[i]);
        console.log("yes");
        roomsInDeal5.style.display = "block";
        roomsInDeal6.style.display = "none";
        roomsInDeal7.style.display = "none";
      } else if (i == 1) {
        roomsInDeal5.style.display = "block";
        roomsInDeal6.style.display = "block";
        roomsInDeal7.style.display = "none";
      } else if (i == 2) {
        roomsInDeal5.style.display = "block";
        roomsInDeal6.style.display = "block";
        roomsInDeal7.style.display = "block";
      }
    });
  }
});
