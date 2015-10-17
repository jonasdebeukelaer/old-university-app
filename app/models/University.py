from app import db

class University(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.Text, index=True, unique=True)
	address = db.Column(db.Text)
	users = db.relationship("User", backref = "university", lazy = "dynamic")

	def __repr__(self):
		return '<University: %r>' % (self.name)
