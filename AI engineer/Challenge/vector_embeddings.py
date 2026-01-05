import json
import os
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from supabase import create_client, Client

load_dotenv()

supabase: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_API_KEY"))

#getting the list
with open("text_chunks.json", "r") as f:
    chunks = json.load(f)

model = SentenceTransformer("all-MiniLM-L6-v2")

sentences = chunks

content_embeddings = []
# 2. Calculate embeddings by calling model.encode()
for sentence in sentences:   
    embeddings = model.encode(sentence)
    # cant run ndarray
    content_embeddings.append([sentence, embeddings.tolist()])
# print(embeddings[0].shape)

# store in supabase
def store_embeddings(content_embeddings):
    for content, embedding in content_embeddings:
        data, count = supabase.table("challenge").insert({
            "content": content,
            "embedding": embedding 
        }).execute()

# store_embeddings(content_embeddings)


#query 
query = "The movie with that actor from Castaway"
query_embedding = model.encode(query)

def find_nearest_match(embedding):
    response = supabase.rpc("match_documents",{
        "query_embedding" : embedding.tolist(),
        "match_threshold": 0.2,
        "match_count": 1,  
    }).execute()

    return response.data

print(find_nearest_match(query_embedding))