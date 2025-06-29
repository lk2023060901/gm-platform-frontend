export interface DevelopmentItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned';
  completedTime?: string;
  estimatedTime?: string;
  progress?: number;
  features?: DevelopmentFeature[];
}

export interface DevelopmentFeature {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  details?: string[];
}

export interface DevelopmentCategory {
  id: string;
  name: string;
  items: DevelopmentItem[];
}

export interface DevelopmentData {
  completed: DevelopmentCategory[];
  planned: DevelopmentCategory[];
  overview: {
    projectName: string;
    techStack: string[];
    startDate: string;
    lastUpdate: string;
  };
}