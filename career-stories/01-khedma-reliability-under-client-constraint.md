# Khedma: Reliability Under a Client Constraint

## Short version

Khedma runs on unattended Android kiosks that may be left alone for 24 to 48 hours. I originally wanted to use Device Owner mode with an MDM, but the client rejected that because they wanted to retain control of their own hardware. I accepted the constraint and built a foreground service in a separate process that reports irregular device and application states to the server, including app termination, display-off events, and printer problems.

## Detailed story in my voice

So, Khedma is a self-service donation application that runs on Android kiosks. A donor selects a donation program, chooses an amount, pays by card, and can print a receipt using a USB thermal printer. The important part of the environment is that these devices can be left unattended for 24 to 48 hours.

This means the problem is different from a normal mobile application. If an application on somebody's personal phone closes, the user sees it and can reopen it. But with an unattended kiosk, if the app dies, the display is switched off, the printer goes offline, or the printer runs out of paper, nobody may notice. The kiosk can quietly stop accepting donations until somebody visits the site and checks the hardware.

My first choice was Device Owner mode with an MDM. Device Owner mode is the standard Android approach when an application needs stronger control over a dedicated device, and an MDM would make it possible to manage those devices as a fleet. So technically, this was the direction I wanted to explore first.

The client refused this approach. The reason was not implementation cost or difficulty. They owned the devices, and they did not want Device Owner or MDM enrollment to move control of their hardware away from them. Once I understood that ownership was the actual concern, I stopped trying to force the original solution. I needed to keep the devices under the client's control while still making failures visible remotely.

What I built was a foreground service that is created when the application first launches. The service runs separately from the main application process, and its responsibility is intentionally narrow. It listens for irregular states and reports them to the server.

The states recorded in my current material are:

- The application moving from the foreground to the background.
- The application exiting or being terminated.
- The device display being switched off.
- The thermal printer going offline.
- The thermal printer running out of paper.

The useful part of running the service in a separate process is that it can survive the termination of the main application process. If the application is killed, the monitoring process can still report that event. Auto-relaunch was handled separately, so the service was not there simply to reopen the app. Its purpose was to capture and report the irregular condition that the relaunch by itself could hide.

The result was that the client kept control of the devices, while the important device states became visible from the server side instead of being discovered only during a physical visit. I did not ship the MDM or Device Owner solution. I used my understanding of that standard solution to design an alternative that worked within the client's actual constraint.

The main thing I learned is that the technically standard solution is not automatically the right practical solution. A client saying no is also not the end of the engineering discussion. I need to understand why the answer is no. In this case, once I understood that the concern was ownership, the direction of the alternative became much clearer.

If I did this again, I would raise the device-ownership question during kickoff. I would ask who owns the hardware, what level of control the client is willing to delegate, and whether device enrollment is acceptable before planning an MDM-based solution.

## How I approached it

1. I identified the failure mode of an unattended device: faults could remain invisible for many hours.
2. I considered Device Owner mode and MDM enrollment as the standard dedicated-device solution.
3. I discussed the approach with the client and learned that hardware ownership and control were the blockers.
4. I kept that constraint instead of trying to work around the client's decision.
5. I separated monitoring from the main application by using a foreground service in another process.
6. I limited the service to irregular-event detection and server reporting.
7. I monitored application state, display state, and printer availability.
8. I kept auto-relaunch separate from telemetry so restarting the application would not hide what had happened.

## Result

- Irregular kiosk states became visible remotely.
- The client retained control of its own devices.
- The monitoring process could report the termination of the main application process.
- Failures did not have to remain hidden until the next physical site inspection.

## Reflection

The senior part of this story is not only the Android implementation. It is knowing the standard solution, understanding why the stakeholder rejected it, and changing the design without pretending that the constraint did not exist.

## Best questions for this story

- Tell me about a time a stakeholder rejected your proposed solution.
- Tell me about a difficult technical trade-off.
- Tell me about a system you built for reliability.
- Tell me about a time you had to work within a business or customer constraint.
- How do you design for unattended Android devices?
- Why did you not use Device Owner mode?

## Factual boundaries

- Never claim that I shipped Device Owner mode or an MDM deployment.
- Do not say that the client rejected it because of cost. The recorded concern was ownership and control.
- The foreground-service telemetry is separate from the Kotlin thermal-printer reconnection fix.
- The current material does not contain a measured uptime improvement or incident-reduction percentage.

