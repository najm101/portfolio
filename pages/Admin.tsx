import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useResume } from '../context';
import { 
  Button, 
  Input, 
  Textarea, 
  Label, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Badge, 
  Editor,
  Drawer,
  SortableList,
  MediaManager
} from '../components/ui';
import { Icons } from '../components/Icons';

export const AdminPage = () => {
  const { logout } = useAuth();
  const { data, updateData } = useResume();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'basics' | 'projects' | 'experience' | 'skills'>('basics');
  
  // Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItemType, setEditingItemType] = useState<'project' | 'experience' | 'skill' | null>(null);
  const [editingItemIndex, setEditingItemIndex] = useState<number>(-1);
  const [tempItemData, setTempItemData] = useState<any>(null);

  const [formData, setFormData] = useState(data);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  // Handle global save
  const handleSave = () => {
    updateData(formData);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  // --- Basics Handling ---
  const handleBasicsChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      basics: { ...prev.basics, [field]: value }
    }));
  };
  
  const handleNestedBasicsChange = (parent: 'picture' | 'url', field: 'url' | 'href', value: string) => {
     setFormData(prev => ({
        ...prev,
        basics: { 
           ...prev.basics, 
           [parent]: { ...prev.basics[parent], [field]: value }
        }
     }));
  };

  const handleWhatsappChange = (value: string) => {
     const newProfiles = [...formData.sections.profiles.items];
     const index = newProfiles.findIndex(p => p.network.toLowerCase() === 'whatsapp' || p.icon === 'whatsapp');
     
     if (index !== -1) {
        newProfiles[index] = { ...newProfiles[index], url: { ...newProfiles[index].url, href: value } };
     } else {
        // Create if not exists
        newProfiles.push({
           id: `wa-${Date.now()}`,
           network: 'Whatsapp',
           username: 'Whatsapp Me',
           icon: 'whatsapp',
           url: { label: '', href: value }
        });
     }

     setFormData(prev => ({
        ...prev,
        sections: { ...prev.sections, profiles: { ...prev.sections.profiles, items: newProfiles } }
     }));
  };

  const getWhatsappLink = () => {
     const profile = formData.sections.profiles.items.find(p => p.network.toLowerCase() === 'whatsapp' || p.icon === 'whatsapp');
     return profile?.url.href || '';
  };

  // --- List Reordering ---
  const handleProjectReorder = (newItems: any[]) => {
    setFormData(prev => ({
      ...prev,
      sections: {
         ...prev.sections,
         custom: {
            ...prev.sections.custom,
            g0ihgz4xbbuascfreru6bqj9: {
               ...prev.sections.custom.g0ihgz4xbbuascfreru6bqj9,
               items: newItems
            }
         }
      }
    }));
  };

  const handleExperienceReorder = (newItems: any[]) => {
    setFormData(prev => ({
      ...prev,
      sections: {
         ...prev.sections,
         experience: { ...prev.sections.experience, items: newItems }
      }
    }));
  };

  const handleSkillsReorder = (newItems: any[]) => {
    setFormData(prev => ({
      ...prev,
      sections: {
         ...prev.sections,
         skills: { ...prev.sections.skills, items: newItems }
      }
    }));
  };

  // --- Drawer / Editing Logic ---

  const openEditDrawer = (type: 'project' | 'experience' | 'skill', index: number) => {
    setEditingItemType(type);
    setEditingItemIndex(index);
    
    if (type === 'project') {
       if (index === -1) {
         // New Project Template
         setTempItemData({
            id: `project-${Date.now()}`,
            name: 'New Project',
            role: '',
            description: '',
            date: new Date().getFullYear().toString(),
            summary: '<p>Project details...</p>',
            keywords: [],
            url: { label: '', href: '' },
            media: []
         });
       } else {
         setTempItemData({ ...formData.sections.custom.g0ihgz4xbbuascfreru6bqj9.items[index] });
       }
    } else if (type === 'experience') {
       if (index === -1) {
         // New Job Template
         setTempItemData({
            id: `job-${Date.now()}`,
            company: 'Company Name',
            position: 'Position',
            location: 'Location',
            date: 'Present',
            summary: '<p>Description...</p>',
            url: { label: '', href: '' }
         });
       } else {
         setTempItemData({ ...formData.sections.experience.items[index] });
       }
    } else if (type === 'skill') {
       if (index === -1) {
          // New Skill Template
          setTempItemData({
             id: `skill-${Date.now()}`,
             name: 'New Skill Category',
             keywords: []
          });
       } else {
          setTempItemData({ ...formData.sections.skills.items[index] });
       }
    }
    setIsDrawerOpen(true);
  };

  const saveDrawerData = () => {
    if (editingItemType === 'project') {
       const newProjects = [...formData.sections.custom.g0ihgz4xbbuascfreru6bqj9.items];
       if (editingItemIndex === -1) {
          newProjects.push(tempItemData);
       } else {
          newProjects[editingItemIndex] = tempItemData;
       }
       setFormData(prev => ({
          ...prev,
          sections: {
             ...prev.sections,
             custom: {
                ...prev.sections.custom,
                g0ihgz4xbbuascfreru6bqj9: {
                   ...prev.sections.custom.g0ihgz4xbbuascfreru6bqj9,
                   items: newProjects
                }
             }
          }
       }));
    } else if (editingItemType === 'experience') {
       const newJobs = [...formData.sections.experience.items];
       if (editingItemIndex === -1) {
          newJobs.push(tempItemData);
       } else {
          newJobs[editingItemIndex] = tempItemData;
       }
       setFormData(prev => ({
          ...prev,
          sections: {
             ...prev.sections,
             experience: { ...prev.sections.experience, items: newJobs }
          }
       }));
    } else if (editingItemType === 'skill') {
       const newSkills = [...formData.sections.skills.items];
       if (editingItemIndex === -1) {
          newSkills.push(tempItemData);
       } else {
          newSkills[editingItemIndex] = tempItemData;
       }
       setFormData(prev => ({
          ...prev,
          sections: {
             ...prev.sections,
             skills: { ...prev.sections.skills, items: newSkills }
          }
       }));
    }
    setIsDrawerOpen(false);
  };

  const handleDeleteItem = (e: React.MouseEvent, type: 'project' | 'experience' | 'skill', index: number) => {
     e.stopPropagation();
     if (!window.confirm("Are you sure you want to delete this item?")) return;

     if (type === 'project') {
        const newProjects = [...formData.sections.custom.g0ihgz4xbbuascfreru6bqj9.items];
        newProjects.splice(index, 1);
        handleProjectReorder(newProjects);
     } else if (type === 'experience') {
        const newJobs = [...formData.sections.experience.items];
        newJobs.splice(index, 1);
        handleExperienceReorder(newJobs);
     } else if (type === 'skill') {
        const newSkills = [...formData.sections.skills.items];
        newSkills.splice(index, 1);
        handleSkillsReorder(newSkills);
     }
  };


  const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 w-full px-4 py-3 text-sm font-medium rounded-lg transition-all ${
        activeTab === id 
          ? 'bg-neon text-neon-foreground shadow-md' 
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/40 bg-card hidden md:flex flex-col">
        <div className="p-6 border-b border-border/40">
          <div className="flex items-center gap-2 font-display font-bold text-xl">
             <div className="h-8 w-8 rounded bg-neon flex items-center justify-center text-neon-foreground">A</div>
             <span>Admin Panel</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
           <TabButton id="basics" label="Profile" icon={Icons.User} />
           <TabButton id="projects" label="Projects" icon={Icons.Folder} />
           <TabButton id="experience" label="Experience" icon={Icons.Briefcase} />
           <TabButton id="skills" label="Skills" icon={Icons.Cpu} />
        </nav>

        <div className="p-4 border-t border-border/40">
           <Button variant="outline" className="w-full justify-start gap-2" onClick={() => { logout(); navigate('/login'); }}>
             <Icons.LogOut className="w-4 h-4" /> Logout
           </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-border/40 bg-background/80 backdrop-blur flex items-center justify-between px-6 z-10">
           <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="md:hidden">
                 <Icons.LayoutDashboard className="w-5 h-5" />
              </Button>
              <h2 className="font-bold text-lg capitalize">{activeTab} Manager</h2>
           </div>
           <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                 View Live Site
              </Button>
              <Button onClick={handleSave} disabled={saveStatus === 'saved'} className="gap-2">
                 {saveStatus === 'saved' ? <Icons.Save className="w-4 h-4" /> : <Icons.Save className="w-4 h-4" />}
                 {saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
              </Button>
           </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
           <div className="max-w-5xl mx-auto">
              
              {/* BASICS TAB */}
              {activeTab === 'basics' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="md:col-span-2">
                         <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <div className="space-y-2">
                                  <Label>Full Name</Label>
                                  <Input 
                                    value={formData.basics.name} 
                                    onChange={(e) => handleBasicsChange('name', e.target.value)} 
                                  />
                               </div>
                               <div className="space-y-2">
                                  <Label>Headline</Label>
                                  <Input 
                                    value={formData.basics.headline} 
                                    onChange={(e) => handleBasicsChange('headline', e.target.value)} 
                                  />
                               </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <div className="space-y-2">
                                  <Label>Email</Label>
                                  <Input 
                                    value={formData.basics.email} 
                                    onChange={(e) => handleBasicsChange('email', e.target.value)} 
                                  />
                               </div>
                               <div className="space-y-2">
                                  <Label>Location</Label>
                                  <Input 
                                    value={formData.basics.location} 
                                    onChange={(e) => handleBasicsChange('location', e.target.value)} 
                                  />
                               </div>
                            </div>
                         </CardContent>
                      </Card>

                       <Card className="md:col-span-2">
                         <CardHeader>
                            <CardTitle>Links & Assets</CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                               <div className="space-y-2">
                                  <Label>Primary Image URL</Label>
                                  <div className="flex gap-4">
                                     <div className="flex-1">
                                        <Input 
                                          value={formData.basics.picture.url} 
                                          onChange={(e) => handleNestedBasicsChange('picture', 'url', e.target.value)} 
                                          placeholder="https://..."
                                        />
                                     </div>
                                     {formData.basics.picture.url && (
                                       <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border">
                                          <img src={formData.basics.picture.url} alt="Preview" className="w-full h-full object-cover" />
                                       </div>
                                     )}
                                  </div>
                               </div>
                               <div className="space-y-2">
                                  <Label>CV PDF Link</Label>
                                  <Input 
                                    value={formData.basics.url.href} 
                                    onChange={(e) => handleNestedBasicsChange('url', 'href', e.target.value)}
                                    placeholder="https://..."
                                  />
                               </div>
                               <div className="space-y-2">
                                  <Label>WhatsApp Link/Number</Label>
                                  <Input 
                                    value={getWhatsappLink()} 
                                    onChange={(e) => handleWhatsappChange(e.target.value)}
                                    placeholder="https://wa.me/..."
                                  />
                                  <p className="text-xs text-muted-foreground">Example: https://wa.me/201023741643</p>
                               </div>
                            </div>
                         </CardContent>
                      </Card>

                      <Card className="md:col-span-2">
                         <CardHeader>
                            <CardTitle>Profile Summary</CardTitle>
                         </CardHeader>
                         <CardContent>
                            <Editor 
                               value={formData.sections.summary.content}
                               onChange={(value) => setFormData(prev => ({
                                  ...prev,
                                  sections: { ...prev.sections, summary: { ...prev.sections.summary, content: value }}
                               }))}
                               className="text-foreground"
                            />
                         </CardContent>
                      </Card>
                   </div>
                </div>
              )}

              {/* PROJECTS TAB */}
              {activeTab === 'projects' && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-border">
                       <div>
                          <h3 className="text-lg font-bold">Projects List</h3>
                          <p className="text-xs text-muted-foreground">Drag to reorder • Click to edit</p>
                       </div>
                       <Button size="sm" onClick={() => openEditDrawer('project', -1)}>
                          <Icons.Plus className="w-4 h-4 mr-2" /> Add Project
                       </Button>
                    </div>

                    <SortableList 
                       items={formData.sections.custom.g0ihgz4xbbuascfreru6bqj9.items}
                       onReorder={handleProjectReorder}
                       className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0"
                       renderItem={(project, index, dragProps) => (
                          <div 
                             onClick={() => openEditDrawer('project', index)}
                             className="bg-card hover:border-neon/50 border border-border rounded-xl p-4 cursor-pointer transition-all group flex gap-4 h-full"
                          >
                             <div {...dragProps} className="mt-1 text-muted-foreground hover:text-neon cursor-grab active:cursor-grabbing p-1 h-fit" onClick={(e) => e.stopPropagation()}>
                                <Icons.Grip className="w-5 h-5" />
                             </div>
                             <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                   <h4 className="font-bold truncate text-foreground">{project.name}</h4>
                                   <Badge variant="secondary" className="text-[10px] shrink-0">{project.date}</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
                                <div className="flex items-center gap-2">
                                   <Badge variant="outline" className="text-[10px]">{project.role || 'Developer'}</Badge>
                                   {project.media?.length > 0 && (
                                      <Badge variant="secondary" className="text-[10px] bg-secondary/50">
                                         <Icons.Image className="w-3 h-3 mr-1" /> {project.media.length}
                                      </Badge>
                                   )}
                                </div>
                             </div>
                             <div className="flex flex-col items-center justify-between">
                                <Button 
                                   variant="ghost" 
                                   size="icon" 
                                   className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                                   onClick={(e) => handleDeleteItem(e, 'project', index)}
                                >
                                   <Icons.Trash className="w-4 h-4" />
                                </Button>
                                <Icons.ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-neon" />
                             </div>
                          </div>
                       )}
                    />
                 </div>
              )}

              {/* EXPERIENCE TAB */}
              {activeTab === 'experience' && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-border">
                       <div>
                          <h3 className="text-lg font-bold">Experience Timeline</h3>
                          <p className="text-xs text-muted-foreground">Drag to reorder • Click to edit</p>
                       </div>
                       <Button size="sm" onClick={() => openEditDrawer('experience', -1)}>
                          <Icons.Plus className="w-4 h-4 mr-2" /> Add Job
                       </Button>
                    </div>

                    <SortableList 
                       items={formData.sections.experience.items}
                       onReorder={handleExperienceReorder}
                       className="space-y-3"
                       renderItem={(job, index, dragProps) => (
                          <div 
                             onClick={() => openEditDrawer('experience', index)}
                             className="bg-card hover:border-neon/50 border border-border rounded-xl p-4 cursor-pointer transition-all group flex items-center gap-4"
                          >
                             <div {...dragProps} className="text-muted-foreground hover:text-neon cursor-grab active:cursor-grabbing p-1" onClick={(e) => e.stopPropagation()}>
                                <Icons.Grip className="w-5 h-5" />
                             </div>
                             <div className="flex-1">
                                <h4 className="font-bold text-foreground">{job.position}</h4>
                                <p className="text-sm text-muted-foreground">{job.company} • {job.date}</p>
                             </div>
                             <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                                onClick={(e) => handleDeleteItem(e, 'experience', index)}
                             >
                                <Icons.Trash className="w-4 h-4" />
                             </Button>
                          </div>
                       )}
                    />
                 </div>
              )}

              {/* SKILLS TAB */}
              {activeTab === 'skills' && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-border">
                       <div>
                          <h3 className="text-lg font-bold">Skills & Services</h3>
                          <p className="text-xs text-muted-foreground">Drag to reorder • Click to edit</p>
                       </div>
                       <Button size="sm" onClick={() => openEditDrawer('skill', -1)}>
                          <Icons.Plus className="w-4 h-4 mr-2" /> Add Skill Category
                       </Button>
                    </div>

                    <SortableList 
                       items={formData.sections.skills.items}
                       onReorder={handleSkillsReorder}
                       className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0"
                       renderItem={(skill, index, dragProps) => (
                          <div 
                             onClick={() => openEditDrawer('skill', index)}
                             className="bg-card hover:border-neon/50 border border-border rounded-xl p-4 cursor-pointer transition-all group flex items-start gap-4"
                          >
                             <div {...dragProps} className="mt-1 text-muted-foreground hover:text-neon cursor-grab active:cursor-grabbing p-1" onClick={(e) => e.stopPropagation()}>
                                <Icons.Grip className="w-5 h-5" />
                             </div>
                             <div className="flex-1">
                                <h4 className="font-bold text-foreground mb-2">{skill.name}</h4>
                                <div className="flex flex-wrap gap-1">
                                   {skill.keywords.map((k: string) => (
                                      <span key={k} className="text-[10px] bg-secondary px-2 py-0.5 rounded text-muted-foreground">{k}</span>
                                   ))}
                                </div>
                             </div>
                             <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 shrink-0"
                                onClick={(e) => handleDeleteItem(e, 'skill', index)}
                             >
                                <Icons.Trash className="w-4 h-4" />
                             </Button>
                          </div>
                       )}
                    />
                 </div>
              )}

           </div>
        </div>

        {/* --- DRAWER EDITOR --- */}
        <Drawer 
           isOpen={isDrawerOpen} 
           onClose={() => setIsDrawerOpen(false)}
           title={
              editingItemType === 'project' ? (editingItemIndex === -1 ? 'Add Project' : 'Edit Project') : 
              editingItemType === 'experience' ? (editingItemIndex === -1 ? 'Add Job' : 'Edit Job') :
              (editingItemIndex === -1 ? 'Add Skill' : 'Edit Skill')
           }
        >
           {tempItemData && editingItemType === 'project' && (
              <div className="space-y-6">
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <Label>Project Name</Label>
                       <Input value={tempItemData.name} onChange={(e) => setTempItemData({...tempItemData, name: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label>Date</Label>
                          <Input value={tempItemData.date} onChange={(e) => setTempItemData({...tempItemData, date: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                          <Label>Role</Label>
                          <Input value={tempItemData.role || ''} onChange={(e) => setTempItemData({...tempItemData, role: e.target.value})} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label>Short Description</Label>
                       <Textarea className="h-20" value={tempItemData.description} onChange={(e) => setTempItemData({...tempItemData, description: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                       <Label>Technologies (Comma separated)</Label>
                       <Input 
                          value={tempItemData.keywords?.join(', ') || ''} 
                          onChange={(e) => setTempItemData({...tempItemData, keywords: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} 
                       />
                    </div>
                    <div className="space-y-2">
                       <Label>External Link</Label>
                       <Input value={tempItemData.url.href} onChange={(e) => setTempItemData({...tempItemData, url: {...tempItemData.url, href: e.target.value}})} placeholder="https://..." />
                    </div>
                 </div>

                 <div className="border-t border-border pt-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Icons.Image className="w-4 h-4 text-neon" /> Media Gallery</h3>
                    <MediaManager 
                       media={tempItemData.media || []}
                       onChange={(newMedia) => setTempItemData({...tempItemData, media: newMedia})}
                    />
                 </div>

                 <div className="border-t border-border pt-6">
                    <h3 className="font-bold mb-4">Detailed Content</h3>
                    <Editor 
                       value={tempItemData.summary}
                       onChange={(val) => setTempItemData({...tempItemData, summary: val})}
                       className="text-foreground"
                    />
                 </div>

                 <div className="pt-4 flex gap-3 sticky bottom-0 bg-background border-t border-border p-4 -mx-6 -mb-6 mt-6">
                    <Button className="flex-1" onClick={saveDrawerData}>Save Project</Button>
                    <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
                 </div>
              </div>
           )}

           {tempItemData && editingItemType === 'experience' && (
              <div className="space-y-6">
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <Label>Company</Label>
                       <Input value={tempItemData.company} onChange={(e) => setTempItemData({...tempItemData, company: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                       <Label>Position</Label>
                       <Input value={tempItemData.position} onChange={(e) => setTempItemData({...tempItemData, position: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label>Location</Label>
                          <Input value={tempItemData.location} onChange={(e) => setTempItemData({...tempItemData, location: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                          <Label>Date Range</Label>
                          <Input value={tempItemData.date} onChange={(e) => setTempItemData({...tempItemData, date: e.target.value})} />
                       </div>
                    </div>
                 </div>

                 <div className="border-t border-border pt-6">
                    <h3 className="font-bold mb-4">Description</h3>
                    <Editor 
                       value={tempItemData.summary}
                       onChange={(val) => setTempItemData({...tempItemData, summary: val})}
                       className="text-foreground"
                    />
                 </div>

                 <div className="pt-4 flex gap-3 sticky bottom-0 bg-background border-t border-border p-4 -mx-6 -mb-6 mt-6">
                    <Button className="flex-1" onClick={saveDrawerData}>Save Job</Button>
                    <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
                 </div>
              </div>
           )}

           {tempItemData && editingItemType === 'skill' && (
              <div className="space-y-6">
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <Label>Skill Category Name</Label>
                       <Input value={tempItemData.name} onChange={(e) => setTempItemData({...tempItemData, name: e.target.value})} placeholder="e.g. Flutter Development" />
                    </div>
                    <div className="space-y-2">
                       <Label>Keywords (Comma separated)</Label>
                       <Textarea 
                          className="h-32 font-mono text-sm"
                          value={tempItemData.keywords?.join(', ') || ''} 
                          onChange={(e) => setTempItemData({...tempItemData, keywords: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} 
                          placeholder="e.g. Bloc, Provider, Clean Architecture"
                       />
                       <p className="text-xs text-muted-foreground">These will be displayed as tags under the category.</p>
                    </div>
                 </div>

                 <div className="pt-4 flex gap-3 sticky bottom-0 bg-background border-t border-border p-4 -mx-6 -mb-6 mt-6">
                    <Button className="flex-1" onClick={saveDrawerData}>Save Skill</Button>
                    <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
                 </div>
              </div>
           )}
        </Drawer>
      </main>
    </div>
  );
};