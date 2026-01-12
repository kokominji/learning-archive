import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../lib/constants";

type Todo = {
  id: number;
  content: string;
  isDone: boolean;
};

async function fetchTodos() {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) throw new Error("todo fetch failed");
  return (await response.json()) as Todo[];
}

async function addTodo(content: string) {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, isDone: false }),
  });
  if (!response.ok) throw new Error("todo create failed");
  return (await response.json()) as Todo;
}

async function toggleTodo(todo: Todo) {
  const response = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isDone: !todo.isDone }),
  });
  if (!response.ok) throw new Error("todo toggle failed");
  return (await response.json()) as Todo;
}

export default function TodoListPage() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const handleAdd = () => {
    const content = prompt("할 일을 입력하세요");
    if (!content) return;
    createMutation.mutate(content);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h1>Todo 목록</h1>
      <button onClick={handleAdd} disabled={createMutation.isPending}>
        {createMutation.isPending ? "추가 중..." : "새 Todo 추가"}
      </button>
    </div>
  );
}
