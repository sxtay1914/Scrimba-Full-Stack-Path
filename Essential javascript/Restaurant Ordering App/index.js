import { menuArray } from "./data.js"

//class
function Food(name, price) {
    this.name = name
    this.price = price
    this.id = crypto.randomUUID()
}

// getElement
const menuSec = document.getElementById("menu")
const paymentSec = document.getElementById("payment")
const totalSec = document.getElementById("total")
const footer = document.getElementById("footer")
const modal = document.getElementById("modal")
const backdrop = document.getElementById("backdrop")
const name = document.getElementById("name")
const number = document.getElementById("card-number")
const cvv = document.getElementById("card-cvv")
const messageSec = document.getElementById("message")
// global variable
let orders = [] 
// const pizza = new Food("Pizza", 14)
// const beer = new Food("Beer", 12)
// orders.push(pizza)
// orders.push(beer)

// Render functions
function renderMenu(){
    menuSec.innerHTML = menuArray.map((menu)=>
    `   
        <section class="menu">
            <div>
                <div class="image" aria-label="${menu.name}">${menu.emoji}</div>
            </div>
            <div>
                <h1 class="middle-font">${menu.name}</h1>
                <p class="menu-des grey">${menu.ingredients.join(",")}</h3>
                <p class="menu-price price">$${menu.price}</p>
            </div>
            <button class="add-btn" data-add="${menu.name}">+</button>
        </section>
    `).join('')
}

function renderPayments(){
    paymentSec.innerHTML = `<h1 class="middle-font">Your order</h1>` + orders.map((order) => 
        `
            <div class="payment-container">
                <div class="payment-name middle-font">${order.name}</div>
                <button class="grey" data-remove="${order.id}">remove</button>
                <span class="payment-price price">$${order.price}</span>
            </div>
        `
    ).join('')
    
    renderTotal()
}

function renderTotal(){
    const total = orders.reduce((t, order)=>{
        return t + order.price
    }, 0)
    
    totalSec.innerHTML = `
                        <div class="total-container">
                            <div class="middle-font">Total price:</div>
                            <span class="price">$${total}</span>
                        </div>
                        <button class="complete-btn" id="complete-btn">Complete order</button>
    `
    
}

// Dom manipulation

//Listening for menuSection event
menuSec.addEventListener('click', (e)=>{
    if (e.target.dataset.add){
        switch(e.target.dataset.add){
            case 'Pizza': 
                    {
                        const pizza = new Food("Pizza", 14)
                        orders.push(pizza)
                        break    
                    }
            case 'Beer': 
                    {
                        const beer = new Food("Beer", 12)
                        orders.push(beer)
                        break    
                    }
            case 'Hamburger': 
                    {
                        const hamburger = new Food("Hamburger", 12)
                        orders.push(hamburger)
                        break    
                    }
            
                    
        }
        if (!orders.length){
            footer.classList.add('hide')
            console.log(paymentSec.classList)
        }else{
            footer.classList.remove('hide')
        }
        renderPayments()
    }
})

// Listening for paymentSection event
paymentSec.addEventListener('click', (event) => {
    if (event.target.dataset.remove){
        const id = event.target.dataset.remove
        orders = orders.filter((food)=>{
            return food.id!==id
        })
    }
    if (!orders.length){
        footer.classList.add('hide')
        console.log(paymentSec.classList)
    }else{
        footer.classList.remove('hide')
    }
    renderPayments()
})


// Complete btn
document.addEventListener("click", (e) => {
    if (e.target.id === "complete-btn") {
        modal.classList.toggle("hide")
        backdrop.classList.toggle("hide")
    }
  
    if (e.target.id==="pay-btn"){
        e.preventDefault()
        const nameV = name.value
        const numberV = number.value
        const cV = cvv.value
    
        modal.classList.toggle("hide")
        backdrop.classList.toggle("hide")
        totalSec.innerHTML = ''
        paymentSec.innerHTML = `
                            <div class="final">Thanks, ${nameV}! Your order is on its way!</div>
        `
        setTimeout(function(){
            paymentSec.innerHTML = ""
            orders = []
            if (!orders.length){
                footer.classList.add('hide')
                console.log(paymentSec.classList)
            }else{
                footer.classList.remove('hide')
            }
            renderPayments()
        }, 3000)
    }
})
renderMenu()