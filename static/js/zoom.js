let networkContainer = d3.select('#network-container')
let networkGroup = d3.select('#network-group')

let zoom = d3.zoom().on('zoom', handleZoom)

// Attaching the zoom behaviour on network-container
networkContainer.call(zoom)

//Event Handler -  for when a zoom or pan gesture is registered
function handleZoom(e) {
    networkGroup
        .attr('transform', e.transform)
}

// Sets the translate and scale factors such that the entire network fits inside of network-container
export function resetZoom(network) {
    let translateX = 0.5 * network.width
    let translateY = 0.5 * network.height

    let scaleX = (document.getElementById('network-container').offsetWidth)/(network.width)
    let scaleY = (document.getElementById('network-container').offsetHeight)/(network.height)
    
    networkContainer.call(zoom.translateTo, translateX, translateY)
                    .call(zoom.scaleTo, Math.min(scaleX, scaleY)) // Using Math.min() to keep the aspect ratio intact and still manage to fit both vertical and horizontal dimensions. 
}