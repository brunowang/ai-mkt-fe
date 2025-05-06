import React, { useState, useEffect } from "react";
import { Layout, Typography, Card, List, Space, Spin, Empty } from "@douyinfe/semi-ui";
import { IconCalendarClock } from "@douyinfe/semi-icons";
import { ApiPlan } from "@/api/plan";
import { Plan } from "@/api/plan/types";
import { ApiListData } from "@/api/types";

const PlanList: React.FC = () => {
    const { Title } = Typography;
    const [planList, setPlanList] = useState<Plan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
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

        fetchPlans();
    }, []);

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
                <Title heading={2}>计划列表</Title>
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
            </Layout.Content>
        </Layout>
    );
};

export default PlanList;
