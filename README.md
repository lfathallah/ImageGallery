![](https://github.com/EmmmaG/readme-pics/blob/master/3.png)
<hr />

# Fieldwire - Image Gallery

This single page Web app to **display** and **search** and **view** images that are hosted in _imgur_.

This project is an Angular application. 
Please take a look on the technical environment specification below. 


# Run
On local server 
There are two options to run the application on local server (localhost).

Option 1 - manual run :

```sh
$ npm install 

$ npm start
```


Option 2 - docker :

- Install the docker engine on your machine (depending on your machine's OS). Installation details => https://docs.docker.com/engine/install/
- Run the start.sh script located at the root of the project
```sh
$ ./start.sh (or sh start.sh)
```

CORS Issue :
Whatever option you choose, you might encounter CORS issues (with error code 429) due to your code running on localhost. 
You can bypass this issue by using a reverse proxy such as **ngrok** (paying service otherwise limited request number) or **localtunnel** (free service).

Option 1 - ngrok :
- Install ngrok : https://ngrok.com/docs/getting-started#step-2-install-the-ngrok-agent
- Run the following command line :
```
ngrok http --host-header=rewrite 8080
```

Option 2 - localtunnel :
- Install localtunnel : https://theboroer.github.io/localtunnel-www/
- Run the following command line
```
lt --port 8080 --local-host localhost
```

# Technical Environment Specification
- Docker Engine
- Angular CLI: 15.0.2
- Node: 18.12.1
-  Package Manager: npm 8.19.2
- OS: darwin arm64

Angular: 15.0.2
- animations, cli, common, compiler, compiler-cli, core, forms
- language-service, platform-browser, platform-browser-dynamic
- router

Packages Version

- @angular-devkit/architect       0.1500.2
- @angular-devkit/build-angular   15.0.2
- @angular-devkit/core            15.0.2
- @angular-devkit/schematics      15.0.2
- @angular/material               15.0.1
- @schematics/angular             15.0.2
- rxjs                            7.5.7
- typescript                      4.8.4

# UX 
- Angular Material : @angular/material (15.0.1)
- Bootstrap 4
