from app import app, db
from app.models.University import University
from flask import request, abort, json

@app.route("/universities", methods=["GET"])
def getUniversities():
	allUniversities = University.query.all()
	universitiesDict = {u.id : u.name for u in allUniversities}

	return json.jsonify(universitiesDict)
	