# Everest

The Agile Future of Publishing

# Up and Running in 60 Seconds

I like to use a tool called `foreman` to start and stop a dev environment
quickly. This does all of the hardwork that Toaster does but in a significantly
easier way. Also, foreman can make upstart scripts from this configuration which
can be used to daemonize the processes on a production machine.

    gem install foreman

Install all of the node modules

    npm install

Install all of the services

    brew install redis mongodb

Start the app

    foreman start
