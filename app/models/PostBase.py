from app import db

class PostBase(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.Text)
	posted = db.Column(db.DateTime)
	# Could add comments with db.relationship
