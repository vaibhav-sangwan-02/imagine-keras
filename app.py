import json
import markupsafe
import pandas as pd
import tensorflow as tf
from model_processing import get_model_parameters
from flask import Flask, render_template, request, make_response, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

# returns the model parameters(weights, biases and neuron values) for a given model and test input.
@app.route("/model/", methods = ["POST"])
def get_model_params():
    inputs = request.get_json()
    model_path = inputs["model"]
    model = tf.keras.models.load_model(model_path)
    testInput = json.loads(inputs["inputTextarea"])
    model = get_model_parameters(model, testInput)
    res = make_response(jsonify(markupsafe.Markup(model)), 200) # Using markupsafe.Markup() to apply Jinja2's safe filter programmatically
    return res

# returns the correspinding test input based upon the field selected by user in input-dropdown-field
@app.route("/test-inputs/", methods = ["POST"])
def get_test_input():
    inputs = request.get_json()
    model_path = inputs["model"]
    testInputs = pd.read_csv(model_path + './../inputs.csv', header=None)
    testInput = testInputs.iloc[(int)(inputs["inputDropdown"]), :].tolist()
    res = make_response(jsonify(markupsafe.Markup(testInput)), 200)
    return res

if(__name__ == "__main__"):
    app.run()