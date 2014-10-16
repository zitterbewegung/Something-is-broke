from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

import tenjin
from tenjin.helpers import *
shared_cache = tenjin.GaeMemcacheCacheStorage()
engine = tenjin.Engine(cache=shared_cache)

## it is recommended to configure logging
import logging
logging.basicConfig(level=logging.DEBUG)
tenjin.logger = logging

class MainPage(webapp.RequestHandler):
  def get(self):
    context = {'title': 'Something is broke',
               'items': ['<AAA>','B&B','"CCC"'] }
    html = engine.render("index.pyhtml", context)
    self.response.out.write(html)
application = webapp.WSGIApplication([('/', MainPage)], debug=True)

def main():
  run_wsgi_app(application)

if __name__ == "__main__":
  main()
