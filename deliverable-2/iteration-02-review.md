# KidBlur



## Iteration 02 - Review & Retrospect

 * When: November 4th, 2022
 * Where: Online via Discord Call

## Process - Reflection


#### Q1. Decisions that turned out well

**1. Weekly stand-up meetings:**
* The decision to have weekly standups was successful because it allowed everyone on the team to get context on what was being worked on, and provided an oppourtunity for us to identify any blockers
* It was a time for us to discuss the state of the current work and talk about future tasks 

**2. GitHub projects board**
* This allowed us to successfully track the progress of current tasks and see which tasks need to be worked on in the future
* Tasks can be assigned to members and PRs can be linked to them

![image](https://user-images.githubusercontent.com/46202743/200140632-735de7e5-acb0-4152-8dc5-d63b1bce0ff8.png)

#### Q2. Decisions that did not turn out as well as we hoped

**1. Discord github workflow integration**
* The notifications tend to have too much information which isn't very useful to our workflow

See below for an example of the density of information served by the bot.
![image](https://user-images.githubusercontent.com/22108651/200204266-ab466d81-a5ae-433d-bed7-8d053c512026.png)


**2. Tracking meeting minutes**
 * This decision was unsuccessful because we weren't able to commit to documenting the meetings in our meeting-minutes folder, so we have no documentation of things that were discussed 


 **3. Delaying CI/CD pipeline implementation**
 * It took us longer than it should have to make our CI/CD pipeline with CircleCI. Because of that, a lot of our code is not following standards that we initially set for our codebase, such as style issues. We also have not properly set up tests for a lot of our code.

#### Q3. Planned changes

1. We are planning to formalize having the weekly tutorial section also serve as a standup, in addition to our current weekly standup every Monday morning. We are making this change because we have had issues where people working on tickets that are dependent on each other are not aware of the status of each other's tickets, complicating development and ultimately slowing down progress. Currently we often have an informal standup during tutorial, but we plan to make it formal to ensure it happens each time.
2. We currently use a discord bot that messages the server every time anyone commits. This isn't super useful because there is an overload of information. Ideally, it would just notify someone if they were requested for a PR review. We want to either configure the bot to do that, or simply make a policy of always DMing teammates whenever you want them to review your PR. This will tighten the review & resolve cycle
3. We are going to do a better job of reaching out when someone has been on the same issue for a long time. This will just ensure no one gets stuck on a ticket.


## Product - Review

#### Q4. How was your product demo?

We prepared for our demo by doing a trial runthrough of our product before the actual demo, to ensure that all of our features were functioning as expected. We demoed a paired down version of our current MVP. We did not have the upload functionality truly working, but we had the ability to search, filter and view videos, albeit with dummy data. We could also download, and had the entire user-flow for uploading done, although it did not actually upload to the cloud at the time of the demo.

Our partner accepted our features in general, and were pleased with our adherence to their logo and general implicit color theme. They did not have change requests, but they requested that we prioritize the face processing portion of our project, as that is more important than the front-end & uploading that we had fleshed out for the MVP. We had some issues with the actual face processing, and were unable to integrate it for the MVP, but we are confident in our ability to get it right. From a product perspective, we were reoriented towards facing what is really important to the client.
