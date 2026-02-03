import { CheckTree } from "rsuite";
// import { MockTreeData } from "./mock";
import { useEffect, useRef, useState } from "react";
import "rsuite/CheckTree/styles/index.css";

export const Example = () => {
  const [checkedValuesState, setCheckedValuesState] = useState<
    (string | number)[]
  >([]); //체크박스
  const [treeDataState, setTreeDataState] = useState<any[]>([]);

  const treeDataRef = useRef(null);

  useEffect(() => {
    const fetchTreeData = async () => {
      const response = await fetch("http://localhost:3000/Data");
      const data = await response.json();
      console.log("data", data);
      setTreeDataState(data);
    };
    fetchTreeData();
  }, []);

  const findNodeByValue = (data: any[], Value: string): any => {
    for (const node of data) {
      if (node.refKey === Value) {
        console.log("node.refKey", node.refKey);
        return node;
      }
      if (node.children) {
        const childrenNode = findNodeByValue(node.children, Value);
        if (childrenNode) return childrenNode;
      }
    }
    return null;
  };

  const onClick = (e: any) => {
    if (e.target.className === "rs-checkbox-label") {
      e.preventDefault();
      console.log("e", e);

      const nodeValue = e.target
        .closest(".rs-check-tree-node")
        ?.querySelector("input")?.value;

      console.log("nodeValue", nodeValue);

      if (nodeValue) {
        const nodeData = findNodeByValue(treeDataState, nodeValue);
        // console.log("전체 노드 데이터:", nodeData);
        // const dataId = e.target.ownerDocument.activeElement.value;
        // console.log("dataId", dataId);

        // treeDataRef.current = findNodeById(treeData, dataId);
        // console.log("treeDataRef.current", treeDataRef.current);
      }
    }
  };

  return (
    <CheckTree
      ref={treeDataRef}
      data={treeDataState}
      value={checkedValuesState}
      defaultExpandAll
      onClick={onClick}
      onChange={setCheckedValuesState}
      height={500}
    />
  );
};
