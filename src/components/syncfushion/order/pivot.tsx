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
  NumberFormatting,
  ToolbarItems
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


const dataSourceSettings = {
  enableSorting: true,
  columns: [{ name: 'buyer1' }, { name: 'insdatenew' }],
  valueSortSettings: { headerDelimiter: ' - ' },
  values: [{ name: 'slno', caption: 'Units Sold' }, { name: 'merch' }],
  rows: [{ name: 'jobno_oms', expandAll: true }, { name: 'mainimagepath' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  //expandAll: true,
  filters: [{ name: 'production_unit' }],
  showRowSubTotals: false 
};

function PivotTableExporting() {
  React.useEffect(()=>
  {
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

  },[])
  const toolbarOptions: ToolbarItems[] = [
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
    } else if (args.cellInfo && args.cellInfo.axis == 'row' && args.cellInfo.valueSort.axis == "mainimagepath") {
      if(!args.targetCell.querySelector('img')?.classList.contains('e-custom-cell')) {
        let imgElement = createElement('img', {
        className: 'e-custom-cell',
        attrs: {
          src: args.targetCell.firstElementChild.textContent,
          alt: 'No Img',
          width: '50',
          height: '50',
        },
      });
      args.targetCell.firstElementChild.textContent = '';
      args.targetCell.firstElementChild.appendChild(imgElement);
      }
    }
  };

  const queryCellInfo = (args: any) => {
    let colIndex = Number(args.cell.getAttribute('aria-colindex')) - 1;
    let cells = args.data[colIndex];
    if(!cells) {
      return;
    }
    let datasource = (pivotObj).dataSourceSettings.dataSource;
    // Get the current cell information here.
    let cell = (pivotObj).pivotValues[cells.rowIndex][cells.colIndex];
    let rowlength = (pivotObj).dataSourceSettings.rows?.length;
    // Check for the first row field member.
    if (cell.axis === 'row' && cell.level === 0 && cell.hasChild) {
      // Get the last row header value from the current cell information here.
      let indexCell = (pivotObj).pivotValues[cells.rowIndex][rowlength - 1];
      let indexObject= indexCell.indexObject;
      let indexes = Object.keys(indexObject);
      // Replace the "name" field member in the place of "email"
      // args.cell.querySelector('.e-cellvalue').innerText = datasource[indexes[0]].Dy_R;
      
      args.cell.querySelector('.e-cellvalue').innerHTML = `<div>${datasource[indexes[0]].jobno_oms}</div><div>${datasource[indexes[0]].Dy_R}</div><div>${datasource[indexes[0]].buyer}</div>`;
  }
}
let pivotObj: {
  pivotValues: any; dataSourceSettings: {
    rows: any; dataSource: any; 
}; setProperties: (arg0: { dataSourceSettings: { columns: never[]; rows: never[]; values: never[]; filters: never[]; }; }, arg1: boolean) => void; engineModule: { data: any; }; gridSettings: { layout: string; }; 
};
 function onChange(args:any) {
      if(!args.checked)
      {
        pivotObj.gridSettings.layout = 'Compact';
      }
      else
      {
        pivotObj.gridSettings.layout = 'Tabular';
      }
        
    }

  return (
    <div style={{ height: '100vh'}}>
      <div id='pivot-table-section'>
        <div className="tabular-layout-switch">
                    <label id="layout-label" htmlFor="layout-switch">Classic Layout</label>
                    <SwitchComponent id="layout-switch" checked={true} cssClass="pivot-layout-switch" change={onChange}></SwitchComponent>
        </div>
        <div style={{ height:'95vh', overflow: 'hidden' }}>
        <PivotViewComponent
          id='PivotView'
          ref={(scope: any) => { pivotObj = scope; }}
          dataSourceSettings={dataSourceSettings}
          width={'100%'}
          gridSettings={{layout:'Tabular',columnWidth: 140, rowHeight: 80, queryCellInfo: queryCellInfo }}
          height={'100%'}
          showFieldList={true}
          // gridSettings={}
          allowExcelExport={true}
          allowNumberFormatting={true}
          allowConditionalFormatting={true}
          allowPdfExport={true}
          showToolbar={true}
          allowCalculatedField={true}
          displayOption={{ view: 'Table' }}
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
    </div>
  );
}

export default PivotTableExporting;