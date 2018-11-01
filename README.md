# quicknote
A simple web-based note taking application build with Node.js, Express.js and MongoDB

## Installation steps :
1. Clone the repository
2. run "npm install" to install the dependencies
3. Make sure mongo deamon is running
4. run "npm start"
5. Head over to http://localhost:3000/

## Why quicknote ?
This application should be used only for personal use. There is no user authentication or authorization. I wanted to keep it simple, so that I can work on the core features that I needed. I like notes and I have to take notes with code snippets, so that in future, whenever I need, I can quickly get back to these notes.

The interface is almost like One Dark scheme by Atom, just because I prefer a dark interface. This is the main reason, why I bothered to develop this. There are a lot of feature rich note taking apllications available online, but one thing that I didn't like is that none of them provides a dark interface which is something that I was looking for. So, I decided to build my own. 

By default this project is using mongoDB locally, if you want to store you mongo database on the cloud, you can easily do that using mlab hosting service. If There's a missing feature that you'll love to have, you can extend this application quite easily. There are comments, which may help you to understand why I did something / how I did something. For you information I'm lising all the tools/technologies that I have used in this project:

- [Node.js](https://github.com/nodejs/node)
- [Express.js](https://github.com/expressjs/express) 
- [Bootstrap](https://github.com/twbs/bootstrap) 4.1.3 
- [EJS](https://github.com/mde/ejs) (Templating engine)
- [Quill](https://github.com/quilljs/quill/) (WYSIWYG Editor) 
- [Mongoose](https://github.com/Automattic/mongoose) (ODM Library)
- [connect-flash](https://github.com/jaredhanson/connect-flash) (Flash message middleware)

For debugging:
- [debug](https://github.com/visionmedia/debug) (debugging utility )
- [morgan](https://github.com/expressjs/morgan) (HTTP request logger middleware)
- [chalk](https://github.com/chalk/chalk) (Terminal string styler )

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)
