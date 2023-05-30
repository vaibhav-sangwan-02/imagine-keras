from flask import Flask, render_template, request, make_response, jsonify
import tensorflow as tf
from model_processing import get_weights, get_biases, get_neuron_values, get_model_parameters
import pandas as pd
import markupsafe

app = Flask(__name__)

@app.route("/")
def home():
    model = tf.keras.models.load_model('./models/titanic/trained')
    testInput = [3.0, 1.0, 22.0, 0.0, 0.0, 9.8375, 0.0, 1.0]
    weights = get_weights(model)
    biases = get_biases(model)
    neuronValues = get_neuron_values(model, testInput)
    return render_template('index.html', weights=weights, biases=biases, neuronValues=neuronValues)

@app.route("/model/", methods = ["POST"])
def get_model_params():
    inputs = request.get_json()
    model_path = inputs["model"]
    model = tf.keras.models.load_model(model_path)
    testInputs = pd.read_csv(model_path + './../inputs.csv', header=None)
    testInput = testInputs.iloc[(int)(inputs["inputDropdown"]), :].tolist()
    model = get_model_parameters(model, testInput)
    res = make_response(jsonify(markupsafe.Markup(model)), 200) # Using markupsafe.Markup to apply Jinja2's safe filter programmatically
    return res

if(__name__ == "__main__"):
    app.run()