import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import { PivotViewComponent, Inject, FieldList } from '@syncfusion/ej2-react-pivotview';
import { select, createElement, Browser } from '@syncfusion/ej2-base';
import { DataManager, WebApiAdaptor, Query } from '@syncfusion/ej2-data';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjGyl/VkV+XU9AclRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3hTdUdlWX1feXZXQWVaVE91XA==');
/**
 * PivotView Default Sample.
 */
let pivotData;
let pivotObj;

fetch('https://app.herofashion.com/order_panda/')
  .then(response => {debugger
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // assuming the API returns JSON
  })
  .then(data => {
    console.log('Fetched data:', data);debugger;
    pivotObj.dataSourceSettings.dataSource = data;
    // You can process the data here
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
let dataSourceSettings = {
    enableSorting: true,
    columns: [{ name: 'buyer1' }, { name: 'insdatenew' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    values: [{ name: 'slno', caption: 'Units Sold' }, {name: 'merch'}],
    // dataSource: pivotData,
    rows: [{ name: 'jobno_oms' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    expandAll: false,
    filters: [{name: 'production_unit'}]
};
let gridSettings = {
  rowHeight: 80
}

function PivotTableExporting() {
  function cellTemplate(args) {
    let data = pivotObj.engineModule.data;
    if (args.cellInfo && args.cellInfo.value) {
      if (args.cellInfo && args.cellInfo.axis === 'value' && args.cellInfo.actualText === "slno") {
        if (!args.cellInfo.isGrandSum) {
          let srcValue;
          for (let i = 0; i < data.length; i++) {
            if (args.cellInfo.rowHeaders == data[i].jobno_oms) {
              srcValue = i;
            }
          }
          let imgElement = createElement('img', {
            className: 'e-custom-cell',
            attrs: {
              'src': data[srcValue] ? data[srcValue].mainimagepath : '',
              'alt': 'No Img',
              'width': '50',
              'height': '50'
            },
          });
          let cellValue = select('.e-cellvalue', args.targetCell);
          args.targetCell.firstElementChild.textContent = '';
          args.targetCell.firstElementChild.appendChild(imgElement);
        } else {
          args.targetCell.firstElementChild.textContent = '';
        }
      }
    }
    return '';
  }
    return (<div className='control-pane'>
            <div className='control-section'>
                <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'500'} gridSettings={{ columnWidth: 140, rowHeight: 60 }} cellTemplate={cellTemplate.bind(this)} showFieldList={true}>
                <Inject services={[FieldList]}/>
                </PivotViewComponent>
            </div>
        </div>);
}
export default PivotTableExporting;
