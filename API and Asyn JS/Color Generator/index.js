//defining const 
const form = document.getElementById("top-section")
const colorSec = document.getElementById("color-sec")
let colors = []
form.addEventListener('submit', function(e){
    e.preventDefault()
    const scheme = form.scheme.value
    const color = form.color.value.slice(1)
    
    // then go and fetch the color
    getData(scheme, color)
})


function getData(scheme, color){
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=5`)
        .then(response => response.json())
        .then(data=>{
            data.colors.forEach((color)=>{
                colors.push(color.hex.value)
            })
            colors.forEach((color, index) => {
                console.log(color)
                const id = `s${index+1}`
                const currentDiv = document.getElementById(id)
                currentDiv.style.backgroundColor = color
                currentDiv.dataset.copy = color
                const did = `d${index+1}`
                const currentDdiv = document.getElementById(did)
                currentDdiv.textContent = color
                currentDiv.dataset.copy = color
            })
            colors = []
        })
}


const copyBoxes = document.querySelectorAll('.copy-box')
console.log(copyBoxes)
copyBoxes.forEach(function(box){
    box.addEventListener("click", function(){
        const text = box.dataset.copy
        navigator.clipboard.writeText(text)
            .then(()=>{
                box.textContent = "Copied!"
                setTimeout(()=>{
                    box.textContent = text;
                }, 1000)
            })
            .catch(err=>{
                console.error('Failed to copy:', err)
            })
    })
})