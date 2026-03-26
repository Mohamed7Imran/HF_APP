import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import { PivotViewComponent, GroupingBar, FieldList, VirtualScroll, Toolbar, ExcelExport,  Inject } from '@syncfusion/ej2-react-pivotview';
import { registerLicense } from '@syncfusion/ej2-base';
import { Menu } from '@syncfusion/ej2-react-navigations';
import { Browser } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1JGaF5cXGpCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdlWX1cdHRUQ2ddUkV3XUpWYEs=');

function PivotTableExporting() {
    let pivotObj;
    // State to hold the fetched data
    const [dataSource, setDataSource] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    // Toolbar options
    let toolbarOptions = ['Chart', 'FieldList'];

    // Fetch data manually to handle Auth Headers and standard JSON
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Retrieve the token from localStorage (matching your logs)
                const token = localStorage.getItem('accessToken'); 
                
                const response = await fetch('https://app.herofashion.com/order_panda/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include token if required
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                
                // Check if data is an array, or nested inside a property (e.g., data.items)
                // Assuming the API returns the array directly or inside a 'data' property
                const resultArray = Array.isArray(data) ? data : (data.data || data.result || []);
                
                setDataSource(resultArray);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching pivot data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Updated Data Source Settings using the fetched data
    let dataSourceSettings = {
        dataSource: dataSource, // Bind the state variable here
        expandAll: true,
        enableSorting: true,
        columns: [{ name: 'merch', caption: 'merch' }],
        values: [{ name: 'quantity', caption: 'Total Quantity' }],
        rows: [{ name: 'jobno_oms', caption: 'Buyers' }, { name: 'stylename', caption: 'Style Name' }],
        formatSettings: [{ name: 'quantity', format: 'N0' }],
        filters: []
    };

    function toolbarRender(args) {
        args.customToolbar.splice(0, 0, {
            prefixIcon: 'e-menu-icon e-pivotview-excel-export e-icons',
            tooltipText: 'Excel Export as Pivot',
            click: toolbarClicked.bind(this),
        });
        args.customToolbar.splice(1, 0, { type: 'Separator' });
        args.customToolbar.splice(2, 0, {
            template: '<ul id="grid_menu"></ul>',
            id: 'custom_toolbar'
        });
        args.customToolbar.splice(3, 0, { type: 'Separator' });
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
                gridSettings: { layout: args.item.id },
                displayOption: { view: 'Both', primary: 'Table' },
            }, true);
            pivotObj.refresh();
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                {isLoading ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>Loading Data...</div>
                ) : (
                    <PivotViewComponent 
                        id='PivotView' 
                        ref={d => pivotObj = d} 
                        dataSourceSettings={dataSourceSettings} 
                        width={'100%'} 
                        height={'450'} 
                        showToolbar={true} 
                        allowPdfExport={true} 
                        gridSettings={{ columnWidth: Browser.isDevice ? 100 : 120 }} 
                        showFieldList={true} 
                        showGroupingBar={true} 
                        allowDataCompression={true} 
                        allowExcelExport={true} 
                        displayOption={{ view: 'Both' }} 
                        toolbar={toolbarOptions} 
                        chartSettings={{
                            title: 'Order Analysis',
                            primaryYAxis: { border: { width: 0 } }, 
                            legendSettings: { visible: false },
                            chartSeries: { type: 'Bar', animation: { enable: false } }
                        }} 
                        toolbarRender={toolbarRender} 
                        dataBound={onDataBound}>
                        {/* Added PdfExport to services to clear warning */}
                        <Inject services={[FieldList, Toolbar, ExcelExport, GroupingBar, VirtualScroll]}/>
                    </PivotViewComponent>
                )}
            </div>
        </div>
    );
}
export default PivotTableExporting;