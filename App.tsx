import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Badge, Card, CardContent, Button } from './components/ui';
import { Icons, SocialIcon } from './components/Icons';
import { MediaItem } from './types';
import { ThemeToggle } from './components/ThemeToggle';
import { ResumeProvider, AuthProvider, useResume, useAuth } from './context';
import { LoginPage } from './pages/Login';
import { AdminPage } from './pages/Admin';

// --- Components ---

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded bg-neon flex items-center justify-center font-bold text-neon-foreground group-hover:scale-105 transition-transform">A</div>
          <span className="font-display font-bold text-lg hidden sm:block text-foreground group-hover:text-neon transition-colors">Abdelrahman</span>
        </Link>
        
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
  const { data } = useResume();
  const { basics } = data;
  const summaryText = data.sections.summary.content.replace(/<[^>]*>/g, '').substring(0, 180) + "...";

  return (
    <section id="home" className="container mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 md:order-1 order-2">
          <div className="space-y-2">
            <h2 className="text-neon font-bold tracking-wider text-sm uppercase">Hello I'm {basics.name.split(' ')[0]}</h2>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight text-foreground">
              {basics.headline.split(' ')[0]}<br />
              <span className="text-muted-foreground">{basics.headline.split(' ').slice(1).join(' ')}</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
            {summaryText}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth'})}>
              About Me
            </Button>
            <Button variant="outline" className="border-neon text-neon hover:bg-neon hover:text-neon-foreground" onClick={() => window.open(basics.url.href, '_blank')}>
              View CV
            </Button>
          </div>
        </div>

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
             <div className="absolute -bottom-4 right-10 bg-card border border-border p-4 rounded-lg shadow-xl animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-3">
                   <div className="bg-neon/20 p-2 rounded-full">
                     <Icons.Github className="w-6 h-6 text-neon" />
                   </div>
                   <div>
                     <p className="text-xs text-muted-foreground">GitHub</p>
                     <p className="font-bold text-sm text-foreground">@Najm101</p>
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
    <section className="border-y border-border/40 bg-secondary/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left space-y-1">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">{stat.value}</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const { data } = useResume();
  const skills = data.sections.skills.items;
  
  const getIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('flutter')) return <Icons.Smartphone className="w-8 h-8 text-neon" />;
    if (lower.includes('ui')) return <Icons.ChevronRight className="w-8 h-8 text-neon" />; 
    if (lower.includes('backend')) return <Icons.Globe className="w-8 h-8 text-neon" />;
    return <Icons.Github className="w-8 h-8 text-neon" />;
  };

  return (
    <section id="about" className="container mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-neon font-bold tracking-wider text-sm uppercase mb-2">My Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">Skills & Services</h3>
        </div>
        <p className="text-muted-foreground max-w-md text-sm md:text-base">
          I combine clean code with pixel-perfect design to create seamless mobile experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <Card key={skill.id} className="group bg-card hover:bg-secondary/40 border-none shadow-sm">
            <CardContent className="pt-8 pb-8 flex flex-col h-full">
              <div className="mb-6 bg-secondary w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                {getIcon(skill.name)}
              </div>
              <h4 className="text-xl font-bold font-display mb-3 text-foreground group-hover:text-neon transition-colors">{skill.name}</h4>
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

const ProjectMediaSlider = ({ media, className }: { media: MediaItem[], className?: string }) => {
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
     <div className={`relative w-full bg-black/5 dark:bg-black/40 overflow-hidden group border-b border-border/40 ${className}`}>
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
            className="w-full h-full object-cover transition-opacity duration-500" 
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
             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {media.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-neon' : 'w-1.5 bg-white/50'}`}></div>
                ))}
             </div>
          </>
        )}
     </div>
  );
}

const FeaturedProjects = () => {
  const { data } = useResume();
  const projects = data.sections.custom.g0ihgz4xbbuascfreru6bqj9.items;

  return (
    <section id="projects" className="bg-secondary/10 py-20 border-t border-border/40">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-neon font-bold tracking-wider text-sm uppercase mb-2">Portfolio</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">Featured Projects</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link to={`/project/${project.id}`} key={project.id} className="block h-full">
              <Card hoverEffect={true} className="bg-card border-none overflow-hidden group flex flex-col h-full">
                {/* Preview Image (First item of media or placeholder) */}
                <div className="w-full aspect-video bg-secondary/30 relative overflow-hidden">
                   {project.media && project.media.length > 0 ? (
                      project.media[0].type === 'video' ? (
                         <video src={project.media[0].url} className="w-full h-full object-cover" muted loop playsInline onMouseOver={e => e.currentTarget.play()} onMouseOut={e => e.currentTarget.pause()} />
                      ) : (
                         <img src={project.media[0].url} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      )
                   ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">No Preview</div>
                   )}
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                     <h4 className="text-xl font-bold font-display text-foreground group-hover:text-neon transition-colors">{project.name}</h4>
                     <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded border border-border">{project.date}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{project.description}</p>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/40">
                     <div className="text-xs font-bold text-neon flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        VIEW DETAILS <Icons.ChevronRight className="w-3 h-3" />
                     </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceList = () => {
  const { data } = useResume();
  const jobs = data.sections.experience.items;

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Title Column */}
         <div>
            <h2 className="text-neon font-bold tracking-wider text-sm uppercase mb-2">Career Path</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">Work Experience</h3>
            <p className="text-muted-foreground mb-8">
               A timeline of my professional journey in mobile development, working with startups and established companies to deliver high-quality applications.
            </p>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden hidden lg:block border border-border/40 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-transparent dark:from-neon/10"></div>
               {/* Abstract decorative elements */}
               <div className="absolute top-10 left-10 w-20 h-20 bg-neon rounded-full blur-[50px] opacity-40"></div>
               <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <h4 className="text-4xl font-bold font-display text-foreground/10 rotate-12">BUILDING<br/>FUTURE</h4>
               </div>
            </div>
         </div>

         {/* Timeline Column */}
         <div className="space-y-6">
            {jobs.map((job, index) => (
              <div key={job.id} className="relative pl-8 border-l border-border pb-8 last:pb-0">
                 <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-neon shadow-[0_0_10px_rgba(204,243,129,0.5)]"></div>
                 <div className="bg-card p-6 rounded-xl border border-border hover:border-neon/30 transition-colors shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-1">
                       <h4 className="text-xl font-bold text-foreground">{job.position}</h4>
                       <span className="text-xs font-bold text-neon bg-neon/10 px-3 py-1 rounded-full w-fit">{job.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                       <span className="text-foreground font-medium">{job.company}</span>
                       <span>•</span>
                       <span>{job.location}</span>
                    </div>
                    <div 
                      className="prose prose-sm dark:prose-invert prose-neutral text-muted-foreground"
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
  const { data } = useResume();
  const { basics } = data;
  const profiles = data.sections.profiles.items;
  const navigate = useNavigate();

  return (
    <footer id="contact" className="bg-card dark:bg-black py-20 border-t border-border/40">
      <div className="container mx-auto px-6">
         <div className="bg-neon rounded-2xl p-12 text-center md:text-left relative overflow-hidden mb-16 shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-neon-foreground mb-2">Let's work together</h2>
                  <p className="text-neon-foreground/70 font-medium text-lg">Have a project in mind? Let's discuss.</p>
               </div>
               <Button className="bg-neon-foreground text-neon hover:bg-neon-foreground/80 h-14 px-8 text-lg border-none shadow-xl" onClick={() => window.location.href = `mailto:${basics.email}`}>
                  Contact Me
               </Button>
            </div>
         </div>

         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
               <h3 className="font-display font-bold text-2xl mb-1 text-foreground">{basics.name}</h3>
               <p className="text-muted-foreground">{basics.headline}</p>
            </div>

            <div className="flex gap-4">
               {profiles.map((profile) => (
                 <a 
                   key={profile.id}
                   href={profile.url.href}
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-neon hover:text-neon-foreground transition-colors"
                 >
                    <SocialIcon network={profile.network} className="w-5 h-5" />
                 </a>
               ))}
               <a 
                   href={`mailto:${basics.email}`}
                   className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-neon hover:text-neon-foreground transition-colors"
                 >
                    <Icons.Mail className="w-5 h-5" />
                 </a>
            </div>
         </div>
         
         <div className="flex justify-between items-center mt-12 pt-8 border-t border-border/40 text-sm text-muted-foreground">
             <div>&copy; {new Date().getFullYear()} {basics.name}. All rights reserved.</div>
             <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="h-auto p-0 hover:bg-transparent hover:text-neon">
               Admin Login
             </Button>
         </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <FeaturedProjects />
      <ExperienceList />
      <ContactFooter />
    </main>
  );
};

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useResume();
  
  const project = data.sections.custom.g0ihgz4xbbuascfreru6bqj9.items.find(p => p.id === id);

  if (!project) {
    return (
       <div className="min-h-screen flex flex-col items-center justify-center pt-20">
          <Navbar />
          <h1 className="text-3xl font-bold mb-4 text-foreground">Project Not Found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
       </div>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-20 container mx-auto px-6">
         {/* Breadcrumb / Back */}
         <button onClick={() => navigate(-1)} className="group flex items-center text-sm font-medium text-muted-foreground hover:text-neon mb-8 transition-colors">
            <Icons.ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
         </button>

         {/* Header */}
         <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
               <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground">{project.name}</h1>
               <span className="text-neon font-bold text-lg">{project.date}</span>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl">{project.description}</p>
         </div>

         {/* Gallery */}
         <div className="mb-16 rounded-xl overflow-hidden border border-border/40 shadow-2xl bg-card">
            {project.media && project.media.length > 0 ? (
              <ProjectMediaSlider media={project.media} className="aspect-video" />
            ) : (
              <div className="w-full aspect-video bg-secondary/30 flex items-center justify-center">
                 <span className="text-muted-foreground">No Preview Available</span>
              </div>
            )}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar Info */}
            <div className="lg:col-span-1 space-y-8">
               <div className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Project Info</h3>
                  
                  <div className="space-y-4">
                     {project.role && (
                        <div>
                           <span className="block text-xs text-muted-foreground mb-1">Role</span>
                           <span className="text-foreground font-medium">{project.role}</span>
                        </div>
                     )}
                     <div>
                           <span className="block text-xs text-muted-foreground mb-1">Technologies</span>
                           <div className="flex flex-wrap gap-2">
                              {project.keywords.map(tech => (
                                 <Badge key={tech} variant="secondary" className="bg-secondary text-foreground">{tech}</Badge>
                              ))}
                           </div>
                     </div>
                     {project.url.href && (
                        <div className="pt-4 mt-4 border-t border-border">
                           <a 
                             href={project.url.href} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="flex items-center justify-center w-full py-3 bg-neon text-neon-foreground font-bold rounded-lg hover:bg-neon/90 transition-colors"
                           >
                              Visit Project <Icons.Globe className="ml-2 w-4 h-4" />
                           </a>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
               <div className="prose prose-lg dark:prose-invert prose-neutral max-w-none">
                  <h2 className="text-3xl font-display font-bold mb-6 text-foreground">Project Details</h2>
                  {/* Rendering HTML content */}
                  <div dangerouslySetInnerHTML={{ __html: project.summary }} />
               </div>
            </div>
         </div>
      </div>
      <ContactFooter />
    </main>
  );
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <ResumeProvider>
      <AuthProvider>
        <HashRouter>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/project/:id" element={<ProjectDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </HashRouter>
      </AuthProvider>
    </ResumeProvider>
  );
}

export default App;