from flask import Flask, render_template
import tensorflow as tf
from model_processing import get_weights, get_biases, get_neuron_values

app = Flask(__name__)

@app.route("/")
def home():
    model = tf.keras.models.load_model('./models/iris/trained')
    testInput = [5.8, 4.0, 1.2, 0.2]
    weights = get_weights(model)
    biases = get_biases(model)
    neuronValues = get_neuron_values(model, testInput)
    return render_template('index.html', weights=weights, biases=biases, neuronValues=neuronValues)

if(__name__ == "__main__"):
    app.run()