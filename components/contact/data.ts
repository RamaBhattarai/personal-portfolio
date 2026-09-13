import type { IconType } from "react-icons";
import { SiGithub } from "react-icons/si";
import { TbBrandLinkedin } from "react-icons/tb";

export interface ContactContent {
  heading: string;
  subheading: string;
  email: string;
}

export const contactContent: ContactContent = {
  heading: "Let's build something that moves.",
  subheading:
    "Open to opportunities — always happy to talk about a project, a role, or just frontend engineering in general.",
  email: "bhattarairama234@gmail.com",
};

export interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/ramaBhattarai", icon: SiGithub },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/ramabhattarai/", icon: TbBrandLinkedin },
];
