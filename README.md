# IoT-Gas-Sensor
## Abstract
For this project, I created a hazardous gas sensor that sets off alarms for users to see when hazardous gas is detected. The sensor detects hydrogen sulfide, liquified petroleum gas (methane, propane, and butane), carbon monoxide, alcohol, and air particles. The user can use the Blynk app to see the raw sensor reading of the gases detected compared to the baseline of the total mixture of gases. The user can set the number at which the alarm should sound on Blynk as well. If the set number goes over the threshold then a light and noise will go off, and a message will be sent to the user's email.

## User Story
When the user purchases this device they will receive a 3D printed case with electronics on the inside. They will then open their phone and open the Blynk app. On the Blynk app, they will be able to see what the gas sensor is reading on a gauge display from 0-4095 (raw sensor output value using arbitrary units). Underneath this, they will see a slider input ranging from 0-4095. The slider will be labeled “Sound Alarm at (ppm):” They can change the slider to the exact ppm they deem as hazardous. When the sensor detects that the threshold has been reached or exceeded the case will have an LED flash, a buzzer sound, and an alert will be emailed to them.  

Note: it is worth noting that the 0-4095 values are not precise values of the level of gas detected. The 0-4095 range represents the digital output of an Analog-to-Digital Converter (ADC). It is a measure of the voltage level read by the sensor, not the gas concentration. Once calibrated a more accurate range can be displayed.

## Bill of Materials
|  Quantity  |      Part Number      |              Description           |
|  --------- | --------------------- | ---------------------------------- |
|      1     |    5032-333105-ND     |             MQ5 Sensor             |
|      2     |      732-5017-ND      |             LED diode              |
|      1     |     445-5242-1-ND     |      Piezoelectronic buzzer        |
|      1     |    4CT52R103JTR-ND    |        10k Ohm resistor            |
|      1     | 13-CFR-50JB-52-5K6-ND |         5.6k Ohm resistor          |
|      1     |                       |              M5StickC+             |
|            |                       |      Printed Circuit Board         |
