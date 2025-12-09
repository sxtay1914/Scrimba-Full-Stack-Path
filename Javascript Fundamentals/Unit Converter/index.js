/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/
const domL = document.getElementById("length")
const domV = document.getElementById("volume")
const domM = document.getElementById("mass")

// forward
function cal(n, type) {
    if (type==="l"){
        return n*3.281
    }else if (type==="v") {
        return n*0.264
    }else {
        return n*2.204
    }
}

function calR(n, type) {
    if (type==="l"){
        return n/3.281
    }else if (type==="v") {
        return n/0.264
    }else {
        return n/2.204
    }
}
function getValue() {
    const n = document.getElementById("input").value
    return n
}

const btn = document.getElementById("btn")
btn.addEventListener("click", function(){
    const n = getValue()
    domL.textContent = n + " meters = " + cal(n, "l").toFixed(3) + " feet | " + n + " feet = " + calR(n, "l").toFixed(3) + " meters"
    domV.textContent = n + " litres = " + cal(n, "l").toFixed(3) + " gallons | " + n + " gallons = " + calR(n, "l").toFixed(3) + " litres"
    domM.textContent = n + " kilos = " + cal(n, "l").toFixed(3) + " pound | " + n + " pounds = " + calR(n, "l").toFixed(3) + " kilos"
})