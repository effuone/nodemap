import { FC } from "react";
import { Handle, Position } from "reactflow";

type CustomNodeProps = {
  data: {
    label: string;
  };
};

const CustomNode: FC<CustomNodeProps> = ({ data }) => {
  return (
    <div className="px-4 py-2 border-[2px] rounded-md border-black bg-yellow-300 ">
      <div>{data.label}</div>

      <Handle type="target" position={Position.Top} className="bg-black" />
      <Handle type="source" position={Position.Bottom} className="bg-black" />
    </div>
  );
};

export default CustomNode;
