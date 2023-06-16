# Imagine Keras

Imagine Keras is a Flask-based web application that allows users to upload and visualize Keras Neural Network models intuitively. With Imagine Keras, beginners can easily gain a deeper understanding of what complex neural network structures look like.

## Features

- In Imagine Keras, sequential models are represented as a set of nodes/neurons and connections. Each neuron is represented by a circle and each connection is represented by a straight line joining the corresponding neurons.

- Radii of neurons vary depending upon the value they currently hold. A neuron with a larger value is represented by a larger circle while a neuron with a smaller value is represented by a smaller circle. Users can take a look at the actual value a neuron holds by hovering over it. 

- Connections work similarly, except that they don't have an on-hover behavior. Connections having larger weights have larger stroke widths while connections having smaller weights have smaller stroke widths.

- The application also supports zooming and panning gestures, making it easy to analyze networks of any scale.

- The users can either upload their model for visualization or choose from the list of available toy models.

## Installation

1. Clone this repository by running the following command in the command prompt
```cmd
git clone https://github.com/vaibhav-sangwan/imagine-keras.git
```

2. Download the following dependencies -
   -  Python 3.10.4
   -  Flask 2.3.2
   -  Tensorflow 2.12.0
   -  Pandas 2.0.1
   -  Numpy 1.23.5

3. Navigate to the directory in which the repository was cloned using cd commands and run the following command in command prompt-
```cmd
python app.py
```

## Usage

https://github.com/vaibhav-sangwan/imagine-keras/assets/94783049/f394aa0c-cd02-4f09-9d7e-6034902870f8

## Uploaded Model Format

Users have to upload a model saved in the [TensorFlow SavedModel format](https://www.tensorflow.org/guide/keras/serialization_and_saving). It is the default format in which a model gets saved when you use 
```python
model.save("/path/to/model")
```

Upload the same directory - "/path/to/model" for visualization.

Imagine Keras currently has support for dense layers only. Uploading a model which consists of layers other than "Dense" will result in Internal Server Error.

## Toy Models

These are some pre-built models for users who just want to see what a neural network looks like without having to build one from scratch.

Currently, there are 3 toy models present:

- Iris - a model consisting of 3 Dense layers with 8, 4, and 3 units respectively. It is a Multi-class classification model trained on the Iris Dataset (available in SKLearn).
- Titanic - a model consisting of 4 Dense layers with 8, 4, 2, and 1 units respectively. It is a binary classification model trained on the Titanic Dataset (available in Seaborn).
- Boston Housing - a model consisting of 5 Dense layers with 16, 18, 8, 4, and 1 units respectively. It is a regression model trained on the Boston Housing Price Dataset (available in SKLearn).


For each of these toy models, there are 2 versions available - *trained* and *untrained*.
This is done so that beginners can see the effect of model training on connections.
## Input String Format

As for inputs to the model, the user can fill in a custom input depending on the model they chose. If the model accepts a data point with N features, then only N features must be fed. The input string will look something like this -
```python
[feature_1, feature_2, feature_3, ..., feature_n]
```
Here, feature_1, feature_2, and so on are numerical values of the vector that denotes the data point. The square brackets are also required for a string to be considered a VALID input.

Toy Models have test inputs associated with them. So when the user has selected a toy model for visualization, they can either feed in a custom input as discussed above or choose from the list of available test inputs.
Since the user doesn't know what kind of data points a toy model accepts, it is better to use a test input first. The user can then edit the input string as per their needs.