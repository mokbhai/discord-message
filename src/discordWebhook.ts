import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface SignupData {
  email: string;
  timestamp: string;
}

export class DiscordWebhook {
  private webhookUrl: string;

  constructor() {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error(
        "Discord webhook URL is not configured. Please set DISCORD_WEBHOOK_URL in .env file"
      );
    }
    this.webhookUrl = webhookUrl;
  }

  private formatDateTime(date: Date): string {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }).format(date);
  }

  async sendSignupNotification(signupData: SignupData): Promise<void> {
    try {
      const signupDate = new Date(signupData.timestamp);
      const message = {
        embeds: [
          {
            title: "**🚀 New Drcode.ai Signup**",
            description: "A new developer has joined Drcode.ai!",
            color: 0x00ff00, // Green color
            fields: [
              {
                name: "Email",
                value: signupData.email,
                inline: true,
              },
              {
                name: "Signup Time",
                value: this.formatDateTime(signupDate),
                inline: false,
              },
            ],
            timestamp: signupDate.toISOString(),
            footer: {
              text: "Drcode.ai - Empowering Developers",
            },
          },
        ],
      };

      await axios.post(this.webhookUrl, message);
      console.log("Signup notification sent successfully to Discord");
    } catch (error) {
      console.error("Error sending Discord webhook:", error);
      throw error;
    }
  }

  async sendSignupNotificationAlternative(
    signupData: SignupData
  ): Promise<void> {
    try {
      const signupDate = new Date(signupData.timestamp);
      const message = {
        embeds: [
          {
            title: "🌟 New Drcode.ai Developer",
            description: "Welcome to the future of AI-powered development!",
            color: 0x3498db, // Blue color
            thumbnail: {
              url: "https://cdn.discordapp.com/emojis/1026533090627174460.png", // You can replace this with Drcode.ai logo
            },
            fields: [
              {
                name: "📧 Developer Email",
                value: `\`${signupData.email}\``,
                inline: false,
              },
              {
                name: "⏰ Registration Time",
                value: `\`${this.formatDateTime(signupDate)}\``,
                inline: false,
              },
            ],
            timestamp: signupDate.toISOString(),
            footer: {
              text: "Drcode.ai - Building the Future of Development",
              icon_url:
                "https://cdn.discordapp.com/emojis/1026533090627174460.png", // You can replace this with Drcode.ai icon
            },
          },
        ],
      };

      await axios.post(this.webhookUrl, message);
      console.log(
        "Alternative signup notification sent successfully to Discord"
      );
    } catch (error) {
      console.error("Error sending alternative Discord webhook:", error);
      throw error;
    }
  }
}
