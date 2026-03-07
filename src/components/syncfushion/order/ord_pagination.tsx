import React, { useEffect, useState, useRef } from 'react';
import {
  GridComponent, Inject, ColumnMenu, ColumnChooser, RowDD, Freeze,
  InfiniteScroll, CommandColumn, ContextMenu, Filter, Search, LazyLoadGroup, Reorder, Resize, Sort, PdfExport,
  ExcelExport, Edit, Page, Toolbar, Group, ColumnsDirective, ColumnDirective,
  ContextMenuClickEventArgs,
  ToolbarItems,
  Aggregate,
  VirtualScroll,
} from '@syncfusion/ej2-react-grids';
import { registerLicense } from '@syncfusion/ej2-base';

// Register Syncfusion License
registerLicense('Ngo9BigBOggjHTQxAR8/V1JGaF5cXGpCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdlWX1cdHRUQ2ddUkV3XUpWYEs=');

interface OrderData {
  jobno_oms: string; company_name: string; buyer1: string; stylename: string; uom: string;
  final_delivery_date: string; merch: string; punit_sh: string; styleno: string;
  production_type_inside_outside: string; quantity: string; director_sample_order: string;
  printing_R: string; Fdt: string; Emb: string; abc: string; order_follow_up: string;
  quality_controller: string; reference: string; insdatenew: string; styledesc: string;
  date: string; ourdelvdate: string; podate: string; vessel_dt: string; vessel_yr: string;
  shipment_complete: string; u7: string; u141: string; u45: string; u36: string; u31: string;
  u15: string; u14: string; u8: string; u25: string; insdate: string; insdateyear: string;
  actdaten: string; actyeardate: string; pono: string; slno: string; u46: string; u37: string;
  mainimagepath: string; finaldelvdate: string; prnclr?: string | null; prnfile1?: string; prnfile2?: string;img_fpath?:string
}

const OrdPagination: React.FC = () => {
  const [dataSource, setDataSource] = useState<OrderData[]>([]);
  const[totalCount, setTotalCount] = useState<number>(0);
  const [showingCount, setShowingCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState<string>('');

  const gridRef = useRef<GridComponent>(null);
  const searchTimeout = useRef<any>(null);

  const searchableFields =[
    'jobno_oms', 'company_name', 'buyer1', 'stylename', 'merch',
    'punit_sh', 'styleno', 'quantity', 'director_sample_order',
    'printing_R', 'Emb', 'abc', 'u46', 'uom', 'final_delivery_date',
    'production_type_inside_outside', 'prnclr'
  ];

  const parseDate = (dateStr: string) => {
    if (!dateStr) return null;
    const parts = dateStr.split(/[-/]/);
    if (parts.length !== 3) return null;
    let day, month, year;
    if (parts[0].length === 4) {
      [year, month, day] = parts.map(Number);
    } else {
      [day, month, year] = parts.map(Number);
    }
    return new Date(year, month - 1, day);
  };

  const getDateStyle = (dateStr: string) => {
    const targetDate = parseDate(dateStr);
    if (!targetDate) return { color: 'inherit' };
    const today = new Date();
    today.setHours(0, 0, 0, 0); targetDate.setHours(0, 0, 0, 0);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { backgroundColor: '#ffebee', color: '#c62828', padding: '2px 4px', borderRadius: '4px', fontWeight: 'bold' };
    if (diffDays === 0) return { backgroundColor: '#fff3e0', color: '#ef6c00', padding: '2px 4px', borderRadius: '4px', fontWeight: 'bold' };
    if (diffDays > 0 && diffDays <= 3) return { backgroundColor: '#e3f2fd', color: '#1565c0', padding: '2px 4px', borderRadius: '4px', fontWeight: 'bold' };
    return { color: '#2e7d32', fontWeight: '500' };
  };

  const getPunitStyle = (punit_sh: string) => {
    const code = (punit_sh || '').trim().toUpperCase();
    if (code === 'U1') return { backgroundColor: '#007bff', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block' };
    if (code === 'U2') return { backgroundColor: '#28a745', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block' };
    return { color: '#555' };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); setError(null);
        const[orderResponse, printResponse] = await Promise.all([
          fetch('https://app.herofashion.com/order_panda'),
          fetch('https://app.herofashion.com/PrintRgb/')
        ]);
        if (!orderResponse.ok || !printResponse.ok) throw new Error("Failed to fetch data from APIs");

        const orderData: OrderData[] = await orderResponse.json();
        const printData: any[] = await printResponse.json();
        const printMap: Record<string, any> = {};
        printData.forEach(item => { if (item.jobno_joint) printMap[item.jobno_joint] = item; });

        const mergedData = orderData.map((order) => {
          const matchingPrintData = printMap[order.jobno_oms] || {};
          return {
            ...order,
            prnclr: matchingPrintData.prnclr || null,
            prnfile1: matchingPrintData.prnfile1 || '',
            prnfile2: matchingPrintData.prnfile2 || '',
            img_fpath: matchingPrintData.img_fpath || ''
          };
        });

        const processedData = mergedData
          .filter((item) => {
            const dateStr = item.finaldelvdate || item.final_delivery_date;
            if (!dateStr) return true;
            const dateParts = dateStr.split(/[-/]/); let year = 0;
            if (dateParts.length === 3) {
              const p0 = parseInt(dateParts[0]); const p2 = parseInt(dateParts[2]);
              year = p0 > 1000 ? p0 : (p2 < 100 ? 2000 + p2 : p2);
            }
            return year <= 2127;
          })
          .sort((a, b) => {
            const typeA = (a.director_sample_order || '').toLowerCase();
            const typeB = (b.director_sample_order || '').toLowerCase();
            if (typeA !== typeB) {
              if (typeA === 'sample') return -1; if (typeB === 'sample') return 1;
              return typeA.localeCompare(typeB);
            }
            const dateA = new Date(a.finaldelvdate || a.final_delivery_date || 0).getTime();
            const dateB = new Date(b.finaldelvdate || b.final_delivery_date || 0).getTime();
            return dateA - dateB;
          });

        setDataSource(processedData);
        setTotalCount(processedData.length);
        setShowingCount(processedData.length);
      } catch (err: any) {
        console.error("Fetch error:", err); setError(err.message);
      } finally { setLoading(false); }
    };
    fetchData();
  },[]);

  const toolbarClick = (args: ContextMenuClickEventArgs): void => {
    if (args.item.id === 'clearfilter_icon') { gridRef.current?.clearFiltering(); }
  }

  const toolbarOptions =[
    { text: '', prefixIcon: 'e-add', id: 'add_icon', tooltipText: 'Add Records' },
    'Edit', 'Delete', 'Update', 'Cancel', { type: 'Separator' },
    { text: '', prefixIcon: 'sf-icon-expand-collapse', id: 'expand_icon', tooltipText: 'Expand/Collapse' },
    { text: '', prefixIcon: 'sf-icon-clear-sorting', id: 'clearsorting_icon', tooltipText: 'Clear Sorting' },
    { text: '', prefixIcon: 'e-filter-clear icon', id: 'clearfilter_icon', tooltipText: 'Clear Filtering' },
    { type: 'Separator' },
    { text: '', prefixIcon: 'sf-icon-clear-selection', id: 'clear_selection', tooltipText: 'Clear Selection' },
    { text: '', prefixIcon: 'sf-icon-row-clear', id: 'clear_row_selection', tooltipText: 'Clear Row Selection' },
    { text: '', prefixIcon: 'sf-icon-column-clear', id: 'clear_column_selection', tooltipText: 'Clear Column Selection' },
    { text: '', prefixIcon: 'sf-icon-clear-cell', id: 'clear_cell_selection', tooltipText: 'Clear Cell Selection' },
    { type: 'Separator' }, { type: 'Separator' },
    { text: '', prefixIcon: 'e-csvexport', id: 'export_csv', tooltipText: 'Export CSV' },
    { text: '', prefixIcon: 'e-excelexport', id: 'export_excel', tooltipText: 'Export Excel' },
    { text: '', prefixIcon: 'e-pdfexport', id: 'export_pdf', tooltipText: 'Export PDF' },
    'ColumnChooser'
  ] as (ToolbarItems | Object)[];

  const highlightText = (text: any) => {
    if (!searchKey || text === undefined || text === null) return text;
    const stringText = String(text);
    const escapedKey = searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = stringText.split(new RegExp(`(${escapedKey})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === searchKey.toLowerCase() ?
            <span key={i} className="custom-highlight">{part}</span> : part
        )}
      </span>
    );
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; setSearchKey(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      if (gridRef.current) gridRef.current.search(value);
    }, 400);
  };

  const updateCounts = () => {
    if (gridRef.current) {
      const records = gridRef.current.getCurrentViewRecords();
      if (!records || records.length === 0) { setShowingCount(0); return; }
      const grid = gridRef.current as any;
      const count = grid.totalDataRecordsCount ?? grid.pageSettings?.totalRecordsCount ?? grid.dataSource?.length ?? 0;
      setShowingCount(count);
    }
  };

  const detailsTemplate1 = (p: OrderData) => (
    <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
      <b>OR:</b> {highlightText(p.jobno_oms)}<br /><b>Buy:</b> {highlightText(p.buyer1)}<br />
      <b>Mer:</b> {highlightText(p.merch)}<br /><b>unit:</b> <span style={getPunitStyle(p.punit_sh)}>{highlightText(p.punit_sh)}</span><br />
      <b>qty:</b> {highlightText(p.quantity)}
    </div>
  );

  const detailsTemplate2 = (p: OrderData) => (
    <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
      <b>fdt:</b> <span style={getDateStyle(p.Fdt || p.final_delivery_date)}>{highlightText(p.Fdt || p.final_delivery_date)}</span><br />
      <b>Dir:</b> {highlightText(p.director_sample_order)}<br /><b>sno:</b> {highlightText(p.styleno)}<br />
      <b>uom:</b> {highlightText(p.uom)}<br /><b>type:</b> {highlightText(p.production_type_inside_outside)}
    </div>
  );

  const imageFieldTemplate = (field: 'mainimagepath' | 'prnfile1' | 'prnfile2') => (p: OrderData) => {
    if (!p[field]) return <div style={{ color: '#ccc', fontSize: '10px' }}>No Image</div>;
    return <img src={p[field]} alt="img" loading="lazy" style={{ width: '75px', height: '75px', objectFit: 'contain', border: '1px solid #eee' }} />;
  };

  const genericHighlighter = (field: keyof OrderData) => (props: OrderData) => (
    <>{highlightText(props[field])}</>
  );

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', fontSize: '18px', color: '#666' }}>Loading Data, please wait...</div>;
  if (error) return <div style={{ padding: '100px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;

  return (
    /* இங்கு width: '100%' மற்றும் overflowX: 'hidden' சேர்க்கப்பட்டுள்ளது. இதனால் Horizontal Scroll வராது. */
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden', backgroundColor: '#fff', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      
      {/* CSS Styles for Responsive Header & Grid */}
      <style>{`
        .custom-highlight { background-color: #ffeb3b !important; color: #000 !important; font-weight: bold; padding: 0 2px; }
        .e-rowcell { vertical-align: top !important; font-size: 12px !important; padding-top: 8px !important; }
        .e-grid .e-headercell { background-color: #f1f3f5 !important; font-weight: bold !important; color: #495057 !important; }
        .e-grid .e-altrow { background-color: #fafafa !important; }

        /* Desktop Layout Rules */
        .responsive-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
          width: 100%;
          box-sizing: border-box; /* Scrollbar வராமல் தடுக்க */
        }
        .header-left {
          flex: 1; /* மூன்று பகுதியும் சமமான இடத்தை எடுக்கும் */
          display: flex;
          justify-content: flex-start; /* இடது ஓரம் */
          font-size: 15px;
          font-weight: bold;
          color: #007bff;
        }
        .header-center {
          flex: 1;
          display: flex;
          justify-content: center; /* நடுவில் */
          font-size: 15px;
          font-weight: 800;
          color: #333;
          letter-spacing: 1px;
          white-space: nowrap;
        }
        .header-right {
          flex: 1;
          display: flex;
          justify-content: flex-start; /* வலது ஓரம் ஒட்டி வர */
        }
        .search-input {
          width: 100%;
          max-width: 320px; /* அதிகபட்ச அகலம் */
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid #ced4da;
          outline: none;
          font-size: 13px;
        }

        /* Mobile View Rules */
        @media (max-width: 768px) {
          .responsive-header {
            flex-direction: column;
            padding: 15px;
            gap: 12px;
          }
          .header-left { justify-content: center; order: 2; width: 100%; text-align: center; }
          .header-center { justify-content: center; order: 1; white-space: normal; text-align: center; width: 100%; }
          .header-right { justify-content: center; order: 3; width: 100%; }
          .search-input { max-width: 100%; } /* மொபைலில் முழு அகலம் */
        }
      `}</style>

      {/* Header Bar */}
      <div className="responsive-header">
        
        {/* Left Side: Record Count */}
        <div className="header-left">
          {showingCount} / {totalCount} Records
        </div>
           <div className="header-right">
          <input
            type="text"
            placeholder="Search all columns..."
            value={searchKey}
            onChange={onSearchChange}
            className="search-input"
          />
        </div>
        {/* Center: Title */}
        <div className="header-center">
          HERO FASHION - ORDER DASHBOARD
        </div>

        {/* Right Side: Search Box */}
        <div className="header-right">
          <input
            type="text"
            placeholder="Search all columns..."
            value={searchKey}
            onChange={onSearchChange}
            className="search-input"
          />
        </div>
      </div>

      {/* Grid Container */}
      <div style={{ flex: 1, overflow: 'hidden', width: '100%' }}>
        <GridComponent
          ref={gridRef}
          dataSource={dataSource}
          dataBound={updateCounts}
          toolbar={toolbarOptions}
          toolbarClick={toolbarClick}
          allowTextWrap={true}
          height="600"
          enableVirtualization={true}
          rowHeight={105}
          allowSorting={true}
          allowPaging={true}
          allowGrouping={true}
          allowFiltering={true}
          allowResizing={true}
          allowReordering={true}
          filterSettings={{ type: 'Excel' }}
          gridLines="Both"
          searchSettings={{ fields: searchableFields, operator: 'contains', ignoreCase: true }}
        >
          <ColumnsDirective>
            <ColumnDirective field="jobno_oms" freeze='Left' headerText="ORDER INFO" width="120" template={detailsTemplate1} />
            <ColumnDirective field="mainimagepath" headerText="STYLE IMG" width="90" textAlign="Center" allowFiltering={false} template={imageFieldTemplate('mainimagepath')} />
            <ColumnDirective field="Fdt" headerText="DELIVERY INFO" width="125" template={detailsTemplate2} />

            <ColumnDirective field="prnfile1" headerText="PRN IMG 1" width="90" textAlign="Center" allowFiltering={false} template={imageFieldTemplate('prnfile1')} />
            <ColumnDirective field="prnfile2" headerText="PRN IMG 2" width="90" textAlign="Center" allowFiltering={false} template={imageFieldTemplate('prnfile2')} />
            <ColumnDirective field="img_fpath" headerText="img_fpath" width="90" textAlign="Center" allowFiltering={false} template={imageFieldTemplate('img_fpath')} />
            <ColumnDirective field="prnclr" type="string" headerText="PRN COLOR" width="100" template={genericHighlighter('prnclr')} />

            <ColumnDirective field="u25" headerText="U25" width="90" template={genericHighlighter('u25')} />
            <ColumnDirective field="abc" headerText="ABC" width="85" template={genericHighlighter('abc')} />
            <ColumnDirective field="u46" headerText="U46" width="85" template={genericHighlighter('u46')} />
            <ColumnDirective field="production_type_inside_outside" headerText="type" width="85" template={genericHighlighter('production_type_inside_outside')} />
            <ColumnDirective field="u37" headerText="AOP 37" width="90" template={genericHighlighter('u37')} />
            <ColumnDirective field="printing_R" headerText="PRINTING" width="110" template={genericHighlighter('printing_R')} />
            <ColumnDirective field="Emb" type="string" headerText="EMB" width="100" template={genericHighlighter('Emb')} />
            <ColumnDirective field="buyer1" type="string" headerText="BUYER" width="120" template={genericHighlighter('buyer1')} />
            <ColumnDirective field="merch" headerText="MERCH" width="110" template={genericHighlighter('merch')} />
            <ColumnDirective field="styleno" headerText="STYLE NO" width="110" template={genericHighlighter('styleno')} />
            <ColumnDirective field="director_sample_order" headerText="director_sample_order" width="110" template={genericHighlighter('director_sample_order')} />
            <ColumnDirective field="order_follow_up" headerText="FOLLOW UP" width="150" template={genericHighlighter('order_follow_up')} />
            <ColumnDirective field="quality_controller" headerText="QC" width="130" template={genericHighlighter('quality_controller')} />
            <ColumnDirective field="styledesc" headerText="DESCRIPTION" width="180" template={genericHighlighter('styledesc')} />
            <ColumnDirective field="quantity" headerText="QTY" width="90" textAlign="Right" template={genericHighlighter('quantity')} />
            <ColumnDirective field="company_name" headerText="COMPANY" width="140" template={genericHighlighter('company_name')} />
          </ColumnsDirective>
          <Inject services={[Sort, CommandColumn, Aggregate, Edit, Group, RowDD, Freeze, VirtualScroll, ContextMenu, ColumnMenu, Filter, LazyLoadGroup, Page, PdfExport, InfiniteScroll, ExcelExport, Reorder, Resize, Toolbar, Search, ColumnChooser]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default OrdPagination;