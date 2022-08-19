callysto-nbextension
<<<<<<<<<<<<<<<<<<<<

Various javascript utilities for the callysto hub.

 * Remove unused download-as options

Callysto Account Migration
==========================

I've started extending this extension to help our users register their
migration for the 2i2c hubs. The extension basically adds a modal dialog that
they can complete to record their user hash along with some identifying
information. When they hit submit on the dialog, it makes an AJAX request to the
webserver which is serving Jupyter. That webserver checks that they are
authenticated (via shib) and adds an auth token before making an API request to
an API gateway I've written. The API gateway processes the request and will add
the record to a DynamoDB instance. Ideally I'd like the extension to check the
status of the person's account and e.g. show the migrate button as red if they
haven't done it yet, or green if they have. We'll be sending them some messaging
to help them know what to look for and what to do.

The Extension itself is basically the gist-it extension repurposed.

The extra step of proxying through the local web server lets us inject the
necessary authentication headers without exposing them to the client. An
environment variable is configured for apache through systemd, then the
following config injects the header...
```
  SSLProxyEngine on
  <Location "/migrate">
    AuthType shibboleth
    Require shibboleth
    ShibRequestSetting requireSession true
    ShibUseHeaders off
    PassEnv MIGRATEAPITOKEN
    RequestHeader Set AuthorizationToken "Bearer %{MIGRATEAPITOKEN}e"
    ProxyPass "https://abc12345.execute-api.ca-central-1.amazonaws.com" 
  </Location>
```

The API gateway is set up in AWS as a REST (i.e. not simple HTTP) type API with
authorization via a lambda function authorizer. Assuming authorization passes,
the request is passed on to another lambda function which in turn connects to
DynamoDB. The API has to be configured with support for CORS, and currently
supports the following endpoints in the "prod" stage.

  - `GET /items`: return all records
  - `PUT /items`: create/update a record
  - `DELETE /items/{id}`: delete a record
  - `GET /items/{id}`: return a specific record

These are subject to change for now.  

