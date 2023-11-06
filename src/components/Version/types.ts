export type TVersionContextInitialProps = {
  versionLastCheckDate: string;
  handleCheckNewVersion: () => void;
  newVersionAvailable: boolean;
};

export type TVersionContextProps = {
  children: JSX.Element;
};

export type TVersionModalProps = {
  onUpdate: () => void;
};

export type TButtonsGroupProps = {
  disableUpdate?: boolean;
  handleUpdate: () => void;
  disableClose?: boolean;
  handleClose: () => void;
};
