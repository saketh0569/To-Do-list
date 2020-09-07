function getAndUpdate(){
    console.log("Updating List...");
    tit = document.getElementById('title').value;
    document.getElementById('title').value=" ";
    desc = document.getElementById('description').value;
    document.getElementById('description').value=" ";
    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    update();
}

function update(){
    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = []; 
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    } 
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr); 
    }
    // Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
        </tr>`; 
    });
    tableBody.innerHTML = str;
}

function deleted(itemIndex){
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

function clearStorage(){
    if (confirm("Do you really want to clear?")){
    console.log('Clearing the storage');
    localStorage.clear();
    update();
    }
}

add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();


// ANOTHER WAY FOR SEARCHING: USING A METHOD AND CALLING IT TO AT THE SEARCH ADDRESS
// const searchFun = () =>{
//     let filter = document.getElementById('searchTxt').value.toLowerCase();
//     console.log(filter);
//     let mytable = document.getElementById('table');
//     let tr = mytable.getElementsByTagName('tr');
//     for(var i=0; i<tr.length; i++){
//         let td = tr[i].getElementsByTagName('td')[0];
//         if(td){
//             let textvalue = td.textContent || td.innerHTML;
//             if(textvalue.toLowerCase().indexOf(filter) > -1){
//                 tr[i].style.display = "";
//             }
//             else{
//                 tr[i].style.display = "none";
//             }
//         }
//     }
// }



let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let inputval = search.value.toLowerCase();
    // console.log('Input fired', inputval);
    let mytable = document.getElementById('table');
    let tr = mytable.getElementsByTagName('tr');
    let count = 0;
    for(var i=0; i<tr.length; i++){
        let td = tr[i].getElementsByTagName('td')[0];
        if(td){
            let textvalue = td.textContent || td.innerHTML;
            // console.log(textvalue);
            if(textvalue.toLowerCase().includes(inputval)){
                tr[i].style.display = "";
            }
            else{
                tr[i].style.display = "none";
                count = count+1;
            }
        }
    }


    console.log(count, tr.length)
    if(count == tr.length-1){        
        // console.log("Nothing");
        let a = document.getElementById('abc');
        a.innerHTML = "<p>Sorry, we coundn't find out anything......</p>"
    }
});