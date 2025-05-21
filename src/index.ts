import { DiscordWebhook } from "./discordWebhook";

async function main() {
  try {
    const discordWebhook = new DiscordWebhook();

    // Example signup data
    const signupData = {
      email: "user@example.com",
      timestamp: new Date().toISOString(),
    };

    discordWebhook.sendSignupNotification(signupData);
    discordWebhook.sendSignupNotificationAlternative(signupData);
  } catch (error) {
    console.error("Failed to send signup notification:", error);
  }
}

main();
