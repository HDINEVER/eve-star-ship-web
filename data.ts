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
    // 使用本地上传的艾玛帝国图标 (WebP 格式)
    logo: '/mars-1.webp', 
    description: [
      "艾玛帝国是新伊甸最大的帝国。作为一个政教合一的君主制国家，它由女皇和皇家继承人议会统治。",
      "艾玛舰船以厚重的装甲和先进的激光武器闻名。它们重视持久战和压倒性的火力。",
      "信仰与秩序是他们文明的支柱。"
    ],
    ships: [
      {
        name: "帝国号 (Imperial Issue)",
        class: "战列舰 (Battleship)",
        description: "艾玛帝国的象征性旗舰，仅授予最忠诚的皇家成员。",
        imageUrl: "/mars-4.webp"
      },
      {
        name: "先锋者级 (Paladin, Strategic Cruiser)",
        class: "战略巡洋舰 (Strategic Cruiser)",
        description: "拥有强大激光火力与自适应防御的战略级战舰。",
        imageUrl: "/mars-5.webp"
      },
      {
        name: "神使级泰坦 (Avatar Titan)",
        class: "泰坦 (Titan)",
        description: "黄金舰队的骄傲，能够执行末日审判。",
        imageUrl: "/mars-6.webp"
      }
    ],
    videoUrl: "https://pub-eve-ss-empire-eve.r2.dev/vedio-main-page/mars-video.mp4"
  },
  caldari: {
    id: 'caldari',
    name: '加达里合众国', // Caldari State
    shortName: 'CALDARI',
    tagline: '已被收购ovo', // Acquired ovo
    color: '#44ffdd', // Cyan
    glowColor: 'rgba(68, 255, 221, 0.8)',
    bgImage: 'https://picsum.photos/1920/1080?grayscale&blur=2',
    // 使用本地上传的加达里合众国图标 (WebP 格式)
    logo: '/jupiter-1.webp', 
    description: [
      "加达里合众国是一个企业精英统治的国家。国家由几个巨型企业驱动，这些企业主宰着日常生活的方方面面。",
      "加达里舰船偏爱护盾和导弹发射器。它们从极远的距离交战，在敌人靠近之前将其消灭。",
      "对企业的责任是最高美德。"
    ],
    ships: [
      {
        name: "娜迦级 (Naga, Battlecruiser)",
        class: "战列巡洋舰 (Battlecruiser)",
        description: "远程狙击与高爆导弹兼备的加达里主力舰船。",
        imageUrl: "/jupiter-4.webp"
      },
      {
        name: "希尔博拉斯 (Cerberus, Heavy Assault Cruiser)",
        class: "重型突击巡洋舰 (Heavy Assault Cruiser)",
        description: "以强大导弹火力和机动性著称的重型突击巡洋舰。",
        imageUrl: "/jupiter-5.webp"
      },
      {
        name: "渡鸦级 (Corax, Destroyer)",
        class: "驱逐舰 (Destroyer)",
        description: "新手与精英都青睐的多用途导弹驱逐舰。",
        imageUrl: "/jupiter-6.webp"
      }
    ],
    videoUrl: "https://pub-eve-ss-empire-eve.r2.dev/vedio-main-page/jupiter-video.mp4"
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
        name: "特里斯坦护卫舰 (Tristan, Frigate)",
        class: "护卫舰 (Frigate)",
        description: "以无人机战术和灵活机动著称的盖伦特经典护卫舰。",
        imageUrl: "/pluto-4.webp"
      },
      {
        name: "塔利亚后勤护卫舰 (Thalia, Logistics Frigate)",
        class: "后勤护卫舰 (Logistics Frigate)",
        description: "专为小规模舰队提供能量和护盾支援的后勤舰船。",
        imageUrl: "/pluto-5.webp"
      },
      {
        name: "阿特龙级截击舰 (Atron, Interceptor)",
        class: "截击舰 (Interceptor)",
        description: "高速灵活的截击舰，擅长追击与骚扰敌方目标。",
        imageUrl: "/pluto-6.webp"
      }
    ],
    videoUrl: "https://pub-eve-ss-empire-eve.r2.dev/vedio-main-page/pluto-video.mp4"
  }
};