function init() {
    let myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: [],
    });

    let searchControl = new ymaps.control.SearchControl({
        options: {
            provider: 'yandex#search'
        }
    });
    myMap.controls.add(searchControl);

    let myPlacemark = new ymaps.Placemark(
        [55.76, 37.64],
        {
            balloonContent: "Столица России",
        },
        {
            draggable: true,
        }
    );
    myPlacemark.events.add("click", function (event) {
        let placemark = event.get("target");
        let coordinates = placemark.geometry.getCoordinates();
    
        ymaps.geocode(coordinates).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            let address = firstGeoObject.getAddressLine();

            placemark.properties.set({ balloonContent: address });
            myMap.balloon.open(coordinates, { contentHeader: address });
        });
    });
    myMap.geoObjects.add(myPlacemark);

    let searchInput = document.getElementById("address");

    searchControl.events.add("resultselect", function (event) {
        let results = searchControl.getResultsArray();
        let selected = event.get("index");
        let selectedResult = results[selected];

        let coordinates = selectedResult.geometry.getCoordinates();
        ymaps.geocode(coordinates).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            let address = firstGeoObject.getAddressLine();
            searchInput.value = address;
           
        });
    })
}
ymaps.ready(init);
