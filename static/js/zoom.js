// Event Handler  - for when a zoom or pan gesture is registered
function handleZoom(e) {
    d3.select("#network-group")
        .attr('transform', e.transform)
}

let zoom = d3.zoom()
            .on('zoom', handleZoom)

// Attaching the zoom behaviour on network-container
d3.select("#network-container")
    .call(zoom)