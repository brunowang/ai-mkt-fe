import React, { useState, useEffect } from "react";
import { Layout, Typography, Card, List, Space, Spin, Empty, Button, Modal, Form } from "@douyinfe/semi-ui";
import { IconCalendarClock, IconPlusCircle } from "@douyinfe/semi-icons";
import { ApiPlan } from "@/api/plan";
import { Plan } from "@/api/plan/types";
import { ApiListData } from "@/api/types";

const PlanList: React.FC = () => {
    const { Title } = Typography;
    const [planList, setPlanList] = useState<Plan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [formApi, setFormApi] = useState<any>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const response = await ApiPlan.listPlan({ user_id: "123456" });
            
            if (response.isSucceeded && response.data) {
                const data = response.data as ApiListData<Plan>;
                setPlanList(data.list);
            } else {
                setError(response.mesg || "获取计划列表失败");
            }
        } catch (err) {
            console.error("获取计划列表失败:", err);
            setError("获取计划列表失败，请稍后重试");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchPlans();
    }, []);
    
    const handleCreatePlan = async () => {
        try {
            const values = await formApi.validate();
            setSubmitting(true);
            
            const response = await ApiPlan.createPlan({
                user_id: "123456",
                name: values.name
            });
            
            if (response.isSucceeded) {
                setVisible(false);
                fetchPlans();
                formApi.reset();
            } else {
                console.error("创建计划失败:", response.mesg);
            }
        } catch (err) {
            console.error("表单验证失败:", err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Layout style={{ padding: "20px", textAlign: "center" }}>
                <Layout.Content>
                    <Spin size="large" />
                </Layout.Content>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout style={{ padding: "20px" }}>
                <Layout.Content>
                    <Title heading={2}>计划列表</Title>
                    <div style={{ padding: "20px", color: "red" }}>{error}</div>
                </Layout.Content>
            </Layout>
        );
    }

    return (
        <Layout style={{ padding: "20px" }}>
            <Layout.Content>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <Title heading={2}>计划列表</Title>
                    <Button type="primary" icon={<IconPlusCircle />} onClick={() => setVisible(true)}>创建计划</Button>
                </div>
                {planList.length > 0 ? (
                    <List
                        grid={{ gutter: 16, span: 8 }}
                        dataSource={planList}
                        renderItem={item => (
                        <List.Item>
                            <Card
                                shadows="hover"
                                style={{ width: "100%" }}
                                headerLine={false}
                                header={
                                    <div style={{ padding: "12px 0" }}>
                                        <Title heading={5}>{item.name}</Title>
                                    </div>
                                }
                                bodyStyle={{ padding: "12px" }}
                            >
                                <div style={{ marginBottom: "8px" }}>
                                    <Space>
                                        <IconCalendarClock size="small" />
                                        <span>创建时间: {new Date(item.created_at).toLocaleString()}</span>
                                    </Space>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>用户ID: {item.user_id}</span>
                                    <span>ID: {item.id}</span>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            ) : (
                <Empty description="暂无计划数据" />
            )}
                
            <PlanModal 
                visible={visible}
                setVisible={setVisible}
                onSubmit={handleCreatePlan}
                submitting={submitting}
                setFormApi={setFormApi}
            />
            </Layout.Content>
        </Layout>
    );
};

// 创建计划的模态框组件
const PlanModal: React.FC<{
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onSubmit: () => void;
    submitting: boolean;
    setFormApi: (api: any) => void;
}> = ({ visible, setVisible, onSubmit, submitting, setFormApi }) => {
    return (
        <Modal
            title="创建新计划"
            visible={visible}
            onCancel={() => setVisible(false)}
            maskClosable={false}
            footer={null}
        >
            <Form onSubmit={onSubmit} getFormApi={setFormApi}>
                <Form.Input
                    field="name"
                    label="计划名称"
                    placeholder="请输入计划名称"
                    rules={[
                        { required: true, message: "请输入计划名称" }
                    ]}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
                    <Button type="tertiary" onClick={() => setVisible(false)} style={{ marginRight: "12px" }}>取消</Button>
                    <Button type="primary" htmlType="submit" loading={submitting}>确定</Button>
                </div>
            </Form>
        </Modal>
    );
};

export default PlanList;
