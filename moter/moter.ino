int dirPin = 4;
int stepPin = 5;

void setup() {
  // put your setup code here, to run once:
  pinMode(dirPin,OUTPUT);
  pinMode(stepPin,OUTPUT);
}

void step(boolean dir, int steps) {
  if(dir) {
    digitalWrite(dirPin,LOW);
  }
  else {
    digitalWrite(dirPin,HIGH);
  }
  delay(50);
  
  for(int i=0;i<steps;i++) {
    digitalWrite(stepPin,HIGH);
    delayMicroseconds(1000);
    digitalWrite(stepPin,LOW);
    delayMicroseconds(1000);
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  step(true,50);
  delay(1500);
  step(false,50);
  delay(1500);
}
