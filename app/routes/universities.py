from app import app, db
from app.models.University import University
from flask import request, abort, json

@app.route("/universities", methods=["GET"])
def getUniversities():
	# allUniversities = University.query.all()
	# universitiesDict = {u.id : u.name for u in allUniversities}
	universitiesDict = {
		'no': 'Nottingham University',
		'ic': 'Imperial College London',
		'lu': 'Leeds University'
	}
	return json.jsonify(universitiesDict)