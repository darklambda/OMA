# OMA
Orchestra Management web-App is an implementation of a CRM applied to the handling of information regarding members of orchestras. 
As it is a personal project, it is still in a pre-release state, but the main functionalities are the storage of member's personal information,
the storage of scores in PDF files, the comunication of general messages with relevant info to the members and the management of rehearsals and their respective
assistance information.

# Local deploy

The current project is based on the PEAN stack, which means, for running it you should have Node.js in a suitable version, and PostgreSQL.

## Front-end
The front-end side should simply be served using the command 
```console
foo@bar:~/.../OMA/orchestra-app$ ng serve
```
## Back-end
The back-end of the app has one pre-requisites, as you should have the process "postgresql.service" running, and a database already available with the credetentials
and parameters set in the file "OMA/back-end/config/db.config.js". Then, the Node.js server is served with
```console
foo@bar:~/.../OMA/back-end $ node server.js
```

# Current state

For a lack of time, the development of this project is in stand-by.

# RoadMap

- [ ] (Mandatory before retaking the project) Updating Angular version to latest LTS
- [x] Storage of member's personal information
- [x] Export and Import of member's data using csv files
- [ ] Filtering of member's data
- [ ] Storage of scores
- [ ] Messages communication to members (via notifications through the app or emails)
- [ ] Rehearsal management