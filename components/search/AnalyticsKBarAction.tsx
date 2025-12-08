'use client';

import { useRegisterActions } from 'kbar';
import { AreaChart } from 'lucide-react';
import siteMetadata from '@/data/siteMetadata';

export default function AnalyticsKBarAction() {
  useRegisterActions(
    [
      {
        id: 'analytics',
        name: 'View Analytics',
        keywords: 'analytics traffic insights stats',
        section: 'Navigation',
        perform: () => {
          if (typeof window !== 'undefined') {
            window.open(siteMetadata.analyticsURL, '_blank');
          }
        },
        icon: <AreaChart size={16} />,
      },
    ],
    [siteMetadata.analyticsURL]
  );

  return null;
}
