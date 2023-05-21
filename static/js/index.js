d3.select("svg")
        .attr("width", "100%")
        .attr("height", "100%")

let svg = d3.select("#network-group")
        .attr("width", 100000)
        .attr("height", 100000)   

"use strict"
let nodes = [8, 8, 4, 5, 8, 6, 3] //Placeholder data - will be replaced by actual model parameters later on
let xGap = 200
let yGap = 50
let neuronRadius = 20

class Network {
        constructor() {
        this.layers = []
        this.yHeight = 0
        }

        // Whenever a new layer is added to the network, the Y-midpoint of graph will change according to the height of new layer. There arises a need of resetting the Y positions of all neurons.
        addLayer(layer) {
                this.layers.push(layer)
                let layerHeight = (layer.neurons.length * neuronRadius * 2) + ((layer.neurons.length - 1) * yGap)
                if(this.yHeight < layerHeight)
                {
                        this.yHeight = layerHeight
                        for(let layerNum = 0; layerNum < this.layers.length; layerNum++)
                        {
                        this.layers[layerNum].setNeuronsY(this.yHeight)
                        }
                }
                else
                        layer.setNeuronsY(this.yHeight)
        }
}

// An object of class neuron holds it's x and y position
class Neuron {
        constructor(x, y) {
        this.x = x
        this.y = y
        }
}

// Multiple neurons can be added to one layer
class Layer {
        constructor(layerNum) {
        this.layerNum = layerNum
        this.neurons = []
        this.x = (layerNum + 1) * xGap
        this.nextNeuronY = yGap
        }

        addNeuron() {
        this.neurons.push(new Neuron(this.x, this.nextNeuronY))
        this.nextNeuronY += 50
        }

        // Resets the Y position of neurons accoding to the Y-midpoint of Network.
        setNeuronsY(networkHeight) {
        let midNetwork = networkHeight/2;
        let thisHeight = (this.neurons.length * neuronRadius * 2) + ((this.neurons.length - 1) * yGap)
        let midThis = thisHeight/2;
        for(let neuronNum = 0; neuronNum < this.neurons.length; neuronNum++)
        {
                let neuronYRel = ((neuronNum + 1) * neuronRadius * 2) + (neuronNum * yGap) - neuronNum 
                this.neurons[neuronNum].y = neuronYRel - midThis + midNetwork
        }
        }
}

// Making layers and neurons
const network = new Network()
for(let layerNum = 0; layerNum < nodes.length; layerNum++)
{
        const layer = new Layer(layerNum)
        for(let i = 0; i < nodes[layerNum]; i++)
        layer.addNeuron()
        network.addLayer(layer)
}

// Drawing the weights
for(let layerNum = 0; layerNum < network.layers.length; layerNum++)
{
        let layer = network.layers[layerNum];
        for(let neuronNum = 0; neuronNum < layer.neurons.length; neuronNum++)
        {
        let neuron = layer.neurons[neuronNum]
        svg.append("circle")
                .attr("cx", neuron.x)
                .attr("cy", neuron.y)
                .attr("r", neuronRadius)
                .attr("fill", "white")
        }
}

// Drawing connections
for(let j = 1; j < network.layers.length; j++)
{
        let i = j - 1;
        for(let secondNeuronNum = 0; secondNeuronNum < network.layers[i].neurons.length; secondNeuronNum++)
        {
        let secondNeuron = network.layers[i].neurons[secondNeuronNum];
        for(let firstNeuronNum = 0; firstNeuronNum < network.layers[j].neurons.length; firstNeuronNum++)
        {
                let firstNeuron = network.layers[j].neurons[firstNeuronNum];
                svg.append("line")
                .attr("x1", firstNeuron.x)
                .attr("y1", firstNeuron.y)
                .attr("x2", secondNeuron.x)
                .attr("y2", secondNeuron.y)
                .attr("stroke", "white")
        }
        }
}