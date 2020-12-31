# miniverse-mayhem-dcg

This is the source code for the currently titled "Miniverse Mayhem" digital card game.

Language: Javascript
Environment: Node.js
Add-ons: Express, socket.io, browserify

How to see the current progress:

1. After installing the dependencies, navigate to the folder 'miniverse-mayhem-dcg' and run 'node server.js' from the command line.

2. Navigate to 'http://localhost:3000'. You should see a page that looks like this:

![Screenshot](main_menu.png)

3. The Battle button works and will place you into a queue if you select it and enter one of the two queues, Alien or Bug.

4. If you enter into the opposite queue in another browser window, you will be placed into a game where you can drag and release your cards from your hand. That is all you can do here at the moment.

5. The Collection button also works, but only takes you to a new screen where the only option is to go back to the main screen.

IMPORTANT NOTE: The refresh rate is set to 1 second, which is why the web page may appear sluggish. It is currently that way for debugging.