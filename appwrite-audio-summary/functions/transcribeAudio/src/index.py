import openai
import json

from appwrite.client import Client

from appwrite.services.storage import Storage

"""
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
"""


def get_summary(prompt, model="gpt-3.5-turbo"):
    messages = [
            {
                "role": "system",
                "content": "You are a helpful assistant for text summarization.",
            },
            {
                "role": "user",
                "content": f"Summarize this :{prompt}",
            },
        ]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0,  # this is the degree of randomness of the model's output
    )
    return response.choices[0].message["content"]


def main(req, res):
    """This function transcribes any audio file that is put into the bucket audio-files"""

    # Setup of various services
    client = Client()
    (
        client.set_endpoint(req.variables.get("APPWRITE_FUNCTION_ENDPOINT", None))
        .set_project(req.variables.get("APPWRITE_FUNCTION_PROJECT_ID", None))
        .set_key(req.variables.get("APPWRITE_FUNCTION_API_KEY", None))
    )
    openai.api_key = req.variables.get("OPENAI_API_KEY", None)
    storage = Storage(client)

    # # Get the event data
    data = json.loads(req.payload)
    
    # Get the file and transcribe
    try:
        file = storage.get_file_view(data["bucketId"], data["fileId"])
        transcript = openai.Audio.transcribe_raw("whisper-1", file, data["name"])
        summary = get_summary(transcript.text)
    except Exception as e:
        print(e)
        return res.json({
            "error": "an error occured while creating summary",
        })

    return res.json({"transcript": transcript.text, "summary": summary, "fileId": data["fileId"]})
