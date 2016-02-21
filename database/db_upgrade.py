#!virtualenv/bin/python
import sys
import os
basedir = os.path.abspath(os.path.dirname(__file__))
sys.path = [os.path.join(basedir, '..')] + sys.path

from migrate.versioning import api
from config import SQLALCHEMY_DATABASE_URI
from config import SQLALCHEMY_MIGRATE_REPO
api.upgrade(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO)
print 'Current database version: ' + str(api.db_version(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO))