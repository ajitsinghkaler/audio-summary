from appwrite.client import Client
import json
# You can remove imports of services you don't use
from appwrite.services.databases import Databases

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

def main(req, res):
  client = Client()

  # You can remove services you don't use
  database = Databases(client)

  if not req.variables.get('APPWRITE_FUNCTION_ENDPOINT') or not req.variables.get('APPWRITE_FUNCTION_API_KEY'):
    print('Environment variables are not set. Function cannot use Appwrite SDK.')
  else:
    (
    client
      .set_endpoint(req.variables.get('APPWRITE_FUNCTION_ENDPOINT', None))
      .set_project(req.variables.get('APPWRITE_FUNCTION_PROJECT_ID', None))
      .set_key(req.variables.get('APPWRITE_FUNCTION_API_KEY', None))
    )
  # json.loads()
  print("-----------------------------------------------------------")
  print("Event data",req.variables.get('APPWRITE_FUNCTION_EVENT_DATA', None))
  print("-----------------------------------------------------------")

  data = json.loads(req.variables.get('APPWRITE_FUNCTION_EVENT_DATA', None))
  document_id = data["$id"]
  print("-----------------------------------------------------------")
  print(document_id,"document_id")
  print("-----------------------------------------------------------")
  try:
    data = database.delete_document(req.variables.get('DATABASE', None),req.variables.get('COLLECTION', None), document_id)
  except Exception as e:
    print(e)
    return res.json({
      "deleted": False,
    })
  print("-----------------------------------------------------------")
  print(data)
  print("-----------------------------------------------------------")

  return res.json({
    "deleted": True,
  })