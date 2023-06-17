let url= `https://crm-system-9eof.onrender.com/users`
// if click on the tr
let tbody=document.getElementById("tbody")
let positionBtn=document.querySelector(".position")
let filtered=document.getElementById("filter")
let container=document.getElementById("container")


let form_container=document.querySelector(".form-container")




// pagination button
    let paginationBox=document.getElementById("pagination-wrapper")



// search by position btn
let searchBtn=document.querySelector(".searchBtn")
    positionBtn.addEventListener("click",()=>{fetchedData(`${url}?position=${searchBtn.value}`,1,10)})

// Search by status
let statusBtn=document.querySelector(".status")
    statusBtn.addEventListener("click",()=>{fetchedData(`${url}?status=${searchBtn.value}`,1,10)})

// add new Employee Btn
let addEmpBtn=document.querySelector(".addEmp")
    addEmpBtn.addEventListener("click",()=>{
        container.style.display="none"
        paginationBox.style.display="none"
        form_container.style.display="block"
    })

    let formData=document.querySelector("form")

    formData.addEventListener("submit",()=>{
        event.preventDefault();
        container.style.display="block"
        paginationBox.style.display="flex"
        form_container.style.display="none"
        postData(url)
     
    })

   let addEmpNameInput=document.createElement("name")

async function postData(url){

    try {
        let res= await fetch(`${url}`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                name:formData.name.value,
                position:formData.position.value,
                department:formData.department.value,
                status:formData.status.value,
                phone_number:formData.phone.value,
                email:formData.email.value
            })
        })
        
        let data = await res.json();
            fetchedData(url,1,10)
    } catch (error) {
       console.log(error) 
    }
}


fetchedData(url,1,10)
async function fetchedData(url,page,limit){
try {
   let res = await fetch(`${url}?_page=${page}&_limit=${limit}`);

   let total_Item = res.headers.get("X-Total-Count")
   let  total_Page= Math.ceil(total_Item/limit)
    // console.log(total_Item,total_Page)

    pagination(total_Page,limit)

   let data = await res.json();
//    console.log(data) 
    list_data(data)
    } catch (error) {
  console.log(error)  
    }

    }

    function pagination(total_Page,limit){
        paginationBox.innerHTML="";
        
        for(let i=1;i<=total_Page;i++){
        
          paginationBox.append(paginationBtn(i,limit))
        
        }
        
        }
        
        function paginationBtn(id,limit){
        
          let pgBtn=document.createElement("button")
              pgBtn.className="pagination-button"
              pgBtn.innerText=id;
              pgBtn.addEventListener("click",()=>{ fetchedData(url,id,limit)})
              return pgBtn
        
        
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


