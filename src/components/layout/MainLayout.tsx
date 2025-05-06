
import React from "react";
import { Link } from "react-router-dom";
import { Book, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6 text-study-purple" />
            <Link to="/" className="text-xl font-bold text-study-darkPurple">
              스터디모임
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/create" className="hidden sm:block">
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> 스터디 만들기
              </Button>
            </Link>
            <Link to="/create" className="sm:hidden">
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6">{children}</main>
      <footer className="border-t py-6 bg-secondary/50">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; 2025 스터디모임 - 함께 공부하는 즐거움
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
