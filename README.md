# Imagine Keras
Imagine Keras is a Flask based web application which can picture the weights and biases of Keras based Neural Networks.
### Instructions
#### Setup
1. Download following dependencies:
    * Python 3.10.4
    * Flask 2.3.2
    * Tensorflow 2.12.0
    * Pandas 2.0.1
    * Numpy 1.23.5
<br />
2. Run this command in command prompt<br />

```cmd
git clone https://github.com/vaibhav-sangwan/imagine-keras.git
```

3. Navigate to the cloned repository in Command Prompt
<br />
4. Run this command in command promp:

```cmd
python app.py
```

#### Use
There are 3 testing models available for visualization.
1. Iris Model - This model consists of 4 Dense layers with 8, 4 and 3 units respectively. It is a Multi-class classification model trained on the Iris Dataset (available in SKLearn).
2. Titanic Model - This model consists of 4 Dense layers with 8, 4, 2 and 1 unit respectively. It is a binary classification model trained on the Titanic Dataset (available in Seaborn).
3. Boston Housing Model - This model consists of 5 Dense layers with 16, 18, 8, 4 and 1 unit respectively. It is a regression model trained on the Boston Housing Price Dataset (available in SKLearn).

For each of these models, there are two version available - trained and untrained.
Follow the following steps to visualize neural networks :-
1. Select the model to be visualized in Model dropdown list.
2. Select input to be fed to the model. Test inputs are stored on server side and if one of them is selected, the corresponding test input will be fetched. The input can also be edited in input textarea field. Make sure to follow the format of test inputs. If the neural network has K neurons in input layer, then only K input features must be fed.
3. Click on Visualize

The network visualization is zoomable and pannable. The size of neurons represent the relative value they hold. The stroke width of connections represent relative weight and bias strengths.<br />
You can look at neuron values by hovering over them.

### Working on
Implementing custom model upload functionality.