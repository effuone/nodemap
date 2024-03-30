import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const applyStyles = (nodes: any) => {
  nodes.forEach(
    (node: any) =>
      (node.style = {
        background: '#FFFF00',
        color: 'black',
        width: 100,
      })
  );
  return nodes;
};

export const applyCommonProperties = (initialNodes: any[]) => {
  if (initialNodes.length === 0) return [];
  let i = 1;
  initialNodes.forEach((node: any) => {
    node.type = 'mainNode';
    node.id = `${i}`;
    i++;
  });
  return initialNodes;
};

export const constructMainPathEdges = (initialNodes: any[]) => {
  if (initialNodes.length === 0) return [];
  const edges = [];
  for (let i = 1; i < initialNodes.length; i++) {
    if (i === 0) continue;
    edges.push({
      id: `el${i}-${i + 1}`,
      type: 'mainPathEdge',
      source: `${i}`,
      target: `${i + 1}`,
    });
  }
  return edges;
};
