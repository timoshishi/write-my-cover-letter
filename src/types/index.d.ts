export interface Options {
  company: string;
  position: string;
  role: keyof Roles;
  industry: keyof Industries;
  intro: string;
  skills: string;
  outputTypes: string[];
  createCopy: boolean;
  personalData: PersonalData;
  industries: Industries;
  company: string;
  position: string;
  role: string;
  value?: string;
  intro: string;
  contact: string;
  skills: string;
}

export interface PersonalData {
  aboutMe: AboutMe;
  contactInfo: ContactInfo;
  industries: Industries;
  roles: Roles;
}

export interface AboutMe {
  aboutMe: string;
}

export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  sites: string[];
}

export interface DefaultStyles {
  size: number;
  style: string;
  font: string;
}

export interface Industries {
  generic: string;
  socialMedia: string;
  inclusive: string;
  openSource: string;
  healthCare: string;
  productivity: string;
  social: string;
  tech: string;
  foodService: string;
  education: string;
  consulting: string;
}

export interface Roles {
  fullstack: string;
  frontend: string;
  backend: string;
}

export interface TextResponses {
  company: string;
  position: string;
  role: string;
  industry: string;
  intro: string;
  skills: string;
}

export interface CVText {
  introPara: string;
  contactInfo: string;
  roleStr: string;
  toWhomItMayConcern: string;
  aboutMe: string;
  closer: string;
}
