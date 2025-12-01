import React from 'react';
import { RESUME_DATA } from './constants';
import { Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from './components/ui';
import { Icons, SocialIcon } from './components/Icons';
import { MediaItem } from './types';
import { ThemeToggle } from './components/ThemeToggle';

// --- Sub-components for better organization ---

const Header = () => {
  const { basics } = RESUME_DATA;
  return (
    <header className="container mx-auto max-w-4xl p-6 md:p-8 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">{basics.name}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">{basics.headline}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icons.MapPin className="h-4 w-4" />
            <span>{basics.location}</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
           {RESUME_DATA.sections.profiles.items.map((profile) => (
             <a
               key={profile.id}
               href={profile.url.href}
               target="_blank"
               rel="noopener noreferrer"
               className="p-2 rounded-lg border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
               aria-label={profile.network}
             >
               <SocialIcon network={profile.network} className="h-5 w-5" />
             </a>
           ))}
           <a
             href={`mailto:${basics.email}`}
             className="p-2 rounded-lg border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
             aria-label="Email"
           >
             <Icons.Mail className="h-5 w-5" />
           </a>
           <div className="ml-2 pl-2 border-l">
             <ThemeToggle />
           </div>
        </div>
      </div>
    </header>
  );
};

const About = () => {
  return (
    <section className="container mx-auto max-w-4xl px-6 md:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <div 
        className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: RESUME_DATA.sections.summary.content }}
      />
    </section>
  );
};

const Experience = () => {
  return (
    <section className="container mx-auto max-w-4xl px-6 md:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
      <div className="space-y-6">
        {RESUME_DATA.sections.experience.items.map((role) => (
          <Card key={role.id} className="border-none shadow-none bg-transparent md:border md:bg-card md:shadow-sm">
            <CardHeader className="p-0 md:p-6 pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <div className="space-y-1">
                  <CardTitle className="text-lg md:text-xl">{role.company}</CardTitle>
                  <div className="text-base font-medium">{role.position}</div>
                </div>
                <div className="text-sm text-muted-foreground whitespace-nowrap bg-secondary/50 px-2 py-1 rounded w-fit md:w-auto">
                  {role.date}
                </div>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                 <Icons.MapPin className="h-3 w-3" /> {role.location}
              </div>
            </CardHeader>
            <CardContent className="p-0 md:p-6 pt-2 md:pt-0">
               <div 
                  className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground mt-2"
                  dangerouslySetInnerHTML={{ __html: role.summary }}
                />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

const Education = () => {
  return (
    <section className="container mx-auto max-w-4xl px-6 md:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Education</h2>
      <div className="space-y-4">
        {RESUME_DATA.sections.education.items.map((edu) => (
          <div key={edu.id} className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 last:border-0 last:pb-0">
            <div>
              <h3 className="font-semibold">{edu.institution}</h3>
              <p className="text-sm text-muted-foreground">{edu.studyType} in {edu.area}</p>
            </div>
            <span className="text-sm text-muted-foreground mt-1 md:mt-0 bg-secondary px-2 py-0.5 rounded">{edu.date}</span>
          </div>
        ))}
      </div>
      
      {RESUME_DATA.sections.certifications.items.length > 0 && (
        <div className="mt-8">
           <h3 className="text-xl font-bold mb-4">Certifications</h3>
           <div className="flex flex-wrap gap-4">
              {RESUME_DATA.sections.certifications.items.map((cert) => (
                <a key={cert.id} href={cert.url.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border rounded-lg p-3 hover:bg-accent transition-colors">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{cert.name}</span>
                    <span className="text-xs text-muted-foreground">{cert.issuer}</span>
                  </div>
                </a>
              ))}
           </div>
        </div>
      )}
    </section>
  );
};

const Skills = () => {
  return (
    <section className="container mx-auto max-w-4xl px-6 md:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESUME_DATA.sections.skills.items.map((skillGroup) => (
          <div key={skillGroup.id}>
            <h3 className="font-semibold mb-3">{skillGroup.name}</h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary">{keyword}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProjectMediaSlider = ({ media }: { media: MediaItem[] }) => {
  const [index, setIndex] = React.useState(0);

  if (!media || media.length === 0) return null;

  const currentMedia = media[index];
  const showControls = media.length > 1;

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + 1) % media.length);
  };
  
  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i - 1 + media.length) % media.length);
  };

  return (
     <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden mb-4 border bg-black/5 dark:bg-white/5 group">
        {currentMedia.type === 'video' ? (
          <video 
            src={currentMedia.url} 
            controls 
            className="w-full h-full object-contain" 
          />
        ) : (
          <img 
            src={currentMedia.url} 
            alt="Project media" 
            className="w-full h-full object-cover" 
          />
        )}
        
        {showControls && (
          <>
             <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100">
               <Icons.ChevronLeft className="h-4 w-4" />
             </button>
             <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100">
               <Icons.ChevronRight className="h-4 w-4" />
             </button>
             <div className="absolute bottom-2 w-full flex justify-center gap-1.5 pointer-events-none">
                {media.map((_, i) => (
                  <div key={i} className={`h-1.5 w-1.5 rounded-full shadow-sm transition-colors ${i === index ? 'bg-primary' : 'bg-white/70'}`} />
                ))}
             </div>
          </>
        )}
     </div>
  );
}

const Projects = () => {
  // Accessing the custom projects section
  const projects = RESUME_DATA.sections.custom.g0ihgz4xbbuascfreru6bqj9.items;

  return (
    <section className="container mx-auto max-w-4xl px-6 md:px-8 py-8 bg-secondary/20 rounded-xl my-8">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col h-full bg-card hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{project.name}</CardTitle>
              <CardDescription className="text-xs line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between text-sm">
               {project.media && project.media.length > 0 && (
                 <ProjectMediaSlider media={project.media} />
               )}

               <div className="prose prose-xs dark:prose-invert text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: project.summary || project.description }} />
               
               <div className="flex flex-wrap gap-2 mt-auto pt-4">
                 {project.url.href && (
                   <a 
                    href={project.url.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md text-xs font-medium bg-primary text-primary-foreground h-8 px-3 hover:bg-primary/90"
                   >
                     {project.url.label || "View Project"}
                   </a>
                 )}
                 {project.keywords && project.keywords.map(tag => (
                   <Badge key={tag} variant="outline" className="text-[10px] px-1 py-0 h-6">{tag}</Badge>
                 ))}
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="container mx-auto max-w-4xl px-6 md:px-8 py-12 text-center text-sm text-muted-foreground border-t mt-12">
      <p>&copy; {new Date().getFullYear()} {RESUME_DATA.basics.name}. All rights reserved.</p>
    </footer>
  );
}

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Header />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Footer />
    </main>
  );
}

export default App;