# Simple File Sharing

A simple file sharing tool to [self-host](https://github.com/awesome-selfhosted/awesome-selfhosted)


## Features

1. Simple file upload screen to drag an drop the files to share
2. Upload files to your S3 compatible bucket
3. Create sharable link to view the files
4. (Upcoming) Interface to view and download the files
5. (Upcoming) Auth to protect the upload interface
6. (Upcoming) Password protect and time limit shared links


## Motivation

This is a playground for me to code some simple tool.
For this personal tool I chose getting things done over high code quality.

## Screencast

![alt text](https://github.com/lejoe/simple-filesharing/raw/master/screencast.gif "Simple file sharing screencast")

## FAQ

<details>
  <summary>Q: Why not Typescript?</summary>
  In this prototyping phase I chose speed of developement at the expense not solving every edge cases.
  Once the exploration of how to implement the feature with which tools is done, I plan to refactor the code to Typescript.
</details>

<details>
  <summary>Q: Why Vue/Nuxt?</summary>
  I just wanted to play around with a framework that looks apealing to me. 
  I'm not pretending it's the best tool for the job. Some simple HTML/CSS with some fancy JS might do the trick too.
</details>

<details>
  <summary>Q: Why Tailwind?</summary>
  Also because I just wanted to play around with it…
  Some crafted CSS would be cleaner but it's not a high priority for this personal tool.
</details>

## Requirements

A S3 compatible bucket to upload the files to.
To configure it, copy the example .env.example file and fill the values
```bash
cp .env.example .env
```

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```