# communication-test-automation-evaluation
## Introduction
In this repository, you can find resources to my project named **Communication test automation and evaluation**. Our project main idea is to find upto which extent the human spelled word is correct. 

We used [Google Speech Command Dataset](https://ai.googleblog.com/2017/08/launching-speech-commands-dataset.html) which contains audio files of 30 commonly used words and each word contains nearly 1700 audio pronounciations

We converted those audio files into Mel power Spectograms and then given that data to convolutional Neural network

## Spectrograms

![spectrogram](https://upload.wikimedia.org/wikipedia/commons/c/c5/Spectrogram-19thC.png)

A Spectrogram is a visual representation of the spectrum of frequencies of a signal as it varies with time. 
It has 3 dimensions
* X-axis : Time
* Y-axis : Frequency
* Z-axis : lor intensity represents magnitude
You can find the spectrogram creation code in *spectrogram_creation/audio_spectrograms_creation.ipynb* file

## Model
These Spectrograms are given to Convolutional Neural network model for training. When the trained model is given audio of a word as input then we get the percentage upto which the pronounciation is correct as ouput
You can find the CNN model code in *model/project_ML_model.ipynb* file

## UI

