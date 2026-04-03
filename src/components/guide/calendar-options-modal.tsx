"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CalendarOptionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (options: { classMinutes: number; classesPerWeek: number }) => void;
}

export function CalendarOptionsModal({
  open,
  onOpenChange,
  onSubmit,
}: CalendarOptionsModalProps) {
  const [classMinutes, setClassMinutes] = useState(45);
  const [classesPerWeek, setClassesPerWeek] = useState(5);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Calendar Settings</DialogTitle>
          <DialogDescription>
            Configure your class schedule for the facilitation calendar.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="classMinutes">Class duration (minutes)</Label>
            <Input
              id="classMinutes"
              type="number"
              min={15}
              max={120}
              value={classMinutes}
              onChange={(e) => setClassMinutes(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="classesPerWeek">Classes per week</Label>
            <Input
              id="classesPerWeek"
              type="number"
              min={1}
              max={7}
              value={classesPerWeek}
              onChange={(e) => setClassesPerWeek(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit({ classMinutes, classesPerWeek });
              onOpenChange(false);
            }}
          >
            Generate Calendar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
