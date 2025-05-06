
import React, { createContext, useContext, useState, useEffect } from "react";
import { StudyGroup } from "../types/study-group";
import { useToast } from "@/hooks/use-toast";

// Sample data for study groups
const initialStudyGroups: StudyGroup[] = [
  {
    id: "1",
    title: "JavaScript 스터디",
    description: "프론트엔드 개발을 위한 JavaScript 스터디 그룹입니다. React와 Vue.js에 대해서도 다룰 예정입니다.",
    maxParticipants: 5,
    currentParticipants: 2,
    createdAt: new Date("2025-04-30"),
    tags: ["JavaScript", "React", "프론트엔드"]
  },
  {
    id: "2",
    title: "알고리즘 문제풀이",
    description: "코딩 테스트 준비를 위한 알고리즘 문제풀이 스터디입니다. 매주 다른 알고리즘 주제를 다룹니다.",
    maxParticipants: 8,
    currentParticipants: 4,
    createdAt: new Date("2025-05-01"),
    tags: ["알고리즘", "코딩테스트", "Python"]
  },
  {
    id: "3",
    title: "백엔드 개발자 모임",
    description: "Node.js와 Spring Boot를 사용한 백엔드 개발 스터디입니다. API 설계와 데이터베이스 최적화에 중점을 둡니다.",
    maxParticipants: 6,
    currentParticipants: 3,
    createdAt: new Date("2025-05-02"),
    tags: ["백엔드", "Node.js", "Spring"]
  },
  {
    id: "4",
    title: "영어 회화 스터디",
    description: "개발자를 위한 영어 회화 스터디입니다. 기술 면접과 문서 읽기에 필요한 영어 능력을 향상시킵니다.",
    maxParticipants: 4,
    currentParticipants: 2,
    createdAt: new Date("2025-05-03"),
    tags: ["영어", "회화", "면접"]
  }
];

interface StudyGroupContextType {
  studyGroups: StudyGroup[];
  addStudyGroup: (studyGroup: Omit<StudyGroup, "id" | "createdAt" | "currentParticipants">) => void;
  joinStudyGroup: (id: string) => void;
  getStudyGroup: (id: string) => StudyGroup | undefined;
}

const StudyGroupContext = createContext<StudyGroupContextType | undefined>(undefined);

export const useStudyGroups = () => {
  const context = useContext(StudyGroupContext);
  if (!context) {
    throw new Error("useStudyGroups must be used within a StudyGroupProvider");
  }
  return context;
};

export const StudyGroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(initialStudyGroups);
  const { toast } = useToast();

  // Simulate loading from localStorage
  useEffect(() => {
    const storedGroups = localStorage.getItem("studyGroups");
    if (storedGroups) {
      try {
        const parsedGroups = JSON.parse(storedGroups);
        // Convert string dates back to Date objects
        const processedGroups = parsedGroups.map((group: any) => ({
          ...group,
          createdAt: new Date(group.createdAt)
        }));
        setStudyGroups(processedGroups);
      } catch (error) {
        console.error("Failed to parse stored study groups:", error);
      }
    }
  }, []);

  // Save to localStorage when studyGroups change
  useEffect(() => {
    localStorage.setItem("studyGroups", JSON.stringify(studyGroups));
  }, [studyGroups]);

  const addStudyGroup = (newGroup: Omit<StudyGroup, "id" | "createdAt" | "currentParticipants">) => {
    const studyGroup: StudyGroup = {
      ...newGroup,
      id: Date.now().toString(),
      currentParticipants: 1, // Creator is the first participant
      createdAt: new Date()
    };
    
    setStudyGroups([...studyGroups, studyGroup]);
    toast({
      title: "스터디 그룹 생성 완료",
      description: "새로운 스터디 그룹이 생성되었습니다."
    });
  };

  const joinStudyGroup = (id: string) => {
    setStudyGroups(prevGroups =>
      prevGroups.map(group => {
        if (group.id === id && group.currentParticipants < group.maxParticipants) {
          toast({
            title: "스터디 참여 완료",
            description: `${group.title} 스터디에 참여하였습니다.`
          });
          return { ...group, currentParticipants: group.currentParticipants + 1 };
        }
        if (group.id === id && group.currentParticipants >= group.maxParticipants) {
          toast({
            variant: "destructive",
            title: "참여 실패",
            description: "이미 인원이 가득 찼습니다."
          });
        }
        return group;
      })
    );
  };

  const getStudyGroup = (id: string) => {
    return studyGroups.find(group => group.id === id);
  };

  return (
    <StudyGroupContext.Provider value={{ studyGroups, addStudyGroup, joinStudyGroup, getStudyGroup }}>
      {children}
    </StudyGroupContext.Provider>
  );
};
