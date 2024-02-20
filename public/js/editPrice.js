document.addEventListener("DOMContentLoaded", function () {
    console.log('editInputPrice')
    let editInputPrice = document.querySelector(".editInputPrice");
  
    let btnXEdit = document.querySelector(".btnXEdit");
    let commissionEditInput = document.querySelector(".commissionEditInput");
    let depositEditInput = document.querySelector(".depositEditInput");
    let btnDepositEdit0 = document.querySelector(".btnDepositEdit0");
    let btnDepositEdit50 = document.querySelector(".btnDepositEdit50");
    let btnDepositEdit100 = document.querySelector(".btnDepositEdit100");
    let btnComissionEdit0 = document.querySelector(".btnComissionEdit0");
    let btnComissionEdit50 = document.querySelector(".btnComissionEdit50");
    let btnComissionEdit100 = document.querySelector(".btnComissionEdit100");
  
    function formatCurrency(value) {
      return value.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    }
  
    editInputPrice.addEventListener("input", function () {
      let inputValue = editInputPrice.value.replace(/\D/g, "");
      editInputPrice.value = formatCurrency(inputValue);
    });
    btnXEdit.addEventListener("click", function (event) {
      event.preventDefault();
      editInputPrice.value = "";
      commissionEditInput.value = "";
      depositEditInput.value = "";
    });
    btnComissionEdit0.addEventListener("click", function (event) {
      event.preventDefault();
  
      commissionEditInput.value = 0;
    });
  
    btnComissionEdit50.addEventListener("click", function (event) {
      event.preventDefault();
      let inputValue = editInputPrice.value.replace(/\s/g, "");
      let num = Math.ceil(inputValue / 2);
      let result = String(num);
      commissionEditInput.value = result.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    });
  
    btnComissionEdit100.addEventListener("click", function (event) {
      event.preventDefault();
      let inputValue = editInputPrice.value.replace(/\s/g, "");
      commissionEditInput.value = inputValue.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    });
  
    btnDepositEdit0.addEventListener("click", function (event) {
      event.preventDefault();
      depositEditInput.value = 0;
    });
  
    btnDepositEdit50.addEventListener("click", function (event) {
      event.preventDefault();
      let inputValue = editInputPrice.value.replace(/\s/g, "");
      let num = Math.ceil(inputValue / 2);
      let result = String(num);
      depositEditInput.value = result.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    });
  
    btnDepositEdit100.addEventListener("click", function (event) {
      event.preventDefault();
      let inputValue = editInputPrice.value.replace(/\s/g, "");
      depositEditInput.value = inputValue.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    });
  });