// This script is used for defining the behaviour of model and input information form.
let modelDropdown = document.getElementById("model-dropdown-field")
let inputDropdown = document.getElementById("input-dropdown-field")
let inputDropdownContainer = document.getElementById("input-dropdown-container")
let inputTextarea = document.getElementById("input-textarea")

// Called when user changes selection of Model Select Dropdown.
function modelFieldChanged() {
    changeInputOptions()
    if(modelDropdown.value == "not selected") {
        inputDropdownContainer.style.display = "none"
        inputDropdown.value = "custom"
        inputTextarea.style.display = "none"
        inputTextarea.value = ""
    }
    else {
        inputDropdownContainer.style.display = "flex"
        if(modelDropdown.value == "custom")
            inputDropdown.value = "custom"
        else
            inputDropdown.value = 0  // Setting the default input to test case 1 for non-custom models(Testing models).
        inputTextarea.style.display = "block"
        inputTextarea.value = ""
    }
}

// This function updates the list of input select dropdown options for a given model.
function changeInputOptions() {
    while(inputDropdown.options.length > 0) {
        inputDropdown.remove(0)
    }

    // Add test inputs only if the selected model is not a custom model. Currently, all the testing models contain 3 test inputs.
    if(modelDropdown.value != "custom") {
        for(let i = 0; i < 3; i++) {
            let newOption = new Option("Test Input " + (i + 1), i)
            inputDropdown.add(newOption)
        }
    }

    // Giving the user an option to write custom inputs.
    inputDropdown.add(new Option("Custom Input", "custom"))
}

// Called when user changes selection of Input Select Dropdown.
function inputFieldChanged() {

}

// Adding event handlers to model select dropdown and input select dropdown.
modelDropdown.addEventListener("change", modelFieldChanged)
inputDropdown.addEventListener("change", inputFieldChanged)