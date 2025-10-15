
export type FileData = {
    path: string;
    name: string;
    type: 'file' | 'folder';
    content?: string;
}

export const fileData: FileData[] = [
    // Folders
    { path: '/', name: 'root', type: 'folder' },
    { path: '/public', name: 'public', type: 'folder' },
    { path: '/src', name: 'src', type: 'folder' },
    { path: '/src/app', name: 'app', type: 'folder' },
    { path: '/src/components', name: 'components', type: 'folder' },
    { path: '/src/lib', name: 'lib', type: 'folder' },

    // Files
    { 
        path: '/public/index.html', 
        name: 'index.html', 
        type: 'file', 
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodePod Preview</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome to CodePod!</h1>
    <p>This is a live preview of your code.</p>
    <button id="counter">Click me: 0</button>
    <script src="script.js"></script>
</body>
</html>` 
    },
    { 
        path: '/public/styles.css', 
        name: 'styles.css', 
        type: 'file', 
        content: `body { 
    font-family: 'Inter', sans-serif; 
    background-color: #ffffff; 
    color: #111827; 
    padding: 1rem; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    min-height: 90vh; 
    text-align: center; 
}
h1 { 
    color: #64B5F6; 
    font-family: 'Inter', sans-serif; 
    font-weight: 700; 
}
p { font-size: 1.1rem; }
button { 
    background-color: #BA68C8; 
    color: white; 
    border: none; 
    padding: 12px 24px; 
    border-radius: 8px; 
    cursor: pointer; 
    font-size: 1rem; 
    transition: transform 0.2s; 
}
button:hover { transform: scale(1.05); }` 
    },
    { 
        path: '/public/script.js', 
        name: 'script.js', 
        type: 'file', 
        content: `const button = document.getElementById('counter');
let count = 0;
button.addEventListener('click', () => {
    count++;
    button.textContent = 'Click me: ' + count;
});` 
    },
    { 
        path: '/src/app/page.tsx', 
        name: 'page.tsx', 
        type: 'file', 
        content: `import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
}` 
    },
    { 
        path: '/src/app/layout.tsx', 
        name: 'layout.tsx', 
        type: 'file', 
        content: `import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'CodePod',
  description: 'An online IDE platform, inspired by Replit.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}` 
    },
    { 
        path: '/package.json', 
        name: 'package.json', 
        type: 'file', 
        content: `{
  "name": "codepod",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "14.1.4"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "eslint": "^8",
    "eslint-config-next": "14.1.4"
  }
}` 
    },
];
