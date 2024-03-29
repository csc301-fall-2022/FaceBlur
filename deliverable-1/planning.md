# University of Toronto / MBELKS

## Product Details

#### Q1: What are you planning to build?

We are planning to build a web-app that enables U of T Researchers to analyze videos of children while ignoring either the background of the video, or the face of the child. This allows viewers of videos to analyze the situation in the background of the video without being affected by the child, or to analyze the emotions and reactions of the child without knowledge of the background situation. It also anonymizes children, if our users wish to publish the videos to support research. The web-app will be similar to a file library where the user can upload, store, and watch the videos from the studies with the added feature of blurring the component the user wants blurred (faces/ background).


Mockup: https://www.figma.com/file/lAcXjkRLO0Bxhyg5lzz1Ds/CSC301-Mockup


#### Q2: Who are your target users?

Our target users are Researchers at the University of Toronto who are within the Toronto Early Cognition Lab, and who wish to upload and/or view recordings from earlier dates. The scope of this may eventually creep beyond the TECL to other labs such as the Child Development Lab, but will most likely remain U of T centric software.

![Screen Shot 2022-09-30 at 8 41 43 PM](https://user-images.githubusercontent.com/32244859/193376297-1992db30-0422-44a1-ab66-9ad6cc81efab.png)


#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

By using our product the researchers at the University of Toronto Early Cognition Lab would be able to save time as they would be able to quickly upload a video and could choose to automatically blur either the background or the face of the people in the videos. They would be able to save the results into a database on the same web application where they can quickly find any previously uploaded and processed videos that they may want to use. Currently as the researchers aren’t using anything to solve their current problem, they would have to manually blur the faces or backgrounds of their videos using third party applications and then download and reupload the video file to a separate database which is a process that our product streamlines and condenses into one web application. This is either very tedious or outside their technical expertise.


#### Q4: How will you build it?

**Frontend**:
React
- RTL
- Jest
- Node
- Webpack
- ESLint
- Prettier
- Typescript

**Backend**:
- Typescript
- Express.js
- Node
- Jest
- ESLint
- Prettier
- Prisma (ORM)

**Database**
- PostgreSQL

**Third Parties**:
- AWS
- Docker

We are currently using Webpack to serve the application. For deployment this application can then be packaged into a Docker container and served on local servers. The videos will be stored offline on an AWS S3 bucket. Our testing strategy for the frontend revolves around using RTL and Jest to verify components are being rendered and perform the correct functions on stimulus. We aim to keep detailed debug logs for easy troubleshooting.

**Architecture**:
![image](https://user-images.githubusercontent.com/32244859/193376601-e3e2c838-9aad-45fa-a20c-5a4bbafbf285.png)


#### Q5: What are the user stories that make up the MVP?

1. As a researcher at the Toronto Early Cognition Lab, I want to be able to save the videos (in app or by downloading to local server) that have been blurred in order to rewatch them at a later date.

Given the user has logged in, has uploaded a video file, and possibly selected to blur it, when the user selects to save the video, then the user is redirected back to the homepage, the video is saved to the database, and is displayed in the list of saved videos in the homepage.

Given the user has logged in, has uploaded a video file, and possibly selected to blur it, when the user selects to download the video, then the user is redirected back to the homepage and the video is downloaded to the local machine.


2. As a researcher at the Toronto Early Cognition Lab, I want to be able to upload videos in order to automatically blur out faces or backgrounds.

Given the user has logged in and has a properly formatted video file (ex. JPEG), when the user chooses that file and selects to upload it on the webapp, then the video is displayed to the user on the web-app and the user is presented with the option of saving or blurring the file.


3. As a researcher at the Toronto Early Cognition Lab, I want to be able to select whether to blur the faces of children or the background in order to control the variables in the study and focus on certain variables, for instance, facial expressions.

Given the user has logged in and has uploaded a video file, when the user asks to blur the faces of the children in the video, then the blurring process takes place, the page is refreshed, the video with the faces blurred is displayed and the user is presented with the option to save the new video in place of the original video.

Given the user has logged in and has uploaded a video file, when the user asks to blur the background in the video, then the blurring process takes place, the page is refreshed, the video with the background blurred is displayed and the user is presented with the option to save the new video in place of the original video.


4. As a researcher at the Toronto Early Cognition Lab, I want to be able to search through the saved videos in order to easily find a specific video I want to watch.

Given the webapp contains video files and the user has logged in, when the user searches the title of a video in the search bar, then ensure all videos whose title contains the searched words are found and those videos are displayed to the user.

5. As a researcher at the Toronto Early Cognition Lab, I want to have a login/authentication process in order to only allow other researchers at the Toronto Early Cognition Lab and I to have access to these videos so that the children's privacy stays protected.

Given that the user is a member of the Toronto Early Cognition Lab, when the user tries to log in, then ensure their login credentials are in the stored login data and redirect the user to the homepage of the webapp.

![approved_user_stories](approved_user_stories.png)

----
## Intellectual Property Confidentiality Agreement

We have agreed with the partners to option 1: we can share the software and the code freely with anyone with or without a license, regardless of domain, for any use.

![confidentiality_agreement](confidentiality_agreement.png)

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

**Lorena Buciu:** Scrum Master / Fullstack Dev
- Will lead our progress meetings and identify any blockers that other team members may have and ensure our kanban board is accurately reflecting this. Determine ways to prevent backlogs/distractions
- Will add details to new tasks to ensure that instructions are clear for team members
- Will work on tasks in both the backend and frontend components of the application

**Strengths**:
- Agile
- JavaScript
- Vue.js

**Weaknesses**:
- Node.js
- Express.js
- Prisma

**Emily Chang:** Fullstack Dev
- Will work on tasks in both the backend and frontend components of the application
- Will help plan how to create the components

**Strengths**
- Agile
- Vue.js
- Sql

**Weaknesses**
- Node.js
- Express.js
- React

**Kenneth Miura** Team Lead / Fullstack Dev
- Will organize all meetings & facilitate meetings that are not lead by Scrum master.
- Be aware of all components of project, serve to facilitate communication as needed for tickets
- Work on tasks in both backend & frontend components

**Strengths**
- Agile
- SQL
- Javascript

**Weaknesses**
- Node.js
- Express.js
- Prisma

**Siddarth Dagar** Fullstack Dev
- Focus on the frontend, but will be available to help with the backend
- Manage the third party applications used
- Use Webpack to serve the application

**Strengths**
- React/TS
- AWS/Docker
- Node,js

**Weaknesses**
- Design Patterns
- Express.js
- Prisma

**Michelle Chernyi** Fullstack Dev
- Will work on tasks that have a frontend and backend component
- will work with APIs
- Person of contact for our partners


**Strengths**
- SQL
- AWS
- javascript

**Weaknesses**
- React
- Express.js
- Node.js

**Jason You:** Product Manager / Fullstack Dev
- Will guide the team to ensure that the developmental team is following the product owner's product vision
- Will create a product roadmap with the scrum master to plan and create deadlines for the devopment of the product
- Will work on tasks in both the backend and frontend components of the application

**Strengths**:
- Bootstrap
- JavaScript
- PostgreSQL

**Weaknesses**:
- React
- Express.js
- AWS

**Baker Jackson** Fullstack Dev

**Strengths**:
- PostgreSQL
- Express.js
- Database design
- AWS

**Weaknesses**:
- React
- Prisma (still learning)
- Typescript


#### Q7: What operational events will you have as a team?
**Team Meetings:**

Since we plan on having sprints, each week we will have a meeting where we will plan/assign tasks as well as a sprint update meeting at the end of the week. These meetings will be completed online. This will allow us to keep up to date on our progress and help each other with any blockers we may have.

**Partner Meetings:**

In our meeting with our partner, we discussed an overview of the project. This included what was required and our reach goals. In addition to this, we also received guidance on what tech stack we should use. Full details on what we discussed can be found in the meeting-minutes directory under 09-26-2022.md. To continue to make sure that we are on track and meeting the specifications that our partner sets, we will meet with them every Monday to present our progress.


#### Q8: What artifacts will you use to self-organize?


**Github Projects:**
This will be our kanban board where we will manage our tasks and their progress. Tasks will be categorized by to-do, in progress, in review, blocked, and done. We plan on implementing a workflow to automatically update task status. For example, if an in review task PR gets merged in, then the task will move to done.
   - We will have weekly meetings with each other to discuss the next steps of our project and to determine what new tasks should be created. We will create meeting minutes for all our meetings.
   - Tasks will be prioritzed by feature importance. If a task is vital to bringing the project to MVP, this will be prioritized. Any critical bug fixes affecting usage of the platform will also be prioritized.
   - Tasks will get assigned to team members by discussion, we will distribute tasks amongst ourselves based on who is willing to do what and how comfortable they feel about the task.
   - New features will be marked as complete once they have been merged in and tested on our dev build.

 **Discord:**
 This will be our main communication platform where we can collectively organize information and communicate. We can also post announcements for everyone and get responses immediately.
 - Whenever we meet or require assistance we can join a voice chat for a call.
 - Organize relevant zoom links, google docs and meeting minutes.
 - Post ui-mockups and designs for review.
 - Conduct polls, gauge reactions and implement github webhooks.

 * Artifacts can be To-Do lists, Task boards, schedule(s), meeting minutes, etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * **How do you prioritize tasks?**
   * How do tasks get assigned to team members?
   * How do you determine the status of work from inception to completion?

#### Q9: What are the rules regarding how your team works?

Our team's working culture is based on trust and independence. This means that people will vocalize what tasks they are comfortable with and/or would like to work on and how long they will think it should take them. If they give a reasonable timeline, follow that timeline, and provide quality work, this cycle of trust and independence will continue. If people are not meeting reasonable deadline or not providing quality work, then the team lead and/or scrum master will have to interfere.

**Communications:**
* We communicate with each other mainly through two methods our standsups and our discord channel.
   * Our stands up are expected to happen twice a week, at the beginning and end of the week
   * Communication on the discord channel does not have an expected frequency, rather it is used as needed
      * examples of this are if someone ran into an issue that cannot wait until our next stand up, if someone has a question that cannot wait until our next stand up, if someone has an announcement to make, etc.
      * our discord group currently includes 8 channels:
         * meetings: where one of us will post a link to our standsups or our meetings with the partner
         * announcements: where a member will post information that is important or that will be needed later on as well
         * docs: where we can send each other any relevant documents such as our google doc for our Deliverable 1
         * to-do: one person posts a list of discussed tasks after a meeting
         * ui-mockups: where we discussed our mock-up plans, comments, and concerns
         * tech: where we send relvent links for the tech stack we are using such as a guide on react or a tutorial on AWS
         * github: in this channel an automated bot sends a message when someone makes a commit and a pull request
         * general: this channel is for any other matters, questions, issues, or concerns
* Communicating with our partner is done through our weekly online/ in person meetings and then follow up emails when necessary
   * First, every week prior to our monday meeting we send our partner a zoom link
   * In our meetings we fill them in on the previous weeks progress and our plan for the next week. They will provide us with feedback or comments on changes they want, and our scrum master will create tickets for those changes/ implementations and decide on their priority
   * Then, through out the week if we have questions about their feedback or about something we want to implement and we do not want to/ cannot wait until the next meeting, then these questions will be sent to the person of contact and they will send an email with those questions to our partner.

**Meetings:**

Our scrum master and/or team lead (depending on who is leading the meeting) will be our moderators. They will check that everyone showed up and finished the work they were supposed to finish by  going through the tasks in the sprint and ensuring they have all been moved from "in progress" to "under review". To hold people accountable for joining the meetings, we will choose/ be assigned tasks during the meeting, that way if someone doesn't show up, they do not get to choose a task. To hold people accountable for completing action items, the tasks will be assigned to certain sprints so people will know they have a deadline and if they do not complete it within around that deadline, our team lead will have to talk with them and ask what is going on with their task, why it is not completed, or if they need extra support.




----
## Highlights

1. We made key decisions regarding the user flow for processing & uploading blurred videos. We considered the following:
   - any uploaded video be automatically processed such that we created & saved 3 videos, one with faces blurred, one with backgrounds blurred, and one unblurred. This meant the least user involvement, and was made under the assumption that researchers would want all 3 videos all the time.
   - The upload dialogue allows users to choose to blur face or background, and then preview the result. This meant users could check the results before uploading.
   Finally, we decided on a flow where an upload dialogue is opened, users can choose which blurs to apply, and then upload.
2. We chose between an ORM and directly interfacing with our database. The positives of directly interfacing with our database are performance and control. However, we decided on using an ORM because our application does not need to be that performant. Also, the major bottleneck for runtime is going to be processing the video, so performance of our database is not that important. We also are slated to have ~11 users, so our scale is low, further lessening the importance of performance. Control is not relevant for similar reasons, so we chose the more developer friendly option of an ORM.
3. We also decided between SQL and NoSQL. When considering the choice of a NoSQL DB, we considered the primary benefits, namely flexible schema and scalability. However, for our usecase, these are both not particularly relevant. Our schema is well-defined and unlikely to change, and also quite simple. Scalability is not important because our planned userbase is 11 users. Therefore, we chose to use SQL, because of it's stability & concrete schema, meaning our future development work will be simpler.


