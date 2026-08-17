import { Project } from '../types';

const STORAGE_KEY = 'website-builder-projects';

function readAll(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function saveProject(project: Project): void {
  const projects = readAll();
  projects.push(project);
  writeAll(projects);
}

export function getProjects(): Project[] {
  return readAll().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getProject(id: string): Project | null {
  return readAll().find((p) => p.id === id) ?? null;
}

export function deleteProject(id: string): void {
  const projects = readAll().filter((p) => p.id !== id);
  writeAll(projects);
}

export function updateProject(project: Project): void {
  const projects = readAll();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx === -1) return;
  projects[idx] = { ...project, updatedAt: Date.now() };
  writeAll(projects);
}
