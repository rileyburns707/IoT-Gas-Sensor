#define BLYNK_PRINT Serial
#include <M5StickCPlus.h>

const int sensorPin = 36;    // MQ5 AO pin connected to G36
const int ledPin = 26;       // LED pin connected to G26
const int buzzerPin = 0;     // Buzzer pin connected to G0

int last_sensorValue = 100;
int cur_sensorValue = 0;
int previous_sensorValue = 0;
int blynkThreshold = 1000;
int sliderValue = 200;
bool alarmActive = false;

#define BLYNK_TEMPLATE_ID "TMPL2tChy3geq"
#define BLYNK_TEMPLATE_NAME "IoT Project"
#define BLYNK_AUTH_TOKEN "arU5ba_FyGWWe-RVSoo7g1AUjruhl70x"

#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <BlynkSimpleEsp32_SSL.h>

const char* ssid = "rburns-iphone";
const char* password = "password";

BlynkTimer timer;

unsigned long lastEmailSent = 0; // for cooldown timer

BLYNK_WRITE(V1) { // Slider value from Blynk
  sliderValue = param.asInt();
  Serial.print("Slider Value: ");
  Serial.println(sliderValue);
}

void sendSensorData() {
  unsigned long now = millis();
  previous_sensorValue = cur_sensorValue;
  cur_sensorValue = analogRead(sensorPin);

  Serial.print("Raw Analog Read: ");
  Serial.println(cur_sensorValue);
  Serial.print("Slider Threshold: ");
  Serial.println(sliderValue);

  M5.Lcd.setCursor(0, 25);

  if (abs(cur_sensorValue - last_sensorValue) > 10) {
    M5.Lcd.fillRect(0, 25, 100, 25, BLACK);
    M5.Lcd.print(cur_sensorValue);
    last_sensorValue = cur_sensorValue;

    Serial.print("Sending to Blynk (V0): ");
    Serial.println(cur_sensorValue);
    Blynk.virtualWrite(V0, cur_sensorValue);
  }

  // Real-time alarm control + email alert
  if (cur_sensorValue <= sliderValue) {
    tone(buzzerPin, 200);
    digitalWrite(ledPin, HIGH);

    if (!alarmActive) {
      Serial.println("Alarm Activated!");
      alarmActive = true;

      if (now - lastEmailSent > 10000) {
        Blynk.logEvent("warning_alert", "Hazardous gas detected");
        Serial.println("Hazardous Gas Detected! Event Sent.");
        lastEmailSent = now;
      }
    }

  } else {
    noTone(buzzerPin);
    digitalWrite(ledPin, LOW);

    if (alarmActive) {
      Serial.println("Alarm Deactivated!");
      alarmActive = false;
    }
  }
}

void setup() {
  M5.begin();
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, password);

  pinMode(sensorPin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  M5.Lcd.setTextSize(2);
  M5.Lcd.print("Sensor Value: ");

  timer.setInterval(5000, sendSensorData); // send every 5 seconds
}

void loop() {
  Blynk.run();
  timer.run();
}
