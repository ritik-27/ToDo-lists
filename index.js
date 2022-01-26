console.log('This is To-Do list making app');

//Get and update function for getting the data and updating into table as well
function getAndUpdate(params) {
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    if(title!=""){
        if (localStorage.getItem("itemsJson") == null) {
            itemsJsonArray = [];
            itemsJsonArray.push([title, description])
            localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
        }
        else {
            itemsJsonStr = localStorage.getItem("itemsJson")
            itemsJsonArray = JSON.parse(itemsJsonStr);
            itemsJsonArray.push([title, description])
            localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
        }
        update();
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    }
    else{
        alert('"Title" cannot be empty')
    }
    
}

//Update function just for populating the table
function update(params) {
    if (localStorage.getItem("itemsJson") == null) {
        itemsJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    }
    else {
        itemsJsonStr = localStorage.getItem("itemsJson")
        itemsJsonArray = JSON.parse(itemsJsonStr);
    }
    // Populating the table
    let tbody = document.getElementById('tbody');
    let str = '';
    itemsJsonArray.forEach((element, index) => {
        str += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td class="text-center" ><button onclick='rem(${index})' class="btn btn-outline-danger">Delete</button></td>
                </tr>`
    });
    tbody.innerHTML = str;
}

let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',getAndUpdate)
update();

//Delete button function
function rem(itemIndex) {
    // console.log('Delete is triggerd',item);
    itemsJsonStr = localStorage.getItem("itemsJson")
    itemsJsonArray = JSON.parse(itemsJsonStr);
    itemsJsonArray.splice(itemIndex,1);
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    update();
    
}

function clearStorage(params) {
    if(localStorage.getItem('itemsJson')!='[]'){
        if (confirm('Do u really want to clear all lists ?')) {
            // console.log("Clearing all lists");
            localStorage.clear();
            update();
        }
    }
    else{
        console.log('Empty prompt is triggered');
        alert("List is already EMPTY !!!")
    }
}


let items=document.getElementById('items')
items.style.display='block';
let toggle = document.getElementById('toggle')
// toggle.classList.add('btn-info')

toggle.addEventListener('click',()=>{
    if (items.style.display != 'block'){
        items.style.display='block';
        toggle.classList.add('btn-info')
        toggle.classList.remove('btn-warning')
    }
    else{
        items.style.display = 'none'
        toggle.classList.add('btn-warning')
        toggle.classList.remove('btn-info')
    }
})
// let hideBtn = document.getElementById('hideBtn')
// hideBtn.addEventListener('click',()=>{
//     items.style.display='none'
// })