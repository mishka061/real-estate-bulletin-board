let pagination = document.querySelector(".pagination");
let apartmentsConteiners = document.querySelectorAll(".apartmentsConteiners");
let allPhoto = 10;
let currentPage = 1;

function createPaginationBtn(pageNumber) {
  let button = document.createElement("button");
  button.classList.add("page-link");
  button.textContent = pageNumber;
  button.addEventListener("click", function () {
    currentPage = pageNumber;
    updateVisibly();
  });
  pagination.appendChild(button);
}

function updateVisibly() {
  for (let i = 0; i < apartmentsConteiners.length; i++) {
    if (i < (currentPage - 1) * allPhoto || i >= currentPage * allPhoto) {
      apartmentsConteiners[i].style.display = "none";
    } else {
      apartmentsConteiners[i].style.display = "block";
    }
  }
}

for (let i = 0; i < apartmentsConteiners.length; i++) {
  if (i % allPhoto === 0) {
    createPaginationBtn(i / allPhoto + 1);
  }
}
updateVisibly();
