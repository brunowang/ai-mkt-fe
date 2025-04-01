// mockService.ts - 提供模拟数据用于本地开发和测试
import { Video, UserProfile } from './apiService';

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