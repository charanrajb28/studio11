"use client";

import { useState } from 'react';
import { Header } from '@/components/dashboard/header';
import { ProjectsList } from '@/components/dashboard/projects-list';
import { TemplateSelection } from '@/components/dashboard/template-selection';

export default function DashboardPage() {
  const [showTemplateSelection, setShowTemplateSelection] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body">
      <Header onNewProject={() => setShowTemplateSelection(true)} />
      <main className="flex-1 overflow-y-auto">
        {showTemplateSelection ? (
          <TemplateSelection onBack={() => setShowTemplateSelection(false)} />
        ) : (
          <ProjectsList onNewProject={() => setShowTemplateSelection(true)} />
        )}
      </main>
    </div>
  );
}
