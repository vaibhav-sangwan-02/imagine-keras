import { draw } from "./draw-network.js";

async function visualize(e) {
    // starting execution
    console.log("Starting execution of visualize()")

    // collect form inputs
    e.preventDefault()
    let form = e.target
    let formData = new FormData(form)
    let inputs = Object.fromEntries(formData);

    // make a request for a python script to run, which can use these form inputs to get model weights, biases and values
    let model
    await fetch('/model/', {
                    method  : 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(inputs)
                })
                .then(response => response.json())
                .then(function(data) {
                    model = data
                }) 
    model = model.replaceAll("'",'"') // parsing JSON containing single-quoted keys result in errors. Replacing single quotes with double quotes 
    model = JSON.parse(model) 
    console.log("Model")
    console.log(model)

    // use these to visualize network
    draw(model)

    // execution done
    console.log("Execution of visualize() done")
}

let modelInfoForm = document.getElementById("model-info-form")
modelInfoForm.addEventListener("submit", visualize)