// This script is used for defining the behaviour of model and input information form.
let modelDropdown = document.getElementById("model-dropdown-field")
let uploadFilesContainer = document.getElementById("upload-files-container")
let uploadFilesButton= document.getElementById("upload-files-button")
let uploadedModelName = document.getElementById("uploaded-model-name")
let inputDropdown = document.getElementById("input-dropdown-field")
let inputDropdownContainer = document.getElementById("input-dropdown-container")
let inputTextarea = document.getElementById("input-textarea")

// Called when user changes selection of model-dropdown-field.
function modelFieldChanged() {
    if(modelDropdown.value == "not selected") {
        uploadFilesContainer.style.display = "none"
        inputDropdownContainer.style.display = "none"
        inputTextarea.style.display = "none"
    }
    else {
        if(modelDropdown.value == "custom")
            uploadFilesContainer.style.display = "flex"
        else
            uploadFilesContainer.style.display = "none"
        inputDropdownContainer.style.display = "flex"
        inputTextarea.style.display = "block"
    }

    changeInputOptions()
    inputDropdown.value = "custom"
    inputFieldChanged()
}

// This function updates the list of input select dropdown options for a given model.
function changeInputOptions() {
    while(inputDropdown.options.length > 1) {
        inputDropdown.remove(1)
    }

    // Add test inputs only if the selected model is not a custom model. Currently, all the testing models contain 3 test inputs.
    if(modelDropdown.value != "custom") {
        for(let i = 0; i < 3; i++)
            inputDropdown.add(new Option("Test Input " + (i + 1), i))
    }
}

// Called when user changes selection of input-dropdown-field. If the selected value is a test input, then it fetches the test input from respective path and writes it inside of input-textarea.
async function inputFieldChanged() {
    if(inputDropdown.value == 'custom') {
        inputTextarea.value = ""
    }
    else {
        inputs = {
            model: modelDropdown.value,
            inputDropdown: inputDropdown.value
        }
        await fetch("/test-input/", {
            method  : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        .then(response => response.json())
        .then(function(data) {
            inputTextarea.value = data
        }) 
    }
}

// Displays the name of uploaded folder on upload-custom-model field
function modelUploaded() {
    let path = uploadFilesButton.files[0].webkitRelativePath
    let path_folders = path.split('/')
    uploadedModelName.innerText = path_folders[0] + "/"
}

// Adding event handlers to respective elements
modelDropdown.addEventListener("change", modelFieldChanged)
inputDropdown.addEventListener("change", inputFieldChanged)
uploadFilesButton.addEventListener("change", modelUploaded)