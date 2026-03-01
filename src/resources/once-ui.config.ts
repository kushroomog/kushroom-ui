import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const primaryFont = Geist({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  primary: primaryFont,
  secondary: primaryFont,
  tertiary: primaryFont,
  code: monoFont,
};

const baseURL = "https://kushroom.site";

const routes = {
  "/": true,
  "/artistas": true,
  "/sobre": false,
  "/projetos": true,
  "/blog": true,
  "/galeria": true,
};

const protectedRoutes = {
  "/work/automate-design-handovers-with-a-figma-to-code-pipeline": true,
};

const style = {
  theme: "dark" as const,
  neutral: "sand" as const,
  brand: "emerald" as const,
  accent: "orange" as const,
  solid: "contrast" as const,
  solidStyle: "flat" as const,
  border: "playful" as const,
  surface: "translucent" as const,
  transition: "all" as const,
  scaling: "100" as const,
};

const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong" as const,
    colorEnd: "page-background" as const,
  },
  dots: {
    display: true,
    opacity: 40,
    size: "2",
    color: "brand-background-strong" as const,
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium" as const,
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak" as const,
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const display = {
  location: false,
  time: false,
  themeSwitcher: true,
};

const mailchimp = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong" as const,
      colorEnd: "static-transparent" as const,
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak" as const,
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium" as const,
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium" as const,
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

const schema = {
  logo: "",
  type: "Organization",
  name: "Kushroom",
  description: "Kushroom: label independente que une música e moda",
  email: "kushroomog@gmail.com",
};

const sameAs = [
  "https://www.instagram.com/kushroomog",
  "https://www.youtube.com/@SMITH-I",
];

const socialSharing = {
  display: true,
  platforms: {
    x: true,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: true,
    reddit: false,
    telegram: true,
    email: true,
    copyLink: true,
  },
};

const dataStyle = {
  "data-theme": style.theme,
  "data-neutral": style.neutral,
  "data-brand": style.brand,
  "data-accent": style.accent,
  "data-solid": style.solid,
  "data-solid-style": style.solidStyle,
  "data-border": style.border,
  "data-surface": style.surface,
  "data-transition": style.transition,
  "data-scaling": style.scaling,
};

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
};
