
/* eslint-disable */
import React from 'react';

//Report Viewer source
// import '@boldreports/javascript-reporting-controls/Content/v2.0/tailwind-light/bold.report-viewer.min.css'
// import '@boldreports/javascript-reporting-controls/Scripts/v2.0/common/bold.reports.common.min';
// import '@boldreports/javascript-reporting-controls/Scripts/v2.0/common/bold.reports.widgets.min';
// import '@boldreports/javascript-reporting-controls/Scripts/v2.0/bold.report-viewer.min';
// //Reports react base
// import '@boldreports/react-reporting-components/Scripts/bold.reports.react.min';
declare let BoldReportViewerComponent: any;

var viewerStyle = {
  'height': '700px',
  'width': '100%'
};

function Report() {
  return (
   <div style={viewerStyle}>
   {/* <BoldReportViewerComponent
   id="reportviewer-container"
     reportServiceUrl = {"https://api.herofashion.com/reporting/reportservice/api/Viewer"}
      reportServerUrl= {"https://api.herofashion.com/reporting/api/site/site3" }

 
      serviceAuthorizationToken = {'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHZlYWh0ZWNoLmNvbSIsIm5hbWVpZCI6IjEiLCJ1bmlxdWVfbmFtZSI6ImY0MDM5NmIzLTIzNDAtNDAzOC1iYTk2LWEwNTY0ZmVkY2MxMSIsIklQIjoiMTAuMS4yMS4xMyIsImlzc3VlZF9kYXRlIjoiMTc3NjE2OTk4MyIsIm5iZiI6MTc3NjE2OTk4MywiZXhwIjoxNzc2Nzk2MjAwLCJpYXQiOjE3NzYxNjk5ODMsImlzcyI6Imh0dHBzOi8vYXBpLmhlcm9mYXNoaW9uLmNvbS9yZXBvcnRpbmcvc2l0ZS9zaXRlMyIsImF1ZCI6Imh0dHBzOi8vYXBpLmhlcm9mYXNoaW9uLmNvbS9yZXBvcnRpbmcvc2l0ZS9zaXRlMyJ9.xdtWS_4E9CAcjaV-uHZrJcOBa943BXw0gt9dUbtfLkc'}
      reportPath = {'7ba340e4-9a3a-43e9-8903-269f9f71fa2d'}>
    
   </BoldReportViewerComponent> */}
   </div>
  );
}

export default Report;