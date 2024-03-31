import { FC, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import DialogCustom from './dialog-custom';

interface MainNodeProps extends NodeProps {
  data: {
    label: string;
  };
  childNodePosition?: Position;
}

const MainNode: FC<MainNodeProps> = ({
  data,
  sourcePosition = Position.Top,
  targetPosition = Position.Right,  
  childNodePosition = Position.Right,
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <> 
      <div onClick={() => {handleOpen()}} className='min-w-[150px] min-h-[50px] px-4 py-4 flex justify-center items-center rounded-[8px] bg-white'>
        <div className='text-center text-[17px] font-semibold text-black'>{data.label}</div>
        <Handle type='source' position={sourcePosition} className='' id='1' /> {/* откуда он отдает */}
        <Handle type='target' position={targetPosition} className='' /> {/* откуда ему приходить */}

        <Handle type='source' position={childNodePosition} className='' id='2' /> {/* откуда он с child connect */}


        <DialogCustom
        info="info"
        links={[]}
        title={data.label}
        isOpen={isModalOpen}
        onClose={handleClose}
        />
      </div>
    </>
  );
};

export default MainNode;
