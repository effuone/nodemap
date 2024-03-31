import { FC } from 'react';
import { BaseEdge, getBezierPath, getStraightPath } from 'reactflow';

interface ChildPathEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

const ChildPathEdge: FC<ChildPathEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}        
        style={{
          stroke: '#616161', // Edge color
          strokeWidth: 1, // Edge thickness
          strokeLinecap: 'round', // Edge line cap style
          strokeDasharray: '0', // Solid line; use a value like '5,5' for dashed lines
          fill: 'none', // Ensures the path is not filled
        }}
      />
    </>
  );
};

export default ChildPathEdge;
