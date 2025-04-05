// mockService.ts - 提供模拟数据用于本地开发和测试
import { Video, UserProfile, ScriptResult, ImageUploadResult, VideoScriptResult } from './apiService';

/**
 * 模拟视频数据
 */
export const mockVideos: Video[] = [
  {
    id: 1,
    title: '如何使用React和Semi Design构建现代化UI',
    cover: 'https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg',
    author: 'Bruno Wang',
    duration: '15:32',
    views: '2.5万',
    likes: 326,
    comments: 42,
    time: '2024-05-01',
    tags: ['React', 'Semi UI', '前端开发']
  },
  {
    id: 2,
    title: '前端工程化实践 - 从零搭建React开发环境',
    cover: 'https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg',
    author: 'Bruno Wang',
    duration: '23:17',
    views: '1.8万',
    likes: 258,
    comments: 36,
    time: '2024-04-25',
    tags: ['工程化', 'Webpack', 'Vite']
  },
  {
    id: 3,
    title: 'React Hooks深入解析',
    cover: 'https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg',
    author: 'Bruno Wang',
    duration: '18:45',
    views: '3.2万',
    likes: 476,
    comments: 58,
    time: '2024-04-15',
    tags: ['React', 'Hooks', '状态管理']
  }
];

/**
 * 模拟用户个人资料数据
 */
export const mockUserProfile: UserProfile = {
  username: 'Bruno Wang',
  email: 'bruno@example.com',
  registerDate: '2023-06-01',
  status: '正常',
  stats: {
    videos: '12 个',
    likes: '253',
    comments: '42',
    watchTime: '186 小时'
  },
  avatar: 'https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg'
};

/**
 * 模拟网络延迟
 * @param ms 延迟时间（毫秒）
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 模拟获取视频列表API
 * @returns Promise<Video[]>
 */
export async function getMockVideos(): Promise<Video[]> {
  // 模拟网络延迟
  await delay(800);
  return mockVideos;
}

/**
 * 模拟获取用户个人资料API
 * @returns Promise<UserProfile>
 */
export async function getMockUserProfile(): Promise<UserProfile> {
  // 模拟网络延迟
  await delay(600);
  return mockUserProfile;
}

/**
 * 模拟脚本生成结果
 * @returns Promise<ScriptResult>
 */
export async function getMockScriptResult(): Promise<ScriptResult> {
  // 模拟网络延迟
  await delay(1500);
  
  // 返回模拟数据
  return {
    title: "夏日轻盈连衣裙海滩随性漫步",
    content: "本脚本展示了一位年轻女性穿着轻盈夏日连衣裙在海滩上的惬意漫步场景。通过自然光线和慢节奏拍摄，突出服装的飘逸感和与海滩环境的和谐融合。",
    scenes: [
      {
        description: "女主角穿着白色连衣裙，站在海滩边缘，迎着微风",
        actions: "慢镜头展示裙摆在风中飘动，女主角从左至右漫步"
      },
      {
        description: "女主角走到一块礁石旁，坐下欣赏远处海景",
        actions: "中景拍摄，突出服装与自然环境的和谐"
      },
      {
        description: "夕阳西下，女主角面对大海，裙子在金色阳光下闪耀",
        dialogue: "生活就像海洋，只有意志坚强的人，才能到达彼岸"
      }
    ]
  };
}

/**
 * 模拟图片上传响应
 * @returns Promise<ImageUploadResult>
 */
export async function getMockImageUpload(): Promise<ImageUploadResult> {
  // 模拟网络延迟
  await delay(1000);
  
  // 返回模拟数据
  return {
    url: "https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/sample-image.jpg",
    fileName: "sample-image.jpg",
    fileSize: 1024 * 1024 * 2, // 模拟2MB大小
    uploadTime: new Date().toISOString()
  };
}

/**
 * 模拟视频脚本生成结果
 * @returns Promise<VideoScriptResult>
 */
export async function getMockVideoScriptResult(): Promise<VideoScriptResult> {
  // 模拟网络延迟
  await delay(1800);
  
  // 返回模拟数据
  return {
    title: "都市职场女性街拍视频",
    content: "本脚本展现了一位职场女性在城市街道中展示时尚职业装的场景。通过动态拍摄和街景元素，突出服装的专业感和都市氛围的融合。",
    scenes: [
      {
        description: "早晨，女主角穿着深蓝色职业套装，站在高楼前，准备开始新的一天",
        shotType: "全景到特写过渡",
        actions: "从远处拍摄，镜头逐渐拉近，展示女主角自信的表情和服装细节",
        duration: "10秒"
      },
      {
        description: "女主角行走在繁忙的街道上，周围是匆忙的上班族",
        shotType: "跟随拍摄",
        actions: "稳定器跟随拍摄，展示人物行走姿态和服装在动态中的效果",
        duration: "15秒"
      },
      {
        description: "午间休息，女主角在城市广场的咖啡座位上",
        dialogue: "都市生活节奏快，但也要记得享受每一刻的美好",
        shotType: "侧面中景",
        actions: "拍摄女主角品尝咖啡的优雅姿态，突出服装与都市环境的和谐",
        duration: "12秒"
      },
      {
        description: "傍晚，夕阳下的摩天大楼前，女主角回望一天的忙碌",
        shotType: "剪影效果",
        actions: "逆光拍摄，创造剪影效果，展现都市职场女性的坚毅形象",
        duration: "8秒"
      }
    ],
    tips: "拍摄时注意捕捉城市特有的元素，如高楼、交通和人流，以增强都市感。尽量选择早晚光线较柔和的时间段拍摄。",
    equipment: ["手机或单反相机", "稳定器", "广角镜头", "偏振滤镜（减少城市玻璃反光）"]
  };
}