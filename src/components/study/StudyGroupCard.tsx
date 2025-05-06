
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StudyGroup } from "@/types/study-group";
import { Link } from "react-router-dom";
import { Book, Users } from "lucide-react";

interface StudyGroupCardProps {
  studyGroup: StudyGroup;
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ studyGroup }) => {
  const isFull = studyGroup.currentParticipants >= studyGroup.maxParticipants;

  return (
    <Card className="study-card overflow-hidden">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-study-purple" />
            <h3 className="font-bold text-lg">{studyGroup.title}</h3>
          </div>
          <Badge variant={isFull ? "destructive" : "outline"}>
            <Users className="h-3 w-3 mr-1" />
            {studyGroup.currentParticipants}/{studyGroup.maxParticipants}명
          </Badge>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">{studyGroup.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {studyGroup.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-study-lightPurple text-study-darkPurple">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="bg-secondary/50 px-6 py-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {studyGroup.createdAt.toLocaleDateString()}
        </span>
        <Link to={`/study/${studyGroup.id}`}>
          <Button variant="outline" size="sm">
            자세히 보기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StudyGroupCard;
