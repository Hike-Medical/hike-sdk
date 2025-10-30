'use client';

import { AppId, randomString } from '@hike/sdk';
import { SessionContext, useCurrentPatient, usePylonEmailHash } from '@hike/ui';
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

/**
 * Component that provides a Pylon context to the app since Pylon does not have a client-side SDK.
 */
export const PylonProvider = ({ appId, pylonId, children }: PylonProviderProps) => {
  const [isPylonVisible, setIsPylonVisible] = useState(false);
  const { status, user } = use(SessionContext);
  const params = useParams<{ slug: string }>();

  const { data } = useCurrentPatient({
    params: { slug: params.slug },
    enabled: appId === '@hike/consumer-web' && status === 'AUTHENTICATED' && !!params.slug
  });

  // Fetch Pylon email hash for identity verification
  const { data: pylonHashData } = usePylonEmailHash({
    enabled: status === 'AUTHENTICATED'
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && pylonId) {
      // Determine user info based on authentication status
      let userInfo: { email: string; name: string; email_hash?: string } | null = null;

      if (status === 'AUTHENTICATED') {
        if (data) {
          // Consumer-web: use patient data
          userInfo = {
            email:
              data.companyPatient.email ??
              data.companyUser.user.email ??
              data.companyPatient.phone ??
              data.companyUser.user.phone,
            name: user?.clinician?.name || data.companyPatient.patient.firstName || data.companyUser.userId
          };
        } else if (user) {
          // Other apps (insoles-web, admin-web): use authenticated user data
          userInfo = {
            email: user.email ?? user.phone ?? `user-${user.id}@hikemedical.com`,
            name: user.clinician?.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.id
          };
        }

        // Add email hash for identity verification if available
        if (userInfo && pylonHashData?.emailHash) {
          userInfo.email_hash = pylonHashData.emailHash;
        }
      }

      (window as any).pylon = {
        chat_settings: {
          app_id: pylonId,
          ...(userInfo || {
            // Unauthenticated: use anonymous identifier
            email: `no-reply+${randomString(10)}@hikemedical.com`,
            name: `Hike Medical - ${appId}`
          })
        }
      };

      (window as any).Pylon('onShow', () => {
        setIsPylonVisible(true);
      });

      (window as any).Pylon('onHide', () => {
        setIsPylonVisible(false);
      });
    }
  }, [status, data, pylonId, user, appId, pylonHashData]);

  return (
    <PylonContext
      // eslint-disable-next-line react/jsx-no-constructed-context-values
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
