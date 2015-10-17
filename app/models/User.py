from app import db

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(64), index=True, unique=True)
	email = db.Column(db.Text, index=True, unique=True)
	password = db.Column(db.String(128))
	upVotes = db.Column(db.Integer)
	downVotes = db.Column(db.Integer)
	phoneNumber = db.Column(db.String(15))
	fullName = db.Column(db.Text)
	emailContactable = db.Column(db.Boolean)
	phoneContactable = db.Column(db.Boolean)
	# posts = db.relationship("Post", backref = "user", lazy = "dynamic")

	def __repr__(self):
		return '<User: %r>' % (self.username)

	def toDict(self):
		return {
			id : self.id,
			username : self.username,
			email : self.email,
			password : self.password,
			upVotes : self.upVotes,
			downVotes : self.downVotes,
			phoneNumber : self.phoneNumber,
			fullName : self.fullName,
			emailContactable : self.emailContactable,
			phoneContactable : self.phoneContactable
		}
