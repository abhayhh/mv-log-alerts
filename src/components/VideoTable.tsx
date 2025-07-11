import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Trash2, Scissors, Edit, ArrowUpDown, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoData {
  id: number;
  preview: string;
  videoName: string;
  fileSize: string;
  fileDuration: string;
  channelName: string;
  channelCode: string;
  captureDate: string;
  logStartTime: string;
  logEndTime: string;
}

interface VideoTableProps {
  videos: VideoData[];
  onSort: (field: string, direction: 'asc' | 'desc') => void;
}

export const VideoTable = ({ videos, onSort }: VideoTableProps) => {
  const [sortField, setSortField] = useState<string>('fileDuration');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    onSort(field, newDirection);
  };

  const parseDuration = (duration: string): number => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const isOutOfRange = (duration: string): boolean => {
    const totalSeconds = parseDuration(duration);
    const minSeconds = 58 * 60; // 00:58:00
    const maxSeconds = 70 * 60; // 01:10:00
    return totalSeconds < minSeconds || totalSeconds > maxSeconds;
  };

  const parseFileSize = (size: string): number => {
    const value = parseFloat(size);
    if (size.includes('MB')) return value;
    if (size.includes('KB')) return value / 1024;
    if (size.includes('GB')) return value * 1024;
    return value;
  };

  const sortedVideos = useMemo(() => {
    return [...videos].sort((a, b) => {
      let aValue: number, bValue: number;
      
      switch (sortField) {
        case 'fileDuration':
          aValue = parseDuration(a.fileDuration);
          bValue = parseDuration(b.fileDuration);
          break;
        case 'fileSize':
          aValue = parseFileSize(a.fileSize);
          bValue = parseFileSize(b.fileSize);
          break;
        default:
          return 0;
      }
      
      if (sortDirection === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }, [videos, sortField, sortDirection]);

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/50 select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </TableHead>
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Video Files</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortField} onValueChange={(value) => handleSort(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fileDuration">File Duration</SelectItem>
                <SelectItem value="fileSize">File Size</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead className="w-20">Preview</TableHead>
                <TableHead>Video Information</TableHead>
                <SortableHeader field="fileDuration">File Duration</SortableHeader>
                <TableHead>Channel Name</TableHead>
                <TableHead>Capture Date</TableHead>
                <TableHead>Log Start Time</TableHead>
                <TableHead>Log End Time</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedVideos.map((video, index) => {
                const isHighlighted = isOutOfRange(video.fileDuration);
                return (
                  <TableRow 
                    key={video.id}
                    className={cn(
                      "hover:bg-muted/50",
                      isHighlighted && "bg-highlight/30 border-l-4 border-l-warning"
                    )}
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="w-16 h-12 bg-muted rounded overflow-hidden">
                        <img 
                          src={video.preview} 
                          alt="Video preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{video.videoName}</div>
                        <div className="text-xs text-muted-foreground">
                          Size: {video.fileSize}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={isHighlighted ? "destructive" : "secondary"}
                          className="font-mono text-xs"
                        >
                          {video.fileDuration}
                        </Badge>
                        {isHighlighted && (
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{video.channelName}</div>
                        <div className="text-xs text-muted-foreground">
                          Code: {video.channelCode}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{video.captureDate}</TableCell>
                    <TableCell className="text-sm">{video.logStartTime}</TableCell>
                    <TableCell className="text-sm">{video.logEndTime}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Scissors className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};