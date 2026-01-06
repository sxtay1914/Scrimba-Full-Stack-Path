import { supabase } from './config.js';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { pipeline } from '@huggingface/transformers';
import movieArr from "./content.js"

const messages = [
                    { 
                        role: "system",
                        content: `You are an enthusiastic movie expert who loves recommending movies to people. You will be given two pieces of information - some context about movies and a question. Your main job is to formulate a short answer to the question using the provided context. If the answer is not given in the context, find the answer in the conversation history if possible. If you are unsure and cannot find the answer, say, "Sorry, I don't know the answer." Please do not make up the answer. Give a summary of the movie in less than 50 words and remember to add new line after the title. Follow example after separator ###
                        
                        ###                 
                        School of Rock (2009)       
                        A fun and stupid movie about a wannabe rocker turned fraud substitute teacher forming a rock band with his students to win the Battle of the Bands
                        ###`
                    },
                ]
// convert to chunks
async function convertChunks() {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 300,
        chunkOverlap: 45,
    });

    const response = await fetch("movies.txt")
    const text = await response.text()
    const chunks = await splitter.splitText(text)
    console.log(chunks)
    return chunks
}

// convertChunks().catch(console.error);
// Vectorise
async function getEmbeddings(sentences) {
    // create extractor
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
    
    const output = await extractor(sentences, {
        pooling: "mean",
        normalize: true,
    })

    // console.log(output.tolist())
    return output.tolist()
}   

// Store in vector db
async function storeDB(content, embedding){
    const { data, error } = await supabase.from('movies').insert({
        content: content,
        embedding: embedding,
    })
    console.log(data, error)
}

// query
async function queryMovies(query){
    const { data, error } = await supabase.rpc("match_movies", {
        query_embedding: query,
        match_threshold: 0.2,
        match_count: 3,
    })
    return data
}

async function getResponse(query, match){
    messages.push({
        role: 'user',
        content: `Context: ${query} Question: ${match}`
    })
    const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "POST",
            headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: messages,
            })
        }
        )
    const data = await response.json()
    messages.push(data.choices[0].message)
    const msg =  data.choices[0].message.content
    return msg
}

async function main(){
    const textChunks = await convertChunks()
    try {
        const arr = await Promise.all(textChunks.map(async function(textChunk){
            return {"context": textChunk, "embedding": getEmbeddings(textChunk)}
        })) 
        arr.forEach(async function(a){
            storeDB(a.context, a.embedding[0])
        })
    }catch(e){
        console.log(e)
    }
}
// main().catch(console.error)


/* 
DOM manipulation
*/

const form = document.getElementById("form")
const movieRec = document.getElementById("movie-rec")
const btn = document.getElementById("restart")
const content = document.getElementById("content")
// const movieName = document.getElementById("movie-name")
form.addEventListener("submit", async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const formObj = Object.fromEntries(formData.entries())
    
    const query = `question: What's your favorite movie and why? 
                my reply: ${formObj.first}
                question: Are you in the mood for something new or a classic?
                my reply: ${formObj.second}
                question: Do you wanna have fun or do you want something serious?
                my reply: ${formObj.third}`
                
    // find match
    const textQuery = `${formObj.first} ${formObj.second} ${formObj.third}`
    const textQueryVec = await getEmbeddings(textQuery)
    // console.log(textQueryVec)
    const matches = await queryMovies(textQueryVec[0])
    // console.log("ma", matches[0].content)
    // const name = findName(matches[0].content)
    // feed into ai and get response
    const response = await getResponse(query, matches[0].content)
    console.log(response)
    renderNew(response)
})


function renderNew(response){
    content.classList.add("hidden")
    // movieName.classList.remove("hidden")
    movieRec.classList.remove("hidden")
    btn.classList.remove("hidden")
    movieRec.textContent = response
}

btn.addEventListener("click", function(){
    // movieName.classList.add("hidden")
    content.classList.remove("hidden")
    movieRec.classList.add("hidden")
    btn.classList.add("hidden")
    form.reset()
})

// console.log(movieArr)
// function findName(response){
//     const match = movieArr.find(movie =>
//         response.includes(movie.content)
//     )
//     console.log(match)
//     return match || null
// }