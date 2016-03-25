from app import app
from flask.ext.cors import CORS
from flask import json

#SHOULD THIS BE USED IN PRODUCTION??????????????
CORS(app)

@app.route('/')
def root():
	#return app.send_static_file('index.html')
	return json.jsonify("Sending you default ~/~ data.")