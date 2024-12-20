'use client';

import { FC } from 'react';

interface PowerBIReportProps {
  reportUrl: string;
  filterPaneEnabled?: boolean;
  navContentPaneEnabled?: boolean;
  backgroundColor?: string;
}

interface PowerBIConfig {
  type: 'report';
  tokenType: 'Embed';
  accessToken: string;
  embedUrl: string;
  settings?: {
    filterPaneEnabled: boolean;
    navContentPaneEnabled: boolean;
    background: string;
  };
}

const PowerBIReport: FC<PowerBIReportProps> = ({
  reportUrl,
  filterPaneEnabled = false,
  navContentPaneEnabled = false,
  backgroundColor = '#ffffff'
}) => {
  return (
    <div className="w-full h-screen">
      <iframe
        title="Power BI Report"
        src={reportUrl}
        className="w-full h-full border-0"
        allowFullScreen
        style={{
          minHeight: '100vh',
          backgroundColor: backgroundColor
        }}
      />
    </div>
  );
};

// Configuration pour l'intégration Power BI
export const generatePowerBIConfig = (embedConfig: PowerBIConfig) => {
  return {
    type: embedConfig.type,
    tokenType: embedConfig.tokenType,
    accessToken: embedConfig.accessToken,
    embedUrl: embedConfig.embedUrl,
    settings: {
      filterPaneEnabled: embedConfig.settings?.filterPaneEnabled ?? false,
      navContentPaneEnabled: embedConfig.settings?.navContentPaneEnabled ?? false,
      background: embedConfig.settings?.background ?? '#ffffff'
    }
  };
};



export default PowerBIReport;