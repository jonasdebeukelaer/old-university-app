from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import flask.ext.login as flask_login

app = Flask(__name__, static_url_path='')
app.config.from_object('config')

login_manager = flask_login.LoginManager()

login_manager.init_app(app)

db = SQLAlchemy(app)

from app.routes import index, universities, user