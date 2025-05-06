
export interface StudyGroup {
  id: string;
  title: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  createdAt: Date;
  tags: string[];
}
