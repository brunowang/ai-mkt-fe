// mockService.ts - 提供模拟数据用于本地开发和测试
import { Video, UserProfile, ScriptResult } from './apiService';

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
        description: "远景：模特从远处沙滩缓缓走来，裙摆随海风轻轻飘动",
        actions: "摄影师使用广角镜头，从低角度拍摄，捕捉蓝天白云和金色沙滩的辽阔背景。"
      },
      {
        description: "中景：模特面向大海，裙子随风舞动",
        actions: "使用慢动作拍摄，突出裙子面料的轻盈质感和飘逸感。"
      },
      {
        description: "特写：裙子面料与肌肤的贴合与分离",
        dialogue: "旁白：'夏日的微风，轻盈的触感，尽在这款海滨系列连衣裙中'",
        actions: "使用自然光线，拍摄模特转身时裙摆的动态美感。"
      },
      {
        description: "收尾：模特漫步远去，融入到夕阳与大海的背景中",
        dialogue: "旁白：'无论海滨度假还是城市漫步，尽显优雅气质'",
        actions: "逐渐拉远镜头，展现整体环境与服装的和谐统一。"
      }
    ]
  };
}