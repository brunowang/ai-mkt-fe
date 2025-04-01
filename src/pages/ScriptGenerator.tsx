import React, { useState } from 'react';
import {
    Typography,
    Card,
    Form,
    Input,
    Upload,
    Button,
    Space,
    Toast,
    Spin,
    Divider,
} from '@douyinfe/semi-ui';
import { IconUpload, IconCamera, IconPulse } from '@douyinfe/semi-icons';
import { generateScript, ScriptResult } from '../components/apiService';

const ScriptGenerator: React.FC = () => {
    const { Title, Paragraph, Text } = Typography;
    const [loading, setLoading] = useState<boolean>(false);
    const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
    
    // 处理脚本生成表单提交
    const handleGenerateScript = async (values: any) => {
        setLoading(true);
        
        try {
            // 创建FormData对象用于发送文件和提示词
            const formData = new FormData();
            
            // 添加服装图片
            if (values.clothingImage && values.clothingImage.length > 0) {
                formData.append('clothingImage', values.clothingImage[0].fileInstance);
            }
            
            // 添加场景图片
            if (values.sceneImage && values.sceneImage.length > 0) {
                formData.append('sceneImage', values.sceneImage[0].fileInstance);
            }
            
            // 添加提示词
            formData.append('prompt', values.prompt);
            
            // 调用API服务
            const result = await generateScript(formData);
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
                <Form onSubmit={values => handleGenerateScript(values)}>
                    <Form.Upload
                        field="clothingImage"
                        label="服装图片"
                        action=""
                        accept="image/*"
                        dragIcon={
                            <div style={{ margin: 16, textAlign: 'center' }}>
                                <IconUpload size="extra-large" style={{ color: 'var(--semi-color-primary)' }} />
                                <div style={{ marginTop: 8, fontSize: 14, color: 'var(--semi-color-text-2)' }}>
                                    点击或拖拽上传服装图片
                                </div>
                            </div>
                        }
                        draggable
                        validate={(fieldValue) => {
                            if (!fieldValue || fieldValue.length === 0) {
                                return '请上传服装图片';
                            }
                        }}
                        triggerRender={({ preview }) => preview}
                    >
                        {({previewFile, files}) => (
                            <Upload.Preview type="image" listType="picture" files={files} />
                        )}
                    </Form.Upload>
                    
                    <Form.Upload
                        field="sceneImage"
                        label="场景图片"
                        action=""
                        accept="image/*"
                        dragIcon={
                            <div style={{ margin: 16, textAlign: 'center' }}>
                                <IconCamera size="extra-large" style={{ color: 'var(--semi-color-primary)' }} />
                                <div style={{ marginTop: 8, fontSize: 14, color: 'var(--semi-color-text-2)' }}>
                                    点击或拖拽上传场景图片
                                </div>
                            </div>
                        }
                        draggable
                        validate={(fieldValue) => {
                            if (!fieldValue || fieldValue.length === 0) {
                                return '请上传场景图片';
                            }
                        }}
                        triggerRender={({ preview }) => preview}
                    >
                        {({previewFile, files}) => (
                            <Upload.Preview type="image" listType="picture" files={files} />
                        )}
                    </Form.Upload>
                    
                    <Form.TextArea
                        field="prompt"
                        label="提示词"
                        placeholder="请输入提示词，例如：风格、主题、情感等关键词"
                        rows={4}
                        showClear
                        validate={(fieldValue) => {
                            if (!fieldValue) {
                                return '请输入提示词';
                            }
                        }}
                    />
                    
                    <div style={{ marginTop: 24, textAlign: 'center' }}>
                        <Space>
                            <Button type="primary" htmlType="submit" icon={<IconPulse />} loading={loading}>
                                生成脚本
                            </Button>
                            <Button type="tertiary" htmlType="reset">
                                重置
                            </Button>
                        </Space>
                    </div>
                </Form>
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
                        </Card>
                    ))}
                </Card>
            )}
        </div>
    );
};

export default ScriptGenerator;