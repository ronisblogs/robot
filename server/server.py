import os
import posixpath
import BaseHTTPServer
import urllib
import urlparse
import cgi
import sys
import shutil
import mimetypes
import Queue
try:
    from cStringIO import StringIO
except ImportError:
    from StringIO import StringIO

import SimpleHTTPServer
import SocketServer

'''
import os
import sys
from os import curdir
#fileDir = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.realpath(os.path.join(curdir, "../")))
from cube_solver.cube_solver import task_queue
'''


class CubeHTTPServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    task_queue = Queue.Queue()

    def send_head(self):
        path = self.path

        path = path.split('?', 1)
        if 1<len(path): # cube cmd
            self.send_response(200)
            self.send_header("Content-type", 'text/plain')
            self.end_headers()
            #self.wfile.write("YGBRYWGRRGYYOOWRROOWYWBOGYBGBGYRBOWBWOGBOYOBRWRRBGWGYW")
            try:
                task=self.task_queue.get(False)
                self.wfile.write(task)
            except Queue.Empty as e:
                self.wfile.write("")

            return None

        path = path[0].split('&', 1)
        if 1<len(path): # cube set
            task = path[1]
            self.send_response(200)
            self.send_header("Content-type", 'text/plain')
            self.end_headers()
            #self.wfile.write("YGBRYWGRRGYYOOWRROOWYWBOGYBGBGYRBOWBWOGBOYOBRWRRBGWGYW")
            try:
                self.task_queue.put(task)
                #self.wfile.write(task)
            except Queue.Full as e:
                pass

            return None

        return SimpleHTTPServer.SimpleHTTPRequestHandler.send_head(self)

PORT = 8080
httpd = SocketServer.TCPServer(("", PORT), CubeHTTPServerHandler)
print "serving at port", PORT
httpd.serve_forever()