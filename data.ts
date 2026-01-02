import { FactionData } from './types';

// NOTE: Please ensure you have the following images in your public/assets folder:
// - amarr_logo.webp
// - caldari_logo.webp
// - gallente_logo.webp
// Or update the paths below to match your file structure.

export const FACTIONS: Record<string, FactionData> = {
  amarr: {
    id: 'amarr',
    name: '艾玛帝国', // Amarr Empire
    shortName: 'AMARR',
    tagline: '帝国的黄金舰队即将到达', // The Empire's Golden Fleet is arriving
    color: '#d4af37', // Gold
    glowColor: 'rgba(212, 175, 55, 0.8)',
    // Using placeholder for demo, replace with: '/assets/amarr_bg.webp'
    bgImage: 'https://picsum.photos/1920/1080?grayscale&blur=2', 
    // Using placeholder for demo, replace with: '/assets/amarr_logo.webp'
    logo: 'https://images.evetech.net/corporations/1000035/logo?size=256', 
    description: [
      "艾玛帝国是新伊甸最大的帝国。作为一个政教合一的君主制国家，它由女皇和皇家继承人议会统治。",
      "艾玛舰船以厚重的装甲和先进的激光武器闻名。它们重视持久战和压倒性的火力。",
      "信仰与秩序是他们文明的支柱。"
    ],
    ships: [
      {
        name: "神使级 (Avatar)",
        class: "泰坦 (Titan)",
        description: "黄金舰队的骄傲，能够执行末日审判。",
        imageUrl: "https://images.evetech.net/types/11567/render?size=512"
      },
      {
        name: "地狱天使级 (Abaddon)",
        class: "战列舰 (Battleship)",
        description: "帝国力量的象征，旨在向星系投射力量。",
        imageUrl: "https://images.evetech.net/types/24692/render?size=512"
      },
      {
        name: "奥格诺级 (Omen)",
        class: "巡洋舰 (Cruiser)",
        description: "配备先进激光炮台的快速攻击巡洋舰。",
        imageUrl: "https://images.evetech.net/types/626/render?size=512"
      }
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  caldari: {
    id: 'caldari',
    name: '加达里合众国', // Caldari State
    shortName: 'CALDARI',
    tagline: '已被收购ovo', // Acquired ovo
    color: '#44ffdd', // Cyan
    glowColor: 'rgba(68, 255, 221, 0.8)',
    bgImage: 'https://picsum.photos/1920/1080?grayscale&blur=2',
    logo: 'https://images.evetech.net/corporations/1000037/logo?size=256', 
    description: [
      "加达里合众国是一个企业精英统治的国家。国家由几个巨型企业驱动，这些企业主宰着日常生活的方方面面。",
      "加达里舰船偏爱护盾和导弹发射器。它们从极远的距离交战，在敌人靠近之前将其消灭。",
      "对企业的责任是最高美德。"
    ],
    ships: [
      {
        name: "勒维亚坦级 (Leviathan)",
        class: "泰坦 (Titan)",
        description: "导弹炮台和护盾发生器的浮动堡垒。",
        imageUrl: "https://images.evetech.net/types/3764/render?size=512"
      },
      {
        name: "乌鸦级 (Raven)",
        class: "战列舰 (Battleship)",
        description: "加达里海军的主力，从远处倾泻巡航导弹。",
        imageUrl: "https://images.evetech.net/types/638/render?size=512"
      },
      {
        name: "幼龙级 (Drake)",
        class: "战列巡洋舰 (Battlecruiser)",
        description: "以其坚不可摧的护盾和持续火力而闻名。",
        imageUrl: "https://images.evetech.net/types/24698/render?size=512"
      }
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  gallente: {
    id: 'gallente',
    name: '盖伦特联邦', // Gallente Federation
    shortName: 'GALLENTE',
    tagline: '你要来点玛娜饮料吗', // Want some Mana drink?
    color: '#a855f7', // Purple
    glowColor: 'rgba(168, 85, 247, 0.8)',
    bgImage: 'https://picsum.photos/1920/1080?grayscale&blur=2',
    logo: 'https://images.evetech.net/corporations/1000120/logo?size=256', 
    description: [
      "盖伦特联邦是新伊甸中唯一的真正民主国家。作为文化的大熔炉，他们最看重个人自由和艺术表达。",
      "盖伦特舰船依赖无人机和混合炮。它们是具有主动装甲修复能力的近距离搏斗者。",
      "自由是所有智慧生物的权利。"
    ],
    ships: [
      {
        name: "厄瑞玻斯级 (Erebus)",
        class: "泰坦 (Titan)",
        description: "指挥成群战机的黑暗巨像。",
        imageUrl: "https://images.evetech.net/types/671/render?size=512"
      },
      {
        name: "万王宝座级 (Megathron)",
        class: "战列舰 (Battleship)",
        description: "星团中最令人畏惧的疾速炮平台之一。",
        imageUrl: "https://images.evetech.net/types/641/render?size=512"
      },
      {
        name: "狂怒者级 (Vexor)",
        class: "巡洋舰 (Cruiser)",
        description: "适应任何战斗情况的多功能无人机航母。",
        imageUrl: "https://images.evetech.net/types/626/render?size=512"
      }
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
};