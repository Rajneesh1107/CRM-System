let title = document.getElementById("title");
let desc = document.getElementById("desc");
let select = document.getElementById("select");
let date = document.getElementById("date");
let status = document.getElementById("status");
let time = document.getElementById("time");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let maintasksection = document.getElementById("maintasksection");
let addemp = document.getElementById("addemp");
let taskadddiv = document.getElementById("taskadddiv");

let editIndex = -1; // New variable to track the index of the item being edited

addemp.addEventListener("click", function () {
  taskadddiv.style.display = "block";
});

btn1.addEventListener("click", () => {
  fetchdata();
  display();
});
btn2.addEventListener("click",function(){
    taskadddiv.style.display = "block";
    title.value = ""
    desc.value = ""
    select.value =""
    date.value = ""
    time.value = ""
    status.value = ""
  taskadddiv.style.display = "none";

})

let arr = JSON.parse(localStorage.getItem("task")) || [];

function fetchdata() {
  taskadddiv.style.display = "none";
  let obj = {
    title: title.value,
    desc: desc.value,
    select: select.value,
    date: date.value,
    time: time.value,
    status: status.value,
  };

  if (editIndex !== -1) {
    // Update existing item
    arr[editIndex] = obj;
    editIndex = -1; // Reset editIndex
  } else {
    // Add new item
    arr.push(obj);
  }

  localStorage.setItem("task", JSON.stringify(arr));
}

function display() {
  maintasksection.innerHTML = "";

  arr.forEach((item, index) => {
    maintasksection.append(createcard(item, index));
  });
}

function createcard(item, index) {
  let card = document.createElement("div");
  let h3 = document.createElement("h3");
  h3.textContent = item.title;
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let p3 = document.createElement("p");
  let p4 = document.createElement("p");
  p1.textContent = item.desc;
  p2.textContent = item.date;
  p3.textContent = item.time;
  p4.textContent = item.status;
  let edit = document.createElement("button");
  edit.className = "edit";
  edit.textContent = "Edit";
  let deleted = document.createElement("button");
  deleted.className = "deleted";
  deleted.textContent = "Delete";

  edit.addEventListener("click", () => {
    editdata(item, index);
    edititem(item, index);
  });

  deleted.addEventListener("click",function(){
    arr=arr.filter((e,i)=>{
        if(i==index){
            return false
        }
        else{
            return true
        }
    })
    localStorage.setItem("task",JSON.stringify(arr))
    display();
  })

  card.append(h3, p1, p2, p3, p4, edit, deleted);
  return card;
}

display();

function editdata(item, index) {
  taskadddiv.style.display = "block";
  title.value = item.title;
  desc.value = item.desc;
  select.value = item.select;
  date.value = item.date;
  time.value = item.time;
  status.value = item.status;
  editIndex = index; // Set the editIndex to the index of the item being edited
}

function edititem(item, index) {
  localStorage.setItem("task", JSON.stringify(arr));
  arr[index] = {
    title: title.value,
    desc: desc.value,
    select: select.value,
    date: date.value,
    time: time.value,
    status: status.value,
  };
  localStorage.setItem("task", JSON.stringify(arr));
  display();
}
