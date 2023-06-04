import pandas as pd
import tensorflow as tf
import os, json, shutil, markupsafe
from werkzeug.utils import secure_filename
from utils import is_json
from model_processing import get_model_parameters
from flask import Flask, render_template, request, make_response, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

# returns the model parameters(weights, biases and neuron values) for a given model and test input.
@app.route("/model-processing/", methods = ["POST"])
def get_model_params():
    inputs = request.form.to_dict()

    # parsing correct type values from JSON inputs
    for k in inputs.keys():
      if(is_json(inputs[k])):
        inputs[k] = json.loads(inputs[k])
    
    # return error 500 if the user has not selected any model
    if(inputs["model"] == "not selected"):
       return make_response('{"errorMessage" : "No model selected"}', 500)
    
    model_path = ""

    # if model is set to custom, delete all the files and subfolders present in directory - 'custom_model_path'. Then save all the files uploaded by user there
    if(inputs["model"] == "custom"):
      custom_model_path = "./models/custom/"
      shutil.rmtree(custom_model_path, ignore_errors=True) # deleting directory
  
      folder = request.files.getlist('folder')
      for file in folder:
        file_path_components = file.filename.split('/')
        file_path_components.pop(0)
        file_name = file_path_components.pop(-1)
        file_dir = custom_model_path
        for folder_name in file_path_components:
            file_dir += folder_name + "/"
        os.makedirs(file_dir, exist_ok=True)
        file.save(file_dir + secure_filename(file_name))

      model_path = custom_model_path
    else:
      model_path = inputs["model"]

    # return error 500 if the model cannot be successfully resolved by load_model()
    try:
      model = tf.keras.models.load_model(model_path)
    except:
       return make_response('{"errorMessage" : "Uploaded directory does not contain a valid Keras model. If the directory is valid, make sure that the model is made up of dense layers only"}', 500)
    
    # return error 500 if the model parameters cannot be successfully computed
    try:
      model = get_model_parameters(model, inputs["inputTextarea"])
    except:
      return make_response('{"errorMessage" : "Invalid input string"}', 500)

    res = make_response(jsonify(markupsafe.Markup(model)), 200) # Using markupsafe.Markup() to apply Jinja2's safe filter
    return res
    

# returns the correspinding test input based upon the field selected by user in input-dropdown-field
@app.route("/test-input/", methods = ["POST"])
def get_test_input():
    inputs = request.get_json()
    model_path = inputs["model"]
    testInputs = pd.read_csv(model_path + './../inputs.csv', header=None)
    testInput = testInputs.iloc[(int)(inputs["inputDropdown"]), :].tolist()
    res = make_response(jsonify(markupsafe.Markup(testInput)), 200)
    return res

if(__name__ == "__main__"):
    app.run()