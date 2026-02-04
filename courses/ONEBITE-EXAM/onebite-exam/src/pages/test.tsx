import { CheckTree } from "rsuite";
import { useEffect, useRef, useState } from "react";
import "rsuite/CheckTree/styles/index.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
  MdAttachFile,
  MdOutlineFolderOpen,
} from "react-icons/md";

export const Example = () => {
  const [checkedValuesState, setCheckedValuesState] = useState<
    (string | number)[]
  >([]); //체크박스
  const [treeDataState, setTreeDataState] = useState<any[]>([]);
  const treeDataRef = useRef(null);
  const checkedNodeRef = useRef<any[]>([]);

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
        // console.log("childrenNode", childrenNode);
        if (childrenNode) return childrenNode;
      }
    }
    return null;
  };
  // console.log("treeDataState", treeDataState);
  // console.log("checkedValuesState", checkedValuesState);

  const onClick = (e: any) => {
    // 코드 수정필요
    const nodeValue = e.target
      .closest(".rs-check-tree-node")
      ?.querySelector("input")?.value;
    const nodeData = findNodeByValue(treeDataState, nodeValue);

    if (e.target.className === "rs-checkbox-label") {
      e.preventDefault();
      console.log("nodeValue", nodeValue);

      if (nodeValue) {
        console.log("nodeData", nodeData);
      }
    } else if (e.target.type === "checkbox") {
      e.preventDefault();

      console.log("nodeData", nodeData);

      const existingIndex = checkedNodeRef.current.findIndex(
        (node) => node.refKey === nodeData?.refKey,
      );

      if (existingIndex === -1) {
        checkedNodeRef.current = [...checkedNodeRef.current, nodeData];
      } else {
        checkedNodeRef.current = checkedNodeRef.current.filter(
          (item, index) => index !== existingIndex,
        );
      }

      console.log("checkedNodeRef", checkedNodeRef.current);
    }
  };

  // 아이콘
  const TreeNode = ({
    children,
    ...rest
  }: {
    children: React.ReactNode;
    [key: string]: any;
  }) => {
    return (
      <div {...rest} style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {children}
      </div>
    );
  };

  return (
    <>
      {treeDataState.length > 0 && (
        <CheckTree
          ref={treeDataRef}
          data={treeDataState}
          value={checkedValuesState}
          defaultExpandAll
          onClick={onClick}
          onChange={setCheckedValuesState}
          height={500}
          showIndentLine
        />
      )}
    </>
  );
};
