from app import db
from app.utils import password

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(64), index=True, unique=True)
	email = db.Column(db.Text, index=True, unique=True)
	password = db.Column(db.String(128))
	fullName = db.Column(db.Text)
	phoneNumber = db.Column(db.String(15))

	upVotes = db.Column(db.Integer, default=0)
	downVotes = db.Column(db.Integer, default=0)
	emailContactable = db.Column(db.Boolean, default=False)
	phoneContactable = db.Column(db.Boolean, default=False)
	verified = db.Column(db.Boolean, default=False)
	# posts = db.relationship("Post", backref = "user", lazy = "dynamic")

	def __init__(self, form):
		self.username = form['username']
		self.email = form['email']
		self.fullName = form['fullName']

		givenPassword = form['password']
		self.password = password.hashPassword(givenPassword)

		# TODO: Verify that phone number is valid for country?
		self.phoneNumber = form['phoneNumber']

		if('emailContactable' in form):
			self.emailContactable = form['emailContactable']
		if('phoneContactable' in form):
			self.phoneContactable = form['phoneContactable']

	def __repr__(self):
		return '<User: %r>' % (self.username)

	def toDict(self):
		return {
			"id" : self.id,
			"username" : self.username,
			"email" : self.email,
			"password" : self.password,
			"upVotes" : self.upVotes,
			"downVotes" : self.downVotes,
			"phoneNumber" : self.phoneNumber,
			"fullName" : self.fullName,
			"emailContactable" : self.emailContactable,
			"phoneContactable" : self.phoneContactable
		}
