"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageSquarePlus, FileUp, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

export function CreationCards() {
  const router = useRouter();
  const [description, setDescription] = useState("");

  function handleGetStarted() {
    if (description.trim()) {
      router.push(
        `/build?description=${encodeURIComponent(description.trim())}`
      );
    } else {
      router.push("/build");
    }
  }

  return (
    <ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Describe your project */}
        <Card className="p-8">
          <CardContent className="flex flex-col gap-4">
            <MessageSquarePlus size={32} className="text-brand-teal" />
            <h3 className="font-display font-bold text-xl">
              Describe your project
            </h3>
            <Textarea
              placeholder="I teach 5th grade science and we're starting an ecosystems unit next week..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleGetStarted();
                }
              }}
            />
            <Button onClick={handleGetStarted}>Get started</Button>
          </CardContent>
        </Card>

        {/* Card 2: Upload your curriculum */}
        <Link href="/analyze" className="block">
          <Card className="p-8 cursor-pointer hover:border-brand-indigo transition-colors">
            <CardContent className="flex flex-col gap-4">
              <FileUp size={32} className="text-brand-indigo" />
              <h3 className="font-display font-bold text-xl">
                Upload your curriculum
              </h3>
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 p-6 text-center">
                <p className="text-sm text-neutral-600">
                  Drop your scope and sequence here (PDF, DOCX)
                </p>
              </div>
              <p className="text-sm text-neutral-500">
                We&apos;ll find cross-curricular PBL opportunities
              </p>
              <span className={cn(buttonVariants({ variant: "outline" }))}>
                Upload & Analyze
              </span>
            </CardContent>
          </Card>
        </Link>

        {/* Card 3: Just exploring */}
        <Card className="p-8">
          <CardContent className="flex flex-col gap-4">
            <Compass size={32} className="text-brand-coral" />
            <h3 className="font-display font-bold text-xl">
              Just exploring
            </h3>
            <p className="text-sm text-neutral-600">
              Learn what PBL is and why it matters
            </p>
            <Link
              href="/explore"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Explore PBL
            </Link>
          </CardContent>
        </Card>
      </div>
    </ScrollReveal>
  );
}
