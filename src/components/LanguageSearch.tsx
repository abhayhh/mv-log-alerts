import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, Search } from "lucide-react";

interface LanguageSearchProps {
  onChannelSelect: (channel: string) => void;
}

const channelsByLanguage = {
  english: [
    "NDTV 24x7",
    "Times Now", 
    "CNN-News18",
    "Republic TV",
    "India Today",
    "Mirror Now",
    "WION",
    "DD India",
    "CNBC TV18",
    "ET Now",
    "NewsX"
  ],
  hindi: [
    "Aaj Tak",
    "ABP News",
    "Zee News",
    "India TV",
    "NDTV India",
    "News18 India",
    "DD News",
    "News Nation",
    "Republic Bharat",
    "Times Now Navbharat",
    "TV9 Bharatvarsh",
    "Z Business",
    "Bharat24",
    "Bharat Express",
    "CNBC Awaaz",
    "ET Now Swadesh",
    "Good News Today",
    "India News",
    "Sansad TV",
    "Sudarshan News"
  ],
  tamil: [
    "ABP Nadu",
    "Captain News",
    "Janam TV Tamil",
    "Kalaignar Seithigal",
    "Lotus News",
    "News18 Tamil Nadu",
    "News J",
    "Polimer News",
    "Puthiya Thalaimurai TV",
    "Raj News 24X7",
    "Sun News"
  ],
  bengali: [
    "ABP Ananda",
    "Z 24 Ghanta",
    "News18 Bangla",
    "Republic Bangla",
    "TV9 Bangla"
  ],
  kannada: [
    "Public TV",
    "Suvarna News",
    "News18 Kannada",
    "TV9 Kannada",
    "Z Kannada News",
    "Republic Kannada"
  ],
  gujarati: [
    "ABP Asmita",
    "CNBC Bajar",
    "Gujarat Samachar",
    "News18 Gujarati",
    "Sandesh News",
    "TV9 Gujarati",
    "Z 24 Kalak"
  ],
  malayalam: [
    "Asianet News",
    "Manorama News",
    "Mathrubhumi News",
    "Jaihind TV",
    "Janam TV",
    "Kaumudy TV",
    "Mangalam TV",
    "Media One TV",
    "News 18 Kerala",
    "Reporter TV"
  ],
  marathi: [
    "ABP Majha",
    "TV9 Marathi",
    "Z 24 Taas",
    "Jai Maharashtra",
    "NDTV Marathi",
    "News18 Lokmat",
    "Saam TV"
  ],
  telugu: [
    "TV9 Telugu",
    "Sakshi TV",
    "ABN Andhra Jyothi",
    "NTV",
    "Prime9 News",
    "Z Telugu News",
    "10TV",
    "99TV",
    "ETV Andhra Pradesh",
    "ETV Telangana",
    "HMTV",
    "MOJO TV",
    "Studio N",
    "T News",
    "TV1",
    "TV5",
    "V6 News"
  ]
};

export const LanguageSearch = ({ onChannelSelect }: LanguageSearchProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");

  const handleChannelSelect = () => {
    if (selectedChannel) {
      onChannelSelect(selectedChannel);
    }
  };

  const languages = [
    { code: "english", name: "English" },
    { code: "hindi", name: "Hindi" },
    { code: "tamil", name: "Tamil" },
    { code: "bengali", name: "Bengali" },
    { code: "kannada", name: "Kannada" },
    { code: "gujarati", name: "Gujarati" },
    { code: "malayalam", name: "Malayalam" },
    { code: "marathi", name: "Marathi" },
    { code: "telugu", name: "Telugu" }
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Languages className="h-4 w-4" />
              Select Language
            </label>
            <Select value={selectedLanguage} onValueChange={(value) => {
              setSelectedLanguage(value);
              setSelectedChannel("");
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Select Channel
            </label>
            <Select 
              value={selectedChannel} 
              onValueChange={setSelectedChannel}
              disabled={!selectedLanguage}
            >
              <SelectTrigger>
                <SelectValue placeholder={selectedLanguage ? "Choose Channel" : "Select language first"} />
              </SelectTrigger>
              <SelectContent>
                {selectedLanguage && channelsByLanguage[selectedLanguage as keyof typeof channelsByLanguage]?.map((channel) => (
                  <SelectItem key={channel} value={channel}>
                    {channel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleChannelSelect} 
            disabled={!selectedChannel}
            className="bg-primary hover:bg-primary/90"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Channel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};