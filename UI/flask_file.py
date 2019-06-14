import random
#using librosa
import librosa
import matplotlib.pyplot as plt
import numpy as np
import os
import glob
from scipy import signal
#import lidis
import librosa
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import pickle
import os
import csv
# Preprocessing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler,OneHotEncoder
#Keras
import keras
from keras import models
from keras import layers
from keras.layers import Dense, Dropout,Activation,Flatten,BatchNormalization,regularizers
from keras.models import Sequential,Model 
from keras.layers import Conv2D,MaxPooling2D
from keras.layers.advanced_activations import LeakyReLU

import keras.backend as k 
from keras_preprocessing.image import ImageDataGenerator

# from keras.layers import Embedding
# from keras.layers import LSTM
pre_emphasis=0.97
def log_specgram(audio, sample_rate, window_size=20,step_size=10, eps=1e-10):
	    nperseg = int(round(window_size * sample_rate / 1e3))
	    noverlap = int(round(step_size * sample_rate / 1e3))
	    freqs, times, spec = signal.spectrogram(audio,fs=sample_rate,window='hann',nperseg=nperseg,noverlap=noverlap,detrend=False)
	    return freqs, times, np.log(spec.T.astype(np.float32) + eps)

def create_spectrogram():
	for filename in os.listdir('C:/Users/harshini_2/Desktop/desktop icons/flask/test_data'):
		audio= 'C:/Users/harshini_2/Desktop/desktop icons/flask/test_data/harshu_file.wav'
		y,sr=librosa.load(audio,sr=16000)
		emphasized_signal = np.append(y[0], y[1:] - pre_emphasis * y[:-1])
		freqs,times,spectrogram=log_specgram(emphasized_signal,sr)
		s=librosa.feature.melspectrogram(emphasized_signal,sr,n_mels=128)
		log_S = librosa.power_to_db(s, ref=np.max)
		plt.figure(figsize=(14,8))
		plt.imshow(log_S.T,aspect='auto', origin='lower', extent=[times.min(), times.max(), freqs.min(), freqs.max()])
		plt.ylabel('freq in Hz')
		plt.xlabel('time')
		plt.title('Mel power spectrogram ')
		plt.tight_layout()
		plt.savefig('C:/Users/harshini_2/Desktop/desktop icons/flask/test_data/test/harshu_file.png')
		plt.clf()
		plt.close()
	
def test_gen():
	datagen = ImageDataGenerator(rescale=1./255.)
	test_generator = datagen.flow_from_directory(
		directory="C:/Users/harshini_2/Desktop/desktop icons/flask/test_data/",
		target_size=(192,192),
		batch_size=1,
		class_mode=None,
		shuffle = False,
		seed=42)
	return test_generator

lists=['bed','bird','cat','dog','down','eight','five','four','go','happy','house','left','marvin','nine','no','off','on','one','right','seven','sheila','six','stop','three','tree','two','up','wow','yes','zero' ]

def model():
	create_spectrogram()
	test_generator = test_gen()
	load_model= pickle.load(open('final_project_model.pkl','rb'))
	STEP_SIZE_TEST=test_generator.n//test_generator.batch_size
	test_generator.reset()
	pred=load_model.predict_generator(test_generator,
	steps=STEP_SIZE_TEST,
	verbose=1)
	labels = dict(zip(lists,range(len(lists))))
	predicted_class_indices = np.argmax(pred)
	word = random_word()
	index = labels[word]
	percent = pred[0][index]
	percent = float(percent)*100
	return percent
	

def random_word():
	test_words=[]
	lists=['bed','bird','cat','dog','down','eight','five','four','go','happy','house','left','marvin','nine','no','off','on','one','right','seven','sheila','six','stop','three','tree','two','up','wow','yes','zero' ]
	
	req_word = random.choice(lists)
	test_words.append(req_word)
	num_words = len(test_words)
	return req_word







def get_name():
	names = request.get_json()
	return render_template('project_spell.html',word = names)



from flask import Flask, render_template, request
import simplejson as json
from flask_jsglue import JSGlue

app= Flask(__name__)
JSGlue(app)
@app.route('/')
def main_page():
	return render_template('project_main.html')

@app.route('/spell', methods=["POST","GET"])
def spell_page():
	spell_word = random_word()
	return render_template('project_spell.html',word=spell_word)


@app.route('/pred')
def predicting():
	percent = model()
	return render_template('test.html',val = percent)


# @app.route('/butt')
# def test_page():
# 	return render_template('/test3.html')

# @app.route('/test_final')
# def test_final():
# 	# names = request.get_json(name)
# 	return render_template('/test4.html',res = names)
from flask import jsonify

@app.route('/messages', methods = ['POST'])
def api_message():
	f = open('./test_data/harshu_file.wav', 'wb')
	f.write(request.data)
	f.close()

	# return "Binary message written!"



# @app.route('/add', methods=['GET','POST'])
# def add():
#     # a = request.json
#     # a= a['name']
#     a = request.get_json('data.blobURL')
#     b = a['blobURL']
#     print(b)
#     print(b[5:])

#     # return render_template('test_sh.html',word=a)
#     return jsonify({'name':a})


# @app.route('/new', methods=['GET','POST'])
# def new():
#     # a = request.json
#     # a= a['name']
#     a = request.get_json('data')
    
#     print(a)
#     # print(b[5:])
#     # return render_template('test_sh.html',word=a)
#     return jsonify({'name':a})

# @app.route('/arr',methods=['GET','POST'])
# def array2python():
	
# 	# z=z.decode("utf-8")
# 	# wordlist = json.loads(z)
# 	# x = jsonify(wordlist)
# 	#return render_template('tests.html',word=z)
# 	x= request.get_json()
# 	x = x['title']
# 	return render_template('tests.html',word=x)


# @app.route('/save',methods=['GET','POST'])
# def save():
# 	# x = request.form.keys()
# 	# x= request.files['file'].filename
# 	# x = jsonify(x)
# 	# print(x)
# 	# # app.logger.debug(request.form.keys())
# 	# return render_template('tests.html',word=x)
# 	x=request.files['file'].filename
# 	print(x)
# 	app.logger.debug(request.files['file'].filename) 




# data['title'] = request.json['title']
        # data['release_date'] = request.json['movie_release_date']
        # print(data)
if __name__=='__main__':
	app.run(debug=True)


