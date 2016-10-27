import cv2 
import numpy as np
from matplotlib import pyplot as plt

def onHMinChanged(x):
    h=cv2.getTrackbarPos('H(Max)','image')
    if x >= h:
        cv2.setTrackbarPos('H(Min)','image',h-1)

def onSMinChanged(x):
    s=cv2.getTrackbarPos('S(Max)','image')
    if x >= s:
        cv2.setTrackbarPos('S(Min)','image',s-1)

def onVMinChanged(x):
    v=cv2.getTrackbarPos('V(Max)','image')
    if x >= v:
        cv2.setTrackbarPos('V(Min)','image',v-1)

def onHMaxChanged(x):
    h=cv2.getTrackbarPos('H(Min)','image')
    if x <= h:
        cv2.setTrackbarPos('H(Max)','image',h+1)

def onSMaxChanged(x):
    s=cv2.getTrackbarPos('S(Min)','image')
    if x <= s:
        cv2.setTrackbarPos('S(Max)','image',s+1)

def onVMaxChanged(x):
    v=cv2.getTrackbarPos('V(Min)','image')
    if x <= v:
        cv2.setTrackbarPos('V(Max)','image',v+1)

def mask(bgr_img,hsv_img,low,up):
    lower_color = np.array(low)
    upper_color = np.array(up)
    mask_color = cv2.inRange(hsv_img,lower_color,upper_color)
    cv2.imshow('mask',mask_color)
    return cv2.bitwise_and(bgr_img,bgr_img,mask=mask_color)

 

cv2.namedWindow('image')

cv2.createTrackbar('H(Min)','image',0,179,onHMinChanged)
cv2.createTrackbar('H(Max)','image',179,179,onHMaxChanged)
cv2.createTrackbar('S(Min)','image',100,255,onSMinChanged)
cv2.createTrackbar('S(Max)','image',255,255,onSMaxChanged)
cv2.createTrackbar('V(Min)','image',0,255,onVMinChanged) 
cv2.createTrackbar('V(Max)','image',255,255,onVMaxChanged)

f="3.jpg"
img=cv2.imread(f)
hsv = cv2.cvtColor(img,cv2.COLOR_BGR2HSV)

while(1):  
    k=cv2.waitKey(1)&0xFF 
    if k==27: 
        break 

    h_min=cv2.getTrackbarPos('H(Min)','image') 
    s_min=cv2.getTrackbarPos('S(Min)','image') 
    v_min=cv2.getTrackbarPos('V(Min)','image')
    h_max=cv2.getTrackbarPos('H(Max)','image') 
    s_max=cv2.getTrackbarPos('S(Max)','image') 
    v_max=cv2.getTrackbarPos('V(Max)','image')
    
    res = mask(img,hsv,[h_min,s_min,v_min],[h_max,s_max,v_max])

    cv2.imshow('image',res)
    cv2.resizeWindow('image',960,640)


cv2.waitKey(0)
cv2.destroyAllWindows()
