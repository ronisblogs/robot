import numpy as np
import cv2
from matplotlib import pyplot as plt

def polar2cartesian(rho,theta):
    if theta > np.pi:
        theta -= np.pi

    a = np.cos(theta)
    b = np.sin(theta)
    x0 = a*rho
    y0 = b*rho
    x1 = int(x0 +1000*(-b))
    y1 = int(y0 +1000*(a))
    x2 = int(x0 -1000*(-b))
    y2 = int(y0 -1000*(a))

    return (x1,y1),(x2,y2)

def mask(bgr_img,hsv_img,low,up):
    lower_color = np.array(low)
    upper_color = np.array(up)
    mask_color = cv2.inRange(hsv_img,lower_color,upper_color)
    
    tmp=mask_color.copy()
    contours, hierarchy = cv2.findContours(tmp,cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)
    max_contour = 0
    max_area = 0
    
    for i,ct in enumerate(contours):
        area = cv2.contourArea(ct)
        if area > max_area:
            max_contour, max_area = i, area


    approx = cv2.approxPolyDP(contours[max_contour],10,True)

    h,w = bgr_img.shape[:2]
    vis = np.zeros((h, w, 3), np.uint8)

    #img0=img.copy()
    #cv2.drawContours(img0,[approx],0,(0,0,255),1)
    


    cv2.drawContours(vis,[approx],0,(0,0,255),1)

    edges = cv2.Canny(vis,200,300)
    lines = cv2.HoughLines(edges,1,np.pi/30,45)

    return lines[0]
    

    #cv2.imshow('image',lines)
    #cv2.resizeWindow('image',960,1200)
    #return cv2.bitwise_and(bgr_img,bgr_img,mask=mask_color)








# test
img = cv2.imread('1.jpg')
img1 = img.copy()
img2 = img.copy()
img3 = img.copy()
img4 = img.copy()

hsv = cv2.cvtColor(img,cv2.COLOR_BGR2HSV)
lines = mask(img,hsv,[0,100,0],[179,255,255])

for rho, theta in lines:
    (x1,y1),(x2,y2) = polar2cartesian(rho,theta)
    cv2.line(img2,(x1,y1),(x2,y2),(0,0,255),2)

cv2.imshow("image",img2)

cv2.waitKey(0)
cv2.destroyAllWindows()







