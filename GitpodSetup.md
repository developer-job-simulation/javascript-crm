# Initial Setup
Log into Gitpod using your Github account.

Next, you're going to want to create a new workspace by click the big green New Workspace button.
Be sure to select your forked branch and not the master branch, because then you won't be able to do pull requests. 
So it should be something like github.com/yourgithubusernamehere/html-css-js, and not 
github.com/developer-job-simulation/html-css-js .
If you need help, review the README.md file in github, or post it in the Discord chat.

# Gitpod Configuration

You should see a VSCode editor with all the files needed.
Click on the Explorer icon (file icon) if you're not already in the folder tree already.
Next, head on to package.json

## Package.Json Config

Locate the "scripts" part, then replace "start" with this line
```
"start": "webpack && npx webpack serve --allowed-hosts all"
```

### Explanation (skip if you don't care)
The issue is that Gitpod has it's own custom generated URL, and so it's expecting something akin to "http://localhost:8080", but it doesn't see that. So it blocks you and gives you an "Invalid Host header" error. When you put this line in here, you are telling webpack that the URL doesn't matter, just display the content. 

## Start The Server, Grab the Backend Server URI

Start the json server by entering 
```
npm run start-json-server
```
Once that is done, a prompt on the bottom right corner will pop up saying that a port is available on port 3000. Click the button that says 'open preview'.
A tab called 'simple browser' will pop up. After that is done, copy the URL for that. It should start with something like https://3000 , and then the rest will be your username and a bunch of generated numbers and letters. 

Next, you're going to want to open up constants.js

## Constants.js Config

Change the BACKEND_BASE_URI to the value you just copied. It should look something like this. 

```
export const BACKEND_BASE_URI = "https://3000-twbluenaxela-htmlcssjs-ztvt4m6tbxk.ws-us45.gitpod.io";
```

And that's it! That's all there is to setup. 

### Explanation (skip if you don't care)
What happens is that normally you are running the server on your computer, and so you're using localhost as the URL to access your server. But now you're using someone else's computer (GitPods servers). So GitPod can't reach that localhost URL because localhost is only visible to YOU only and not the whole world. So you have to use the URL that GitPod and the whole world
(that knows the URL) is able to see. 