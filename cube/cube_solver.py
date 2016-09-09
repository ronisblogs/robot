'''****************************************************************************
*
*
*
*
*******************************************************************************
'''
import httplib

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

    def add_new_twist(self,cmd):
        self.add_task(cmd)

def test():
    cube_solver = CubeSolver()

if __name__ == "__main__":
    test()