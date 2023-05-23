import { network } from "./make-network.js"; 

d3.select("svg")
        .attr("width", "100%")
        .attr("height", "100%")

let svg = d3.select("#network-group")  

// Drawing the connections. It's important to draw them before neurons because otherwise they will come above neurons on the z-axis. d3.js doesn't have z-levels.
for(let connection of network.connections) {
        svg.append("line")
                .attr("x1", connection.from.x)
                .attr("y1", connection.from.y)
                .attr("x2", connection.to.x)
                .attr("y2", connection.to.y)
                .attr("stroke", connection.color)
                .attr("stroke-width", connection.strokeWidth)
}

// Drawing the neurons
for(let layer of network.layers)
{
        for(let neuron of layer.neurons)
        {
                svg.append("circle")
                        .attr("cx", neuron.x)
                        .attr("cy", neuron.y)
                        .attr("r", neuron.radius)
                        .attr("fill", neuron.color)
        }
}