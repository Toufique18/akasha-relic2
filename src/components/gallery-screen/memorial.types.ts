export interface CondolenceEntry {
  name: string;
  relation: string;
  message: string;
  date: string;
}

export interface MemorialItem {
  id: string;
  numeric_id?: number;
  name: string;
  relation: string;
  birthDate: string;
  deathDate: string;
  epitaph: string;
  bio: string;
  photoUrl: string;
  avatarVideoUrl?: string;
  avatarScript?: string;
  birthPlace?: string;
  category: "ancestor" | "family" | "pioneer" | string;
  candlesCount: number;
  flowersCount: number;
  condolences?: CondolenceEntry[];
  created_by?: string;
  created_at?: string;
}

export const FALLBACK_MEMORIALS: MemorialItem[] = [
  {
    id: "arthur-pendragon",
    numeric_id: 1,
    name: "Arthur Pendragon Sr.",
    relation: "Beloved Grandfather & Historian",
    birthDate: "1930",
    deathDate: "2012",
    epitaph: "Always remember that true legacy is not what we leave behind, but who we inspire across generations.",
    bio: "Arthur dedicated over 50 years to archiving oral folklore, family genealogies, and regional history. His wisdom, warmth, and bedtime stories formed the moral foundation of our entire family. A passionate chess player and lover of classic literature.",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    avatarVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    avatarScript: "Always remember that true legacy is not what we leave behind, but who we inspire across generations. Stay kind and united.",
    birthPlace: "Camelot, England",
    category: "family",
    candlesCount: 142,
    flowersCount: 89,
    condolences: [
      {
        name: "Uther Pendragon",
        relation: "Son",
        message: "Dad, your lessons guide my hands every day as I build. Miss your gentle counsel.",
        date: "2026-09-15"
      },
      {
        name: "Elena Pendragon",
        relation: "Granddaughter",
        message: "Your stories taught me how to dream without fear. Rest peacefully, Grandfather.",
        date: "2026-10-01"
      }
    ]
  },
  {
    id: "guinevere-pendragon",
    numeric_id: 2,
    name: "Guinevere Pendragon",
    relation: "Beloved Grandmother & Educator",
    birthDate: "1935",
    deathDate: "2018",
    epitaph: "A gentle voice that quieted every storm, and a garden of love that bloomed in every heart.",
    bio: "Professor of Medieval Literature and matriarch of our household. Her house was always filled with the fragrance of fresh tea, classical piano notes, and open arms for anyone in need of solace.",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    avatarVideoUrl: "",
    avatarScript: "Carry love like a beacon in the darkest night; it will always show you the way home.",
    birthPlace: "London, UK",
    category: "family",
    candlesCount: 98,
    flowersCount: 64,
    condolences: [
      {
        name: "Igraine Pendragon",
        relation: "Daughter-in-law",
        message: "You welcomed me like your own daughter. Your recipes and your grace remain with us.",
        date: "2026-08-20"
      }
    ]
  },
  {
    id: "eleanor-vance",
    numeric_id: 3,
    name: "Dr. Eleanor Vance",
    relation: "Pioneering Healer & Aunt",
    birthDate: "1942",
    deathDate: "2020",
    epitaph: "Healing is not merely curing the body, but bringing light and dignity to the suffering soul.",
    bio: "Served over four decades as a community physician and medical humanitarian. Her relentless dedication saved countless lives in rural clinics across three continents.",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    avatarVideoUrl: "",
    avatarScript: "Every heartbeat is a sacred gift. Never hesitate to lend your strength to someone in need.",
    birthPlace: "Edinburgh, Scotland",
    category: "ancestor",
    candlesCount: 215,
    flowersCount: 130,
    condolences: [
      {
        name: "Dr. Marcus Reed",
        relation: "Colleague",
        message: "Eleanor set the highest standard of empathy in medicine. An unforgettable mentor.",
        date: "2026-09-02"
      }
    ]
  },
  {
    id: "marcus-thorne",
    numeric_id: 4,
    name: "Captain Marcus Thorne",
    relation: "Great Uncle & Master Navigator",
    birthDate: "1928",
    deathDate: "2009",
    epitaph: "The horizon is not the end of the journey, but an invitation into the eternal sea.",
    bio: "A veteran merchant mariner and ocean cartographer. Marcus spent 38 years charting treacherous waterways and teaching young sailors the secrets of celestial navigation.",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    avatarVideoUrl: "",
    avatarScript: "Keep your eyes on the North Star, no matter how wild the midnight squall becomes.",
    birthPlace: "Plymouth, England",
    category: "ancestor",
    candlesCount: 164,
    flowersCount: 78,
    condolences: [
      {
        name: "Samuel Thorne",
        relation: "Nephew",
        message: "Fair winds and following seas, Uncle. Your compass still rests proudly on my desk.",
        date: "2026-07-11"
      }
    ]
  },
  {
    id: "sofia-rossi",
    numeric_id: 5,
    name: "Sofia Rossi",
    relation: "Master Artisan & Great Grandmother",
    birthDate: "1938",
    deathDate: "2015",
    epitaph: "Beauty woven by loving hands never fades; it shelters future generations from the cold.",
    bio: "Renowned textile weaver and preserver of traditional silk crafts. Sofia founded a free vocational school for underprivileged young women in Florence.",
    photoUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=800&auto=format&fit=crop",
    avatarVideoUrl: "",
    avatarScript: "Weave patience into every thread, and life will craft an enduring tapestry of joy.",
    birthPlace: "Florence, Italy",
    category: "family",
    candlesCount: 112,
    flowersCount: 95,
    condolences: [
      {
        name: "Matteo Rossi",
        relation: "Grandson",
        message: "Nonna, your laughter still echoes in the family kitchen. Forever cherished.",
        date: "2026-09-18"
      }
    ]
  },
  {
    id: "thomas-sterling",
    numeric_id: 6,
    name: "Prof. Thomas Sterling",
    relation: "Astronomer & Cherished Mentor",
    birthDate: "1945",
    deathDate: "2021",
    epitaph: "Look upward to the cosmos; we are all made of stardust returning to the infinite quiet.",
    bio: "Astrophysics professor and mentor who inspired thousands of university students to look up at the night sky with wonder, curiosity, and humility.",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    avatarVideoUrl: "",
    avatarScript: "Even when the darkness seems overwhelming, remember that distant stars are always burning for you.",
    birthPlace: "Boston, USA",
    category: "ancestor",
    candlesCount: 180,
    flowersCount: 112,
    condolences: [
      {
        name: "Dr. Sarah Lin",
        relation: "Student",
        message: "Thank you for teaching me that curiosity is our highest human responsibility. Rest in peace.",
        date: "2026-10-04"
      }
    ]
  }
];
