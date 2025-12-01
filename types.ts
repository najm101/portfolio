
export interface Url {
  label: string;
  href: string;
}

export interface Profile {
  id: string;
  network: string;
  username: string;
  icon: string;
  url: Url;
}

export interface WorkItem {
  id: string;
  company: string;
  position: string;
  location: string;
  date: string;
  summary: string;
  url: Url;
}

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  date: string;
  summary: string;
  keywords: string[];
  url: Url;
  media?: MediaItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  keywords: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  studyType: string;
  area: string;
  date: string;
  url: Url;
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  url: Url;
}

export interface ResumeData {
  basics: {
    name: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    url: Url;
    picture: {
      url: string;
    };
  };
  sections: {
    summary: {
      content: string;
    };
    experience: {
      items: WorkItem[];
    };
    education: {
      items: EducationItem[];
    };
    certifications: {
      items: CertificateItem[];
    };
    skills: {
      items: SkillItem[];
    };
    profiles: {
      items: Profile[];
    };
    // The "Projects" section is empty in the JSON, but there is a custom section for projects
    custom: {
      g0ihgz4xbbuascfreru6bqj9: {
        name: string;
        items: ProjectItem[];
      };
      wmx9lghvgqq888wjrj2ta9cu: {
        name: string;
        items: any[]; 
      }
    };
  };
}
