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
    { code: "NDTV24x7", name: "NDTV 24x7" },
    { code: "TimesNow", name: "Times Now" },
    { code: "CNNNews18", name: "CNN-News18" },
    { code: "RepublicTV", name: "Republic TV" },
    { code: "IndiaToday", name: "India Today" },
    { code: "AajTak", name: "Aaj Tak" },
    { code: "ABPNews", name: "ABP News" },
    { code: "ZeeNews", name: "Zee News" },
    { code: "IndiaTV", name: "India TV" },
    { code: "NDTVIndia", name: "NDTV India" },
    { code: "News18India", name: "News18 India" },
    { code: "DDNews", name: "DD News" },
    { code: "NewsNation", name: "News Nation" },
    { code: "RepublicBharat", name: "Republic Bharat" },
    { code: "SunNews", name: "Sun News" },
    { code: "TV9Telugu", name: "TV9 Telugu" },
    { code: "ABPAnanda", name: "ABP Ananda" },
    { code: "PublicTV", name: "Public TV" },
    { code: "AsianetNews", name: "Asianet News" },
    { code: "ABPMajha", name: "ABP Majha" },
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
                <SelectItem value="all">All Channels</SelectItem>
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