import featuredIcon from "@/assets/images/featuredGames.png";
import tableGamesIcon from "@/assets/images/tableGames.png";
import gameShowsIcon from "@/assets/images/gameShows.png";
import sportsIcon from "@/assets/images/sports.png";
import newGamesIcon from "@/assets/images/newGames.png";
import slotsIcon from "@/assets/images/slots.png";
import jackpotOriginalsIcon from "@/assets/images/jackpotIcon.png";

export const CATEGORIES = [
  {
    key: "FEATURED",
    label: "Featured Games",
    icon: featuredIcon,
    filter: g => g.featured,
  },
  {
    key: "ORIGINALS",
    label: "Jackpot Originals",
    icon: jackpotOriginalsIcon,
    filter: g => g.vendor === "JackpotOriginal" || (g.categories && g.categories.includes("ORIGINAL")),
  },
  {
    key: "SLOTS",
    label: "Slots",
    icon: slotsIcon,
    filter: g => g.categories && g.categories.includes("VIDEOSLOTS"),
  },
  // Providers section would need a different card UI, skipping for now
  {
    key: "TABLE",
    label: "Table Games",
    icon: tableGamesIcon,
    filter: g => g.categories && g.categories.includes("TABLEGAMES"),
  },
  {
    key: "SHOWS",
    label: "Game Shows",
    icon: gameShowsIcon,
    filter: g => g.categories && g.categories.includes("GAMESHOWSLIVEDEALER"),
  },
  {
    key: "SPORTS",
    label: "Sports",
    icon: sportsIcon,
    filter: g => g.categories && g.categories.includes("SPORTS"),
  },
  {
    key: "NEW",
    label: "New Games",
    icon: newGamesIcon,
    filter: g => g.categories && g.categories.includes("NEWGAMES"),
  },
]; 