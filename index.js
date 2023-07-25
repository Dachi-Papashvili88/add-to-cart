import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
    databaseURL: "https://shopping-cart-74ac6-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
    
})


 onValue(shoppingListInDB, function(snapshot){
     
     if(snapshot.exists()){
          let shopingListArray = Object.entries(snapshot.val())
   
   clearShoppingListEl()
    
   for(let i = 0; i < shopingListArray.length; i++){
       
        let currentItem = shopingListArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
 
       addItemsToTheCart(currentItem)
   }
     } else {
         shoppingListEl.innerHTML = "No items here... yet"
     }
  
   
})

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function addItemsToTheCart(item){
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}
