let homeCount = document.getElementById("home-count")
let guestCount = document.getElementById("guest-count")

let h = 0
let c = 0

function add(type, n) {
    for (let i=0; i<n; i++) {
        if (type=="home"){
            h++
        }else{
            c++
        }
    }
    
    if (type=="home"){
        homeCount.textContent = h
    }else {
        guestCount.textContent = c
    }
}

