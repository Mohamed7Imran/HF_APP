import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import { PivotViewComponent, GroupingBar, FieldList, VirtualScroll, Toolbar, ExcelExport, Inject } from '@syncfusion/ej2-react-pivotview';
import { Ajax, registerLicense } from '@syncfusion/ej2-base';

import { Menu } from '@syncfusion/ej2-react-navigations';
import { Browser } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1JGaF5cXGpCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdlWX1cdHRUQ2ddUkV3XUpWYEs=');
/**
 * PivotView PivotTableExporting Sample.
 */
let dataSourceSettings = {
    url: 'https://services.syncfusion.com/react/production/api/pivot/post',
    mode: 'Server',
    expandAll: true,
    enableSorting: true,
    columns: [{ name: 'Year', caption: 'Production Year' },
    ],
    values: [
        { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }
    ],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }, { name: 'Sold', format: 'N0' }],
    filters: []
};
function PivotTableExporting() {
    let pivotObj;
    let toolbarOptions = ['Chart', 'FieldList'];
    function toolbarRender(args) {
        args.customToolbar.splice(0, 0, {
            prefixIcon: 'e-menu-icon e-pivotview-excel-export e-icons',
            tooltipText: 'Excel Export as Pivot',
            click: toolbarClicked.bind(this),
        });
        args.customToolbar.splice(1, 0, {
            type: 'Separator'
        });
        args.customToolbar.splice(2, 0, {
            template: '<ul id="grid_menu"></ul>',
            id: 'custom_toolbar'
        });
        args.customToolbar.splice(3, 0, {
            type: 'Separator'
        });
    }
    function onDataBound() {
        if (Browser.isDevice && pivotObj && pivotObj.enableRtl) {
            document.querySelector('.control-section').classList.add('e-rtl');
        }
        if (document.querySelector('#grid_menu .e-menu-item') == null) {
            let menuItems = [
                {
                    iconCss: 'e-toolbar-grid e-icons',
                    items: [
                        { text: 'Compact Layout', id: 'Compact' },
                        { text: 'Tabular Layout', id: 'Tabular' },
                    ],
                },
            ];
            new Menu({ items: menuItems, select: gridToolbarClicked }, '#grid_menu');
        }
    }
    function toolbarClicked() {
        pivotObj.exportAsPivot();
    }
    function gridToolbarClicked(args) {
        if (pivotObj && pivotObj.gridSettings && pivotObj.gridSettings.layout !== args.item.id && (args.item.id == 'Compact' || args.item.id == 'Tabular')) {
            pivotObj.setProperties({
                gridSettings: {
                    layout: args.item.id
                },
                displayOption: {
                    view: 'Both', primary: 'Table'
                },
            }, true);
            pivotObj.refresh();
        }
    }
    return (<div className='control-pane'>
            <div className='control-section'>
                <PivotViewComponent id='PivotView' ref={d => pivotObj = d} dataSourceSettings={dataSourceSettings} width={'100%'} height={'450'} showToolbar={true} allowPdfExport={true} gridSettings={{ columnWidth: Browser.isDevice ? 100 : 120 }} showFieldList={true} showGroupingBar={true} allowDataCompression={true} allowExcelExport={true} displayOption={{ view: 'Both' }} toolbar={toolbarOptions} chartSettings={{
            title: 'Sales Analysis', primaryYAxis: { border: { width: 0 } }, legendSettings: { visible: false, },
            chartSeries: { type: 'Bar', animation: { enable: false } }
        }} toolbarRender={toolbarRender} dataBound={onDataBound}>
                    <Inject services={[FieldList, Toolbar, ExcelExport, GroupingBar, VirtualScroll]}/>
                </PivotViewComponent>
            </div>
        </div>);
}
export default PivotTableExporting;

