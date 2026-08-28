# Native Android Problems and Difficult Debugging

## Overview

I use two separate examples for native Android and difficult debugging. The first is a camera freeze on budget Android devices. The second is a long-running USB thermal-printer connection in Khedma. They demonstrate different skills and should not be presented as one incident.

## Example A: Camera freeze on budget devices

### Short version

A production application froze when users on budget Android devices opened the camera. I did not have direct access to the affected hardware, so I profiled the application using Flutter DevTools, traced the problem to a native-bridge bottleneck, and refactored the camera implementation. The application became stable across the affected device tiers and received no further freeze reports.

### Detailed story in my voice

So, the problem was that the application would freeze when the camera was used on budget Android devices. This was important because it affected a real user segment, but I did not have direct access to the same hardware where the issue was appearing.

Without the device in front of me, I needed to narrow the problem down from the application behavior rather than repeatedly making random changes. I used Flutter DevTools to profile the application and inspect what was happening around the camera flow.

The profiling pointed to a bottleneck around the native bridge used by the camera implementation. The issue was not only a normal Flutter widget-performance problem. The path into the native camera behavior was part of the failure.

I refactored the camera implementation to remove the freeze path. After the change, the application remained stable across the affected device tiers, and there were no further freeze reports.

The main lesson was that testing only on a stronger development phone can hide problems that appear on lower-cost devices. If I were setting up the process again, I would add hardware-diversity testing through a device farm in CI. I would treat representative low-end Android testing as part of the definition of done rather than waiting for production reports.

### How I approached it

1. I treated the report as device-specific rather than assuming it was a general UI bug.
2. I profiled the camera flow with Flutter DevTools.
3. I narrowed the problem to the native bridge used by the camera implementation.
4. I refactored the implementation to remove the bottleneck and freeze path.
5. I verified stability across the affected device tiers.

### Result

- The application became stable across the recorded device tiers.
- There were no further camera-freeze reports.
- The investigation demonstrated that the problem crossed the Flutter/native boundary.

### Factual boundaries

- The current source material does not record the name of the application or the exact date.
- It does not record the affected device models, Android versions, stack trace, profiling measurements, or the exact camera package.
- Do not invent an FPS, memory, CPU, startup-time, or crash-rate improvement.

## Example B: Khedma USB printer reconnection

### Short version

Khedma uses a USB thermal printer while running unattended on Android kiosks. The Flutter printer plugin could lose its long-running USB connection, leaving the user with no printed receipt. I forked the plugin and rewrote its Kotlin native channel to add a self-healing auto-reconnect connection.

### Detailed story in my voice

Khedma is designed to run for long periods on unattended Android tablets or POS devices. After a donor completes a payment, the application can print a receipt through a USB thermal printer.

The problem was that the Flutter thermal-printer plugin's USB connection could drop over time. Android does not always keep a long-running USB connection in the state the application expects. In a normal staffed environment, someone might reconnect or restart the device. With Khedma, there may be nobody standing beside the kiosk, so the donor can press "Print" and receive nothing.

The failure was inside the plugin's native Android behavior, so changing only the Flutter UI would not solve it. I forked the `flutter_thermal_printer` plugin and changed its Kotlin native channel. I added self-healing USB auto-reconnection so the printer connection could recover instead of depending on someone physically intervening at the kiosk.

This is my primary example when somebody asks about Kotlin or native Android work. I use Flutter for cross-platform development, but in this case I needed to go below the Flutter layer, understand the plugin boundary, and change the native implementation because that was where the reliability problem existed.

The printer work is related to the Khedma reliability story, but it is not the same implementation as the foreground-service telemetry. The foreground service reports irregular states such as the printer being offline or out of paper. The plugin fork addresses the USB connection and recovery behavior itself.

### How I approached it

1. I identified that the failure was the long-running USB connection, not the print-button UI.
2. I traced the behavior into the Flutter plugin's Android implementation.
3. I forked the plugin instead of waiting for an upstream change.
4. I rewrote the Kotlin native channel to support self-healing reconnection.
5. I kept the connection fix separate from the foreground-service monitoring design.

### Result

- The application gained self-healing USB reconnection for its unattended printer.
- The solution removed the need to rely on a person being beside the kiosk to recover that connection.
- The work provided shipped Kotlin/native Android experience through a real Flutter plugin boundary.

### Factual boundaries

- The current source material does not record an exact reconnect algorithm, retry interval, device list, or measured failure-rate reduction.
- Do not combine the printer reconnection and foreground-service telemetry into one implementation.
- Do not claim shipped Swift work as part of this story.

## Choosing between the examples

- Use the **camera freeze** for performance profiling, debugging without the affected hardware, or testing across device tiers.
- Use the **printer reconnection** for Kotlin, platform channels, plugins, USB hardware, unattended-device reliability, or going below the Flutter layer.
- Use both only when the interviewer asks broadly about native Android depth. Keep them clearly separated as two examples.

## Best questions for these stories

- Tell me about the hardest bug you diagnosed.
- Tell me about a problem you solved without access to the affected environment.
- What native Android work have you done while using Flutter?
- Tell me about a time a third-party package did not meet your needs.
- How do you debug problems across a Flutter platform channel?
- How would you test an application across a diverse Android device population?

