from typing import List

def process_query_and_files(query: str, file_texts: List[str]) -> str:
    # Initialize an empty string to store the processed text
    processed_text = query
    
    # Concatenate each file text with the query
    for text in file_texts:
        processed_text += " " + text
    
    # Return the processed text
    return processed_text
