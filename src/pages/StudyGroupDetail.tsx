
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useStudyGroups } from "@/context/StudyGroupContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Book, Users, ArrowLeft, Calendar, Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const StudyGroupDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStudyGroup, joinStudyGroup } = useStudyGroups();

  const studyGroup = getStudyGroup(id || "");

  if (!studyGroup) {
    return (
      <MainLayout>
        <div className="text-center p-12">
          <h2 className="text-2xl font-bold mb-4">스터디 그룹을 찾을 수 없습니다</h2>
          <Button onClick={() => navigate("/")}>홈으로 돌아가기</Button>
        </div>
      </MainLayout>
    );
  }

  const isFull = studyGroup.currentParticipants >= studyGroup.maxParticipants;
  const formattedDate = studyGroup.createdAt.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const handleJoin = () => {
    if (!isFull) {
      joinStudyGroup(studyGroup.id);
    }
  };

  return (
    <MainLayout>
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-4 w-4" /> 모든 스터디 그룹
      </Button>

      <Card className="overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-study-lightPurple p-3 rounded-full">
              <Book className="h-6 w-6 text-study-purple" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{studyGroup.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{formattedDate} 등록</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-lg">스터디 정보</h2>
              <Badge
                variant={isFull ? "destructive" : "outline"}
                className="text-sm"
              >
                <Users className="h-3 w-3 mr-1" />
                {studyGroup.currentParticipants}/{studyGroup.maxParticipants}명
              </Badge>
            </div>
            <p className="text-base whitespace-pre-line">{studyGroup.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">태그</h2>
            <div className="flex flex-wrap gap-2">
              {studyGroup.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-study-lightPurple text-study-darkPurple"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/50 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold">함께 공부하고 싶으신가요?</h3>
            <p className="text-muted-foreground text-sm">
              스터디 그룹에 참여하여 함께 성장해 보세요!
            </p>
          </div>

          {isFull ? (
            <Button variant="secondary" disabled>
              인원 마감
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  스터디 참여하기
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>스터디 참여하기</AlertDialogTitle>
                  <AlertDialogDescription>
                    <span className="font-semibold">{studyGroup.title}</span> 스터디 그룹에
                    참여하시겠습니까?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handleJoin}>참여하기</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default StudyGroupDetail;
