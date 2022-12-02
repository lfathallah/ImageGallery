![](https://github.com/EmmmaG/readme-pics/blob/master/3.png)
<hr />

# ImgurApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.1.

The purpose of creating this app is to **display** and **upload** photos by using imgur api.

# Run
```sh
$ npm install 

$ npm start
```

# Challenges
##### Display function
* Not familiar with imgur api and has spent a lot of time to find a nice gallery,  can only using the default one at beginning.
* Have a thought of creating my own nice album and display it, more research has been done on it.
##### Upload function
* Haven't create any Angular service with a POST method by using api, a bit confused
* Have no idea how to convert an image file to 'Binary file' or 'base64 data' as the api request
* Downloaded a converted 'base64 data' file, tried to post with Postman to see which kind of data will be responded, but failed...
* Tried without adding any parameters with the upload api in Postman, received data error: 'no image data was sent...', which means the client id works...
* So how to set the parameter if I have the base64 data will be another issue...
# Problems solved
##### Display function
* Issue has been solved with displaying my own nice album, access token has been created by following the instruction on Imgur website with postman.
* 'Header' has been added in Angular service document to provide the authorization token, api has been successfully accessed to get JSON doc.
##### Upload function
* Images can be converted to 'base64 data' and saved as a parameter for later uploading
* The failed response by Postman is because the data is too long, Postman upload file by directly adding the data on URL, which exceed the maximum limit of length. Using the base64 data from a 1px x 1px photo, uploaded successfully with a JSON response.
* Registered Upload service in Angular with the correct Formbody format. The 'header' has been set up with authorized client ID as api request.
* JSON doc has been responded after uploading successfully, the value of link can be used.
# More Challenges for further
* Better to have a progress bar or enable the 'upload button' when the uploading is in progress.


<br/>
<hr/>
This is the first web app I created by using api, thanks for all the helpful online resources.
<br/>
Emma 2017
