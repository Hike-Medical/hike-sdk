// Pylon currently does not have a client-side SDK
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { AppId, randomString } from '@hike/sdk';
import { SessionContext, useCurrentPatient } from '@hike/ui';
import { Overlay } from '@mantine/core';
import { useParams } from 'next/navigation';
import Script from 'next/script';
import { createContext, ReactNode, use, useEffect, useState } from 'react';

interface PylonState {
  showPylon: () => void;
  hidePylon: () => void;
  isPylonVisible: boolean;
}

interface PylonProviderProps {
  appId: AppId;
  pylonId: string | undefined;
  children: ReactNode;
}

export const PylonProvider = ({ appId, pylonId, children }: PylonProviderProps) => {
  const [isPylonVisible, setIsPylonVisible] = useState(false);
  const { status, user } = use(SessionContext);
  const params = useParams<{ slug: string }>();

  const { data } = useCurrentPatient({
    params: { slug: params.slug },
    enabled: appId === '@hike/consumer-web' && status === 'AUTHENTICATED' && !!params.slug
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && pylonId) {
      (window as any).pylon = {
        chat_settings: {
          app_id: pylonId,
          ...(data
            ? {
                // TODO: Ask Pylon if we have to use email or can we use user ID (PII concerns)
                email:
                  data.companyPatient.email ??
                  data.companyUser.user.email ??
                  data.companyPatient.phone ??
                  data.companyUser.user.phone,
                name: user?.clinician?.name || data.companyPatient.patient.firstName || data.companyUser.userId
              }
            : {
                // TODO: Ask Pylon if we can support anonymous users
                email: `no-reply+${randomString(10)}@hikemedical.com`,
                name: `Hike Medical - ${appId}`
              })
        }
      };

      (window as any).Pylon('onShow', function () {
        setIsPylonVisible(true);
      });

      (window as any).Pylon('onHide', function () {
        setIsPylonVisible(false);
      });
    }
  }, [status, data]);

  return (
    <PylonContext
      value={{
        showPylon: () => {
          if ('Pylon' in window) {
            (window as any).Pylon('show');
          }
        },
        hidePylon: () => {
          if ('Pylon' in window) {
            (window as any).Pylon('hide');
          }
        },
        isPylonVisible
      }}
    >
      {pylonId ? (
        <Script id="pylon-script">
          {`(function(){var e=window;var t=document;var n=function(){n.e(arguments)};n.q=[];n.e=function(e){n.q.push(e)};e.Pylon=n;var r=function(){var e=t.createElement("script");e.setAttribute("type","text/javascript");e.setAttribute("async","true");e.setAttribute("src","https://widget.usepylon.com/widget/${pylonId}");var n=t.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};if(t.readyState==="complete"){r()}else if(e.addEventListener){e.addEventListener("load",r,false)}})();`}
        </Script>
      ) : null}
      {isPylonVisible && <Overlay color="#000" backgroundOpacity={0.8} />}
      {children}
    </PylonContext>
  );
};

export const PylonContext = createContext<PylonState>(undefined as never);
