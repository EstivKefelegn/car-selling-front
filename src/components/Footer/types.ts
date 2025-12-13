// components/Footer/types.ts
export interface SocialLink {
  icon: React.ReactNode;
  url: string;
  name: string;
}

export interface FooterLinkSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface ContactInfo {
  icon: React.ReactNode;
  text: string;
}