# Notice

This is a **PRE-RELEASE** project and is still in development. This project uses the [application-hosted media bot](https://docs.microsoft.com/en-us/microsoftteams/platform/bots/calls-and-meetings/requirements-considerations-application-hosted-media-bots) SDKs and APIs, which are still in **BETA**.

The code in this repository is provided "AS IS", without any warranty of any kind. Check the [LICENSE](LICENSE) for more information.

# Teams App for the Broadcast Development Kit

This repository contains a sample [application for Teams meetings](https://docs.microsoft.com/en-us/microsoftteams/platform/overview) to control the [Broadcast Development Kit](https://github.com/microsoft/Broadcast-Development-Kit) solution. This application can be loaded into Teams as an in-meeting app to use within the Teams client. 

This Teams app is developed as a single page application (SPA) in React and TypeScript.

![Screenshot of the web UI](docs/common/images/cover.png)

## Dependencies
- This is not an standalone application. It requires an instance of the [Broadcast Development Kit](https://github.com/microsoft/Broadcast-Development-Kit) to work with. Check the documentation in that repository to run the **Broadcast Development Kit** (either locally or in the cloud) before using this application.
- [Node JS and npm](docs/how-to-install-nodejs-and-npm/README.md) are needed to build and run the application.
- An Office 365 tenant and a team configured with Allow uploading custom apps enabled. For more information, see [prepare your Office 365 tenant](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant).

## Getting started

### How to run the solution

You can follow these documents to run and deploy the app:
- [How to run the solution locally](docs/how-to-run-the-solution-locally/README.md)
- [How to run the solution in Azure](docs/how-to-run-the-solution-in-azure/README.md)

You can find more information on how to use the app in the following document:
- [How to use the Meeting App solution](docs/how-to-use-the-meeting-app-solution/README.md)

### Exploring the repository

The repository is structured in the following directories:
- **src**: Contains the source code of the application.
- **public**: Contains static files that are used in the application, including configuration files.
- **manifest**: Contains the manifest file for the Teams app and the icons.
- **docs**: Contains the documentation on the solution.

## Reporting issues

Security issues and bugs should be reported privately to the Microsoft Security Response Center (MSRC) at https://msrc.microsoft.com/create-report, or via email to secure@microsoft.com. Please check [SECURITY](SECURITY.md) for more information on the reporting process.

For non-security related issues, feel free to file an new issue through [GitHub Issues](https://github.com/microsoft/Broadcast-Development-Kit-Meeting-App/issues/new).

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

## Acknowledgments

The architecture used in this solution was inspired by the sample in [codeBelt/react-redux-architecture](https://github.com/codeBelt/react-redux-architecture).

## License

Copyright (c) Microsoft Corporation. All rights reserved.

Licensed under the [MIT](LICENSE) license.
