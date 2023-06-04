import { draw } from "./draw-network.js";

async function visualize(e) {
    // collect form inputs
    e.preventDefault()
    let form = e.target
    let formData = new FormData(form)

    // make a request for a python script to run, which can use these form inputs to get model weights, biases and values
    let model
    try {
        await fetch('/model-processing/', {
            method  : 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(function(data) {
            if(data.hasOwnProperty("errorMessage")) {
                throw new Error(data["errorMessage"])
            }
            model = data
        }) 
    }
    catch (errorMessage) {
        alert(errorMessage)
        return
    }

    model = model.replaceAll("'",'"') // parsing JSON containing single-quoted keys result in errors. Replacing single quotes with double quotes 
    model = JSON.parse(model) 

    // use these to visualize network
    draw(model)
}

let modelInfoForm = document.getElementById("model-info-form")
modelInfoForm.addEventListener("submit", visualize)