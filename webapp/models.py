from google.appengine.ext import db

class Point(db.Model):
   latitude = db.StringProperty(required=True)
   longitude = db.StringProperty(required=True)
