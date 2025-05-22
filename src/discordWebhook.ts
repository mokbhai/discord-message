import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface SignupData {
  email: string;
  timestamp: string;
  name: string;
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
    return new Intl.DateTimeFormat("en-IN", {
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
            description: `**${signupData.name.toUpperCase()}** has joined Drcode.ai!`,
            color: 0x00ff00, // Green color
            fields: [
              {
                name: "Name",
                value: signupData.name,
                inline: true,
              },
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
              text: "Drcode.ai - Shipping features 2x faster!",
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
            description: `Welcome **${signupData.name.toUpperCase()}** to the future of AI-powered Development!`,
            color: 0x3498db, // Blue color
            thumbnail: {
              url: "https://www.drcode.ai/_next/image?url=%2Flogo.png&w=64&q=75", // You can replace this with Drcode.ai logo
            },
            fields: [
              {
                name: "👤 Developer Name",
                value: `\`${signupData.name}\``,
                inline: true,
              },
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
              text: "Drcode.ai - Shipping features 2x faster!",
              icon_url:
                "https://www.drcode.ai/_next/image?url=%2Flogo.png&w=64&q=75", // You can replace this with Drcode.ai icon
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
