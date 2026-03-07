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

interface PrnData {
  jobno_joint: string | null;
  prnclr: string | null;
  prnfile1: string | null;
  prnfile2: string | null;
  jobno_print_emb: string | null;
  img_fpath: string | null;
  hex: string | null;
  print_img_pen: string | null;
  image_tb: string | null;
  con_fimg_grclr: string | null;
  con_jobno_print: string | null;
  jobno_print_new_rgb: string | null;
  con_jobno_prndes: string | null;
  con_jobno_top_clr_line: string | null;
  con_jobno_top_clr_siz_line: string | null;
  con_inout_outsup: string | null;
  print_screen_1: string | null;
  print_screen_2: string | null;
  print_screen_3: string | null;
  top_bottom: string | null;
  clrcomb: string | null;
  screen_number: string | null;
  print_type: string | null;
  print_description: string | null;
  individual_part_print_emb: string | null;
  print_colours: string | null;
  print_emb_ground_colour: string | null;
  inside_outside_print_emb: string | null;
  print_emb_outside_supplier: string | null;
  print_colour_1: string | null;
  print_colour_2: string | null;
  print_colour_3: string | null;
  print_colour_4: string | null;
  print_colour_5: string | null;
  print_colour_6: string | null;
  print_colour_7: string | null;
  print_colour_8: string | null;
  print_size_details: string | null;
  print_emb_ground_colour_rgb: string | null;
  img_print: string | null;
  img_print_mmt: string | null;
  con_jobno_top_clr_siz: string | null;
  con_jobno_top_clr: string | null;
  rgb: string | null;
  print_colour_rgb_1: string | null;
  print_colour_rgb_2: string | null;
  print_colour_rgb_3: string | null;
  print_colour_rgb_4: string | null;
  print_colour_rgb_5: string | null;
  print_colour_rgb_6: string | null;
  print_colour_rgb_7: string | null;
  print_colour_rgb_8: string | null;
}

const PrnReportGrid: React.FC = () => {
  const [dataSource, setDataSource] = useState<PrnData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [showingCount, setShowingCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState<string>('');

  const gridRef = useRef<GridComponent>(null);
  const searchTimeout = useRef<any>(null);

  const searchableFields = [
    'jobno_joint', 'jobno_print_emb', 'print_type', 'print_description', 
    'print_colours', 'print_colour_1', 'print_colour_2'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Using your endpoint (replace with the specific PRN endpoint if different)
        const response = await fetch('https://app.herofashion.com/PrintRgb/');
        const textData = await response.text();
        const fixedJson = textData.replace(/:\s*NaN\b/g, ': null');
        const data: PrnData[] = JSON.parse(fixedJson);

        setDataSource(data);
        setTotalCount(data.length);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const highlightText = (text: any) => {
    if (!searchKey || text === undefined || text === null || text === "") return text;
    const stringText = String(text).trim();
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

  const genericHighlighter = (field: keyof PrnData) => (props: PrnData) => (
    <>{highlightText(props[field])}</>
  );

  // --- Templates ---

  const jobSummaryTemplate = (p: PrnData) => (
    <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
      <b style={{color: '#d32f2f'}}>Joint:</b> {highlightText(p.jobno_joint)}<br />
      <b>PRN/EMB:</b> {highlightText(p.jobno_print_emb)}<br />
      <b>Type:</b> {highlightText(p.print_type)}<br />
      <b>Pos:</b> {highlightText(p.top_bottom)}
    </div>
  );

  const imageTemplate = (p: PrnData) => (
    <div style={{ textAlign: 'center' }}>
      {p.img_fpath ? (
        <img 
          src={p.img_fpath} 
          alt="Job" 
          style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '4px', border: '1px solid #ddd' }} 
        />
      ) : <div style={{fontSize: '10px', color: '#ccc'}}>No Image</div>}
    </div>
  );

  const colorListTemplate = (p: PrnData) => {
    // Collect all 8 colors
    const colors = [
      p.print_colour_1, p.print_colour_2, p.print_colour_3, p.print_colour_4,
      p.print_colour_5, p.print_colour_6, p.print_colour_7, p.print_colour_8
    ].filter(c => c && c.trim() !== "");

    return (
      <div style={{ fontSize: '10px', display: 'flex', flexDirection: 'column' }}>
        {colors.map((clr, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid #eee', padding: '1px 0' }}>
            <span style={{ color: '#999', marginRight: '4px' }}>{idx + 1}.</span>
            {highlightText(clr)}
          </div>
        ))}
      </div>
    );
  };

  const conDetailsTemplate = (p: PrnData) => (
    <div style={{ fontSize: '10px', whiteSpace: 'pre-line', color: '#555' }}>
      {highlightText(p.con_jobno_print)}
      {highlightText(p.con_jobno_top_clr_siz)}
    </div>
  );

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading PRN Report...</div>;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6'
      }}>
        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#d32f2f', minWidth: '80px', marginLeft: '30px' }}>
          {showingCount} / {totalCount}
        </div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
          PRINT & EMBROIDERY (PRN) REPORT
        </div>
        <div style={{ width: '300px' }}>
          <input
            type="text"
            placeholder="Search Job No, Type, Color..."
            value={searchKey}
            onChange={onSearchChange}
            style={{
              width: '100%', padding: '6px 15px', borderRadius: '20px',
              border: '1px solid #ccc', outline: 'none', fontSize: '13px'
            }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <style>{`
          .custom-highlight { background-color: #fff9c4 !important; color: #d32f2f !important; font-weight: bold; }
          .e-rowcell { vertical-align: top !important; font-size: 11px !important; line-height: 1.3 !important; padding-top: 8px !important; }
          .e-headercell { background-color: #f1f1f1 !important; font-weight: bold !important; }
        `}</style>

        <GridComponent
          ref={gridRef}
          dataSource={dataSource}
          dataBound={updateCounts}
          height="100%"
          enableVirtualization={true}
          rowHeight={120}
          allowSorting={true}
          allowFiltering={true}
          allowResizing={true}
          filterSettings={{ type: 'Excel' }}
          gridLines="Both"
        >
          <ColumnsDirective>
            {/* Image and Job Identification */}
            <ColumnDirective field="img_fpath" headerText="IMAGE" width="100" textAlign="Center" template={imageTemplate} allowFiltering={false} />
            <ColumnDirective field="jobno_joint" headerText="JOB INFO" width="150" template={jobSummaryTemplate} />
            
            {/* Core Print Details */}
            <ColumnDirective field="print_description" headerText="DESCRIPTION" width="150" template={genericHighlighter('print_description')} />
            <ColumnDirective field="print_colours" headerText="CLR TOTAL" width="100" template={genericHighlighter('print_colours')} />
            
            {/* Detailed Color List (1-8) */}
            <ColumnDirective headerText="COLOUR LIST (1-8)" width="160" template={colorListTemplate} />
            
            {/* Technical Specifications */}
            <ColumnDirective field="screen_number" headerText="SCREEN #" width="90" textAlign="Center" template={genericHighlighter('screen_number')} />
            <ColumnDirective field="print_screen_1" headerText="S1" width="80" template={genericHighlighter('print_screen_1')} />
            <ColumnDirective field="print_screen_2" headerText="S2" width="80" template={genericHighlighter('print_screen_2')} />
            
            {/* Consolidated/Multi-line Fields */}
            <ColumnDirective headerText="CONSOLIDATED" width="180" template={conDetailsTemplate} />
            
            {/* Other Metadata (Requested all fields) */}
            <ColumnDirective field="prnclr" headerText="PRN CLR" width="100" template={genericHighlighter('prnclr')} />
            <ColumnDirective field="print_emb_ground_colour" headerText="GRND CLR" width="100" template={genericHighlighter('print_emb_ground_colour')} />
            <ColumnDirective field="individual_part_print_emb" headerText="INDV PART" width="100" />
            <ColumnDirective field="print_emb_outside_supplier" headerText="SUPPLIER" width="120" />
            <ColumnDirective field="inside_outside_print_emb" headerText="IN/OUT" width="90" />
            <ColumnDirective field="print_size_details" headerText="SIZE DTLS" width="120" />
            <ColumnDirective field="hex" headerText="HEX" width="80" />
            <ColumnDirective field="prnfile1" headerText="FILE 1" width="120" />
            <ColumnDirective field="prnfile2" headerText="FILE 2" width="120" />
            <ColumnDirective field="print_img_pen" headerText="IMG PEN" width="100" />
          </ColumnsDirective>
          <Inject services={[Sort, Filter, Group, Reorder, Search, VirtualScroll, Resize]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default PrnReportGrid;