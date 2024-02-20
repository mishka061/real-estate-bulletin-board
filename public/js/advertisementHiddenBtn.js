let buyApartmentInfoHouse = document.querySelector(
  ".buy-apartament-info-house"
);
let rentApartmentInfoHouse = document.querySelector(
  ".rent-apartament-info-house"
);
let rentApartmentInfoApartments = document.querySelector(
  ".rent-apartament-info-apartaments"
);
let buyAmenitiesAndDetails = document.querySelector(".buy-amenitiesAndDetails");
let rentAmenitiesAndDetails = document.querySelector(
  ".rent-amenitiesAndDetails"
);
let rentDom = document.querySelector(".rentDom");
let buyApartmentInfoApartments = document.querySelector(
  ".buy-apartament-info-apartament"
);
let domAmenitiesAndDetails = document.querySelector(".dom-amenitiesAndDetails");
let infoRoomsHouse = document.querySelector(".infoRoomsHouse");
let sellRadio = document.querySelector("#radioAnnouncement1");
let rentLongTermRadio = document.querySelector("#radioAnnouncement2");
let rentShortTermRadio = document.querySelector("#radioAnnouncement3");
let sellApartmentRadio = document.querySelector("#radioAnnouncement4");
let rentApartmentRadio = document.querySelector("#radioAnnouncement5");
let aboutHouseRadio = document.querySelector("#radioAnnouncement6");
let commission = document.querySelector(".commission");
let salePrice = document.querySelector(".sale-price");
let priceDailyRental = document.querySelector(".price-daily-rental");
let priceMonthlyRental = document.querySelector(".price-monthly-rental");
let roomsInDeal = document.querySelector(".roomsInDeal");
let houseCountRoom = document.querySelector("#houseCountRoom");

// Обработчики событий для кнопок "Продать", "Сдать длительно", "Сдать посуточно"

sellRadio.addEventListener("change", function () {
  console.log("нажата кнопка 1");
  if (sellRadio.checked) {
    sellApartmentRadio.addEventListener("change", function () {
      console.log("нажата кнопка 4");
      if (sellApartmentRadio.checked) {
        buyApartmentInfoHouse.style.display = "block";
        rentApartmentInfoHouse.style.display = "block";
        infoRoomsHouse.style.display = "block";
        rentApartmentInfoApartments.style.display = "block";
        buyApartmentInfoApartments.style.display = "block";

        buyAmenitiesAndDetails.style.display = "block";
        domAmenitiesAndDetails.style.display = "none";
        rentDom.style.display = "none";
        rentAmenitiesAndDetails.style.display = "none";

        salePrice.style.display = "block";
        priceDailyRental.style.display = "none";
        priceMonthlyRental.style.display = "none";

        roomsInDeal.style.display = "none";
        commission.style.display = "none";
      }
    });

    rentApartmentRadio.addEventListener("change", function () {
      console.log("нажата кнопка 5");
      if (rentApartmentRadio.checked) {
        buyApartmentInfoHouse.style.display = "block";
        rentApartmentInfoHouse.style.display = "block";
        infoRoomsHouse.style.display = "block";
        rentApartmentInfoApartments.style.display = "block";
        buyApartmentInfoApartments.style.display = "block";

        buyAmenitiesAndDetails.style.display = "block";
        domAmenitiesAndDetails.style.display = "none";
        rentDom.style.display = "none";
        rentAmenitiesAndDetails.style.display = "none";

        salePrice.style.display = "block";
        priceDailyRental.style.display = "none";
        priceMonthlyRental.style.display = "none";

        roomsInDeal.style.display = "none";
        commission.style.display = "none";
      }
    });

    aboutHouseRadio.addEventListener("change", function () {
      console.log("нажата кнопка 6");
      if (aboutHouseRadio.checked) {
        rentDom.style.display = "block";
        domAmenitiesAndDetails.style.display = "block";
        infoRoomsHouse.style.display = "none";
        rentApartmentInfoHouse.style.display = "none";
        buyApartmentInfoHouse.style.display = "none";
        rentAmenitiesAndDetails.style.display = "none";
        buyAmenitiesAndDetails.style.display = "none";
        buyApartmentInfoApartments.style.display = "none";
        salePrice.style.display = "block";
        priceDailyRental.style.display = "none";
        priceMonthlyRental.style.display = "none";
        rentApartmentInfoApartments.style.display = "none";
        commission.style.display = "none";
      }
    });
  }
});

rentLongTermRadio.addEventListener("change", function () {
  console.log("нажата кнопка 2");
  if (rentLongTermRadio) {
    sellApartmentRadio.addEventListener("change", function () {
      if (sellApartmentRadio.checked) {
        console.log("нажата кнопка 4");
        infoRoomsHouse.style.display = "block";
        rentApartmentInfoHouse.style.display = "block";
        rentApartmentInfoApartments.style.display = "block";
        rentAmenitiesAndDetails.style.display = "block";
        domAmenitiesAndDetails.style.display = "none";
        rentDom.style.display = "none";
        buyApartmentInfoHouse.style.display = "none";
        buyApartmentInfoApartments.style.display = "none";
        buyAmenitiesAndDetails.style.display = "none";

        salePrice.style.display = "none";
        priceDailyRental.style.display = "none";
        priceMonthlyRental.style.display = "block";
        commission.style.display = "block";
      }
    });

    rentApartmentRadio.addEventListener("change", function () {
      console.log("нажата кнопка 5");
      if (rentApartmentRadio.checked) {
 
        rentApartmentInfoHouse.style.display = "block";
        rentApartmentInfoApartments.style.display = "block";
        rentAmenitiesAndDetails.style.display = "block";
        domAmenitiesAndDetails.style.display = "none";
        rentDom.style.display = "none";
        buyApartmentInfoHouse.style.display = "none";
        buyApartmentInfoApartments.style.display = "none";
        buyAmenitiesAndDetails.style.display = "none";
        salePrice.style.display = "none";
        priceDailyRental.style.display = "none";
        priceMonthlyRental.style.display = "block";
        roomsInDeal.style.display = "block";
        infoRoomsHouse.style.display = "none";
        commission.style.display = "block";
      }
    });

    aboutHouseRadio.addEventListener("change", function () {
      console.log("нажата кнопка 6");
      if (aboutHouseRadio.checked) {
        domAmenitiesAndDetails.style.display = "block";
        rentDom.style.display = "block";
        infoRoomsHouse.style.display = "none";
        rentApartmentInfoHouse.style.display = "none";
        rentApartmentInfoApartments.style.display = "none";
        rentAmenitiesAndDetails.style.display = "none";
        buyApartmentInfoHouse.style.display = "none";
        buyApartmentInfoApartments.style.display = "none";
        buyAmenitiesAndDetails.style.display = "none";
        salePrice.style.display = "none";
        priceDailyRental.style.display = "none";
        priceMonthlyRental.style.display = "block";
        commission.style.display = "block";
      }
    });
  }
});

rentShortTermRadio.addEventListener("change", function () {
  console.log("нажата кнопка 3");
  if (rentShortTermRadio.checked) {
    sellApartmentRadio.addEventListener("change", function () {
      console.log("нажата кнопка 4");
      if (sellApartmentRadio.checked) {
        infoRoomsHouse.style.display = "block";
        rentApartmentInfoHouse.style.display = "block";
        rentApartmentInfoApartments.style.display = "block";
        rentAmenitiesAndDetails.style.display = "block";
        domAmenitiesAndDetails.style.display = "none";
        rentDom.style.display = "none";
        buyApartmentInfoHouse.style.display = "none";
        buyApartmentInfoApartments.style.display = "none";
        buyAmenitiesAndDetails.style.display = "none";
        salePrice.style.display = "none";
        priceDailyRental.style.display = "block";
        priceMonthlyRental.style.display = "none";
        commission.style.display = "block";
      }
    });

    rentApartmentRadio.addEventListener("change", function () {
      console.log("нажата кнопка 5");
      if (rentApartmentRadio.checked) {
  
        rentApartmentInfoHouse.style.display = "block";
        rentApartmentInfoApartments.style.display = "block";
        rentAmenitiesAndDetails.style.display = "block";
        domAmenitiesAndDetails.style.display = "none";
        rentDom.style.display = "none";
        buyApartmentInfoHouse.style.display = "none";
        buyApartmentInfoApartments.style.display = "none";
        buyAmenitiesAndDetails.style.display = "none";
        salePrice.style.display = "none";
        priceDailyRental.style.display = "block";
        priceMonthlyRental.style.display = "none";
        roomsInDeal.style.display = "block";
        infoRoomsHouse.style.display = "none";
        commission.style.display = "block";
      }
    });

    aboutHouseRadio.addEventListener("change", function () {
      if (aboutHouseRadio.checked) {
        console.log("нажата кнопка 6");
        domAmenitiesAndDetails.style.display = "block";
        rentDom.style.display = "block";
        infoRoomsHouse.style.display = "none";
        rentApartmentInfoHouse.style.display = "none";
        rentApartmentInfoApartments.style.display = "none";
        rentAmenitiesAndDetails.style.display = "none";
        buyApartmentInfoHouse.style.display = "none";
        buyApartmentInfoApartments.style.display = "none";
        buyAmenitiesAndDetails.style.display = "none";
        salePrice.style.display = "none";
        priceDailyRental.style.display = "block";
        priceMonthlyRental.style.display = "none";
        commission.style.display = "block";
      }
    });
  }
});

