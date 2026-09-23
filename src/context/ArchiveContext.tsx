import React, { createContext, useContext, useEffect, useState } from "react";
import type { Course, Resource } from "../data/types";
import { courses as mockCourses, resources as mockResources } from "../data/mockData";
import { getLiveCourses, getLiveResources } from "../services/resourceService";

interface ArchiveContextType {
  courses: Course[];
  resources: Resource[];
  refreshData: () => Promise<void>;
  loading: boolean;
}

const ArchiveContext = createContext<ArchiveContextType>({
  courses: mockCourses,
  resources: mockResources,
  refreshData: async () => {},
  loading: false,
});

export function ArchiveProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    try {
      const [liveC, liveR] = await Promise.all([getLiveCourses(), getLiveResources()]);
      setCourses(liveC);
      setResources(liveR);
    } catch (e) {
      console.warn("Failed to fetch live data from Supabase:", e);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function refreshData() {
    setLoading(true);
    await loadData();
    setLoading(false);
  }

  return (
    <ArchiveContext.Provider value={{ courses, resources, refreshData, loading }}>
      {children}
    </ArchiveContext.Provider>
  );
}

export function useArchive() {
  return useContext(ArchiveContext);
}
