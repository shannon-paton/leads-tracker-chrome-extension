let myLeads = []
let oldLeads = [] // adding an array of old, unimportant leads, for example
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const saveTabBtn = document.getElementById("save-tab-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") ) // change to const
                                                                            // since we don't re-assign it below

if (leadsFromLocalStorage) { // if leadsFromLocalStorage isn't 0, is truthy value
    myLeads = leadsFromLocalStorage // set myLeads equal to leadsFromLocalStorage
    render(myLeads) // render leads into listItems
                // myLeads -> passing in argument to function
}

// wrote this function using original "Save input" function url from object in array

saveTabBtn.addEventListener('click', function() {
    // Add the URL of the current tab -> CONNECT WITH CHROME API
    //chrome = objects
    //tabs = key
    //query = method
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){// active tab in the current window
                                                                // this function will run when tab is found

    // save the current URL
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
    })
})


function render(leads) { // low degree of reusability -- how to make this work for different parameters
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
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
    render(myLeads) // this will render out the empty list
});

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})
