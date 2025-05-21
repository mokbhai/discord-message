# Discord Signup Webhook

This project sends Discord webhook notifications when a new user signs up. It's built with Node.js and TypeScript.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Discord webhook URL:
   ```
   DISCORD_WEBHOOK_URL=your_discord_webhook_url_here
   ```

## Usage

To run the example:

```bash
npm start
```

To build the TypeScript code:

```bash
npm run build
```

## How to Get Discord Webhook URL

1. Go to your Discord server
2. Right-click on the channel where you want to receive notifications
3. Select "Edit Channel"
4. Go to "Integrations"
5. Click on "Create Webhook"
6. Give it a name and copy the webhook URL
7. Paste the URL in your `.env` file

## Features

- Sends formatted Discord messages with user signup information
- Includes username, email, and timestamp
- Error handling and logging
- TypeScript support for type safety
