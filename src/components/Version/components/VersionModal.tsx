import React, { useState, forwardRef, useImperativeHandle, memo, FC } from 'react';
import { TVersionModalProps } from '../types';
import ModalDialog from '../../../components/Base/ModalDialog';
import ButtonsGroup from './ButtonsGroup';


type SvgProps = {
  width: number;
  height: number;
  viewBox: string;
};

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};
const SvgIcon: FC<SvgProps> = memo(({ width, height, viewBox, children }) => (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={viewBox}>
      {children}
    </svg>
));

export const VersionIcon: FC<IconProps> = ({ color = '', width = 25, height = 24 }) => (
    <SvgIcon width={width} height={height} viewBox='0 0 25 24'>
      <path
          d='M12.85 15.65L15.64 12.86C15.95 12.55 15.73 12.01 15.29 12.01H13.5V4C13.5 3.45 13.05 3 12.5 3C11.95 3 11.5 3.45 11.5 4V12H9.71C9.26 12 9.04 12.54 9.36 12.85L12.15 15.64C12.34 15.84 12.66 15.84 12.85 15.65ZM21.5 3H16.49C15.95 3 15.5 3.45 15.5 3.99C15.5 4.54 15.95 4.98 16.49 4.98H20.5C21.05 4.98 21.5 5.43 21.5 5.98V18.01C21.5 18.56 21.05 19.01 20.5 19.01H4.5C3.95 19.01 3.5 18.56 3.5 18.01V5.99C3.5 5.44 3.95 4.99 4.5 4.99H8.51C9.05 4.99 9.5 4.54 9.5 4C9.5 3.45 9.05 3 8.51 3H3.5C2.4 3 1.5 3.9 1.5 5V19C1.5 20.1 2.4 21 3.5 21H21.5C22.6 21 23.5 20.1 23.5 19V5C23.5 3.9 22.6 3 21.5 3Z'
          fill='#FCC425'
      />
    </SvgIcon>
);

const VersionModal = forwardRef(({ onUpdate }: TVersionModalProps, ref) => {
  const [open, setOpen] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useImperativeHandle(ref, () => ({
    open: (worker: ServiceWorker) => {
      setOpen(true);
      setWaitingWorker(worker);
    },
  }));

  const handleUpdate = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
    onUpdate();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalDialog open={open} handleClose={() => setOpen(false)}>
      <VersionIcon />
      <h4>App update</h4>
      <span>New version available</span>
      <ButtonsGroup handleUpdate={handleUpdate} handleClose={handleClose} />
    </ModalDialog>
  );
});

export default VersionModal;
