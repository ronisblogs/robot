import cv2
import cv2.cv as cv
import numpy as np

def get_color(img):
    print type(np.asarray(img))

def recognize(img):
    height,width,depth,channels = img.height,img.width,img.depth,img.nChannels
    h,w = height/3,width/3

    result=""
    tmp=cv.CreateImage((w, h),depth,channels)
    for i in range(0,9):        
        x = i%3*w
        y = i/3*h
        cv.SetImageROI(img,(x,y,w,h))
        cv.Copy(img,tmp)
        cv.ResetImageROI(img)
        get_color(tmp)
        #result += get_color(tmp)
    
    return result


f="4.jpg"
img=cv.LoadImage(f)
img0=cv2.imread(f)
print type(cv.GetImage(cv.fromarray(img0)))
result=recognize(img)
