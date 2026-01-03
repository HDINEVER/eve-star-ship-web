import { FactionData } from './types';

// ============================================
// 3D 模型接口规范 (Interface Specification)
// ============================================
// Base URL: https://eve-ss-empire-eve.pages.dev/
// 
// URL 参数：
//   - ship: 飞船唯一标识符 (必需)
//   - faction: 势力标识符 (可选，用于主题色)
//
// 示例：https://eve-ss-empire-eve.pages.dev/?ship=imperial&faction=amarr
//
// 飞船 ID 映射表 (Ship ID Mapping):
// ┌─────────────┬──────────────┬─────────────────────────────────┐
// │ Faction     │ Ship ID      │ Ship Name                       │
// ├─────────────┼──────────────┼─────────────────────────────────┤
// │ amarr       │ imperial     │ 帝国号 (Imperial Issue)          │
// │ amarr       │ paladin      │ 先锋者级 (Paladin)               │
// │ amarr       │ avatar       │ 神使级泰坦 (Avatar Titan)        │
// ├─────────────┼──────────────┼─────────────────────────────────┤
// │ caldari     │ naga         │ 娜迦级 (Naga)                    │
// │ caldari     │ cerberus     │ 希尔博拉斯 (Cerberus)            │
// │ caldari     │ corax        │ 渡鸦级 (Corax)                   │
// ├─────────────┼──────────────┼─────────────────────────────────┤
// │ gallente    │ tristan      │ 特里斯坦 (Tristan)               │
// │ gallente    │ thalia       │ 塔利亚 (Thalia)                  │
// │ gallente    │ atron        │ 阿特龙级 (Atron)                 │
// └─────────────┴──────────────┴─────────────────────────────────┘
// ============================================

// 3D 模型基础 URL
const MODEL_BASE_URL = 'https://eve-ss-empire-eve.pages.dev/';

// 生成模型 URL 的辅助函数
const getModelUrl = (shipId: string, factionId: string): string => {
  return `${MODEL_BASE_URL}?ship=${shipId}&faction=${factionId}`;
};

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
    // 使用透明背景的艾玛帝国图标
    logo: '/Gemini_Generated_Image_k65g8yk65g8yk65g.png', 
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
        imageUrl: "/mars-4.webp",
        modelUrl: getModelUrl('imperial', 'amarr')
      },
      {
        name: "先锋者级 (Paladin)",
        class: "掠夺舰 (Marauder)",
        description: "拥有强大激光火力与自适应防御的战略级战舰。",
        imageUrl: "/mars-5.webp",
        modelUrl: getModelUrl('paladin', 'amarr')
      },
      {
        name: "神使级泰坦 (Avatar Titan)",
        class: "泰坦 (Titan)",
        description: "黄金舰队的骄傲，能够执行末日审判。",
        imageUrl: "/mars-6.webp",
        modelUrl: getModelUrl('avatar', 'amarr')
      }
    ],
    videoUrl: "https://pub-ef918f4135654b1caa2833736c639ae1.r2.dev/vedio-main-page/mars-video.mp4"
  },
  caldari: {
    id: 'caldari',
    name: '加达里合众国', // Caldari State
    shortName: 'CALDARI',
    tagline: '已被收购 ovo', // Acquired ovo
    color: '#44ffdd', // Cyan
    glowColor: 'rgba(68, 255, 221, 0.8)',
    bgImage: 'https://picsum.photos/1920/1080?grayscale&blur=2',
    // 使用透明背景的加达里合众国图标
    logo: '/Gemini_Generated_Image_gcpjuwgcpjuwgcpj.png', 
    description: [
      "加达里合众国是一个企业精英统治的国家。国家由几个巨型企业驱动，这些企业主宰着日常生活的方方面面。",
      "加达里舰船偏爱护盾和导弹发射器。它们从极远的距离交战，在敌人靠近之前将其消灭。",
      "对企业的责任是最高美德。"
    ],
    ships: [
      {
        name: "娜迦级 (Naga)",
        class: "战列巡洋舰 (Battlecruiser)",
        description: "远程狙击与高爆导弹兼备的加达里主力舰船。",
        imageUrl: "/jupiter-4.webp",
        modelUrl: getModelUrl('naga', 'caldari')
      },
      {
        name: "希尔博拉斯 (Cerberus)",
        class: "重型突击巡洋舰 (Heavy Assault Cruiser)",
        description: "以强大导弹火力和机动性著称的重型突击巡洋舰。",
        imageUrl: "/jupiter-5.webp",
        modelUrl: getModelUrl('cerberus', 'caldari')
      },
      {
        name: "渡鸦级 (Corax)",
        class: "驱逐舰 (Destroyer)",
        description: "新手与精英都青睐的多用途导弹驱逐舰。",
        imageUrl: "/jupiter-6.webp",
        modelUrl: getModelUrl('corax', 'caldari')
      }
    ],
    videoUrl: "https://pub-ef918f4135654b1caa2833736c639ae1.r2.dev/vedio-main-page/jupiter-video.mp4"
  },
  gallente: {
    id: 'gallente',
    name: '盖伦特联邦', // Gallente Federation
    shortName: 'GALLENTE',
    tagline: '你要来点玛娜饮料吗', // Want some Mana drink?
    color: '#a855f7', // Purple
    glowColor: 'rgba(168, 85, 247, 0.8)',
    bgImage: 'https://picsum.photos/1920/1080?grayscale&blur=2',
    // 使用透明背景的盖伦特联邦图标
    logo: '/Gemini_Generated_Image_vko8khvko8khvko8.png', 
    description: [
      "盖伦特联邦是新伊甸中唯一的真正民主国家。作为文化的大熔炉，他们最看重个人自由和艺术表达。",
      "盖伦特舰船依赖无人机和混合炮。它们是具有主动装甲修复能力的近距离搏斗者。",
      "自由是所有智慧生物的权利。"
    ],
    ships: [
      {
        name: "特里斯坦护卫舰 (Tristan)",
        class: "护卫舰 (Frigate)",
        description: "以无人机战术和灵活机动著称的盖伦特经典护卫舰。",
        imageUrl: "/pluto-4.webp",
        modelUrl: getModelUrl('tristan', 'gallente')
      },
      {
        name: "塔利亚后勤护卫舰 (Thalia)",
        class: "后勤护卫舰 (Logistics Frigate)",
        description: "专为小规模舰队提供能量和护盾支援的后勤舰船。",
        imageUrl: "/pluto-5.webp",
        modelUrl: getModelUrl('thalia', 'gallente')
      },
      {
        name: "阿特龙级截击舰 (Atron)",
        class: "截击舰 (Interceptor)",
        description: "高速灵活的截击舰，擅长追击与骚扰敌方目标。",
        imageUrl: "/pluto-6.webp",
        modelUrl: getModelUrl('atron', 'gallente')
      }
    ],
    videoUrl: "https://pub-ef918f4135654b1caa2833736c639ae1.r2.dev/vedio-main-page/pluto-video.mp4"
  }
};  glow: 'rgba(68, 255, 221, 0.5)',
    background: '#001a18'
  },
  gallente: {
    primary: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.5)',
    background: '#0f001a'
  }
};
```

### 3. 主应用组件

```typescript
// src/App.tsx
import { useShipParams } from './hooks/useShipParams';
import { SHIP_CONFIGS, FACTION_THEMES } from './config/ships';
import { ShipViewer } from './components/ShipViewer';

function App() {
  const { shipId, factionId } = useShipParams();
  
  const shipConfig = SHIP_CONFIGS[shipId] || SHIP_CONFIGS['imperial'];
  const theme = FACTION_THEMES[factionId] || FACTION_THEMES['amarr'];
  
  return (
    <div style={{ background: theme.background }}>
      <ShipViewer 
        modelPath={shipConfig.modelPath}
        scale={shipConfig.scale}
        cameraDistance={shipConfig.cameraDistance}
        themeColor={theme.primary}
        glowColor={theme.glow}
      />
      <h1 style={{ color: theme.primary }}>{shipConfig.name}</h1>
    </div>
  );
}
```

## Cloudflare Pages 配置

### 允许 iframe 嵌入

在 `public/_headers` 文件中添加：

```
/*
  X-Frame-Options: ALLOWALL
  Content-Security-Policy: frame-ancestors 'self' https://*.pages.dev https://eve-star-ship-web.pages.dev http://localhost:*
```

## 测试URL示例

```
# 艾玛帝国 - 帝国号
https://eve-ss-empire-eve.pages.dev/?ship=imperial&faction=amarr

# 加达里 - 娜迦级
https://eve-ss-empire-eve.pages.dev/?ship=naga&faction=caldari

# 盖伦特 - 特里斯坦
https://eve-ss-empire-eve.pages.dev/?ship=tristan&faction=gallente
```

## 通信扩展（可选）

如果需要主网站与3D模型页面双向通信，可以使用 `postMessage`：

```typescript
// 3D 模型项目 - 接收消息
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://eve-star-ship-web.pages.dev') return;
  
  const { type, payload } = event.data;
  if (type === 'CHANGE_SHIP') {
    // 切换飞船模型
    loadShipModel(payload.shipId);
  }
});

// 3D 模型项目 - 发送消息给父窗口
window.parent.postMessage({
  type: 'MODEL_LOADED',
  payload: { shipId: 'imperial' }
}, '*');
```
