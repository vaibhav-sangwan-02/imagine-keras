class Neuron {
    constructor(x, y, value, isBias = false) {
        this.x = x
        this.y = y
        this.out = [] // list of connections that originate from this neuron
        this.in = [] // list of connections that end at this neuron
        this.radius = 35
        this.color = "white"
        this.isBias = isBias // boolean representing whether this neuron is a bias neuron or not
        if(isBias)
            this.value = 1
        else
            this.value = value
    }
}

class Connection {
    constructor(from, to, value) {
        this.from = from // Reference to the neuron FROM which this connection originates
        this.to = to // Reference to the neuron TO which this connection reaches
        this.value = value
        this.color = "white"
        this.strokeWidth = 1
    }
}

export class Layer {
    constructor() {
        this.x = 0
        this.y = 0
        this.height = 0
        this.neurons = [] // list of all the neurons this layer holds
        this.yGap = 100 // vertical gap to be shown in between neurons of this layer
    }

    addNeuron(value = 0, isBias = false) {
        this.neurons.push(new Neuron(this.x, this.height + 50, value, isBias))
        this.height += this.yGap
    }

    // whenever the x or y position of layer is changed, all neurons present in the layer need to be translated accordingly.
    setX(x) {
        this.x = x
        for(let neuronIndex = 0; neuronIndex < this.neurons.length; neuronIndex++) {
            this.neurons[neuronIndex].x = x
        }
    }

    // whenever the x or y position of layer is changed, all neurons present in the layer need to be translated accordingly.
    setY(y) {
        this.y = y
        for(let neuronIndex = 0; neuronIndex < this.neurons.length; neuronIndex++) {
            this.neurons[neuronIndex].y = y + (neuronIndex * this.yGap) + (this.yGap/2)
        }
    }

    // Center aligns the current layer on Y-axis. All the neurons get repositioned in such a way that the y-middle-point of layer lies on the same level as y-middle-point of network.
    centerAlign(networkHeight) {
        this.setY((networkHeight/2) - (this.height/2))
    }
}

export class Network {
    constructor() {
        this.width = 0
        this.height = 0
        this.xGap = 300 // horizontal gap present between all the layers of network
        this.connections = [] // list of all the connections present in network
        this.layers = [] // list of all the layers present in network
    }

    // Adding a layer to the network. 
    addLayer(layer) {
        this.layers.push(layer)
        layer.setX(this.width + (this.xGap/2))
        this.width += this.xGap
        this.height = Math.max(this.height, layer.height)
    }

    // Center aligns all the layers on Y-axis.
    centerAlign() {
        for(let layer of this.layers) {
            layer.centerAlign(this.height)
        }
    }

    // from -> Neuron, the neuron from which new connection will originate from
    // to -> Neuron, the neuron where the new connection will sink in
    // weight -> Number, the weight value of new connection
    addConnection(from, to, weight) {
        let connection = new Connection(from, to, weight)

        this.connections.push(connection)
        from.out.push(connection)
        to.in.push(connection)
    }
}