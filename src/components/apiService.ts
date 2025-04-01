// apiService.ts - 封装与后端通信的接口

// 视频数据接口定义
export interface Video {
  id: number;
  title: string;
  cover: string;
  author: string;
  duration: string;
  views: string;
  likes: number;
  comments: number;
  time: string;
  tags: string[];
}

// 用户个人资料接口定义
export interface UserProfile {
  username: string;
  email: string;
  registerDate: string;
  status: string;
  stats: {
    videos: string;
    likes: string;
    comments: string;
    watchTime: string;
  };
  avatar: string;
}

// 导入模拟数据服务
import { getMockVideos, getMockUserProfile } from './mockService';

// 判断是否使用模拟数据（开发环境）
// 实际项目中可以根据环境变量来判断
const USE_MOCK = true; // 设置为true表示使用模拟数据，false表示使用实际API

// API基础URL，实际项目中应从环境变量获取
const BASE_URL = 'https://api.example.com'; // 这里需要替换为实际的API地址

/**
 * 通用请求处理函数
 * @param endpoint API路径
 * @param options 请求选项
 * @returns Promise<T>
 */
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  const config = {
    ...options,
    headers,
  };
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`请求失败: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API请求错误:', error);
    throw error;
  }
}

/**
 * 获取视频列表
 * @returns Promise<Video[]>
 */
export async function getVideos(): Promise<Video[]> {
  // 如果使用模拟数据，则返回模拟数据
  if (USE_MOCK) {
    return getMockVideos();
  }
  // 否则调用实际API
  return request<Video[]>('/videos');
}

/**
 * 获取用户个人资料
 * @returns Promise<UserProfile>
 */
export async function getUserProfile(): Promise<UserProfile> {
  // 如果使用模拟数据，则返回模拟数据
  if (USE_MOCK) {
    return getMockUserProfile();
  }
  // 否则调用实际API
  return request<UserProfile>('/user/profile');
}