import { CheckTree, CheckTreePicker } from "rsuite";
import { MockTreeData } from "./mock";
import { useRef, useState } from "react";
import "rsuite/CheckTree/styles/index.css";

export const Example = () => {
  const [checkedValues, setCheckedValues] = useState<(string | number)[]>([]);

  const chkRef = useRef(null);

  console.log("checkedValues", checkedValues);

  const onClick = (e: any) => {
    console.log("e", e);
    if (e.target.className === "rs-checkbox-label") e.preventDefault();
  };

  return (
    <CheckTree
      ref={chkRef}
      data={MockTreeData}
      value={checkedValues}
      defaultExpandAll
      //   cascade={false}
      onClick={onClick}
      onSelect={(node) => {
        // console.log('', )
        // console.log("chkRef.current", chkRef.current);
        console.log("node.children", node.children);
        console.log("node", node);
        return {
          value: node.value,
          label: node.label,
          parent: node.parent?.value,
          count: node.count,
          //   check: node.checkState == 0 ? false : true,
        };
      }}
      onChange={setCheckedValues}
    />
  );
};
