document.addEventListener("DOMContentLoaded", function () {
  let writeToSeller = document.querySelector(".writeToSeller");
  let divWriteSeller = document.querySelector(".divWriteSeller");
  let contentMessages = document.querySelectorAll(".contentMessages");

  for (let i = 0; i < contentMessages.length; i++) {
    contentMessages[i].addEventListener("click", function () {
      console.log("click");
      let id = encodeURIComponent(this.getAttribute("data-id").trim());
      window.location.href = "/messenger/channel/" + id;
    });
  }
  writeToSeller.addEventListener("click", function (event) {
    event.preventDefault();
    divWriteSeller.style.display = "block";
    writeToSeller.style.display = "none";
  });
});
