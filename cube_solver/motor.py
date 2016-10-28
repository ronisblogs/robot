'''
motor0:
    dir: PG0    step:   PG3
motor1:
    dir: PG2    step:   PG1
motor2:
    dir: PG4    step:   PG5
motor3:
    dir: PG6    step:   PG7
motor4:
    dir: PG8    step:   PG9
motor5:
    dir: PG10   step:   PG11
'''
import time
import SUNXI_GPIO as GPIO


GPIOS = [GPIO.PG0,
        GPIO.PG3,
        GPIO.PG2,
        GPIO.PG1,
        GPIO.PG4,
        GPIO.PG5,
        GPIO.PG6,
        GPIO.PG7,
        GPIO.PG8,
        GPIO.PG9,
        GPIO.PG10,
        GPIO.PG11]

UP_MOTOR = 0
RIGHT_MOTOR = 1
FRONT_MOTOR = 2
DOWN_MOTOR = 3
LEFT_MOTOR = 4
BACK_MOTOR = 5

CLOCKWISE = True
ANTI_CLOCKWISE = False

def motor_init():
    if not GPIO.init():
        print "please run using root privilege."
        return False

    for gpio in GPIOS:
        GPIO.setcfg(gpio, GPIO.OUT)
    
    return True

def motor_step(motor_id, dir, steps):
    clock_wise = GPIO.HIGH
    anti_clock_wise = GPIO.LOW

    if dir:
        GPIO.output(GPIOS[motor_id*2],clock_wise)
    else:
        GPIO.output(GPIOS[motor_id*2],anti_clock_wise)

    time.sleep(0.05)

    for i in range(0,steps):
        GPIO.output(GPIOS[motor_id*2+1],GPIO.HIGH)
        time.sleep(0.001)
        GPIO.output(GPIOS[motor_id*2+1],GPIO.LOW)
        time.sleep(0.001)

def test():
    if motor_init():
        while True:
            motor_step(0, CLOCKWISE, 50)
            time.sleep(1)

if __name__ == "__main__":
    test()
