import { makeNetwork } from "./make-network.js";
import { resetZoom } from "./zoom.js";

let tooltip = d3.select("#neuron-value-tooltip")
let group = d3.select("#network-group")

// Clears up the existing model representation and then draws a new model in network-container
export function draw(model) {
        let network = makeNetwork(model)
        group.html("")
        resetZoom(network) // makes the entire network fit in network-container
        drawConnections(network)
        drawNeurons(network)
}

function drawConnections(network) {
        // Drawing the connections. It's important to draw them before neurons because otherwise they will come above neurons on the z-axis. d3.js doesn't have z-levels.
        for(let connection of network.connections) {
                group.append("line")
                        .attr("x1", connection.from.x)
                        .attr("y1", connection.from.y)
                        .attr("x2", connection.to.x)
                        .attr("y2", connection.to.y)
                        .attr("stroke", connection.color)
                        .attr("stroke-width", connection.strokeWidth)
        }
}

function drawNeurons(network) {
        // Drawing the neurons
        for(let layer of network.layers)
        {
                for(let neuron of layer.neurons)
                {
                        group.append("circle")
                                .attr("cx", neuron.x)
                                .attr("cy", neuron.y)
                                .attr("r", neuron.radius)
                                .attr("fill", neuron.color)
                                // event handlers for when a user hovers over a certain neuron
                                .on("mouseover",
                                        function() {
                                                tooltip.html("Value: " + Math.round(neuron.value * 10000) / 10000)
                                                        .style("display", "block")
                                        })
                                .on("mouseout",
                                        function() {
                                                tooltip.style("display", "none")
                                        })
                }
        }
}