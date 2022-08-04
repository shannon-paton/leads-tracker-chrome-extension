let myLeads = []
let oldLeads = [] // adding an array of old, unimportant leads, for example
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") ) // change to const
                                                                            // since we don't re-assign it below

if (leadsFromLocalStorage) { // if leadsFromLocalStorage isn't 0, is truthy value
    myLeads = leadsFromLocalStorage // set myLeads equal to leadsFromLocalStorage
    renderLeads(myLeads) // render leads into listItems
}

function renderLeads(array) { //low degree of reusability -- how to make this work for different parameters
    let listItems = ""
    for (let i = 0; i < array.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${array[i]}'>
                    ${array[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}

deleteBtn.addEventListener('dblclick', () => { // or can be written as ("click", function() {
    localStorage.clear();
    myLeads = [];
    //ulEl.innerHTML = "" this is one way to do it, or
    renderLeads() // this will render out the empty list
});



inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderLeads()
})
