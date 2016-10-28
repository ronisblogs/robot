'''****************************************************************************
*
*
*
*
*******************************************************************************
'''
import httplib
import kociemba
import time

import motor
import recognizer

TWIST_TIME = 1

class CubeSolver():

    def __init__(self, server=None):
        self.server = server
        self.display = False
        self.is_solving = False

    def add_task(self,cube):
        if self.server is not None:
            self.display = True

        faces = self.revert_faces(cube)
        if self.display:
            self.display_task(faces)
        steps = kociemba.solve(cube)
        self.execute_steps(steps)

    def execute_steps(self,steps):
        self.is_solving = True
        steps = steps.split()
        
        for step in steps:
            self.execute_one_step(step)
            time.sleep(TWIST_TIME)

    def execute_one_step(self,step):
        # "D2 R' D' F2 B D R2 D2 R' F2 D' F2 U' B2 L2 U2 D R2 U"
        if 1==len(step):
            self.display_task(step)
            self.motor_step(step)
        elif "'" == step[1]:
            self.display_task(step[0].lower())
            self.motor_step(step[0].lower())
        else:
            self.display_task(step[0])
            self.motor_step(step[0])
            time.sleep(TWIST_TIME)
            self.display_task(step[0])
            self.motor_step(step[0])

    def motor_step(self, step):
        print step


    def convert_faces(self,colors):
        # color to face
        str_faces = ""
        d = {'W':'F','O':'L','B':'U','R':'R','G':'D','Y':'B'}
        for c in colors.upper():
            str_faces += d.get(c)

        return str_faces

    def revert_faces(self,colors):
        # face to color
        str_faces = ""
        d = {'F':'W','L':'O','U':'B','R':'R','D':'G','B':'Y'}
        for c in colors.upper():
            str_faces += d.get(c)

        return str_faces

    def display_task(self,task):
        url = "http://127.0.0.1:8080/&"+task
        conn = httplib.HTTPConnection("127.0.0.1:8080")
        conn.request(method="GET",url=url)

        response = conn.getresponse()
        res=response.read()
        print res

    def run_forever(self):
        if not self.is_solving: # the robot is idle
            cube=recognizer.get()
            if "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB"==cube:
                return
            else:
                self.is_solving=True
                self.add_task(cube) # need to check.
        else:# the robot is solving a cube
            pass



def test():
    solver = CubeSolver("192.168.1.151:8080")
    solver.add_task("FDBBUDUBRDBLLRFBRRBUFRFULDDUFLFDURLUDRRLLDDUFULLRBFFBB")


if __name__ == "__main__":
    test()
