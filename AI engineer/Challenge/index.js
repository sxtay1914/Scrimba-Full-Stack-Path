import fs from 'fs';
import { supabase } from './config.js';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { text } from 'stream/consumers';

// getting the text chunks
async function makeTextChunk(){
  const txt = fs.readFileSync("./movies.txt", "utf-8")

  const splitter = new RecursiveCharacterTextSplitter(
    { 
      chunkSize: 250, 
      chunkOverlap: 35,
    })
  const texts = await splitter.splitText(txt)
  fs.writeFileSync("text_chunks.json", JSON.stringify(texts))
  console.log("Success")
}

makeTextChunk()