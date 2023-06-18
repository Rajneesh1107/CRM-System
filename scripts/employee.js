// URLs
const url = `https://crm-system-9eof.onrender.com/users`;

// DOM Elements
const tbody = document.getElementById("tbody");
const container = document.getElementById("container");
const formContainer = document.querySelector(".form-container");
const paginationBox = document.getElementById("pagination-wrapper");
const searchBtn = document.querySelector(".searchBtn");
const addEmpBtn = document.querySelector(".addEmp");
const formData = document.querySelector("form");
const refresh = document.querySelector(".all_data");
const statusBtn = document.querySelector(".status");
const positionBtn = document.querySelector(".positionBtn");
const departmentBtn=document.querySelector(".department")

// Event Listeners
addEmpBtn.addEventListener("click", () => {
  container.style.display = "none";
  paginationBox.style.display = "none";
  formContainer.style.display = "block";
});

formData.addEventListener("submit", (event) => {
  event.preventDefault();
  container.style.display = "block";
  paginationBox.style.display = "flex";
  formContainer.style.display = "none";
  postData(url);
});

refresh.addEventListener("click", () => {
  paginationBox.style.display="flex"
  fetchedData(url, 1, 10);
});
// Search by status
statusBtn.addEventListener("click", () => {

  // console.log("hi")
    paginationBox.style.display="none"
    const statusValue = searchBtn.value;
    const filteredUrl = `${url}?status=${statusValue}`;



  
  // Search by position
  positionBtn.addEventListener("click", () => {
    paginationBox.style.display="none"
    const positionValue = searchBtn.value;

    searchedData(filteredUrl);
  });
  
  //search by department;
  departmentBtn.addEventListener("click",()=>{
    paginationBox.style.display="none"
    const departmentValue = searchBtn.value;
    const filteredUrl = `${url}?department=${departmentValue}`;
    searchedData(filteredUrl);
  })

// Functions

// Function to handle posting new data
async function postData(url) {
  try {
    const res = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name.value,
        position: formData.position.value,
        department: formData.department.value,
        status: formData.status.value,
        phone_number: formData.phone.value,
        email: formData.email.value,
      }),
    });
    
    const data = await res.json();
    fetchedData(url, 1, 10);
  } catch (error) {
    console.log(error);
  }
}

// Function to fetch data
async function fetchedData(url, page, limit) {
  try {
    const res = await fetch(`${url}?_page=${page}&_limit=${limit}`);
    const total_Item = res.headers.get("X-Total-Count");
    const total_Page = Math.ceil(total_Item / limit);
    pagination(total_Page, limit);
    const data = await res.json();
    list_data(data);
  } catch (error) {
    console.log(error);
  }
}

//searched data functions

async function searchedData(url) {
  try {
    const res = await fetch(`${url}`);
    const data = await res.json();
    list_data(data);
  } catch (error) {
    console.log(error);
  }
}

// Function to generate pagination buttons
function pagination(total_Page, limit) {
  paginationBox.innerHTML = "";
  for (let i = 1; i <= total_Page; i++) {
    paginationBox.append(paginationBtn(i, limit));
  }
}

// Function to create pagination button
function paginationBtn(id, limit) {
  const pgBtn = document.createElement("button");
  pgBtn.className = "pagination-button";
  pgBtn.innerText = id;
  pgBtn.addEventListener("click", () => {
    fetchedData(url, id, limit);
  });
  return pgBtn;
}

// Function to render the data in the table
function list_data(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    tbody.append(card(element));
  });
}

// Function to create table row
function card(item) {
  const tr = document.createElement("tr");
  tr.dataset.id = item.id;
  tr.className = "row";
  
  const name = document.createElement("td");
 
  name.innerText = `${item.name}`;
  
  const position = document.createElement("td");
  position.innerText = item.position;
  
  const department = document.createElement("td");
  department.innerText = item.department;
  
  const status = document.createElement("button");
  status.innerText = item.status;
  status.className = "tdButton";
  status.style.borderRadius = "2px";
  status.style.border = "none";
  
  if (item.status == "Active") {
    status.style.backgroundColor = "#c6ebb4";
    status.style.color = "#52C41A";
  } else if (item.status == "In a meeting") {
    status.style.backgroundColor = "#E6F7FF";
    status.style.color = "#1890ff";
 
  } else if (item.status == "Out Sick") {
    status.style.backgroundColor = "#fff2e8";
    status.style.color = "#fa541c";
  }
  
  const phone_no = document.createElement("td");
  phone_no.innerText = item.phone_number;
  
  const email = document.createElement("td");
  email.innerText = item.email;
  
  tr.append(name, position, department, status, phone_no, email);
  return tr;
}

// Initial Data Fetch
fetchedData(url, 1, 10);
