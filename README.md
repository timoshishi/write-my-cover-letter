# Write My Cover Letter

This is a script to aid writing personalized cover letters in .pdf or .docx
format to your disk.

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

![]('cover_letter.gif')

## Installation

Clone project from github

`git clone https://github.com/timoshishi/write-my-cover-letter.git`

- Install globally: `npm install -g ./` in base directory of project

  - Run by typing `coverletter` in your terminal
  - Writes to your present working directory

- Install locally: `npm install` in base directory of the project
  - Run by typing `npm run coverletter` in project directory
  - Writes to your present working directory

## Demo

Insert gif or link to demo

## Structure of the Cover Letter

- Intro
- A few sentences encapsulating your interest and some knowledge of the company
  wrapped up with a sentence about the position you are applying for with
  relevant skills listed.

- A paragraph describing a recent project you have worked on. This has options
  for Full Stack, Front End and Back End. These paragraphs are selected in the
  prompt process.

- A paragraph speaking as to why you are an amazing person to work with and the
  values you hold dear.

- Closing that includes your name, your sites and contact information.

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## FAQ

#### Is this in any way useful to me?

It is unlikely at this point as it is highly customized to my use case

#### How can I personalize Write my Cover Letter for myself?

Altering the information contained in JSON files located at
`/src/cvPersonalization`
