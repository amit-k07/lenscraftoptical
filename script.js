document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.querySelector(".slides");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsContainer = document.querySelector(".dots");

  let index = 0;

  slides.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active-dot");

      dot.addEventListener("click", () => {
          index = i;
          updateSlider();
      });

      dotsContainer.appendChild(dot);
  });

  function updateSlider() {
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;

      document.querySelectorAll(".dots span").forEach(dot => {
          dot.classList.remove("active-dot");
      });

      document.querySelectorAll(".dots span")[index].classList.add("active-dot");
  }

  nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateSlider();
  });

  prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateSlider();
  });

  setInterval(() => {
      index = (index + 1) % slides.length;
      updateSlider();
  }, 4000);

  document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  const popup = document.getElementById("appointmentPopup");
  const bookBtn = document.getElementById("bookBtn");
  const closeBtn = document.querySelector(".close");

  bookBtn.addEventListener("click", function () {
      popup.style.display = "flex";
  });

  closeBtn.addEventListener("click", function () {
      popup.style.display = "none";
  });

  window.addEventListener("click", function (e) {
      if (e.target === popup) {
          popup.style.display = "none";
      }
  });

  const today = new Date().toISOString().split("T")[0];
  document.getElementById("appointmentDate").setAttribute("min", today);

});

const appointmentForm = document.getElementById("appointmentForm");
const successMessage = document.getElementById("successMessage");

appointmentForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = appointmentForm.querySelector('input[type="text"]').value;
    const mobile = appointmentForm.querySelector('input[type="tel"]').value;
    const date = document.getElementById("appointmentDate").value;
    const address = appointmentForm.querySelector('textarea').value;

    const message = 
        `New Appointment Booking:%0A%0A` +
        `Name: ${name}%0A` +
        `Mobile: ${mobile}%0A` +
        `Date: ${date}%0A` +
        `Address: ${address}`;

    const whatsappNumber = "919452642982";

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappURL, "_blank");

    appointmentForm.reset();
});

const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminPopup = document.getElementById("adminPopup");
const adminClose = document.getElementById("adminClose");
const adminLoginForm = document.getElementById("adminLoginForm");

const adminPanel = document.getElementById("adminPanel");
const panelClose = document.getElementById("panelClose");

adminLoginBtn.addEventListener("click", () => {
    adminPopup.style.display = "flex";
});

adminClose.addEventListener("click", () => {
    adminPopup.style.display = "none";
});

panelClose.addEventListener("click", () => {
    adminPanel.style.display = "none";
});

adminLoginForm.addEventListener("submit", function(e){
    e.preventDefault();

    const id = document.getElementById("adminId").value;
    const pass = document.getElementById("adminPassword").value;

    if(id === "@lenscraftoptical" && pass === "lensopt@123"){
        adminPopup.style.display = "none";
        adminPanel.style.display = "flex";
    } else {
        alert("Invalid ID or Password");
    }
});
const productHTML = `
<div class="product">
    <img src="${imageData}">
    <p>${name}</p>
    <h3>₹${price}</h3>
    <button onclick="deleteProduct(this)" 
    style="background:red;color:white;border:none;padding:5px 10px;border-radius:5px;margin-top:5px;">
    Delete
    </button>
</div>
`;

function filterProducts(type){
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const price = parseInt(product.getAttribute("data-price"));

        if(type === "all"){
            product.style.display = "block";
        }
        else if(type === "low" && price < 1000){
            product.style.display = "block";
        }
        else if(type === "high" && price >= 1000){
            product.style.display = "block";
        }
        else{
            product.style.display = "none";
        }
    });
}
function updateProductCount(){
    document.getElementById("productCount").innerText =
    document.querySelectorAll(".product").length;
}

function deleteProduct(btn){
    btn.parentElement.remove();
    saveProducts();
    updateProductCount();
}

function saveProducts(){
    const products = [];
    document.querySelectorAll(".product").forEach(product=>{
        const img = product.querySelector("img").src;
        const name = product.querySelector("p").innerText;
        const price = product.querySelector("h3").innerText.replace("₹","");
        products.push({name, price, imageData: img});
    });
    localStorage.setItem("products", JSON.stringify(products));
}

function logoutAdmin(){
    document.getElementById("adminPanel").style.display = "none";
}
