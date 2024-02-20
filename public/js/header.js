document.addEventListener("DOMContentLoaded", function () {
  let personalAccount = document.querySelector(".personalAccount");
  let centerContent = document.querySelector(".centerContent");

  personalAccount.addEventListener("click", function () {
    centerContent.style.display = "block";

  });
  centerContent.addEventListener("click", function () {
    centerContent.style.display = "none";
  });
});
