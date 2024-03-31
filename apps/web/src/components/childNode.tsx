import { FC } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

interface childNodeProps extends NodeProps {
  data: {
    label: string;
  };
}

const ChildNode: FC<childNodeProps> = ({
  data,
  sourcePosition = Position.Right,
  targetPosition = Position.Left,
}) => {
  return (
    <div className=" min-w-[150px] min-h-[50px] px-4 py-4 flex justify-center items-center rounded-[8px] border-[1px] border-[#474747] bg-[#282828] ">
      <div className="text-center text-white text-[17px]">{data.label}</div>
      <Handle type="source" position={targetPosition} className="bg-black " />
      <Handle type="target" position={sourcePosition} className="bg-black " />
    </div>
  );
};

export default ChildNode;
