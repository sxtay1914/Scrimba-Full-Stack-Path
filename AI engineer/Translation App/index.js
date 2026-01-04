const textSec = document.getElementById("text")
const title = document.getElementById("title")
const legend = document.getElementById("legend")
const form = document.getElementById("form")
const languageOptions = document.getElementById("language-container")
const translatedSec = document.getElementById("translated")
const restartBtn = document.getElementById("restart")

async function getResponse(text, language){
    const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "POST",
            headers: {
            "Authorization": "Bearer API_KEY",
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
                { 
                    role: "system",
                    content: `You are a text translator. Translate into ${language}. Don't give explaination and respond in ${language}`
                },
                { 
                    role: "user", 
                    content: text}
                ],
            })
        }
        )
    const data = await response.json()
    const msg =  data.choices[0].message.content

    return msg
}

form.addEventListener("submit", async function(e){
    e.preventDefault()
    
    const languageChoice = form.elements["language"].value
    const textTranslate = form.elements["text"].value

    const translatedText = await getResponse(textTranslate, languageChoice)
    
    renderTranslatedPage(translatedText) 
})

restartBtn.addEventListener("click", function(){
    renderStartPage()
    form.reset()
})


// render translated 
function renderTranslatedPage(text){
    console.log("Tra")
    title.textContent = "Original text 👇"
    legend.textContent = "Your translation 👇"
    textSec.disabled = true

    languageOptions.classList.add("hidden")
    translatedSec.classList.remove("hidden")
    translatedSec.textContent = text
    restartBtn.classList.remove("hidden")
}


function renderStartPage(){
    console.log("e")
    restartBtn.classList.add("hidden")
    title.textContent = "Text to translate 👇"
    legend.textContent = "Select language 👇"

    textSec.disabled = false
    
    languageOptions.classList.remove("hidden")
    translatedSec.classList.add("hidden")
}