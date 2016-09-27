import cv2
import cv2.cv as cv
import numpy as np

hsvs = {
    "G": (np.array([35,0,0]),np.array([77,255,255])),
    "W": (np.array([0,0,0]),np.array([179,60,255])),
    "O": (np.array([11,0,0]),np.array([16,255,255])),
    "B": (np.array([100,0,0]),np.array([124,255,255])),
    "Y": (np.array([17,0,0]),np.array([34,255,255])),
    "R":(np.array([0,0,0]),np.array([6,255,255]))
}

def is_color(hsv,color):
    mask=cv2.inRange(hsv,hsvs[color][0],hsvs[color][1])
    hist = cv2.calcHist([mask],[0],None,[2],[0,256])
    
    r=hist[1]/(hist[1]+hist[0])
    if r>0.5:
        return True
    else:
        return False

def get_color(img):
    hsv = cv2.cvtColor(img,cv2.COLOR_BGR2HSV)

    result=""
    for color in hsvs:
        if is_color(hsv,color):
            result += color

    return result   

def recognize(img):
    height,width,depth = img.shape
    h,w = height/3,width/3

    result=""
    for i in range(0,9):        
        x = i%3*w
        y = i/3*h
        tmp=img[y:y+h,x:x+w]
        
        color=get_color(tmp)
        if len(color)==1:
            result+=color
        else:
            return ""
    
    return result


f="2.jpg"
np.set_printoptions(threshold='nan')
img=cv2.imread(f)
result=recognize(img)
print result
