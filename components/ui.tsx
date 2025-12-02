import React, { useState } from 'react';
import Quill from 'quill';
import { Icons } from './Icons';
import { MediaItem } from '../types';

export interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "neon";
}

export const Badge: React.FC<BadgeProps> = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    secondary: "border-transparent bg-muted text-muted-foreground",
    outline: "text-foreground border-border",
    neon: "border-transparent bg-neon text-neon-foreground font-bold hover:bg-neon/90"
  };
  return (
    <div className={`inline-flex items-center rounded-sm border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", hoverEffect = true }) => {
  return (
    <div className={`rounded-xl border border-white/5 bg-card text-card-foreground shadow-sm relative overflow-hidden ${hoverEffect ? 'transition-all duration-300 hover:border-neon/50 hover:shadow-[0_0_15px_-5px_rgba(204,243,129,0.3)]' : ''} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<CardProps> = ({ children, className = "" }) => (
  <h3 className={`text-xl font-bold leading-none tracking-tight font-display ${className}`}>{children}</h3>
);

export const CardDescription: React.FC<CardProps> = ({ children, className = "" }) => (
  <p className={`text-sm text-muted-foreground leading-relaxed ${className}`}>{children}
  </p>
);

export const CardContent: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "neon" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "neon", 
  size = "default",
  className = "",
  asChild = false,
  ...props
}) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    neon: "bg-neon text-neon-foreground hover:bg-neon/80 shadow-[0_0_10px_-3px_rgba(204,243,129,0.5)]",
    outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };
  const sizes = {
    default: "h-11 px-6 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-14 rounded-md px-8 text-base",
    icon: "h-10 w-10"
  };
  
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[80px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  )
)
Label.displayName = "Label"

// --- Custom Quill Editor Wrapper ---

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange, className }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const quillRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (containerRef.current && !quillRef.current) {
      quillRef.current = new Quill(containerRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean']
          ]
        }
      });

      quillRef.current.on('text-change', () => {
        onChange(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  React.useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
       quillRef.current.clipboard.dangerouslyPasteHTML(value);
    }
  }, [value]);

  return <div ref={containerRef} className={className} />;
};

// --- Drawer Component ---

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity" 
        onClick={onClose}
      />
      <div className={`fixed inset-y-0 right-0 w-full md:w-[600px] bg-background border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="flex items-center justify-between p-6 border-b border-border">
           <h2 className="text-xl font-bold font-display">{title}</h2>
           <Button variant="ghost" size="icon" onClick={onClose}>
             <Icons.Close className="w-5 h-5" />
           </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
           {children}
        </div>
      </div>
    </>
  );
};

// --- Sortable Components (Native DnD) ---

interface SortableListProps {
  items: any[];
  onReorder: (newItems: any[]) => void;
  renderItem: (item: any, index: number, dragHandleProps: any) => React.ReactNode;
  keyField?: string;
  className?: string;
}

export const SortableList: React.FC<SortableListProps> = ({ items, onReorder, renderItem, keyField = 'id', className = "" }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const onDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    // Required for Firefox
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', ''); 
    
    // Add opacity to the dragged element visually
    const target = e.target as HTMLElement;
    target.style.opacity = '0.5';
  };

  const onDragEnd = (e: React.DragEvent) => {
    setDraggedIndex(null);
    const target = e.target as HTMLElement;
    target.style.opacity = '1';
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);

    onReorder(newItems);
    setDraggedIndex(index);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div
          key={item[keyField] || index}
          draggable
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={(e) => onDragOver(e, index)}
          onDragEnd={onDragEnd}
          className={`transition-all ${draggedIndex === index ? 'opacity-50 scale-[0.98]' : 'opacity-100'}`}
        >
          {renderItem(item, index, { className: "cursor-grab active:cursor-grabbing hover:text-neon transition-colors" })}
        </div>
      ))}
    </div>
  );
};

// --- Media Manager ---

interface MediaManagerProps {
  media: MediaItem[];
  onChange: (newMedia: MediaItem[]) => void;
}

export const MediaManager: React.FC<MediaManagerProps> = ({ media = [], onChange }) => {
  const [newItemUrl, setNewItemUrl] = useState('');
  const [newItemType, setNewItemType] = useState<'image' | 'video'>('image');

  const handleAdd = () => {
    if (!newItemUrl) return;
    onChange([...media, { type: newItemType, url: newItemUrl }]);
    setNewItemUrl('');
  };

  const handleRemove = (index: number) => {
    const newMedia = [...media];
    newMedia.splice(index, 1);
    onChange(newMedia);
  };

  const handleReorder = (newItems: any[]) => {
    onChange(newItems);
  };

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4">
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-2">
           <Label>Add Media URL</Label>
           <Input 
             placeholder="https://..." 
             value={newItemUrl}
             onChange={(e) => setNewItemUrl(e.target.value)}
           />
        </div>
        <div className="space-y-2 w-28">
           <Label>Type</Label>
           <select 
             className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
             value={newItemType}
             onChange={(e) => setNewItemType(e.target.value as any)}
           >
             <option value="image">Image</option>
             <option value="video">Video</option>
           </select>
        </div>
        <Button onClick={handleAdd} type="button" variant="outline" size="icon" className="h-10 w-10 shrink-0">
          <Icons.Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase text-muted-foreground">Current Media (Drag to reorder)</Label>
        {media.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-4 bg-secondary/30 rounded border border-dashed border-border">No media added</div>
        ) : (
          <SortableList 
             items={media}
             onReorder={handleReorder}
             keyField="url"
             renderItem={(item, index, dragProps) => (
                <div className="flex items-center gap-3 bg-background p-2 rounded border border-border group">
                   <div {...dragProps} className="text-muted-foreground hover:text-foreground cursor-grab p-1">
                      <Icons.Grip className="w-4 h-4" />
                   </div>
                   <div className="h-10 w-16 bg-secondary rounded overflow-hidden flex items-center justify-center shrink-0">
                      {item.type === 'video' ? (
                        <Icons.Video className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <img src={item.url} alt="Preview" className="w-full h-full object-cover" />
                      )}
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-xs truncate font-mono text-muted-foreground">{item.url}</p>
                      <Badge variant="secondary" className="text-[10px] h-4 px-1 mt-1">{item.type}</Badge>
                   </div>
                   <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-500/10" onClick={() => handleRemove(index)}>
                      <Icons.Trash className="w-3 h-3" />
                   </Button>
                </div>
             )}
          />
        )}
      </div>
    </div>
  );
};