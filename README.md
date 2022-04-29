### How to setup your development environment?
- TODO how to install git, node/npm, vscode.
- TODO how to configure ssh for github
- TODO If person is using Windows, they should install and use [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about)

### How to launch the app locally?
1. If you haven't already, ensure that your development environment is set up properly. Refer to the section above for tips.
2. Clone the repository to your local environment.
   1. In Terminal, go to the folder where you would like to clone the repository to.
   2. Get a link to the repository as image below shows:
      ![alt text](https://i.imgur.com/ZPYKL1y.png)
   3. Run
   ```bash
   git clone {link_to_repository}
   ```

3. Go into the repository. In Unix environment you can use `cd` command for this.
4. Install dependencies frontend app needs to run. Run:
```bash
npm install
```

Note that you might need sudo permissions for that.

3. Start backend. Run:
```bash
npm run start-json-server
```

4. Start frontend. Run:
```bash
npm run start
```

### How to start working on an issue?

1. If you haven't already, ensure that your app runs locally successfully. Refer to the section above for tips.
2. Go to `Issues` tab in the repository and pick an issue. If you are just getting started, consider picking one of the issues that are marked as `Easy`.
3. Thoroughly read issue description and make sure you understand it.
4. Before writing/modifying any code, create a new branch in your local git. This is best practice in the industry - to create a separate branch for each issue you are working on.

### How to get help?

The best way is to ask a question in our Discord community.
Please consider joining: https://discord.gg/7cAkUcKbjB