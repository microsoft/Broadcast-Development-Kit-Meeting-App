# Changelog

Here you can find the changelog for the pre-release versions that are available as [releases in this repo](https://github.com/microsoft/Broadcast-Development-Kit-Meeting-App/releases).

## Notice

This is a **PRE-RELEASE** project and is still in development. This project uses the [application-hosted media bot](https://docs.microsoft.com/en-us/microsoftteams/platform/bots/calls-and-meetings/requirements-considerations-application-hosted-media-bots) SDKs and APIs, which are still in **BETA**.

The code in this repository is provided "AS IS", without any warranty of any kind. Check the [LICENSE](LICENSE) for more information.

## 0.5.0-dev

- Updated the meeting app to support version 0.5.0-dev of the Broadcast Development Kit. This includes:
    - Changes to start extractions using RTMP/RTMPS in pull mode.
    - Changes to support the new statuses for the bot service.
- Fixed a minor issue where unnecessary parameters were sent to the backend when starting an extraction (e.g. SRT latency, when the selected protocol was RTMP).
- Updated dependencies.

## 0.4.0-dev

- Initial pre-release of the solution.
