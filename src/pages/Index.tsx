
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useStudyGroups } from "@/context/StudyGroupContext";
import StudyGroupCard from "@/components/study/StudyGroupCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Index = () => {
  const { studyGroups } = useStudyGroups();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-4 py-10 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-study-darkPurple">
            함께 성장하는 스터디 모임
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px]">
            관심있는 분야의 스터디 그룹을 찾거나 직접 만들어 보세요.
            함께 공부할 때 더 큰 성장을 이룰 수 있습니다.
          </p>
          <Link to="/create">
            <Button size="lg" className="mt-4 gap-2">
              <Plus className="h-4 w-4" /> 스터디 그룹 만들기
            </Button>
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-4">모집 중인 스터디</h2>

        {studyGroups.length === 0 ? (
          <div className="text-center p-12 border rounded-lg bg-secondary/50">
            <h3 className="text-xl font-medium mb-2">아직 스터디 그룹이 없습니다</h3>
            <p className="text-muted-foreground mb-4">
              첫 번째 스터디 그룹을 만들어 보세요!
            </p>
            <Link to="/create">
              <Button>스터디 그룹 만들기</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {studyGroups.map((group) => (
              <StudyGroupCard key={group.id} studyGroup={group} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
