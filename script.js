let $ = function( id ) {
    return document.getElementById( id );
}


let myLeads = [];
const inputEl = $('input-el');
const inputBtn = $('input-btn');
const ulLu = $('ulEl');
const deleteBtn = $('delete-btn');
const saveBtn = $('save-btn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))


if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    rendered(myLeads)
}

function rendered(leads){
    let listItem = ''
    for(let myLead of leads){
        listItem +=`<li><a href='${myLead}'> ${myLead} </a></li>`
    }
    $('ulEl').innerHTML = listItem
}




inputBtn.addEventListener('click', function(){
    myLeads.push(inputEl.value);
    inputEl.value='';
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    rendered(myLeads)
    
})


deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear();
    myLeads = []
    rendered(myLeads)
    
})





saveBtn.addEventListener('click', function(){

    chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        rendered(myLeads)
    })
})