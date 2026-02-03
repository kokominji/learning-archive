import React, { useMemo, useState, useCallback } from "react";
import { Button, CheckTree } from "rsuite";
import type { TreeNode } from "rsuite/CheckTree"; // 타입 경로가 버전에 따라 다를 수 있어요.

type MyNode = TreeNode & {
  // 필요하면 커스텀 필드 추가
  id?: string;
  meta?: { [k: string]: any };
};

const data: MyNode[] = [
  {
    value: "A",
    label: "A",
    children: [
      { value: "A-1", label: "A-1", meta: { desc: "alpha-1" } },
      { value: "A-2", label: "A-2", meta: { desc: "alpha-2" } },
    ],
  },
  {
    value: "B",
    label: "B",
    children: [{ value: "B-1", label: "B-1", meta: { desc: "beta-1" } }],
  },
];

function buildValueMap(nodes: MyNode[]) {
  const map = new Map<string | number, MyNode>();
  const dfs = (arr: MyNode[]) => {
    arr.forEach((n) => {
      map.set(n.value, n);
      if (n.children?.length) dfs(n.children as MyNode[]);
    });
  };
  dfs(nodes);
  return map;
}

export default function CheckTreeDemo() {
  // (1) 체크된 value 목록 (다중 체크)
  const [checkedValues, setCheckedValues] = useState<Array<string | number>>(
    [],
  );

  // (3) 라벨 클릭 시 “그 노드 정보만”
  const [clickedItem, setClickedItem] = useState<MyNode | null>(null);

  // (1) 버튼 클릭 시 “체크된 데이터들 정보를 한번에”
  const [batchOutput, setBatchOutput] = useState<MyNode[]>([]);

  const valueMap = useMemo(() => buildValueMap(data), []);

  // 공식: onChange(values) :contentReference[oaicite:4]{index=4}
  const handleChange = useCallback((values: Array<string | number>) => {
    setCheckedValues(values);
  }, []);

  // 버튼 눌러서 한 번에 출력 (1)
  const handlePrintChecked = () => {
    const items = checkedValues
      .map((v) => valueMap.get(v))
      .filter(Boolean) as MyNode[];

    setBatchOutput(items);
    console.log("checked items:", items);
  };

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
      <CheckTree
        data={data}
        value={checkedValues}
        onChange={handleChange}
        // 공식: renderTreeNode(item) :contentReference[oaicite:5]{index=5}
        renderTreeNode={(item: MyNode) => {
          return (
            // ✅ (2) 라벨 클릭 시 체크되지 않게: stopPropagation
            // ✅ (3) 라벨 클릭 시 해당 item 정보만 출력(상태로 보관)
            <span
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation(); // 핵심: 라벨 클릭이 체크 토글로 전파되지 않게
                setClickedItem(item);
                console.log("clicked item:", item);
              }}
            >
              {item.label}
            </span>
          );
        }}
        // 참고: onSelect도 존재함(노드 선택 이벤트) :contentReference[oaicite:6]{index=6}
        // 하지만 여기서는 “라벨 클릭만” 확실히 잡으려고 renderTreeNode에서 직접 처리
      />

      <div style={{ display: "flex", gap: 8 }}>
        <Button appearance="primary" onClick={handlePrintChecked}>
          선택된(체크된) 항목 한번에 출력
        </Button>
        <Button
          appearance="subtle"
          onClick={() => {
            setCheckedValues([]);
            setBatchOutput([]);
          }}
        >
          체크 초기화
        </Button>
      </div>

      <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>
          (3) 라벨 클릭한 대상 1개 정보
        </div>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
          {clickedItem
            ? JSON.stringify(clickedItem, null, 2)
            : "라벨을 클릭해보세요."}
        </pre>
      </div>

      <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>
          (1) 체크된 데이터들 “일괄 출력”
        </div>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
          {batchOutput.length
            ? JSON.stringify(batchOutput, null, 2)
            : "버튼을 눌러 출력해보세요."}
        </pre>
      </div>
    </div>
  );
}
