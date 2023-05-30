import { Connection, Layer, Network} from "./network-components.js";


export function makeNetwork(model) {
    let weights = model["weights"]
    let biases = model["biases"]
    let neuronValues = model["neuronValues"]

    let nodes = makeNodes(weights)
    let network = addNeurons(nodes, biases, neuronValues)
    setNeuronParamsLayerBased(network)
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

function setNeuronParamsLayerBased(network) {
    for(let layer of network.layers) {
        let neuronMinValue = Number.MAX_VALUE, neuronMaxValue = 0 
        for(let neuron of layer.neurons) {
            neuronMinValue = Math.min(neuronMinValue, Math.abs(neuron.value))
            neuronMaxValue = Math.max(neuronMaxValue, Math.abs(neuron.value))
        }
        if(Math.abs(neuronMaxValue - neuronMinValue) > 0.001) {
            let linearCoeff = (30 - 15)/(neuronMaxValue - neuronMinValue)
            for(let neuron of layer.neurons) {
                neuron.radius = 15 + (linearCoeff * Math.abs(neuron.value))
                if(neuron.value < 0) {
                    neuron.color = "#ff8d93"
                }
                else {
                    neuron.color = "#7be671"
                }
            }
        }
        // Setting the color of bias
        if(layer.neurons[layer.neurons.length - 1].isBias) {
            layer.neurons[layer.neurons.length - 1].color = "#9073d3"
        }
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
    if(connectionMaxValue - connectionMinValue >  0.000001) {
        let linearCoeff = (5)/(connectionMaxValue - connectionMinValue)
        for(let connection of network.connections) {
            connection.strokeWidth = (linearCoeff * Math.abs(connection.value))
            if(connection.value < 0) {
                connection.color = "#ff8d93"
            }
            else {
                connection.color = "#7be671"
            }
        }
    }
}