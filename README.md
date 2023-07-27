# Beyond Code Challenge

## What to do (summary)

1. Read this entire README -- you should have the full picture
   before you start.
2. Plan your time a little bit. Don't spend a long time on the challenge.
3. Build your solution.
4. Check in your code to a GitHub repo -- don't be afraid to continually 
   commit code, some history can be cool to see.
5. Either make your repo public, or add me as a viewer (ask me for my email).

## The challenge

In this challenge, a client will retrieve some data from a server, which 
returns the data from a static CSV file. The client does some processing
of the data to show a couple of helpful insights from the data.

This challenge is broken up into a few small chunks:

1. Creating an API to serve some data
2. Consuming the API to fetch the data
3. Parsing the data into a manageable format
4. Getting some insights from the data

How you approach the challenge is entirely up to you.

## Data

There is a data set in CSV format for you in the `data` directory -- this is
what we'll work with. This is an open data set from Kaggle.

It's a simple CSV file with data about various Instagram influencers. It's
pretty self explanatory, but if anything is unclear, you can ask.

## Requirements

1. Need to use TypeScript. All other tech choices are up to you.
2. Need to create an API endpoint which reads from the static data file and
   returns the data in some way.
3. Need to create a script that consumes the API endpoint
4. Need to create some output which gives some insights back to the user. How
   it's executed, and how it's presented is up to you.

## Insights

Your client should give the following insights from the data:

1. Who are the #1 top influencers per category, by followers?
2. Who are the #1 top influencers per country, by engagement avg?

## Skeleton code

I've provided some skeleton project structure in this repo, BUT feel free to
ignore it if you want. You have the freedom to build how you see fit.

## Watch out!

1. Some of the numbers are in millions (M) and some are in thousands (K)
2. What if the data set grew 10x? 100x?

## Not much time

You should aim to cap your time at around 2 hours. You've got your life to live.
The solution doesn't need to be perfect, but you should aim to get the main stuff
working, and include a README explaining what you'd do next, how you'd improve it
if you had more time, and any assumptions you made.

2 hours probably isn't enough time to create a really elegant solution for this
challenge. Part of the test is to see how you handle a limited time budget. So
it's totally expected that things may not be fully complete, and even a little 
scrappy in places.

To that end, I'd recommend planning your time a little bit and pretending 
you're already working in a startup.

## Deliver

You should check in your code to a GitHub (or similar) repo. Feel free to commit
regularly -- can be cool to see the history. When you're ready, share it with me.
You can either make it public, or just add me as a viewer ✌

## Help!

If anything needs clarifying, feel free to ask! You won't be judged negatively.
It's a great thing to ask for clarification when needed.

Reach me at `shane#1096` on Discord.

## From me

Not sure that 2h was absolutely enough for this prototype implementation, maybe not too simple.
Most problematic things - browser can not consume streams nicely (but json is valid only if it is full, not good format for that), so it took time to understand it will not work and some stupid bugs like syntax in nested code. Also maybe thought too much.
Server part was chosen as Express as simple minimalistic framework, that can give you endpoint with minimum code. This helped https://blog.logrocket.com/how-to-set-up-node-typescript-express/
Firstly thought about csv and saw some libraries support streams, which i thought will be good (on this dataset it was not very needed, but better scaling).
Inspired by https://stackoverflow.com/a/49169934 https://dev.to/isalevine/parsing-csv-files-in-node-js-with-fs-createreadstream-and-csv-parser-koi 
For client used react because of previous experience and it can make minimum template with typescript with create-react-app.
Potentially frontend could have more structured code (which in places is clearly processing by 1 row, this algorithm could be used in stream of rows).
If consumer is Node.js server, potential alternative could be stream csv file in response and than processing it with special library by rows in client, store them somewhere and also forming grouped data.
Perfectly it could put csv data to database, use pagination, grouping functions (but problem with categories - 2 columns, not sure if in SQL it will be possible) or as variant doing grouping operations by backend.

## IMPORTANT
To successfully start it note variables in .env. Client part has variable for endpoint url, backend has variable for port and IMPORTANT - absolute path to csv file - because it is easy and configurable. If not configured it will FAIL.
