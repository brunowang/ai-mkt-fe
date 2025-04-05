import React, { useState } from 'react';
import {
    Typography,
    Card,
    Upload,
    Button,
    Space,
    Toast,
    Spin,
    Divider,
    TextArea,
} from '@douyinfe/semi-ui';
import { IconUpload, IconCamera, IconPulse } from '@douyinfe/semi-icons';
import { generateVideoScript, VideoScriptResult } from '../components/apiService';

const ScriptGenerator: React.FC = () => {
    const { Title, Paragraph, Text } = Typography;
    const [loading, setLoading] = useState<boolean>(false);
    const [scriptResult, setScriptResult] = useState<VideoScriptResult | null>(null);
    const [formValues, setFormValues] = useState({
        clothingImage: '',
        sceneImage: '',
        prompt: '',
        clothingImageError: '',
        sceneImageError: '',
        promptError: '',
    });
    
    // 处理脚本生成表单提交
const handleGenerateScript = async () => {
        // 表单验证
        let hasError = false;
        const newFormValues = {...formValues};

        if (!formValues.clothingImage) {
            newFormValues.clothingImageError = '请上传服装图片';
            hasError = true;
        } else {
            newFormValues.clothingImageError = '';
        }

        if (!formValues.sceneImage) {
            newFormValues.sceneImageError = '请上传场景图片';
            hasError = true;
        } else {
            newFormValues.sceneImageError = '';
        }

        if (!formValues.prompt) {
            newFormValues.promptError = '请输入提示词';
            hasError = true;
        } else {
            newFormValues.promptError = '';
        }

        setFormValues(newFormValues);

        if (hasError) {
            return;
        }
        
        setLoading(true);
        
        try {
            // 调用API服务 - 按照函数定义传递三个单独的参数
            const result = await generateVideoScript(
                formValues.clothingImage,
                formValues.sceneImage,
                formValues.prompt
            );
            setScriptResult(result);
            Toast.success('脚本生成成功！');
        } catch (error) {
            Toast.error('生成失败，请稍后重试');
            console.error('生成脚本失败:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div style={{ padding: '20px' }}>
            <Title heading={2}>拍摄脚本生成</Title>
            <Card style={{ maxWidth: 800, margin: '20px 0' }}>
                <div style={{ padding: '16px 0' }}>
                    <div style={{ marginBottom: '16px' }}>
                        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>服装图片</div>
                        <Upload
                            action=""
                            accept="image/*"
                            limit={1}
                            dragIcon={
                                <div style={{ margin: 16, textAlign: 'center' }}>
                                    <IconUpload size="extra-large" style={{ color: 'var(--semi-color-primary)' }} />
                                    <div style={{ marginTop: 8, fontSize: 14, color: 'var(--semi-color-text-2)' }}>
                                        点击或拖拽上传服装图片
                                    </div>
                                </div>
                            }
                            draggable
                            customRequest={({ fileInstance, onSuccess }) => {
                                // 文件转Base64字符串
                                const reader = new FileReader();
                                reader.readAsDataURL(fileInstance);
                                reader.onload = () => {
                                    // 保存Base64字符串
                                    setFormValues(prev => ({
                                        ...prev,
                                        clothingImage: reader.result as string
                                    }));
                                    setTimeout(() => {
                                        onSuccess({ response: '上传成功' });
                                    }, 100);
                                };
                            }}
                            onRemove={() => {
                                setFormValues(prev => ({ ...prev, clothingImage: '' }));
                                return true;
                            }}
                            showUploadList={true}
                        >
                        </Upload>
                        {formValues.clothingImageError && (
                            <div style={{ color: 'var(--semi-color-danger)', fontSize: '12px', marginTop: '4px' }}>
                                {formValues.clothingImageError}
                            </div>
                        )}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>场景图片</div>
                        <Upload
                            action=""
                            accept="image/*"
                            limit={1}
                            dragIcon={
                                <div style={{ margin: 16, textAlign: 'center' }}>
                                    <IconCamera size="extra-large" style={{ color: 'var(--semi-color-primary)' }} />
                                    <div style={{ marginTop: 8, fontSize: 14, color: 'var(--semi-color-text-2)' }}>
                                        点击或拖拽上传场景图片
                                    </div>
                                </div>
                            }
                            draggable
                            customRequest={({ fileInstance, onSuccess }) => {
                                // 文件转Base64字符串
                                const reader = new FileReader();
                                reader.readAsDataURL(fileInstance);
                                reader.onload = () => {
                                    // 保存Base64字符串
                                    setFormValues(prev => ({
                                        ...prev,
                                        sceneImage: reader.result as string
                                    }));
                                    setTimeout(() => {
                                        onSuccess({ response: '上传成功' });
                                    }, 100);
                                };
                            }}
                            onRemove={() => {
                                setFormValues(prev => ({ ...prev, sceneImage: '' }));
                                return true;
                            }}
                            showUploadList={true}
                        >
                        </Upload>
                        {formValues.sceneImageError && (
                            <div style={{ color: 'var(--semi-color-danger)', fontSize: '12px', marginTop: '4px' }}>
                                {formValues.sceneImageError}
                            </div>
                        )}
                    </div>
                    
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>提示词</div>
                        <TextArea
                            placeholder="请输入提示词，例如：风格、主题、情感等关键词"
                            rows={4}
                            showClear
                            value={formValues.prompt}
                            onChange={(value) => setFormValues(prev => ({ ...prev, prompt: value }))}
                        />
                        {formValues.promptError && (
                            <div style={{ color: 'var(--semi-color-danger)', fontSize: '12px', marginTop: '4px' }}>
                                {formValues.promptError}
                            </div>
                        )}
                    </div>
                    
                    <div style={{ marginTop: 24, textAlign: 'center' }}>
                        <Space>
                            <Button 
                                type="primary" 
                                icon={<IconPulse />} 
                                loading={loading}
                                onClick={handleGenerateScript}
                            >
                                生成脚本
                            </Button>
                            <Button 
                                type="tertiary" 
                                onClick={() => setFormValues({
                                    clothingImage: '',
                                    sceneImage: '',
                                    prompt: '',
                                    clothingImageError: '',
                                    sceneImageError: '',
                                    promptError: ''
                                })}
                            >
                                重置
                            </Button>
                        </Space>
                    </div>
                </div>
            </Card>
            
            {loading && (
                <Card style={{ maxWidth: 800, margin: '20px 0', textAlign: 'center', padding: '40px 0' }}>
                    <Spin size="large" />
                    <div style={{ marginTop: 16, color: 'var(--semi-color-text-2)' }}>
                        正在生成拍摄脚本，请稍候...
                    </div>
                </Card>
            )}
            
            {!loading && scriptResult && (
                <Card style={{ maxWidth: 800, margin: '20px 0' }}>
                    <Title heading={3}>{scriptResult.title}</Title>
                    <Paragraph>
                        <Text>{scriptResult.content}</Text>
                    </Paragraph>
                    
                    <Divider margin='12px' align='left'>场景分镜</Divider>
                    
                    {scriptResult.scenes.map((scene, index) => (
                        <Card style={{ marginBottom: 16 }} key={index}>
                            <Title heading={5}>场景 {index + 1}</Title>
                            <Paragraph>
                                <Text strong>场景描述：</Text>
                                <Text>{scene.description}</Text>
                            </Paragraph>
                            
                            {scene.dialogue && (
                                <Paragraph>
                                    <Text strong>对白/旁白：</Text>
                                    <Text>{scene.dialogue}</Text>
                                </Paragraph>
                            )}
                            
                            {scene.actions && (
                                <Paragraph>
                                    <Text strong>拍摄动作：</Text>
                                    <Text>{scene.actions}</Text>
                                </Paragraph>
                            )}
                            
                            {scene.shotType && (
                                <Paragraph>
                                    <Text strong>镜头类型：</Text>
                                    <Text>{scene.shotType}</Text>
                                </Paragraph>
                            )}
                            
                            {scene.duration && (
                                <Paragraph>
                                    <Text strong>建议时长：</Text>
                                    <Text>{scene.duration}</Text>
                                </Paragraph>
                            )}
                        </Card>
                    ))}
                    
                    {scriptResult.tips && (
                        <Card style={{ marginTop: 16, marginBottom: 16 }}>
                            <Title heading={5}>拍摄提示</Title>
                            <Paragraph>
                                <Text>{scriptResult.tips}</Text>
                            </Paragraph>
                        </Card>
                    )}
                    
                    {scriptResult.equipment && scriptResult.equipment.length > 0 && (
                        <Card style={{ marginTop: 16 }}>
                            <Title heading={5}>推荐设备</Title>
                            <Paragraph>
                                <ul>
                                    {scriptResult.equipment.map((item, index) => (
                                        <li key={index}><Text>{item}</Text></li>
                                    ))}
                                </ul>
                            </Paragraph>
                        </Card>
                    )}
                </Card>
            )}
        </div>
    );
};

export default ScriptGenerator;