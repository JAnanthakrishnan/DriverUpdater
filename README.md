# DriverUpdater
An application to automatically update the driver executables used in Selenium. 
Support for ChromeDriver, GeckoDriver and EdgeDriver.
## Steps:
1. Head over to [config/machines.json](config/machines.json) to enter the details of your IP Address.
2. Open [routes/update.js](routes/update.js) and change the download directory accordingly, in line 134,106,75 for the three driver executables. 
3. If you're using this for the first time, Fill the version of the current drivers you have in [config/prevVersion.json](config/prevVersion.json). The values will be updated automatically everytime you run the application.
4. run command 
```
npm run dev
```
5. Head over to http://localhost:3000/ (default) to check and update your driver versions.

## Admin Access:

Change Password [here](https://github.com/JAnanthakrishnan/DriverUpdater/blob/c0755312f33a0c14245dc3e4a4d1a69b5c39a15a/client/src/components/AdminPage.js#L62)
to access the IP Details.

