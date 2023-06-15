let url= `https://crm-system-9eof.onrender.com/users`
// if click on the tr
let tbody=document.getElementById("tbody")

let addEmpBtn=document.querySelector(".addEmp")
fetchedData(url)
async function fetchedData(url){
try {
   let res = await fetch(url);
   let data = await res.json();
//    console.log(data) 
list_data(data)
} catch (error) {
  console.log(error)  
}

}

function list_data(data){

console.log(data)
tbody.innerHTML="";
data.forEach(element => {
    tbody.append(card(element))
});
}

function card(item){

    let tr=document.createElement("tr")
     tr.dataset.id=item.id;
     tr.className="row" 
    
    let name=document.createElement("td")
    name.innerText=item.name;

    let position=document.createElement("td");
        position.innerText=item.position;

    let department=document.createElement("td");
        department.innerText=item.department;

    let status=document.createElement("button")
        status.innerText=item.status;
        status.className="tdButton"
        status.style.borderRadius="2px"
        // status.style.padding="2px"
        status.style.border="none"

        if(item.status=="Active"){
            status.style.backgroundColor="#c6ebb4"
            status.style.color="#52C41A"
          
        }else if(item.status=="In a meeting"){
            status.style.backgroundColor="#E6F7FF"
            status.style.color="#1890ff"

        }else if(item.status=="Out Sick"){
            status.style.backgroundColor="#fff2e8"
            status.style.color="#fa541c"
        }

    let phone_no=document.createElement("td");
        phone_no.innerText=item.phone_number;

    let email=document.createElement("td")
        email.innerText=item.email;

    tr.append(name,position,department,status,phone_no,email)
    return tr

}


