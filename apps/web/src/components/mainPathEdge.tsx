import { FC } from 'react';
import { BaseEdge, getStraightPath } from 'reactflow';

interface MainPathEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

const MainPathEdge: FC<MainPathEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}) => {
  const [edgePath] = getStraightPath({
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
          stroke: 'blue', // Edge color
          strokeWidth: 3, // Edge thickness
          strokeLinecap: 'round', // Edge line cap style
          strokeDasharray: '0', // Solid line; use a value like '5,5' for dashed lines
          fill: 'none', // Ensures the path is not filled
        }}
      />
    </>
  );
};

export default MainPathEdge;
