from app import app, db
from app.models.User import User
from flask import request, abort, json

@app.route("/user/create", methods=["POST"])
def createUser():
	try:
		newUser = User(
			username = request.form['username'],
			email = request.form['email'],
			password = request.form['password'],
			fullName = request.form['fullName'],
			phoneNumber = request.form['phoneNumber'],
		)

		if('emailContactable' in request.form):
			newUser.emailContactable = request.form['emailContactable']
		if('phoneContactable' in request.form):
			newUser.phoneContactable = request.form['phoneContactable']

		db.session.add(newUser)
		db.session.commit()

		return newUser.id
	except KeyError:
		abort(422)

@app.route("/user/<int:userId>", methods=["GET"])
def getUser(userId):
	user = User.query.get(userId)
	print "Getting user %d" % userId
	return json.jsonify(user.toDict())

@app.route("/user/", methods=["GET"])
def a():
	return "HELLO WORLD!"
