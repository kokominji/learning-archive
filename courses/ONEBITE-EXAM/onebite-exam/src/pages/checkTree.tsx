import { CheckTree } from "rsuite";
import { Children, useEffect, useRef, useState } from "react";
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
  // const [clickedItem, setClickedItem] = useState<MyNode | null>(null);
  const treeDataRef = useRef(null);
  const labelDataRef = useRef(null);
  const checkedNodeRef = useRef<any[]>([]);

  type TChecked = "true" | "false" | "mixed";

  // type MyNode = {
  //   // 필요하면 커스텀 필드 추가
  //   id?: string;
  //   meta?: { [k: string]: any };
  // };

  useEffect(() => {
    const fetchTreeData = async () => {
      const response = await fetch("http://localhost:3000/Data");
      const data = await response.json();
      // console.log("data", data);
      setTreeDataState(data);
    };
    fetchTreeData();
  }, []);

  // 라벨에서 노드의 정보를 가져오기 위한 함수
  const findNodeByValue = (data: any[], Value: string): any => {
    for (const node of data) {
      if (node.refKey === Value) {
        console.log("Value", Value);
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

  // children없는 노드저장
  function leafNodeGroup(node: any, result: any[] = []): any[] {
    if (!node.children || node.children.length === 0) {
      result.push(node);
      return result;
    }

    node.children.forEach((child: any) => {
      leafNodeGroup(child, result);
    });
    console.log("result", result);
    return result;
  }

  const onClickChildren = (e: any) => {
    // 코드 수정필요

    // 라벨 클릭시
    const nodeValue = e.target
      .closest(".rs-check-tree-node")
      ?.querySelector("input")?.value;
    const nodeData = findNodeByValue(treeDataState, nodeValue);
    const leafNode = leafNodeGroup(nodeData);

    if (e.target.className === "rs-checkbox-label") {
      e.preventDefault();

      if (nodeValue) {
        labelDataRef.current = nodeData;
        console.log(" labelDataRef.current", labelDataRef.current);
        console.log("nodeValue", nodeValue);
      }
      // 체크박스 클릭시
    } else if (e.target.type === "checkbox") {
      e.preventDefault();

      const checkType = e.target.checked as TChecked;
      const checkedType = (type: TChecked): any[] => {
        switch (type) {
          case "false":
            return [...checkedNodeRef.current, ...leafNode];
          case "true":
            return checkedNodeRef.current.filter(
              (item) => !leafNode.some((leaf) => leaf.refKey === item.refKey),
            );
          case "mixed":
            return [
              ...checkedNodeRef.current,
              ...leafNode.filter((item) => item.checkType === false),
            ];
          default:
            return checkedNodeRef.current;
        }
      };
      checkedNodeRef.current = checkedType(checkType);
      setCheckedValuesState(checkedNodeRef.current.map((node) => node.refKey));
      console.log("checkedNodeRef.current", checkedNodeRef.current);
      console.log(" checkedNodeRef.current", checkedNodeRef.current);
      // const existingIndex = checkedNodeRef.current.findIndex((node) =>
      //   leafNode.some((item) => item.refKey === node.refKey),
      // );
      // console.log("existingIndex", existingIndex);

      // if (existingIndex === -1) {
      //   console.log(" leafNode", leafNode);
      //   checkedNodeRef.current = [
      //     ...checkedNodeRef.current,
      //     ...leafNode.filter(
      //       (node) =>
      //         !checkedNodeRef.current.some(
      //           (item) => item.refKey === node.refKey,
      //         ),
      //     ),
      //   ];
      // } else {
      //   checkedNodeRef.current = checkedNodeRef.current.filter(
      //     (item) => !leafNode.some((leaf) => leaf.refKey === item.refKey),
      //   );
      // }

      // console.log("checkedNodeRef", checkedNodeRef.current);
    }
  };

  return (
    <>
      {treeDataState.length > 0 && (
        <div>
          <CheckTree
            ref={treeDataRef}
            data={treeDataState}
            value={checkedValuesState}
            onClick={onClickChildren}
            defaultExpandAll
            onChange={setCheckedValuesState}
            showIndentLine
            virtualized
            searchable
            renderTreeIcon={(treeNode, expanded) => {
              if (treeNode.children) {
                return expanded ? (
                  <MdOutlineKeyboardArrowDown />
                ) : (
                  <MdOutlineKeyboardArrowRight />
                );
              }
              return null;
            }}
          />
        </div>
      )}
    </>
  );
};
