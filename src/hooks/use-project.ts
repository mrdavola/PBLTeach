"use client";

import { useState, useCallback } from "react";
import { useAuth } from "./use-auth";
import {
  saveProject as firestoreSave,
  getProject as firestoreGet,
  getUserProjects as firestoreGetAll,
  deleteProject as firestoreDelete,
} from "@/lib/firebase/firestore";
import type { Project } from "@/lib/types";

export function useProject() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requireAuth = useCallback(() => {
    if (!user) throw new Error("You must be signed in to manage projects");
    return user.uid;
  }, [user]);

  const save = useCallback(
    async (project: Partial<Project>): Promise<string> => {
      const uid = requireAuth();
      setLoading(true);
      setError(null);
      try {
        const id = await firestoreSave(uid, project);
        return id;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to save project";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [requireAuth]
  );

  const load = useCallback(
    async (projectId: string): Promise<Project | null> => {
      const uid = requireAuth();
      setLoading(true);
      setError(null);
      try {
        const project = await firestoreGet(uid, projectId);
        setCurrentProject(project);
        return project;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load project";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [requireAuth]
  );

  const loadAll = useCallback(async (): Promise<Project[]> => {
    const uid = requireAuth();
    setLoading(true);
    setError(null);
    try {
      const all = await firestoreGetAll(uid);
      setProjects(all);
      return all;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load projects";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [requireAuth]);

  const update = useCallback(
    async (projectId: string, updates: Partial<Project>): Promise<string> => {
      const uid = requireAuth();
      setLoading(true);
      setError(null);
      try {
        const id = await firestoreSave(uid, { ...updates, id: projectId });
        return id;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to update project";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [requireAuth]
  );

  const remove = useCallback(
    async (projectId: string): Promise<void> => {
      const uid = requireAuth();
      setLoading(true);
      setError(null);
      try {
        await firestoreDelete(uid, projectId);
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
        if (currentProject?.id === projectId) {
          setCurrentProject(null);
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to delete project";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [requireAuth, currentProject?.id]
  );

  return {
    projects,
    currentProject,
    loading,
    error,
    save,
    load,
    loadAll,
    update,
    remove,
  };
}
