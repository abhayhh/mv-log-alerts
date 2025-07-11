import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { SearchFilters } from "@/components/SearchFilters";
import { VideoTable } from "@/components/VideoTable";
import { LanguageSearch } from "@/components/LanguageSearch";
import { useToast } from "@/hooks/use-toast";

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

const Index = () => {
  const [activeTab, setActiveTab] = useState('past24hrs');
  const [videos, setVideos] = useState<VideoData[]>([
    {
      id: 1,
      preview: "/api/placeholder/80/60",
      videoName: "1010485_2025-07-01_12:00:00.Mp4",
      fileSize: "488.141 MB",
      fileDuration: "01:00:00",
      channelName: "Channel 1",
      channelCode: "1010485",
      captureDate: "Jul 01, 2025",
      logStartTime: "12:00 PM",
      logEndTime: "01:00 PM"
    },
    {
      id: 2,
      preview: "/api/placeholder/80/60",
      videoName: "1015268_2025-07-01_12:00:00.Mp4",
      fileSize: "8.892 MB",
      fileDuration: "00:04:21",
      channelName: "Channel 2",
      channelCode: "1015268",
      captureDate: "Jul 01, 2025",
      logStartTime: "12:00 PM",
      logEndTime: "12:04 PM"
    },
    {
      id: 3,
      preview: "/api/placeholder/80/60",
      videoName: "1010297_2025-07-01_12:00:00.Mp4",
      fileSize: "137.504 MB",
      fileDuration: "00:59:59",
      channelName: "Channel 3",
      channelCode: "1010297",
      captureDate: "Jul 01, 2025",
      logStartTime: "12:00 PM",
      logEndTime: "12:59 PM"
    },
    {
      id: 4,
      preview: "/api/placeholder/80/60",
      videoName: "1010302_2025-07-01_12:00:00.Mp4",
      fileSize: "136.732 MB",
      fileDuration: "01:00:00",
      channelName: "Channel 4",
      channelCode: "1010302",
      captureDate: "Jul 01, 2025",
      logStartTime: "12:00 PM",
      logEndTime: "01:00 PM"
    },
    {
      id: 5,
      preview: "/api/placeholder/80/60",
      videoName: "1010337_2025-07-01_12:00:00.Mp4",
      fileSize: "136.786 MB",
      fileDuration: "01:00:00",
      channelName: "Channel 5",
      channelCode: "1010337",
      captureDate: "Jul 01, 2025",
      logStartTime: "12:00 PM",
      logEndTime: "01:00 PM"
    },
    {
      id: 6,
      preview: "/api/placeholder/80/60",
      videoName: "1010395_2025-07-01_12:00:00.Mp4",
      fileSize: "136.988 MB",
      fileDuration: "01:00:00",
      channelName: "Channel 6",
      channelCode: "1010395",
      captureDate: "Jul 01, 2025",
      logStartTime: "12:00 PM",
      logEndTime: "01:00 PM"
    },
    {
      id: 7,
      preview: "/api/placeholder/80/60",
      videoName: "1010412_2025-07-01_12:00:00.Mp4",
      fileSize: "137.352 MB",
      fileDuration: "01:00:00",
      channelName: "Channel 7",
      channelCode: "1010412",
      captureDate: "Jul 01, 2025",
      logStartTime: "12:00 PM",
      logEndTime: "01:00 PM"
    },
    {
      id: 8,
      preview: "/api/placeholder/80/60",
      videoName: "1010413_2025-07-01_12:00:00.Mp4",
      fileSize: "272.017 MB",
      fileDuration: "01:00:01",
      channelName: "Channel 8",
      channelCode: "1010413",
      captureDate: "Jul 01, 2025",
      logStartTime: "12:00 PM",
      logEndTime: "01:00 PM"
    },
    {
      id: 9,
      preview: "/api/placeholder/80/60",
      videoName: "1010430_2025-07-01_12:00:00.Mp4",
      fileSize: "137.115 MB",
      fileDuration: "01:00:00",
      channelName: "Channel 9",
      channelCode: "1010430",
      captureDate: "Jul 01, 2025",
      logStartTime: "12:00 PM",
      logEndTime: "01:00 PM"
    },
    {
      id: 10,
      preview: "/api/placeholder/80/60",
      videoName: "1010670_2025-07-01_12:00:00.Mp4",
      fileSize: "37.611 MB",
      fileDuration: "00:16:31",
      channelName: "Channel 10",
      channelCode: "1010670",
      captureDate: "Jul 01, 2025",
      logStartTime: "12:00 PM",
      logEndTime: "12:16 PM"
    }
  ]);
  
  const { toast } = useToast();

  const handleSearch = (filters: {
    fromDate: string;
    toDate: string;
    channelName: string;
  }) => {
    // Here you would implement the actual API call
    toast({
      title: "Search initiated",
      description: `Searching videos from ${filters.fromDate} to ${filters.toDate} for channel ${filters.channelName || 'All'}`,
    });
  };

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    toast({
      title: "Sorting applied",
      description: `Videos sorted by ${field} in ${direction}ending order`,
    });
  };

  const handleChannelSelect = (channel: string) => {
    toast({
      title: "Channel Selected",
      description: `Showing past 24 hrs videos for ${channel}`,
    });
    // Filter videos for the selected channel
    // This would typically fetch from API
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'past24hrs':
        return (
          <div className="space-y-6">
            <SearchFilters onSearch={handleSearch} />
            <VideoTable videos={videos} onSort={handleSort} />
          </div>
        );
      case 'search-lang':
        return (
          <div className="space-y-6">
            <LanguageSearch onChannelSelect={handleChannelSelect} />
            <VideoTable videos={videos} onSort={handleSort} />
          </div>
        );
      case 'upload':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Upload File</h2>
            <p className="text-muted-foreground">File upload functionality coming soon.</p>
          </div>
        );
      case 'login':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <p className="text-muted-foreground">Login functionality coming soon.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
