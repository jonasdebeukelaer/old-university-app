from app import app
from flask import json


@app.route('/api/')
def root():
	#return app.send_static_file('index.html')
	return json.jsonify("Sending you default ~/api/~ data.")