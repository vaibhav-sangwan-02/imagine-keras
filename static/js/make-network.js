import { Connection, Layer, Network} from "./network-components.js";

export function makeNetwork(model) {
    let weights = model["weights"]
    let biases = model["biases"]
    let neuronValues = model["neuronValues"]

    let nodes = makeNodes(weights)
    let network = addNeurons(nodes, biases, neuronValues)
    setNeuronParams(network)
    addConnections(nodes, weights, biases, network)
    return network
}

function makeNodes(weights) {
    // nodes will hold the number of nodes in each layer
    let nodes = []

    // adding input layer to nodes
    nodes.push(weights[0].length)
    // adding hidden layers and output layers
    for(let layerIndex = 0; layerIndex < weights.length; layerIndex++) {
        nodes.push(weights[layerIndex][0].length)
    }
    return nodes
}

function addNeurons(nodes, biases, neuronValues) {
    // adding all neurons to the network
    let network = new Network()
    for(let layerIndex = 0; layerIndex < nodes.length; layerIndex++) {
        let layer = new Layer()
        for(let neuronIndex = 0; neuronIndex < nodes[layerIndex]; neuronIndex++) {
            layer.addNeuron()
        }
        // Cheching if the bias exists for current layer. If it does, adding the respective neuron to that layer
        if(biases.hasOwnProperty(layerIndex)) {
            layer.addNeuron(1, true)
        }
        network.addLayer(layer)
    }

    // Setting the values of all neurons
    for(let layerIndex = 0; layerIndex < nodes.length; layerIndex++) {
        let layer = network.layers[layerIndex]
        for(let neuronIndex = 0; neuronIndex < layer.neurons.length; neuronIndex++) {
            let neuron = layer.neurons[neuronIndex]
            // Value of bias neuron will be 1
            if(!neuron.isBias) {
                neuron.value = neuronValues[layerIndex][neuronIndex]
            }
        }
    }
    return network
}

// The radius of each neuron will be determined based on its value relative to the minimum and maximum values of same layer neurons.
function setNeuronParams(network) {
    for(let layer of network.layers) {
        let neuronMinValue = Number.MAX_VALUE, neuronMaxValue = 0
        for(let neuron of layer.neurons) {
            neuronMinValue = Math.min(neuronMinValue, Math.abs(neuron.value))
            neuronMaxValue = Math.max(neuronMaxValue, Math.abs(neuron.value))
        }
        for(let neuron of layer.neurons) {
            neuron.radius = linearScale(Math.abs(neuron.value), neuronMinValue, neuronMaxValue, 15, 30)
            if(neuron.value < 0) {
                neuron.color = "#ff8d93"
            }
            else {
                neuron.color = "#7be671"
            }
        }
        // Setting the color of bias
        if(layer.neurons[layer.neurons.length - 1].isBias) {
            layer.neurons[layer.neurons.length - 1].color = "#9073d3"
        }
    }
}

// returns y = f(x), such that rMin = f(dMin) and rMax = f(dMax). In simpler terms, it maps one portion of number line to another portion of number line in a linear fashion.
// dMin and dMax represents minimum and maximum value of domain of f respectively.
// rMin and rMax represents minimum and maximum value of range of f respectively.
function linearScale(x, dMin, dMax, rMin, rMax) {
    if(dMin == dMax)
        return (rMax + rMin)/2;
    else {
        let slope = (rMax - rMin)/(dMax - dMin)
        return rMin + (slope * (x - dMin))
    }
}

function addConnections(nodes, weights, biases, network) {
    // adding all connections to the network
    for(let layerIndex = 0; layerIndex < nodes.length - 1; layerIndex++) {
        let layer = network.layers[layerIndex]
        for(let neuronIndex = 0; neuronIndex < layer.neurons.length; neuronIndex++) {
            let neuron = layer.neurons[neuronIndex]
            if(!neuron.isBias) {
                for(let weightIndex = 0; weightIndex < weights[layerIndex][neuronIndex].length; weightIndex++) {
                    let weight = weights[layerIndex][neuronIndex][weightIndex]
                    let connection = new Connection(neuron, network.layers[layerIndex + 1].neurons[weightIndex], weight)
                    neuron.out.push(connection)
                    network.layers[layerIndex + 1].neurons[weightIndex].in.push(connection)
                    network.connections.push(connection)
                }
            }
            else {
                for(let biasIndex = 0; biasIndex < biases[layerIndex].length; biasIndex++) {
                    let bias = biases[layerIndex][biasIndex]
                    let connection = new Connection(neuron, network.layers[layerIndex + 1].neurons[biasIndex], bias)
                    neuron.out.push(connection)
                    network.layers[layerIndex + 1].neurons[biasIndex].in.push(connection)
                    network.connections.push(connection)
                }

            }
        }
    }

    // setting the color and stroke width of all connections
    let connectionMinValue = Number.MAX_VALUE, connectionMaxValue = 0
    for(let connection of network.connections) {
        connectionMinValue = Math.min(connectionMinValue, Math.abs(connection.value))
        connectionMaxValue = Math.max(connectionMaxValue, Math.abs(connection.value))
    }
    for(let connection of network.connections) {
        connection.strokeWidth = linearScale(Math.abs(connection.value), connectionMinValue, connectionMaxValue, 0, 5)
        if(connection.value < 0) {
            connection.color = "#ff8d93"
        }
        else {
            connection.color = "#7be671"
        }
    }
}