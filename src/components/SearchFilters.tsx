import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (filters: {
    fromDate: string;
    toDate: string;
    channelName: string;
  }) => void;
}

export const SearchFilters = ({ onSearch }: SearchFiltersProps) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [channelName, setChannelName] = useState("");

  const handleSearch = () => {
    onSearch({ fromDate, toDate, channelName });
  };

  const channels = [
    { code: "1010485", name: "Channel 1" },
    { code: "1015268", name: "Channel 2" },
    { code: "1010297", name: "Channel 3" },
    { code: "1010302", name: "Channel 4" },
    { code: "1010337", name: "Channel 5" },
    { code: "1010395", name: "Channel 6" },
    { code: "1010412", name: "Channel 7" },
    { code: "1010413", name: "Channel 8" },
    { code: "1010430", name: "Channel 9" },
    { code: "1010670", name: "Channel 10" },
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="fromDate" className="text-sm font-medium">
              From Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="fromDate"
                type="datetime-local"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="pl-10"
                placeholder="01/07/2025 11:00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="toDate" className="text-sm font-medium">
              To Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="toDate"
                type="datetime-local"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="pl-10"
                placeholder="01/07/2025 12:15"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="channelName" className="text-sm font-medium">
              Channel Name
            </Label>
            <Select value={channelName} onValueChange={setChannelName}>
              <SelectTrigger>
                <SelectValue placeholder="Select Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Channels</SelectItem>
                {channels.map((channel) => (
                  <SelectItem key={channel.code} value={channel.code}>
                    {channel.name} ({channel.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};