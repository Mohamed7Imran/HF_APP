import React, { useEffect, useState, useRef } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Sort,
  Inject,
  Resize,
  Filter,
  Group,
  Reorder,
  Search,
  VirtualScroll,
} from '@syncfusion/ej2-react-grids';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1JGaF5cXGpCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdlWX1cdHRUQ2ddUkV3XUpWYEs=');

interface EmployeeData {
  code: number;
  name: string;
  dept: string;
  category: string;
  mobile: string;
  photo: string;
  prab: string;
  salary: string;
  joindt: string;
  sex: string;
  qualification: string;
  curwrkunit: string;
  hostel: string;
  dept_category_unit_pcategory: string;
  con_sc_astaff: string;
  picpen: string;
  empty: string;
  filnam: string;
  emppic: string;
  prate: number;
  trn: string;
  sl: number | null; // Changed to allow null since we replace NaN with null
  sc: string;
  prs: string;
  roomdtls: string;
  pftype: string;
  contract_des: string;
  inch: string;
  nattgrp: string;
  inspection: string;
  empprs: string;
  skilled: string;
  aempwatch: string;
  tc: string;
  createdby: string;
  modifiedby: string;
  monthlysalary?: string | null;
  esino?: string | null;
  pfno?: string | null;
  tasstaff?: string | null;
  mcategory?: string | null;
  con_name_mcate?: string | null;
  intercom?: string | null;
  orissa?: string | null;
  bank?: string | null;
  accountdetails?: string | null;
  accountdetails1?: string | null;
  attach?: string | null;
  grp2?: number;
}

const HrReportGrid: React.FC = () => {
  const [dataSource, setDataSource] = useState<EmployeeData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [showingCount, setShowingCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState<string>('');

  const gridRef = useRef<GridComponent>(null);
  const searchTimeout = useRef<any>(null);

  const searchableFields =[
    'code', 'name', 'dept', 'category', 'mobile', 
    'curwrkunit', 'prab', 'qualification', 'joindt', 'sex'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://app.herofashion.com/HrWrkdtlsnew/');
        
        // 1. Fetch as text instead of JSON to avoid crash
        const textData = await response.text();
        
        // 2. Fix the invalid JSON (Replace unquoted NaN with null)
        const fixedJson = textData.replace(/:\s*NaN\b/g, ': null');
        
        // 3. Now parse it safely
        const data: EmployeeData[] = JSON.parse(fixedJson);

        setDataSource(data);
        setTotalCount(data.length);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };

    fetchData();
  },[]);

  // --- Highlighting Logic ---
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
    const value = e.target.value;
    setSearchKey(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      if (gridRef.current) gridRef.current.search(value);
    }, 400);
  };

  const updateCounts = () => {
    if (gridRef.current) {
      const records = gridRef.current.getFilteredRecords();
      setShowingCount(records ? records.length : 0);
    }
  };

  const genericHighlighter = (field: keyof EmployeeData) => (props: EmployeeData) => (
    <>{highlightText(props[field])}</>
  );

  // --- Custom Formatting Helpers ---
  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === 'NaT') return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return highlightText(dateStr);
    return highlightText(d.toLocaleDateString('en-GB')); // Outputs DD/MM/YYYY
  };

  const getStatusStyle = (status: string) => {
    const s = (status || '').trim().toLowerCase();
    if (s === 'absent') return { backgroundColor: '#ffebee', color: '#c62828', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block' };
    if (s === 'present' || s === 'pr') return { backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block' };
    return { padding: '2px 6px' }; 
  };

  // --- Templates ---
  const employeeSummaryTemplate = (p: EmployeeData) => (
    <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
      <b>Code:</b> {highlightText(p.code)}<br />
      <b>Name:</b> {highlightText(p.name)}<br />
      <b>Dept:</b> {highlightText(p.dept)}<br />
      <b>Cate:</b> {highlightText(p.category)}<br />
      <b>Mob:</b> {highlightText(p.mobile)}
    </div>
  );

  const statusTemplate = (p: EmployeeData) => (
    <div style={getStatusStyle(p.prab)}>
      {highlightText(p.prab)}
    </div>
  );

  const photoTemplate = (p: EmployeeData) => {
    if (!p.photo) return null;
    return <img src={p.photo} alt={p.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px' }} />;
  };

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6'
      }}>
        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#007bff', minWidth: '80px', marginLeft: '30px' }}>
          {showingCount} / {totalCount}
        </div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
          HR WORK DETAILS REPORT
        </div>
        <div style={{ width: '300px' }}>
          <input
            type="text"
            placeholder="Search employee details..."
            value={searchKey}
            onChange={onSearchChange}
            style={{
              width: '100%',
              padding: '6px 15px',
              borderRadius: '20px',
              border: '1px solid #ccc',
              outline: 'none',
              fontSize: '13px'
            }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <style>{`
          .custom-highlight { background-color: #fff9c4 !important; color: #d32f2f !important; font-weight: bold; }
          .e-rowcell { vertical-align: top !important; font-size: 12px !important; line-height: 1.3 !important; padding-top: 8px !important; }
          .e-filter-popup { z-index: 10000001 !important; }
        `}</style>

        <GridComponent
          ref={gridRef}
          dataSource={dataSource}
          dataBound={updateCounts}
          height="100%"
          enableVirtualization={true}
          rowHeight={95}
          allowSorting={true}
          allowFiltering={true}
          allowGrouping={true}
          filterSettings={{ type: 'Excel' }}
          gridLines="Both"
          searchSettings={{ fields: searchableFields, operator: 'contains', ignoreCase: true }}
        >
          <ColumnsDirective>
            {/* Primary Details */}
            <ColumnDirective field="photo" headerText="PHOTO" width="85" textAlign="Center" allowFiltering={false} template={photoTemplate} />
            <ColumnDirective field="code" headerText="SUMMARY" width="130" template={employeeSummaryTemplate} />
            
            {/* HR Status & Work Detail */}
            <ColumnDirective field="prab" headerText="STATUS" width="90" textAlign="Center" template={statusTemplate} />
            <ColumnDirective field="curwrkunit" headerText="WORK UNIT" width="100" template={genericHighlighter('curwrkunit')} />
            <ColumnDirective field="joindt" headerText="JOIN DATE" width="100" template={(p: EmployeeData) => formatDate(p.joindt)} />
            <ColumnDirective field="salary" headerText="SALARY" width="90" textAlign="Right" template={genericHighlighter('salary')} />
            <ColumnDirective field="sex" headerText="GENDER" width="80" template={genericHighlighter('sex')} />
            
            {/* Other Metadata */}
            <ColumnDirective field="qualification" headerText="QUALIFICATION" width="120" template={genericHighlighter('qualification')} />
            <ColumnDirective field="hostel" headerText="HOSTEL" width="80" template={genericHighlighter('hostel')} />
            <ColumnDirective field="sc" headerText="SC" width="70" template={genericHighlighter('sc')} />
            <ColumnDirective field="trn" headerText="TRN" width="70" template={genericHighlighter('trn')} />
            <ColumnDirective field="dept_category_unit_pcategory" headerText="DEPT CATEGORY" width="200" template={genericHighlighter('dept_category_unit_pcategory')} />
            <ColumnDirective field="picpen" headerText="PIC PEN" width="100" template={genericHighlighter('picpen')} />
            <ColumnDirective field="bank" headerText="BANK" width="100" template={genericHighlighter('bank')} />
            <ColumnDirective field="esino" headerText="ESI NO" width="100" template={genericHighlighter('esino')} />
            <ColumnDirective field="pfno" headerText="PF NO" width="100" template={genericHighlighter('pfno')} />
          </ColumnsDirective>
          <Inject services={[Sort, Filter, Group, Reorder, Search, VirtualScroll]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default HrReportGrid;