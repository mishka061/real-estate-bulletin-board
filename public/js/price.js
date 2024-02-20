document.addEventListener("DOMContentLoaded", function () {
  let input = document.querySelector(".textareaDetailsPrice");
  let btnX = document.querySelector(".btnX");
  let inputCommission = document.querySelector(".inputCommission");
  let inputDeposit = document.querySelector(".inputDeposit");
  let withoutCollateral = document.querySelector(".Without-collateral");
  let Deposit50 = document.querySelector(".Deposit50");
  let Deposit100 = document.querySelector(".Deposit100");
  let agentCommission1 = document.querySelector(".Agent-commission1");
  let agentCommission2 = document.querySelector(".Agent-commission2");
  let agentCommission3 = document.querySelector(".Agent-commission3");

  function formatCurrency(value) {
    return value.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
  }

  input.addEventListener("input", function () {
    let inputValue = input.value.replace(/\D/g, "");
    input.value = formatCurrency(inputValue);
  });
  
  btnX.addEventListener("click", function (event) {
    event.preventDefault();
    input.value = "";
    inputCommission.value = "";
    inputDeposit.value = "";
  });

  agentCommission1.addEventListener("click", function (event) {
    event.preventDefault();

    inputCommission.value = 0;
  });

  agentCommission2.addEventListener("click", function (event) {
    event.preventDefault();
    let inputValue = input.value.replace(/\s/g, "");
    let num = Math.ceil(inputValue / 2);
    let result = String(num);
    inputCommission.value = result.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
  });

  agentCommission3.addEventListener("click", function (event) {
    event.preventDefault();
    let inputValue = input.value.replace(/\s/g, "");
    inputCommission.value = inputValue.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
  });

  withoutCollateral.addEventListener("click", function (event) {
    event.preventDefault();
    inputDeposit.value = 0;
  });

  Deposit50.addEventListener("click", function (event) {
    event.preventDefault();
    let inputValue = input.value.replace(/\s/g, "");
    let num = Math.ceil(inputValue / 2);
    let result = String(num);
    inputDeposit.value = result.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
  });

  Deposit100.addEventListener("click", function (event) {
    event.preventDefault();
    let inputValue = input.value.replace(/\s/g, "");
    inputDeposit.value = inputValue.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
  });
});
