# [WIP]How to run the solution locally

>**This is a draft and its format and content may change in future updates.**
## Getting Started
The objective of this document is to explain the necessary steps to configure and run the Teams Meeting extension solution in a local environment. This includes:

  - [Install and configure ngrok](#install-and-configure-ngrok)
  - [Install the solution packages](#install-the-solution-packages)
  - [Configure the solution](#configure-the-solution)
  - [Build and run the Solution](#build-and-run-the-solution)
  - [Test the solution](#test-the-solution)

### Install and configure ngrok
To run the solution locally we need to establish a secure tunnel between Microsoft Teams and our extension. Microsoft Teams is a cloud-based product and it requires our extension content be available from the cloud using HTTPS endpoints. 

For this purpose, we use [ngrok](https://ngrok.com/), a reverse proxy softawre tool that creates a tunnel to our locally running web server's publicly-available HTTPS endpoints.

Because we have a dependency with [Broadcasts Protocols for Teams](https://github.com/microsoft/Teams-Broadcast-Extension) (backend solution from here) that also requires Ngrok, and Ngrok's free accounts only allow us to run just one instance at the same time, we recommend to create new account to get the required token to run an Ngrok instance. If you haven't downloaded Ngrok yet, you can donwload it from [here](https://www.ngrok.com/download)

Login into your new Ngrok account and in the left menu, in the `Getting Started` section, select the option `Your Authtoken` and copy it. We will use this token to configure our instance of ngrok.

|![Ngrok AuthToken](images/ngrok_authtoken.png)|
|:--:|
|*Copy the Ngrok Authtoken*|

After that, go to the directory where you unziped the `ngrok.exe` file and create a new config file with a different name that the one you use to run the ngrok instance for the backend solution.

**Creating config file**

1. Open vscode
2. Go to File -> New file (or press Ctrl+N)


|![Ngrok Config File](images/ngrok_create_config_file_1.png)|
|:--:|
|*Create new file*|

3. Select yaml as language

|![Ngrok Config File](images/ngrok_create_config_file_2.png)|
|:--:|
|*Select language*|

4. Copy the following configuration into the yaml file and replace the text `{{PUT YOUR AUTHTOKEN HERE}}` with the value of the authtoken copied earlier from the Ngrok dashboard.

```json
authtoken: {{PUT YOUR AUTHTOKEN HERE}}
tunnels:
 extension:
  addr: 3000
  proto: http

```

|![Ngrok Config File](images/ngrok_create_config_file_3.png)|
|:--:|
|*Config file example*|

5. Go to File -> Save (or press Ctrl+S), enter the name of your file (ngrok-extension.yml in this example) and save it in ngrok's folder

|![Ngrok Config File](images/ngrok_create_config_file_4.png)|
|:--:|
|*Save file*|

|![Ngrok Config File](images/ngrok_create_config_file_5.png)|
|:--:|
|*Example result*|

>You only need to perform this initial configuration of ngrok the first time you configure the solution, then you do not need to repeat it again.
  
### Install the solution packages

Before configuring and running the solution, it is necessary to install its dependencies. To do so, go to the main directory of the solution, open a terminal window enter the command `npm i`. It will start to install the packages required by the solution.

|![npm i running](images/installing-packages.png)|
|:--:|
|*Example of `npm i` command running*|

Once finished you will notice that a directory called node_modules and a package-lock.json file have been created.

### Configure the Solution

If we want to run the solution with the backend solution running locally,  we have to use the `config.json` as is.

**Running the solution with the backend running locally**
```json
{
  "buildNumber": "0.0.0",
  "apiBaseUrl": "https://localhost:8442/api",
  "releaseDummyVariable": "empty",
  "featureFlags": {
    "DISABLE_AUTHENTICATION": {
      "description": "Disable authentication flow when true",
      "isActive": true
    }
  }
}

```

To run the solution locally but with the backend running in Azure, you will need to create the respective [App Registration](), open the `config.json` file located in the `public` folder of the solution's root directory and edit the following parameters:

**Running the solution with the backend running in Azure**


```json
{
  "buildNumber": "0.0.0",
  "apiBaseUrl": "https://{{apiBaseUrl}}/api",
  "releaseDummyVariable": "empty",
  "featureFlags": {
    "DISABLE_AUTHENTICATION": {
      "description": "Disable authentication flow when true",
      "isActive": false
    }
  },
  "authConfig": {
    "domain": "{{domain}}",
    "instance": "{{instance}}",
    "tenantId": "{{tenantId}}",
    "groupId": "{{groupId}}",
    "spaClientId": "{{spaClientId}}",
    "clientId": "{{clientId}}",
  }
}

```
Placeholder | Description 
---------|----------
 apiBaseUrl | Base url of the Management API hosted in Azure.
 spaClientId | Client Id of the App Registration of this frontend solution.
 clientId | Client Id of the App Registration of the ManagementApi. 
 groupId | ObjectId of the group created on Azure. 
 tenantId | Azure account Tenant Id.
 instance | TBD
 domain | TBD


# TODO: What we have below is just a template, we need to modify it.
### Build and run the Solution

{{PENDING}}

### Test the solution

{{PENDING}}