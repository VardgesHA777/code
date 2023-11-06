import React, { createContext, useRef, useState, useEffect } from 'react';
import moment from 'moment';
import { TVersionContextInitialProps, TVersionContextProps } from './types';
import VersionModal from './components/VersionModal';
import * as serviceWorker from '../../serviceWorkerRegistration';
import { unregister } from '../../serviceWorkerRegistration';

export const VersionContext = createContext<TVersionContextInitialProps>({
  versionLastCheckDate: '',
  handleCheckNewVersion: () => {},
  newVersionAvailable: false,
});

export const VersionProvider = ({ children }: TVersionContextProps) => {
  const [versionLastCheckDate, setVersionLastCheckDate] = useState(localStorage.getItem('versionLastCheckDate') || '');
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);
  const versionModalRef = useRef({
    open: (waitingWorker: ServiceWorker | null) => {},
  });

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    if (!registration.waiting) {
      return;
    }
    versionModalRef.current.open(registration.waiting);
    setNewVersionAvailable(true);
  };

  useEffect(() => {
    serviceWorker.register({ /* onInit: onSWRegistered, */ onUpdate: onSWUpdate });

    return () => {
      unregister();
    };
  }, []);

  const onUpdate = () => {
    setNewVersionAvailable(false);
  };

  const handleCheckNewVersion = () =>
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => {
        if (!regs.length) {
          return;
        }
        onSWUpdate(regs[0]);
      })
      .catch((err) => console.log(err, '< ERR'))
      .finally(() => {
        const lastDate = moment().format('MM/DD/YYYY');
        localStorage.setItem('versionLastCheckDate', lastDate);
        setVersionLastCheckDate(lastDate);
      });

  const value = {
    versionLastCheckDate,
    handleCheckNewVersion,
    newVersionAvailable,
  };

  return (
    <VersionContext.Provider value={value}>
      <VersionModal onUpdate={onUpdate} ref={versionModalRef} />
      {children}
    </VersionContext.Provider>
  );
};
