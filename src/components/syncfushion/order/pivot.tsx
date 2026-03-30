import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import {
  PivotViewComponent,
  Inject,
  FieldList,
  CalculatedField,
  Toolbar,
  PDFExport,
  ExcelExport,
  ConditionalFormatting,
  NumberFormatting
} from '@syncfusion/ej2-react-pivotview';

import {
  LineSeries,
  ColumnSeries,
  BarSeries,
  Category,
  Legend,
  Tooltip
} from '@syncfusion/ej2-react-charts';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { createElement } from '@syncfusion/ej2-base';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjGyl/VkV+XU9AclRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3hTdUdlWX1feXZXQWVaVE91XA==');

let pivotObj: PivotViewComponent | null = null;

fetch('https://app.herofashion.com/order_panda/')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Fetched data:', data);
    if (pivotObj) {
      pivotObj.dataSourceSettings.dataSource = data;
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

const dataSourceSettings = {
  enableSorting: true,
  columns: [{ name: 'buyer1' }, { name: 'insdatenew' }],
  valueSortSettings: { headerDelimiter: ' - ' },
  values: [{ name: 'slno', caption: 'Units Sold' }, { name: 'merch' }],
  rows: [{ name: 'jobno_oms' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  expandAll: false,
  filters: [{ name: 'production_unit' }]
};

function PivotTableExporting() {
  const toolbarOptions = [
    'New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
    'Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal',
    'Formatting', 'FieldList'
  ];

  const saveReport = (args: any) => {
    let reports: any[] = [];
    let isSaved = false;

    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
      reports = JSON.parse(localStorage.pivotviewReports);
    }

    if (args.report && args.reportName && args.reportName !== '') {
      reports.forEach(item => {
        if (args.reportName === item.reportName) {
          item.report = args.report;
          isSaved = true;
        }
      });
      if (!isSaved) {
        reports.push({ reportName: args.reportName, report: args.report });
      }
      localStorage.pivotviewReports = JSON.stringify(reports);
    }
  };

  const fetchReport = (args: any) => {
    let reportCollection: any[] = [];
    let reportList: string[] = [];

    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
      reportCollection = JSON.parse(localStorage.pivotviewReports);
    }

    reportCollection.forEach(item => reportList.push(item.reportName));
    args.reportName = reportList;
  };

  const loadReport = (args: any) => {
    let reportCollection: any[] = [];

    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
      reportCollection = JSON.parse(localStorage.pivotviewReports);
    }

    reportCollection.forEach(item => {
      if (args.reportName === item.reportName) {
        args.report = item.report;
      }
    });

    if (args.report && pivotObj) {
      pivotObj.dataSourceSettings = JSON.parse(args.report).dataSourceSettings;
    }
  };

  const removeReport = (args: any) => {
    let reportCollection: any[] = [];

    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
      reportCollection = JSON.parse(localStorage.pivotviewReports);
    }

    reportCollection = reportCollection.filter(item => item.reportName !== args.reportName);
    localStorage.pivotviewReports = JSON.stringify(reportCollection);
  };

  const renameReport = (args: any) => {
    let reportsCollection: any[] = [];

    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
      reportsCollection = JSON.parse(localStorage.pivotviewReports);
    }

    reportsCollection.forEach(item => {
      if (args.reportName === item.reportName) {
        item.reportName = args.rename;
      }
    });

    localStorage.pivotviewReports = JSON.stringify(reportsCollection);
  };

  const newReport = () => {
    if (pivotObj) {
      pivotObj.setProperties({ dataSourceSettings: { columns: [], rows: [], values: [], filters: [] } }, false);
    }
  };

  const beforeToolbarRender = (args: any) => {
    args.customToolbar.splice(6, 0, { type: 'Separator' });
    args.customToolbar.splice(9, 0, { type: 'Separator' });
  };

  const chartOnLoad = (args: any) => {
    let selectedTheme = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1))
      .replace(/-dark/i, "Dark")
      .replace(/contrast/i, 'Contrast')
      .replace(/-highContrast/i, 'HighContrast');
  };

  const cellTemplate = (args: any) => {
    if (!pivotObj) return;
    let data = pivotObj.engineModule.data;

    if (args.cellInfo && args.cellInfo.value) {
      if (args.cellInfo.axis === 'value' && args.cellInfo.actualText === "slno") {
        if (!args.cellInfo.isGrandSum) {
          let srcValue: number | undefined;

          for (let i = 0; i < data.length; i++) {
            if (args.cellInfo.rowHeaders === data[i].jobno_oms) {
              srcValue = i;
              break;
            }
          }

          if (typeof srcValue === 'number') {
            let imgElement = createElement('img', {
              className: 'ecustom-cell',
              attrs: {
                'src': data[srcValue]?.mainimagepath || 'https://via.placeholder.com/50', // fallback
                'alt': 'No Img',
                'width': '50',
                'height': '50'
              },
            });

            if (args.targetCell.firstElementChild) {
              args.targetCell.firstElementChild.textContent = '';
              args.targetCell.firstElementChild.appendChild(imgElement);
            }
          } else {
            if (args.targetCell.firstElementChild) {
              args.targetCell.firstElementChild.textContent = '';
            }
          }
        } else {
          if (args.targetCell.firstElementChild) {
            args.targetCell.firstElementChild.textContent = '';
          }
        }
      }
    }
  };
let pivotObj;
 function onChange() {
        pivotObj.gridSettings.layout = pivotObj.gridSettings.layout === 'Compact' ? 'Tabular' : 'Compact';
    }

  return (
    <div className='control-pane'>
      <div className='control-section' id='pivot-table-section' style={{ overflow: 'initial' }}>
         <div className="tabular-layout-switch">
                    <label id="layout-label" htmlFor="layout-switch">Classic Layout</label>
                    <SwitchComponent id="layout-switch" checked={true} cssClass="pivot-layout-switch" change={onChange}></SwitchComponent>
         </div>

        <PivotViewComponent
          id='PivotView'
          ref={(scope) => { pivotObj = scope; }}
          dataSourceSettings={dataSourceSettings}
          width={'100%'}
          height={'450'}
          showFieldList={true}
          gridSettings={{ columnWidth: 140, rowHeight: 80 }}
          allowExcelExport={true}
          allowNumberFormatting={true}
          allowConditionalFormatting={true}
          allowPdfExport={true}
          showToolbar={true}
          allowCalculatedField={true}
          displayOption={{ view: 'Both' }}
          toolbar={toolbarOptions}
          newReport={newReport}
          renameReport={renameReport}
          removeReport={removeReport}
          loadReport={loadReport}
          fetchReport={fetchReport}
          saveReport={saveReport}
          toolbarRender={beforeToolbarRender}
          chartSettings={{ title: 'Sales Analysis', load: chartOnLoad }}
          cellTemplate={cellTemplate}   // ✅ wired in
        >
          <Inject services={[
            FieldList,
            CalculatedField,
            Toolbar,
            PDFExport,
            ExcelExport,
            ConditionalFormatting,
            NumberFormatting,
            LineSeries,
            ColumnSeries,
            BarSeries,
            Category,
            Legend,
            Tooltip
          ]} />
        </PivotViewComponent>
      </div>
    </div>
  );
}

export default PivotTableExporting;
