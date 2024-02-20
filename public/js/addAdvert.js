document.addEventListener("DOMContentLoaded", function () {
  let filePhoto = document.getElementById("filePhoto");
  let photoContainer = document.getElementById("photoContainer");
  let titlePhoto = document.querySelector(".titlePhoto");
  let fileInput = document.getElementById("fileInput");
  let photoLabelContainer = document.getElementById("photoLabelConteiner");
  let fileInputLabel = document.querySelector(".fileInputLabel");

  filePhoto.addEventListener("change", function (event) {
    let files = event.target.files;
    for (let file of files) {
      let reader = new FileReader();
      titlePhoto.style.display = "none";
      reader.onload = function (e) {
        let img = document.createElement("img");
        let div = document.createElement("div");
        div.classList.add("opasityDivImg");
        img.src = e.target.result;
        div.appendChild(img);
        let deleteIcon = document.createElement("div");
        deleteIcon.classList.add("delete-icon");
        deleteIcon.innerText = "x"; 
        div.appendChild(deleteIcon);
        photoContainer.appendChild(div);
      };
      reader.readAsDataURL(file);
    }
  });

  photoContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-icon")) {
      let imgContainer = event.target.closest(".opasityDivImg");
      imgContainer.remove();
      if (photoContainer.children.length === 0) {
        titlePhoto.style.display = "block";
      }
    }
  });

  fileInput.addEventListener("change", function (event) {
    let files = event.target.files;
    for (let file of files) {
      let reader = new FileReader();
      fileInputLabel.style.display = "none";
      reader.onload = function (e) {
        let img = document.createElement("img");
        let div = document.createElement("div");
        div.classList.add("opasityDivImg");
        img.src = e.target.result;
        div.appendChild(img);
        let deleteIcon = document.createElement("div");
        deleteIcon.classList.add("delete-icon");
        deleteIcon.innerText = "x"; 
        div.appendChild(deleteIcon);
        photoLabelContainer.appendChild(div);
      };
      reader.readAsDataURL(file);
    }
  });

  photoLabelContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-icon")) {
      let imgContainer = event.target.closest(".opasityDivImg");
      imgContainer.remove();
      if (photoLabelContainer.children.length === 0) {
        fileInputLabel.style.display = "block";
      }
    }
  });
});
