# Discord RPC Manager

A web server to easily customize your RPC Discord

## Setup

1. Clone the repo
2. Create an app in the [Discord Developer Portal](https://discord.com/developers/applications) and copy the client id. The application name was the future name of the "Game" (Play at <APP_NAME>) in Discord.
3. Create a `.env` file with `CLIENT_ID=<YOUR_CLIENT_ID>`
4. Run the following commands :

```
npm install
npm start
```

5. Go to http://localhost:8080
6. Fill in the "form"
7. Click button "Apply"

## Preset

To save a preset, fill in the form, press `CTRL + S` and give it a name. You can then select your preset from the drop-down menu at top left to automatically fill in the form.

## Use Image

To use an image in your application, you need to upload it to the [Discord Developer Portal](https://discord.com/developers/applications) in the Rich Presence category. Give it an ID and use it in the webapp form.
