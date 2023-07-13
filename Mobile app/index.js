import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://neworder-1875e-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "ShoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-items")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()


})


onValue(shoppingListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let SnapItems = Object.entries(snapshot.val());
        shoppingListEl.innerHTML = ""
        for (let i = 0; i < SnapItems.length; i++) {
            let currentItem = SnapItems[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingListEl(currentItem);
        }
    }
    else {
        shoppingListEl.innerHTML = `<h2 style="color: white;">No items Here ...yet</h2>`
    }

})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let itemID = item[0];
    let itemValue = item[1];
    let newItem = document.createElement("li");
    newItem.textContent = itemValue;
    shoppingListEl.append(newItem)

    newItem.addEventListener("dblclick", function () {
        let location = ref(database, `ShoppingList/${itemID}`)
        remove(location)
    })
}