# DriverUpdater
An application to automatically update the driver executables used in Selenium. 
Support for ChromeDriver, GeckoDriver and EdgeDriver.
Steps:
1. Head over to config/machines.json to enter the details of your IP Address.
2. Open routes/update.js and change the download directory accordingly, in line 134,106,75 for the three driver executables. 
3. If your're using this for the first time, Fill the version of the current drivers you have in config/prevVersion.json. The values will be updated automatically everytime you run the application.
4. run command 
```
npm dev start
```
5. Head over to http://localhost:3000/ (default) to check and update your driver versions.
