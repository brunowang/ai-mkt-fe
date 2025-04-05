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

// 脚本生成结果接口定义
export interface ScriptResult {
  title: string;
  content: string;
  scenes: Array<{
    description: string;
    dialogue?: string;
    actions?: string;
  }>;
}

// 视频脚本生成结果接口定义
export interface VideoScriptResult {
  title: string;
  content: string;
  scenes: Array<{
    description: string;
    dialogue?: string;
    actions?: string;
    shotType?: string;
    duration?: string;
  }>;
  tips?: string; // 视频拍摄提示
  equipment?: string[]; // 推荐使用的设备
}

// 图片上传响应接口定义
export interface ImageUploadResult {
  url: string;
  fileName: string;
  fileSize: number;
  uploadTime: string;
}

// 导入模拟数据服务
import { getMockVideos, getMockUserProfile, getMockScriptResult, getMockImageUpload, getMockVideoScriptResult } from './mockService';

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

/**
 * 生成拍摄脚本
 * @param formData 包含服装图片、场景图片和提示词的表单数据
 * @returns Promise<ScriptResult>
 */
export async function generateScript(formData: FormData): Promise<ScriptResult> {
  // 如果使用模拟数据，则返回模拟数据
  if (USE_MOCK) {
    return getMockScriptResult();
  }
  
  // 否则调用实际API
  const options: RequestInit = {
    method: 'POST',
    body: formData,
    headers: {}
  };
  
  return request<ScriptResult>('/generate/script', options);
}

/**
 * 上传图片
 * @param name 文件名
 * @param base64 图片的base64编码
 * @returns Promise<ImageUploadResult>
 */
export async function uploadImage(name: string, base64: string): Promise<ImageUploadResult> {
  // 如果使用模拟数据，则返回模拟数据
  if (USE_MOCK) {
    return getMockImageUpload();
  }
  
  // 否则调用实际API
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify({ name, base64 }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  return request<ImageUploadResult>('/upload/image', options);
}

/**
 * 生成视频拍摄脚本
 * @param clothingImage 服装图片（Base64字符串或File对象）
 * @param sceneImage 场景图片（Base64字符串或File对象）
 * @param prompt 用户提示词
 * @returns Promise<VideoScriptResult>
 */
export async function generateVideoScript(
  clothingImage: string | File,
  sceneImage: string | File,
  prompt: string
): Promise<VideoScriptResult> {
  // 如果使用模拟数据，则返回模拟数据
  if (USE_MOCK) {
    return getMockVideoScriptResult();
  }
  
  // 准备请求数据
  const data: any = {
    prompt: prompt
  };
  
  // 处理服装图片
  if (typeof clothingImage === 'string') {
    // Base64字符串
    data.clothingImage = clothingImage;
  } else {
    // 文件对象需要转换为Base64
    data.clothingImage = await fileToBase64(clothingImage);
  }
  
  // 处理场景图片
  if (typeof sceneImage === 'string') {
    // Base64字符串
    data.sceneImage = sceneImage;
  } else {
    // 文件对象需要转换为Base64
    data.sceneImage = await fileToBase64(sceneImage);
  }
  
  // 调用实际API
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  return request<VideoScriptResult>('/generate/video-script', options);
}

/**
 * 辅助函数：将File对象转换为Base64字符串
 * @param file 文件对象
 * @returns Promise<string> Base64字符串
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}