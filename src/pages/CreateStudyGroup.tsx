
import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useStudyGroups } from "@/context/StudyGroupContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface StudyGroupForm {
  title: string;
  description: string;
  maxParticipants: number;
  tags: string;
}

const CreateStudyGroup = () => {
  const navigate = useNavigate();
  const { addStudyGroup } = useStudyGroups();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<StudyGroupForm>();

  const onSubmit = (data: StudyGroupForm) => {
    // Process tags (split by comma and trim)
    const tags = data.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    addStudyGroup({
      title: data.title,
      description: data.description,
      maxParticipants: parseInt(data.maxParticipants.toString()),
      tags,
    });

    navigate("/");
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">새로운 스터디 그룹 만들기</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">스터디 그룹명</Label>
            <Input
              id="title"
              placeholder="스터디 주제를 간결하게 표현하세요"
              {...register("title", { required: "스터디 그룹명을 입력하세요" })}
              className="w-full"
            />
            {errors.title && (
              <p className="text-destructive text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">스터디 설명</Label>
            <Textarea
              id="description"
              placeholder="스터디에 대한 자세한 설명을 적어주세요"
              rows={5}
              {...register("description", { required: "스터디 설명을 입력하세요" })}
              className="resize-none w-full"
            />
            {errors.description && (
              <p className="text-destructive text-sm">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxParticipants">최대 참여 인원</Label>
            <Input
              id="maxParticipants"
              type="number"
              min={2}
              max={20}
              defaultValue={5}
              {...register("maxParticipants", {
                required: "참여 인원을 입력하세요",
                min: { value: 2, message: "최소 2명 이상이어야 합니다" },
                max: { value: 20, message: "최대 20명까지 가능합니다" },
              })}
              className="w-full"
            />
            {errors.maxParticipants && (
              <p className="text-destructive text-sm">{errors.maxParticipants.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">태그 (쉼표로 구분)</Label>
            <Input
              id="tags"
              placeholder="예: JavaScript, 알고리즘, 웹개발"
              {...register("tags")}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              관련 키워드를 쉼표(,)로 구분하여 입력하세요
            </p>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/")} className="flex-1">
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "생성중..." : "스터디 그룹 생성"}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateStudyGroup;
