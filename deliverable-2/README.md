# KidBlur

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description 

Our application allows researchers in the child psychology space to anonymize children in any video, allowing them to publish these videos as supplements for any research publications. Without anonymization, it is a privacy issue to include videos of these children in publications, leaving publications missing helpful supplementation. It also serves a purpose during the research process, by blurring out everything but the child to help researchers only consider the child's reaction to unknown stimuli.


## Key Features
 * Described the key features in the application that the user can access
 * Provide a breakdown or detail for each feature that is most appropriate for your application
 * This section will be used to assess the value of the features built

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully
 
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
