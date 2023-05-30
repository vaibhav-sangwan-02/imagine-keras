from keras import backend as K
import numpy as np

# returns a dictionary containing weights, biases and neuron values of the model
def get_model_parameters(model, testInput):
    res = {}
    res['weights'] = get_weights(model)
    res['biases'] = get_biases(model)
    res['neuronValues'] = get_neuron_values(model, testInput)
    return res

# returns the weights of model as a list
def get_weights(model):
    weights = []
    for layer in model.layers:
        weights.append(layer.get_weights()[0].tolist())
    return weights

 # returns a dictionary. Keys are layers and value is a list of biases for that layer
def get_biases(model):
    biases = dict()
    for layerIndex in range(len(model.layers)):
        layer = model.layers[layerIndex]
        if(len(layer.get_weights()) > 1):
            biases[(str)(layerIndex)] = layer.get_weights()[1].tolist() # dictionary keys are type casted into string because json object keys must be of string type
    return biases

# returns a list of all neuron outputs for testInput
def get_neuron_values(model, testInput):
    neuronValues = []
    neuronValues.append(testInput)
    for layer in model.layers:
        func = K.function([model.get_layer(index=0).input], layer.output)
        layerOutput = func(np.array([testInput]))  # input_data to func should be a 2-D numpy array
        neuronValues.append(layerOutput.tolist()[0])
    return neuronValues
