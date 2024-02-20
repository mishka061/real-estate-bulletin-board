document.addEventListener("DOMContentLoaded", function () {
  let searchPriceMin = document.querySelector(".searchPriceMin");
  let searchPriceMax = document.querySelector(".searchPriceMax");
  function searchCurrency(value) {
    return value.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
  }
  searchPriceMin.addEventListener("input", function () {
    let inputValue = searchPriceMin.value.replace(/\D/g, "");
    searchPriceMin.value = searchCurrency(inputValue);
  });
  searchPriceMax.addEventListener("input", function () {
    let inputValue = searchPriceMax.value.replace(/\D/g, "");
    searchPriceMax.value = searchCurrency(inputValue);
  });
});
