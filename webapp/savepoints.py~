# !/usr/bin/env python

from google.appengine.ext import db
import cgi
from models import Point

arguments = cgi.FieldStorage()


p = Point(latitude=str(arguments['latitude']),longitude=str(arguments['longitude']))
p.put()
~      
