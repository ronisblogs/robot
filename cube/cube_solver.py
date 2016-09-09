'''****************************************************************************
*
*
*
*
*******************************************************************************
'''
import httplib
import kociemba

class CubeSolver:
    def __init__(self,colors=None):
        if colors is None:
            self.add_new_cube("WWWGGGWWWGGGWWWGGGRRRRRRRRRYYYBBBYYYBBBYYYBBBOOOOOOOOO")

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
        print steps

    def add_new_twist(self,cmd):
        self.add_task(cmd)

    def convert_faces(self,colors):
	    str_faces = ""
        d = {'W':'F','O':'L','B':'U','R':'R','G':'D','Y':'B'}
	    for c in colors.upper():
            str_faces += d.get(c)

        return str_faces
}

def test():
    cube_solver = CubeSolver()

if __name__ == "__main__":
    test()