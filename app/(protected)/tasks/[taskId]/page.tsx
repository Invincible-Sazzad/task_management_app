import TaskDetailClient from "./TaskDetailClient";

type Props = {
  params: Promise<{
    taskId: string;
  }>;
};

export default async function TaskDetailPage({ params }: Props) {
  const { taskId } = await params;

  return <TaskDetailClient taskId={taskId} />;
}