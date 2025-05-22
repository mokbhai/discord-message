import { DiscordWebhook } from "./discordWebhook";

async function main() {
  try {
    const discordWebhook = new DiscordWebhook();

    // Example signup data
    const signupData = {
      name: "Test User",
      email: "test@test.com",
      timestamp: new Date().toISOString(),
    };

    discordWebhook.sendSignupNotification(signupData);
    discordWebhook.sendSignupNotificationAlternative(signupData);

    // OR Parallel Execution
    // await Promise.all([
    // Some other code
    //   discordWebhook.sendSignupNotification(signupData),
    //   discordWebhook.sendSignupNotificationAlternative(signupData),
    // ]);
  } catch (error) {
    console.error("Failed to send signup notification:", error);
  }
}

main();
