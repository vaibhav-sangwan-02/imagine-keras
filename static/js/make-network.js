import { Layer, Network } from "./network-components.js";

export function makeNetwork(model) {
    let weights = model["weights"], biases = model["biases"], neuronValues = model["neuronValues"]

    let nodes = getNodes(weights)
    let network = addNeurons(nodes, biases, neuronValues)
    addConnections(nodes, weights, biases, network)
    return network
}

function getNodes(weights) {
    // nodes will hold the number of non-bias neurons present in each layer
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
            layer.addNeuron(neuronValues[layerIndex][neuronIndex])
        }
        
        // Cheching if the bias exists for current layer. If it does, adding it to the layer
        if(biases.hasOwnProperty(layerIndex)) {
            layer.addNeuron(1, true)
        }

        network.addLayer(layer)
    }

    // The radius of each neuron will be determined based on its value relative to the minimum and maximum values of same layer neurons. The color of each neuron will depend upon neuron.value's sign.
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

    return network
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

// adding all connections to the network
function addConnections(nodes, weights, biases, network) {
    for(let layerIndex = 0; layerIndex < network.layers.length - 1; layerIndex++) {

        let thisLayer = network.layers[layerIndex]
        let nextLayer = network.layers[layerIndex + 1]

        // Adding weights originating from the current layer neurons
        for(let neuronIndex = 0; neuronIndex < nodes[layerIndex]; neuronIndex++) {
            let neuron = thisLayer.neurons[neuronIndex]
            let weightIndex = 0
            for(let weight of weights[layerIndex][neuronIndex]) {
                network.addConnection(neuron, nextLayer.neurons[weightIndex], weight)
                weightIndex++
            }
        }

        // Adding bias connections if the current layer has a bias
        let lastNeuron = thisLayer.neurons[thisLayer.neurons.length - 1]
        if(lastNeuron.isBias) {
            let biasIndex = 0
            for(let bias of biases[layerIndex]) {
                network.addConnection(lastNeuron, nextLayer.neurons[biasIndex], bias)
                biasIndex++
            }
        }
    }

    // Setting color and stroke width of all connections
    
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