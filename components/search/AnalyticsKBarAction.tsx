'use client';

import { AreaChart } from 'lucide-react';
import siteMetadata from '@/data/siteMetadata';

// Only render this component if kbar search is enabled
// The actual action registration should be handled by pliny's SearchProvider
export default function AnalyticsKBarAction() {
  // If search provider is not kbar, don't render
  if (siteMetadata.search?.provider !== 'kbar' || !siteMetadata.analyticsURL) {
    return null;
  }

  // For now, return null as pliny's SearchProvider should handle kbar actions
  // If you need custom actions, configure them through SearchProvider
  return null;
}
