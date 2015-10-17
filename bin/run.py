#!/usr/bin/python

import sys
import os
basedir = os.path.abspath(os.path.dirname(__file__))
sys.path = [os.path.join(basedir, '..')] + sys.path

from app import app, db

db.create_all()

app.run(debug = True)
