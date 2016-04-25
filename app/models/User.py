from app import app, db
from app.utils import password
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.Text, index=True, unique=True)
    password = db.Column(db.String(128))
    forename = db.Column(db.Text)
    surname = db.Column(db.Text)
    phoneNumber = db.Column(db.String(15))

    upVotes = db.Column(db.Integer, default=0)
    downVotes = db.Column(db.Integer, default=0)
    emailContactable = db.Column(db.Boolean, default=False)
    phoneContactable = db.Column(db.Boolean, default=False)
    verification = db.Column(db.String(40))
    verified = db.Column(db.Boolean, default=False)
    active = db.Column(db.Boolean, default=False)
    # posts = db.relationship("Post", backref = "user", lazy = "dynamic")

    @property
    def is_authenticated(self):
        return self.verified

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)
        except:
            return "error getting id"

    def generate_auth_token(self):
        data = [str(self.id), self.password]
        s = Serializer(app.config['SECRET_KEY'])
        return s.dumps({ 'id': self.id , 'password': self.password})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])

        try:
            data = s.loads(token)
        except BadSignature:
            return None # invalid token

        user = User.query.get(data['id'])
        return user

    def __init__(self, form):
        self.username = form['username']
        self.email = form['email']
        self.forename = form['forename']
        self.surname = form['surname']

        self.givenPassword = form['password']
        self.password = password.hashPassword(self.givenPassword)

        self.verification = 'sample'

        # TODO: Verify that phone number is valid for country?
        self.phoneNumber = form['phoneNumber']

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
            "forename" : self.forename,
            "surname" : self.surname,
            "emailContactable" : self.emailContactable,
            "phoneContactable" : self.phoneContactable
        }

    def toDictWithToken(self):
        return {
            "id" : self.id,
            "username" : self.username,
            "email" : self.email,
            "password" : self.password,
            "upVotes" : self.upVotes,
            "downVotes" : self.downVotes,
            "phoneNumber" : self.phoneNumber,
            "forename" : self.forename,
            "surname" : self.surname,
            "emailContactable" : self.emailContactable,
            "phoneContactable" : self.phoneContactable,
            "token" : self.generate_auth_token()
        }
