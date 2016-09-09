'''****************************************************************************
*
*
*
*
*******************************************************************************
'''
import httplib
import kociemba

class CubeSolver(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def add_task(self,task):
        url = "http://127.0.0.1:8080/&"+task
        conn = httplib.HTTPConnection("127.0.0.1:8080")
        conn.request(method="GET",url=url)

        response = conn.getresponse()
        res=response.read()
        print res

    def add_new_cube(self,cube):
        self.add_task(cube)
        faces = self.convert_faces(cube)
        steps = kociemba.solve(faces)
        return steps

    def add_new_twist(self,cmd):
        self.add_task(cmd)

    def convert_faces(self,colors):
	str_faces = ""
        d = {'W':'F','O':'L','B':'U','R':'R','G':'D','Y':'B'}
	for c in colors.upper():
            str_faces += d.get(c)

        return str_faces

    def send_head(self):
        path = self.path

        path = path[0].split('&', 1)
        if 1<len(path): # cube set
            cube = path[1]
            self.send_response(200)
            self.send_header("Content-type", 'text/plain')
            self.end_headers()
            self.wfile.write(self.add_new_cube(cube))
            return None

        return SimpleHTTPServer.SimpleHTTPRequestHandler.send_head(self)



PORT = 8000
httpd = SocketServer.TCPServer(("", PORT), CubeSolver)
print "serving at port", PORT
httpd.serve_forever()
