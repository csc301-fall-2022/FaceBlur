# KidBlur

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description 

Our application allows researchers in the child psychology space to anonymize children in any video, allowing them to publish these videos as supplements for any research publications. Without anonymization, it is a privacy issue to include videos of these children in publications, leaving publications missing helpful supplementation. It also serves a purpose during the research process, by blurring out everything but the child to help researchers only consider the child's reaction to unknown stimuli.


## Key Features
 * Described the key features in the application that the user can access
 * Provide a breakdown or detail for each feature that is most appropriate for your application
 * This section will be used to assess the value of the features built

*  Accounts (Login / register)
    * The user is first presented with the login page
    * They can fill in their email and password then click on "Sign In"
    * If their account exists they will be redirected to the home page 
    * If it doesn't exist they will see the message "Incorrect email or password"
    * If they do not have an account yet they can click on the "Don't have an account yet?" link and they will be redirected to the registration page
    * On the registration page the user can fill out their email, the password they want to use and again the same password
    * If the password is not the same in both fields, they will see the message "Passwords do not match"
    * If the email is already in use they will see the message "Email in use"
    * If neither of those things happen and an error does not occur the account will be saved and they will be redirected to the hompage
*  Upload videos
    * On the homepage, the user can the list of videos they have uploaded
    * At the bottom of the page they can switch between pages or change the amount of rows on the page to see more of their uploaded videos (if they have more)
    * The user can click on a video row and they will be redirected to the videoplayer
    * The user can click on "Upload" 
    *  ...
*  Search engine 
    * The search engine is located on the homepage at the top
    * The user can type in a video title, and only the video titles that match will show up
    * The user doesn't have to press search, the search engine searches as they are typing
*  Video Player
    * The user can click on button "back" to return to homepage
    * The user can play or pause the video using the play/pause button
    * The user can skip to a part in the video using the sliding bar under the play/pause button
    * The user can mute and unmute using the speaker button and change the volume using the sliding bar beneath it 
    * The user can make the video full screen by pressing on the full screen button
    * Download ...

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully

The process starts at the login page where the user can either login or register for an account if they don't have one yet. Once they've logged in, they will be redirected to the home page which if they are a returning user, will show all the videos that they've uploaded in the past. On this home page, the user can search for videos by their names, using the search bar at the top. On this page, the user can also upload videos using the upload button in the bottom right. When the user clicks the upload button, an upload pop up will display. To exit the popup, the user will just click any where on the page that isn't the popup. To upload a video the user can either choose to select from their files or drag and drop a video in. After the user selects a video, they can choose from two blur types using the checkboxes. These blur types determine whether the face or the background gets blurred. After the user chooses a blur type, they can press the submit button to upload it. 
 
 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).

As a developer,you are required to have Docker and Postgresql installed before the following process.

1. Go into the /api directory.
2. Follow the instructions under the **Setup** section of the README.md in that directory.
3. Go back up to the root directory
4. Run `docker-compose up --build`
 
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Describe your overall deployment process from writing code to viewing a live applicatioon
 * What deployment tool(s) are you using and how
 * Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!

We have everything tracked under Github Issues, which is also connected to our Kanban board. Team members are assigned issues, and create feature branches for each issue. Our scum master does her best to ensure these issues are not interdependent, preventing tickets being worked on in parallel from being blockers for each other. 

PRs are made from these feature branches to the main branch. The person opening the PR review assigns a single PR reviewer. We don't allow merges till at least 1 reviewer has approved the feature. We chose this to minimize friction in terms of development, but also ensure that the PR had passed at least 1 person's review before being merged into main. The person who made the PR is responsible for merging their PR once it is accepted.

TODO: Deployment (Siddarth)

 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?
 
 We wil be using the MIT license. Our dependencies, express and react, have MIT license, which is a permissive license, and our partners have agreed to share the code with anyone for any use without or without license; This allows us to choose any license we'd like. So, we chose MIT, meaning it can be distributed, modified, and used for any purpose, private or commercial. Now, any developer can modify or use our codebase. 
 
 We chose to use a permissive license because we are building this application for a course in our university in collaboration with a research lab at our university; university is a place for learning and improving and as such we saw fit to allow other people to learn and improve on our codebase. We are also aware that we are still in school and still have a lot to learn, so we wantto allow experienced developers to modify our code and improve it for their use.
