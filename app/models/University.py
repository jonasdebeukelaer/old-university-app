from app import db

class University(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	domain = db.Column(db.Text, unique=True)
	name = db.Column(db.Text, index=True, unique=True)
	address = db.Column(db.Text)
	#users = db.relationship("User", backref = "university", lazy = "dynamic")

	def __init__(self, domain, name, address):
		self.domain = domain
		self.name = name
		self.address = address


	def __repr__(self):
		return '<University: %r>' % (self.domain)
