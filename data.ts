import { FactionData } from './types';

export const FACTIONS: Record<string, FactionData> = {
  amarr: {
    id: 'amarr',
    name: 'Amarr Empire',
    shortName: 'Amarr',
    tagline: 'The Golden Fleet Awaits',
    color: '#d4af37',
    glowColor: 'rgba(212, 175, 55, 0.6)',
    bgImage: 'https://picsum.photos/1920/1080?grayscale&blur=2',
    logo: 'https://picsum.photos/200/200',
    description: [
      "The Amarr Empire is a theocratic monarchy, the largest of the empires in New Eden. Ruled by the Empress and a council of Royal Heirs, their society is built on a strict hierarchy involving religion and slavery.",
      "Amarr ships are known for their heavy armor and advanced laser weaponry. They value endurance and overwhelming firepower over speed.",
      "Faith and Order are the pillars of their civilization."
    ],
    ships: [
      {
        name: "Avatar",
        class: "Titan",
        description: "The pride of the Golden Fleet, capable of delivering doomsday judgement.",
        imageUrl: "https://picsum.photos/600/400?random=1"
      },
      {
        name: "Apocalypse",
        class: "Battleship",
        description: "A symbol of Imperial might, designed to project power across star systems.",
        imageUrl: "https://picsum.photos/600/400?random=2"
      },
      {
        name: "Omen",
        class: "Cruiser",
        description: "A fast attack cruiser equipped with advanced laser batteries.",
        imageUrl: "https://picsum.photos/600/400?random=3"
      }
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  caldari: {
    id: 'caldari',
    name: 'Caldari State',
    shortName: 'Caldari',
    tagline: 'Order through Corporate Duty',
    color: '#44ffdd',
    glowColor: 'rgba(68, 255, 221, 0.6)',
    bgImage: 'https://picsum.photos/1920/1080?grayscale&blur=2',
    logo: 'https://picsum.photos/200/200',
    description: [
      "The Caldari State is a corporate meritocracy. Ruthlessly efficient and militarily powerful, the State is driven by several mega-corporations that dictate every aspect of daily life.",
      "Caldari vessels favor shields and missile launchers. They engage from extreme ranges, obliterating enemies before they can close the distance.",
      "Duty to the Corporation is the highest virtue."
    ],
    ships: [
      {
        name: "Leviathan",
        class: "Titan",
        description: "A floating fortress of missile batteries and shield generators.",
        imageUrl: "https://picsum.photos/600/400?random=4"
      },
      {
        name: "Raven",
        class: "Battleship",
        description: "The workhorse of the Caldari Navy, raining cruise missiles from afar.",
        imageUrl: "https://picsum.photos/600/400?random=5"
      },
      {
        name: "Drake",
        class: "Battlecruiser",
        description: "Renowned for its impenetrable shields and sustained firepower.",
        imageUrl: "https://picsum.photos/600/400?random=6"
      }
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  gallente: {
    id: 'gallente',
    name: 'Gallente Federation',
    shortName: 'Gallente',
    tagline: 'Liberty and Justice for All',
    color: '#44ff66',
    glowColor: 'rgba(68, 255, 102, 0.6)',
    bgImage: 'https://picsum.photos/1920/1080?grayscale&blur=2',
    logo: 'https://picsum.photos/200/200',
    description: [
      "The Gallente Federation is the only true democracy in New Eden. A melting pot of cultures, they value individual freedom and artistic expression above all else.",
      "Gallente ships rely on drones and hybrid blasters. They are close-range brawlers with active armor repair capabilities.",
      "Freedom is the right of all sentient beings."
    ],
    ships: [
      {
        name: "Erebus",
        class: "Titan",
        description: "A dark colossus that commands swarms of fighters.",
        imageUrl: "https://picsum.photos/600/400?random=7"
      },
      {
        name: "Megathron",
        class: "Battleship",
        description: "One of the most feared blasters platforms in the cluster.",
        imageUrl: "https://picsum.photos/600/400?random=8"
      },
      {
        name: "Vexor",
        class: "Cruiser",
        description: "A versatile drone carrier adaptable to any combat situation.",
        imageUrl: "https://picsum.photos/600/400?random=9"
      }
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
};