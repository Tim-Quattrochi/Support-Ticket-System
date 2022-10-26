# Support Ticket System

## Features

- Register, Log in functionality
- Create, Close, View tickets
- Ability to add notes to the ticket.

## Wants

- Admin/Staff user with special permissions
- Ability to email user with ticket status
- Ability to prioritize tickets
- reminders, and more.

## Tech

Support Ticket System uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [MongoDB] - Store Users/Tickets/Notes
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [React] - JS framework for client-side

## Installation

Support Ticket Sysyem requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
npm install
npm run dev
```

For production environments...

```sh
npm install
npm install && cd frontend && npm install && cd .. && concurrently  \"npm run server\" \"npm run client\""
```

## Citations

```sh
Brad Traversy's
React Front to Back 2022
```

## License

MIT

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[node.js]: http://nodejs.org
[twitter bootstrap]: http://twitter.github.com/bootstrap/
[jquery]: http://jquery.com
[@tjholowaychuk]: http://twitter.com/tjholowaychuk
[express]: http://expressjs.com
[react]: https://reactjs.org/
[mongodb]: https://www.mongodb.com/atlas/database
