from app import app, db
from app.models.User import User
from app.utils import password
from flask import request, abort, json, session

@app.route("/user/create", methods=["POST"])
def createUser():
	try:
		newUser = User(request.form)
		db.session.add(newUser)
		db.session.commit()

		return newUser.id
	except e:
		return json.jsonify({"errorMessage" : "Could not create user"}), 500

@app.route("/user/<int:userId>", methods=["GET"])
def getUser(userId):
	user = User.query.filter_by(id=userId).first()
	if not user:
		return json.jsonify({"errorMessage" : "No matching user found"}), 422
	else:
		return json.jsonify(user.toDict())

@app.route("/user/<int:userId>/verify", methods=["GET"])
def verifyUser(userId):
	user = User.query.filter_by(id=userId).first()
	if not user:
		return json.jsonify({
				"verified" : False,
				"errorMessage" : "No matching user found"
				}), 422
	else:
		user.verified = True
		try:
			db.session.commit()
			return json.jsonify({"verified" : True})
		except e:
			return json.jsonify({
				"verified" : False,
				"errorMessage" : "Could not verify user"
				}), 500

@app.route('/login', methods=['POST'])
def login():
	if request.method == 'POST':
		username = request.form['username']
		print "IM HEEEEEERE"

		user = User.query.filter_by(id=userId).first()

		if not user:
			return json.jsonify({
				"errorMessage" : "No such user"
				}), 422

		if not password.checkPassword(user.password, request.form['password']):
			return json.jsonify({
				"errorMessage" : "Incorrect password"
				}), 403

		session['userId'] = user.id

		return redirect(url_for('index'))

@app.route('/logout')
def logout():
	# remove the username from the session if it's there
	session.pop('username', None)
	return redirect(url_for('index'))
