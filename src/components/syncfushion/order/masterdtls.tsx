import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Selection, Inject } from '@syncfusion/ej2-react-grids';

function MasterDetail() {
    const [allOrders, setAllOrders] = useState([]); // Raw API data
    const [masterData, setMasterData] = useState([]); // Top grid
    const [detailData, setDetailData] = useState([]); // Bottom grid
    const [selectedPO, setSelectedPO] = useState('');

    // 1. Fetch API Data
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://herofashion.com');
                const data = await response.json();
                
                setAllOrders(data);
                
                // Group or unique companies for the Master Grid
                // Or simply show the first few unique POs
                const uniqueEntries = data.slice(0, 10); 
                setMasterData(uniqueEntries);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchOrders();
    }, []);

    // 2. Handle Selection
    const rowselect = (args) => {
        const selRecord = args.data;
        setSelectedPO(selRecord.pono); // Using 'pono' from your JSON
        
        // Filter the full data set for details related to this selection
        // Matching by styleid or pono as per your API structure
        const details = allOrders.filter(item => item.pono === selRecord.pono);
        setDetailData(details);
    };

    // Template for displaying the image from the API
    const imageTemplate = (props) => {
        return (
            <div className="image">
                <img src={props.mainimagepath} alt="Order" style={{ width: '50px', borderRadius: '4px' }} />
            </div>
        );
    };

    return (
        <div className='control-pane' style={{ padding: '20px' }}>
            <div className='control-section'>
                <h3>Order Master (Hero Fashion)</h3>
                <GridComponent 
                    dataSource={masterData} 
                    selectedRowIndex={0} 
                    rowSelected={rowselect}
                    allowPaging={true}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='pono' headerText='PO No' width='120' />
                        <ColumnDirective field='company_name' headerText='Company' width='100' />
                        <ColumnDirective field='stylename' headerText='Style Name' width='150' />
                        <ColumnDirective field='season' headerText='Season' width='100' />
                        <ColumnDirective field='finaldelvdate' headerText='Delivery Date' width='120' />
                    </ColumnsDirective>
                    <Inject services={[Selection]} />
                </GridComponent>

                <div style={{ margin: '20px 0', fontSize: '16px' }}>
                    Orders for PO: <b>{selectedPO}</b>
                </div>

                <GridComponent dataSource={detailData}>
                    <ColumnsDirective>
                        <ColumnDirective headerText='Image' width='100' template={imageTemplate} textAlign='Center' />
                        <ColumnDirective field='jobno_oms' headerText='Job No' width='120' />
                        <ColumnDirective field='styledesc' headerText='Description' width='200' />
                        <ColumnDirective field='quality_controller' headerText='QC' width='150' />
                        <ColumnDirective field='order_follow_up' headerText='Status' width='150' />
                    </ColumnsDirective>
                </GridComponent>
            </div>
        </div>
    );
}

export default MasterDetail;
