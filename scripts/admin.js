// fetching username from localstorage

const userBtn = document.getElementById('join');
userBtn.innerText = "ADMIN";
// userBtn.style.cursor = "pointer";

// userBtn.addEventListener('click',()=>{
//   window.location = "./admin2.html";
// })

// sorting

let sortAtoZBtn = document.getElementById("sort-price-low-to-high");
let sortZtoABtn = document.getElementById("sort-price-high-to-low");

let sortRatingAtoZBtn = document.getElementById("sort-rating-low-to-high");
let sortRatingztoABtn = document.getElementById("sort-rating-high-to-low");


let mainSection = document.getElementById("product_container");

let count = document.getElementById("count");


let hotelData = [];



fetchdata();
function fetchdata() {
  fetch("https://crm-system-9eof.onrender.com/users")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      appendData(data);
      hotelData = data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// appending the data

function appendData(data) {
  mainSection.innerHTML = "";
  count.textContent = `${data.length} Results`;
  let cardlist = document.createElement("div");
  cardlist.className = "card-list";
  mainSection.append(cardlist);

  data.forEach(function (item) {
    cardlist.append(cretecard(item));
  });
}

// creating card;
/*
div card = id=>card;
card=> img,title(name),location,discription,price,edit,delete

*/

function cretecard(item) {
  let card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-id", item.id);

  let cardimg = document.createElement("div");
  cardimg.className = "card-img";

  let img = document.createElement("img");
  img.src = "https://cdn-icons-png.flaticon.com/512/1869/1869679.png";
  img.setAttribute("alt", "book");
  cardimg.append(img);

  let Id = document.createElement("h3");
  Id.innerText = `ID: ${item.id}`
 

  let cardbody = document.createElement("div");
  cardbody.className = "card-body";

  let h4 = document.createElement("h2");
  h4.className = "card-title";
  h4.textContent = item.name;
  h4.style.height = "60px";

  let loc = document.createElement("h3");
  loc.className = "location";
  loc.textContent = item.position;

  let p = document.createElement("p");
  p.className = "card-desc";
  p.textContent = item.department;

  let p3 = document.createElement("h3");
  p3.className = "card-price";
  p3.textContent = item.status;

  let h5=document.createElement("h4");
//   h5.className="rating";
  h5.textContent=item.phone_number;

  let h6=document.createElement("h4");
  h6.className="rating";
  h6.textContent=item.email;

  let btn = document.createElement("button");
  btn.className = "card-button";
  btn.setAttribute("data-id", item.id);
  btn.textContent = "Delete";
  btn.addEventListener("click", function () {
    let bookId = item.id;
    fetch(`https://crm-system-9eof.onrender.com/users/${item.id}`, {
      method: "DELETE",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        location.reload();
        console.log(data);
        appendData(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  cardbody.append(Id,h4, loc, p, p3, h5,h6, btn);

  card.append(cardimg, cardbody);
  return card;
}

// Update Hotels

let updateHotelIdInput = document.getElementById("update-hotel-id");
let updateHotelTitleInput = document.getElementById("update-hotel-name");
let updateHotelImageInput = document.getElementById("update-hotel-image");
let updateHotelLocationInput = document.getElementById("update-hotel-location");
let updateHotelDescriptionInput = document.getElementById("update-hotel-desc");
let updateHotelPriceInput = document.getElementById("update-hotel-price");
// let updateHotelPriceInput = document.getElementById("update-hotel-price");
let updateHotelReviewInput = document.getElementById("update-hotel-review");
let updateHotelemailInput = document.getElementById("update-hotel-email");
let updateHotelBtn = document.getElementById("update-hotel");

// Edit function here

updateHotelBtn.addEventListener("click", function () {
  fetch(`https://crm-system-9eof.onrender.com/users/${updateHotelIdInput.value}`, {
    method: "PUT",
    body: JSON.stringify({
      name: updateHotelTitleInput.value,
      position: updateHotelLocationInput.value,
      department: updateHotelDescriptionInput.value,
     
      status: updateHotelPriceInput.value,
      phone_number: updateHotelReviewInput.value,
      email: updateHotelemailInput.value
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      location.reload();
      appendData(data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Adding the new hotel


// ADD Hotels

let hotelTitleInput = document.getElementById("hotel-name");
let hotelImageInput = document.getElementById("hotel-image");
let hotelLocationInput = document.getElementById("hotel-location");
let hotelDescriptionInput = document.getElementById("hotel-desc");
let hotelPriceInput = document.getElementById("hotel-price");
let hotelphoneInput = document.getElementById("hotel-phone");
let hotelemailInput = document.getElementById("hotel-email");
let hotelCreateBtn = document.getElementById("add-hotel");

hotelCreateBtn.addEventListener("click", AddHotel);

function AddHotel() {
  fetch(`https://crm-system-9eof.onrender.com/users`, {
    method: "POST",
    body: JSON.stringify({
      name: hotelTitleInput.value,
      position: hotelLocationInput.value,
      department: hotelDescriptionInput.value,
    //   image: hotelImageInput.value,
      status: hotelPriceInput.value,
      phone_number: hotelphoneInput.value,
     email: hotelemailInput.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      location.reload();
      appendData(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Update price

let updatePriceHotelId = document.getElementById("update-score-hotel-id");
let updatePriceHotelPrice = document.getElementById("update-score-hotel-price");
let updatePriceHotelPriceButton = document.getElementById("update-score-hotel");

updatePriceHotelPriceButton.addEventListener('click', ()=>{
  fetch(`https://crm-system-9eof.onrender.com/users/${updatePriceHotelId.value}`, {
    method: "PATCH",
    body: JSON.stringify({
      phone_number: updatePriceHotelPrice.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      location.reload();
      appendData(data);
    })
    .catch(function (error) {
      console.log(error);
    });
})
// sorting Part

sortAtoZBtn.addEventListener("click", sort1);
function sort1() {
  fetch(
    `https://mock-api-hotels.onrender.com/hotels?_sort=price&_order=asc`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

sortZtoABtn.addEventListener("click", sort2);
function sort2() {
  fetch(
    `https://mock-api-hotels.onrender.com/hotels?_sort=price&_order=desc`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

sortRatingAtoZBtn.addEventListener("click", sort3);
function sort3() {
  fetch(
    `https://mock-api-hotels.onrender.com/hotels?_sort=review&_order=asc`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

sortRatingztoABtn.addEventListener("click", sort4);
function sort4() {
  fetch(
    `https://mock-api-hotels.onrender.com/hotels?_sort=review&_order=desc`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Search function

let search = document.querySelector("#search");


search.addEventListener("input",function () {

  let searchValue = search.value.trim().toLowerCase();

  if (searchValue == "") {
    appendData(hotelData);
    count.style.display = "none";
  } else {
    let temp = hotelData.filter(function (el) {
      return el.position.trim().toLowerCase().includes(searchValue)||el.name.trim().toLowerCase().includes(searchValue);
    });
    count.style.display = "block";
    count.innerText = `${temp.length} Destinations Found`;
    appendData(temp);
  }
});