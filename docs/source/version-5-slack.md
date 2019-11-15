---
title: Slack
permalink: /v5/integrating/slack/
---

Coral version 5 supports built-in Slack integration to help you forward comments from your moderation queues into appropriate Slack channels.

## Creating a Slack App

To enable web hooks that we will use to forward comments, you'll need to create an App and give it permissions over a channel.

1. Go to https://api.slack.com/apps.
2. Sign into Slack with an account with adminstrator access to your Slack workspace.
3. Select _Create New App_.

<img src="/talk/images/slack/create-01.png" style="margin-left: 10%; width: 80%;" alt="Create new app" title="Create new app">

4. Fill out the details for your new Slack App.

<img src="/talk/images/slack/create-02.png" style="margin-left: 10%; width: 40%;" alt="" title="">

5. Under _Basic Information_ and _Add features and functionality_ select the option for _Incoming Webhooks_.

<img src="/talk/images/slack/create-03.png" style="margin-left: 10%; width: 60%;" alt="" title="">

6. If the incoming webhooks option is _Off_, turn it on. We will need this to send messages through the app to your Slack channels.

<img src="/talk/images/slack/create-04.png" style="margin-left: 10%; width: 50%;" alt="" title="">

7. At the bottom of the page, select _Add New Webhook to Workspace_.

<img src="/talk/images/slack/create-05.png" style="margin-left: 10%; width: 60%;" alt="" title="">

8. You will be navigated to a setup page for the webhook.
9. Select a channel for the webhook. This is the channel comments will be forwarded to.

<img src="/talk/images/slack/create-06.png" style="margin-left: 10%; width: 40%;" alt="" title="">

10. After selecting _Allow_, you will be navigated back to the _Incoming Webhooks_ management page for your app. The new webhook you just created should be listed at the bottom of the page.

<img src="/talk/images/slack/create-07.png" style="margin-left: 10%; width: 70%;" alt="" title="">

11. You can now copy this webhook URL and use it to configure your channels in the Coral configuration pages.
12. Sign into the administration side of your Coral deployment.
13. Select _Configure_ from the top navigation.
14. Select _Slack_ from the side navigation for the configuration area.
15. Here you can add a channel, paste in the webhook URL you created in steps 1 - 10 and select which comment categories you want to receive notifications for.

## I need to find the webhook URL again, where is it?

1. Go to https://api.slack.com/apps
2. Sign into Slack with an account with administrator access to your Slack workspace.
3. Select the app you want from the list of apps in your workspace.

<img src="/talk/images/slack/webhook-01.png" style="margin-left: 10%; width: 50%;" alt="" title="">

4. Select _Incoming Webhooks_ on the left navigation panel.

<img src="/talk/images/slack/webhook-02.png" style="margin-left: 10%; width: 30%;" alt="" title="">

5. Scroll to the bottom of the page to find your webhook URL's associated to their Slack channel outputs.

<img src="/talk/images/slack/webhook-03.png" style="margin-left: 10%; width: 60%;" alt="" title="">

6. You can use the existing webhooks or create a new one using _Add New Webhook to Workspace_
