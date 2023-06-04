import json

def is_json(myjson):
  try:
    json.loads(myjson)
  except ValueError:
    return False
  return True