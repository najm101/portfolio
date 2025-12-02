import React from 'react';
import { RESUME_DATA } from './constants';
import { Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from './components/ui';
import { Icons, SocialIcon } from './components/Icons';
import { MediaItem } from './types';
import { ThemeToggle } from './components/ThemeToggle';

// --- Components ---

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-neon flex items-center justify-center font-bold text-black">A</div>
          <span className="font-display font-bold text-lg hidden sm:block">Abdelrahman</span>
        </div>
        
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <li className="hover:text-neon cursor-pointer transition-colors" onClick={() => scrollToSection('home')}>Home</li>
            <li className="hover:text-neon cursor-pointer transition-colors" onClick={() => scrollToSection('about')}>About</li>
            <li className="hover:text-neon cursor-pointer transition-colors" onClick={() => scrollToSection('projects')}>Projects</li>
            <li className="hover:text-neon cursor-pointer transition-colors" onClick={() => scrollToSection('contact')}>Contact</li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { basics } = RESUME_DATA;
  
  // Extract summary text for "About Me" preview
  const summaryText = RESUME_DATA.sections.summary.content.replace(/<[^>]*>/g, '').substring(0, 180) + "...";

  return (
    <section id="home" className="container mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text */}
        <div className="space-y-6 md:order-1 order-2">
          <div className="space-y-2">
            <h2 className="text-neon font-bold tracking-wider text-sm uppercase">Hello I'm {basics.name.split(' ')[0]}</h2>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              Mobile<br />
              <span className="text-muted-foreground">Engineer</span>
            </h1>
          </div>
          
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
            {summaryText}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth'})}>
              About Me
            </Button>
            <Button variant="outline" className="border-neon text-neon hover:bg-neon hover:text-black" onClick={() => window.open(basics.url.href, '_blank')}>
              View CV
            </Button>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="relative md:order-2 order-1 flex justify-center">
          <div className="glow-bg opacity-50"></div>
          <div className="relative w-64 h-64 md:w-96 md:h-96">
             {basics.picture.url ? (
               <img 
                 src={basics.picture.url} 
                 alt={basics.name} 
                 className="w-full h-full object-cover rounded-full border-2 border-neon/30 shadow-[0_0_40px_-10px_rgba(204,243,129,0.3)] grayscale hover:grayscale-0 transition-all duration-500"
               />
             ) : (
                <div className="w-full h-full rounded-full border-2 border-neon/30 bg-secondary flex items-center justify-center shadow-[0_0_40px_-10px_rgba(204,243,129,0.3)] group overflow-hidden">
                   <Icons.Smartphone className="w-32 h-32 text-neon/20 group-hover:text-neon/80 transition-all duration-500" />
                </div>
             )}
             
             {/* Floating Badge */}
             <div className="absolute -bottom-4 right-10 bg-card border border-white/10 p-4 rounded-lg shadow-xl animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-3">
                   <div className="bg-neon/20 p-2 rounded-full">
                     <Icons.Github className="w-6 h-6 text-neon" />
                   </div>
                   <div>
                     <p className="text-xs text-muted-foreground">GitHub</p>
                     <p className="font-bold text-sm">@Najm101</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Years Experience", value: "2+" },
    { label: "Apps Published", value: "10+" },
    { label: "Completed Projects", value: "15+" },
    { label: "Satisfied Clients", value: "100%" },
  ];

  return (
    <section className="border-y border-white/5 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left space-y-1">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white">{stat.value}</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const skills = RESUME_DATA.sections.skills.items;
  
  // Icon mapping helper
  const getIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('flutter')) return <Icons.Smartphone className="w-8 h-8 text-neon" />;
    if (lower.includes('ui')) return <Icons.ChevronRight className="w-8 h-8 text-neon" />; // Design icon
    if (lower.includes('backend')) return <Icons.Globe className="w-8 h-8 text-neon" />;
    return <Icons.Github className="w-8 h-8 text-neon" />;
  };

  return (
    <section id="about" className="container mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-neon font-bold tracking-wider text-sm uppercase mb-2">My Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold">Skills & Services</h3>
        </div>
        <p className="text-muted-foreground max-w-md text-sm md:text-base">
          I combine clean code with pixel-perfect design to create seamless mobile experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <Card key={skill.id} className="group bg-card hover:bg-secondary/40 border-none">
            <CardContent className="pt-8 pb-8 flex flex-col h-full">
              <div className="mb-6 bg-secondary w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                {getIcon(skill.name)}
              </div>
              <h4 className="text-xl font-bold font-display mb-3 group-hover:text-neon transition-colors">{skill.name}</h4>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                 Expertise in {skill.keywords.slice(0, 3).join(', ')} and more.
              </p>
              <div className="flex flex-wrap gap-1">
                {skill.keywords.slice(0, 4).map(k => (
                  <span key={k} className="text-[10px] bg-secondary/50 px-2 py-1 rounded text-muted-foreground group-hover:text-foreground">{k}</span>
                ))}
              </div>
            </CardContent>
          </Card>
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
     <div className="relative w-full aspect-video bg-black/40 overflow-hidden group border-b border-white/5">
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
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
          />
        )}
        
        {showControls && (
          <>
             <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-neon hover:text-black text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100">
               <Icons.ChevronLeft className="h-4 w-4" />
             </button>
             <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-neon hover:text-black text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100">
               <Icons.ChevronRight className="h-4 w-4" />
             </button>
          </>
        )}
     </div>
  );
}

const FeaturedProjects = () => {
  const projects = RESUME_DATA.sections.custom.g0ihgz4xbbuascfreru6bqj9.items;

  return (
    <section id="projects" className="bg-secondary/10 py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-neon font-bold tracking-wider text-sm uppercase mb-2">Portfolio</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold">Featured Projects</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="bg-card border-none overflow-hidden group flex flex-col h-full">
              {/* Media Section */}
              {project.media && project.media.length > 0 ? (
                <ProjectMediaSlider media={project.media} />
              ) : (
                <div className="w-full aspect-video bg-secondary/30 flex items-center justify-center border-b border-white/5">
                  <span className="text-muted-foreground text-sm font-medium">No Preview Available</span>
                </div>
              )}
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                   <h4 className="text-xl font-bold font-display group-hover:text-neon transition-colors">{project.name}</h4>
                   <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">{project.date}</span>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{project.description}</p>
                
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                   <div className="flex gap-2">
                      {project.url.href && (
                        <a href={project.url.href} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-neon hover:underline flex items-center gap-1">
                          VIEW PROJECT <Icons.ChevronRight className="w-3 h-3" />
                        </a>
                      )}
                   </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceList = () => {
  const jobs = RESUME_DATA.sections.experience.items;

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Title Column */}
         <div>
            <h2 className="text-neon font-bold tracking-wider text-sm uppercase mb-2">Career Path</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Work Experience</h3>
            <p className="text-muted-foreground mb-8">
               A timeline of my professional journey in mobile development, working with startups and established companies to deliver high-quality applications.
            </p>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden hidden lg:block border border-white/10">
               <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-transparent"></div>
               {/* Abstract decorative elements */}
               <div className="absolute top-10 left-10 w-20 h-20 bg-neon rounded-full blur-[50px] opacity-40"></div>
               <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <h4 className="text-4xl font-bold font-display text-white/20 rotate-12">BUILDING<br/>FUTURE</h4>
               </div>
            </div>
         </div>

         {/* Timeline Column */}
         <div className="space-y-6">
            {jobs.map((job, index) => (
              <div key={job.id} className="relative pl-8 border-l border-white/10 pb-8 last:pb-0">
                 <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-neon shadow-[0_0_10px_rgba(204,243,129,0.5)]"></div>
                 <div className="bg-card p-6 rounded-xl border border-white/5 hover:border-neon/30 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-1">
                       <h4 className="text-xl font-bold text-white">{job.position}</h4>
                       <span className="text-xs font-bold text-neon bg-neon/10 px-3 py-1 rounded-full w-fit">{job.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                       <span className="text-white font-medium">{job.company}</span>
                       <span>•</span>
                       <span>{job.location}</span>
                    </div>
                    <div 
                      className="prose prose-sm prose-invert text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: job.summary.replace(/<ul>/g, '<ul class="list-disc pl-4 space-y-1">') }}
                    />
                 </div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
};

const ContactFooter = () => {
  const { basics } = RESUME_DATA;
  const profiles = RESUME_DATA.sections.profiles.items;

  return (
    <footer id="contact" className="bg-black py-20 border-t border-white/10">
      <div className="container mx-auto px-6">
         <div className="bg-neon rounded-2xl p-12 text-center md:text-left relative overflow-hidden mb-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-black mb-2">Let's work together</h2>
                  <p className="text-black/70 font-medium text-lg">Have a project in mind? Let's discuss.</p>
               </div>
               <Button className="bg-black text-white hover:bg-black/80 h-14 px-8 text-lg border-none shadow-xl" onClick={() => window.location.href = `mailto:${basics.email}`}>
                  Contact Me
               </Button>
            </div>
         </div>

         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
               <h3 className="font-display font-bold text-2xl mb-1">{basics.name}</h3>
               <p className="text-muted-foreground">{basics.headline}</p>
            </div>

            <div className="flex gap-4">
               {profiles.map((profile) => (
                 <a 
                   key={profile.id}
                   href={profile.url.href}
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-neon hover:text-black transition-colors"
                 >
                    <SocialIcon network={profile.network} className="w-5 h-5" />
                 </a>
               ))}
               <a 
                   href={`mailto:${basics.email}`}
                   className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-neon hover:text-black transition-colors"
                 >
                    <Icons.Mail className="w-5 h-5" />
                 </a>
            </div>
         </div>
         
         <div className="text-center text-muted-foreground text-sm mt-12 pt-8 border-t border-white/5">
            &copy; {new Date().getFullYear()} {basics.name}. All rights reserved.
         </div>
      </div>
    </footer>
  );
};


function App() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <FeaturedProjects />
      <ExperienceList />
      <ContactFooter />
    </main>
  );
}

export default App;