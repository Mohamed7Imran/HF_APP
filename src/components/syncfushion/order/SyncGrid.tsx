import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  GridComponent, Inject, ColumnMenu, ColumnChooser, RowDD, Freeze,
  InfiniteScroll, CommandColumn, ContextMenu, VirtualScroll, Filter, Search, LazyLoadGroup, Reorder, Resize, Sort, PdfExport,
  ExcelExport, Edit, Page, Toolbar, Group, ColumnsDirective, ColumnDirective,
  ExcelQueryCellInfoEventArgs,
  ContextMenuClickEventArgs,
  QueryCellInfoEventArgs,
  ColumnModel,
  BeforePasteEventArgs,
  CellSaveArgs,
  FilterSettingsModel,
  ToolbarItems,
  EditMode,
  ContextMenuItem,
  ContextMenuItemModel,
  SortSettingsModel,
  SelectionSettingsModel,
  parentsUntil,
  CommandModel,
  ValueType,
  AggregateTemplateContext,
  AggregateRowModel,
  AggregateType,
  CheckboxSelectionType,
  SelectionType,
  NewRowPosition,
  FilterType,
  FilterBarMode,
  IndicatorType,
  GridColumn,
  PageEventArgs,
  GroupEventArgs,
  FilterEventArgs,
  SearchEventArgs,
  SortEventArgs,
  AddEventArgs,
  SaveEventArgs,
  EditEventArgs,
  DeleteEventArgs,
  ActionEventArgs,
  NotifyArgs,
  ReorderEventArgs,
  RowSelectEventArgs,
  ColumnSelectEventArgs,
  RowSelectingEventArgs,
  Column,
  RowDeselectEventArgs
} from '@syncfusion/ej2-react-grids';
import {
  Aggregate, AggregateColumnsDirective, AggregateColumnDirective, AggregateDirective, AggregatesDirective
} from '@syncfusion/ej2-react-grids';
import { AsyncSettingsModel, ChangedEventArgs, FileInfo, NumericTextBox, RatingComponent, TextBoxComponent, UploaderComponent } from '@syncfusion/ej2-react-inputs'
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
import { createElement, Internationalization, isNullOrUndefined, setCulture, closest } from '@syncfusion/ej2-base';
import { AutoComplete, DdtSelectEventArgs, DropDownListComponent, DropDownTree, FieldSettingsModel } from '@syncfusion/ej2-react-dropdowns';
import { AppBarComponent, MenuComponent, SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent, CheckBox, CheckBoxComponent, ChipDirective, ChipListComponent, ChipsDirective } from '@syncfusion/ej2-react-buttons';
import { DatePicker } from '@syncfusion/ej2-react-calendars';
import { BeforeOpenEventArgs, DialogComponent, TooltipComponent } from '@syncfusion/ej2-react-popups';
import { ListViewComponent, SelectEventArgs, Virtualization } from '@syncfusion/ej2-react-lists';
import { employeeDetails } from './locale/datasource';
import arLocalization from './locale/ar.json';
import deLocalization from './locale/de.json';
import frLocalization from './locale/fr.json';
import zhLocalization from './locale/zh.json';
import './Material 3/Showcase Material3/style.css';
import './sync.css'
import { L10n } from '@syncfusion/ej2-base';
import { ProgressBarComponent } from '@syncfusion/ej2-react-progressbar';
import { createRoot, Root } from 'react-dom/client';
import { useRef, useState, useMemo, JSX, useEffect, useCallback } from 'react';
// import France from '../../assets/images/France-16.jpg';
// import UAE from '../../assets/images/UAE-16.jpg';
// import China from '../../assets/images/China-16.jpg';
import ReactDOM from 'react-dom';

loadLocalization();

interface OrderData {
  jobno_oms: string;
  company_name: string;
  buyer1: string;
  stylename: string;
  uom: string;
  final_delivery_date: string;
  merch: string;
  punit_sh: string;
  styleno: string;
  production_type_inside_outside: string;
  quantity: string;
  director_sample_order: string;
  printing_R: string;
  Fdt: string;
  Emb: string;
  abc: string;
  order_follow_up: string;
  quality_controller: string;
  reference: string;
  insdatenew: string;
  styledesc: string;
  date: string;
  ourdelvdate: string;
  podate: string;
  vessel_dt: string;
  vessel_yr: string;
  shipment_complete: string;
  u7: string;
  u141: string;
  u45: string;
  u36: string;
  u31: string;
  u15: string;
  u14: string;
  u8: string;
  u25: string;
  insdate: string;
  insdateyear: string;
  actdaten: string;
  actyeardate: string;
  pono: string;
  slno: string;
  u46: string;
  u37: string;
  mainimagepath: string;
  finaldelvdate: string;
  prnclr?: string | null;
  prnfile1?: string;
  prnfile2?: string;
}

export const App = () => {
  const [dataSource, setDataSource] = useState<OrderData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const[showingCount, setShowingCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(false);
  const dropdownRefs = useRef<Record<string, DropDownListComponent>>({});
  const checkboxRefs = useRef<Record<string, CheckBoxComponent>>({});
  const checkRefs = useRef<Record<string, CheckBoxComponent>>({});
  const intl: Internationalization = new Internationalization();
  const tooltipRefs = useRef<{ [key: string]: TooltipComponent | null }>({});
  const [showDialog, setShowDialog] = useState(false);
  const selectedListItemRef = useRef<string>("Header Settings");
  const localization = useRef('en-US');
  const arabicStatus = useRef(false);
  const theme = useRef('material3');
  const displayMode = useRef('Mouse');
  const [searchKey, setSearchKey] = useState<string>('');
  const searchTimeout = useRef<any>(null);
  const gridRef = useRef<GridComponent>(null);

  const chipStatusRef = useRef<ChipListComponent | null>(null);
  let mappedType: DataType;
  let [searchText, setSearchText] = useState<string>('');
  let [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({});
  let [expandCollapseValue, setExpandCollapseValue] = useState<string>("grouping");
  let [selectedField, setSelectedField] = useState<string | null>(null);
  let [caseSensitiveChecked, setCaseSensitiveChecked] = useState<boolean>(false);
  let [ignoreAccentChecked, setIgnoreAccentChecked] = useState<boolean>(false);
  let isGenderEdit: boolean = false;
  let genderValue: string;
  let [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({});
  let selectedItemRef = useRef<{ text: string; id: string } | null>(null);
  let [dropdownValues, setDropdownValues] = useState<{ [key: string]: string }>({});
  let [disableValues, setDisableValues] = useState<{ [key: string]: boolean }>({});
  let [checkboxValues, setCheckboxValues] = useState<{ [key: string]: boolean }>({});
  let listFields = { id: "id", text: "text" };
  let isExpand: boolean = true;
  let enableRtlListView: boolean = false;
  let menuFields: FieldSettingsModel = { text: 'text', value: 'id' };
  let root: Root | null = null; // 
  let showEditLabel: boolean = false;
  let batchFlag: boolean = false;
  let isHeaderTemplate: boolean = false;
  let startTime: number = new Date().getTime();
  let imageStream: string;
  let batchEdit: BatchOrders[] = [];
  let selectedValues: string[] = [];
  let dateElement: any;
  let numericElement: any;
  let dropdownTreeElement: any;
  let checkboxElement: any;
  let productIDInput: HTMLElement;
  let productNameInput: HTMLElement;
  let customerNameInput: HTMLElement;
  let customerMailIDInput: HTMLElement;
  let shipCountryInput: HTMLElement;
  let orderIDInput: HTMLElement;
  let gridInstance: GridComponent;
  let textboxInstance: TextBoxComponent;
  let dialogInstance: DialogComponent;
  let dialogObj: DialogComponent;
  let listObj!: ListViewComponent;
  let sidebarobj = useRef(null);
  let selectedFilterType: string = "FilterBar";
  let selectedFilterBarMode: string = "OnEnter";
  let selectedIndicator: string = "Spinner";
  let selectedCheckMode: string = "Default";
  let selectionType: string = "Multiple";
  let selectNewRowPosition: string = "Top";
  let selectEditMode: string = "Normal";
  let filteredData;
  const orderIDRules: object = { required: true };
  const productIDRules: object = { required: true };
  const customerIDRules: object = { required: true };
  const emailIDRules: object = { required: true };
  const orderDateRules: object = { required: true };
  const freightIDRules: object = { required: true };
  const shipCountryRules: object = { required: true };
  const [stepIndex, setStepIndex] = useState(-1);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  let menuObj: MenuComponent;
  let menuFreightColumn: MenuComponent;
  let menuShipColumn: MenuComponent;
  const [selectedDataType, setSelectedDataType] = useState<DataType>('string');
  let [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  type DataType = 'string' | 'integer';


  const operatorMap: Record<DataType, { text: string; value: string }[]> = {
    string: [
      { text: 'equal', value: 'equal' },
      { text: 'contains', value: 'contains' },
      { text: 'startswith', value: 'startswith' },
      { text: 'endswith', value: 'endswith' },
      { text: 'like', value: 'like' }
    ],
    integer: [
      { text: 'equal', value: 'equal' },
      { text: 'greater than', value: 'greaterthan' },
      { text: 'greater than or equal', value: 'greaterthanorequal' },
      { text: 'less than', value: 'lessthan' },
      { text: 'less than or equal', value: 'lessthanorequal' },
      { text: 'not equal', value: 'notequal' }
    ]
  };

  let [operatorOptions, setOperatorOptions] = useState<{ text: string; value: string }[]>(operatorMap['string']);
  const operatorDropdown = useRef<DropDownListComponent>(null);

  const steps = [
    {
      selector: '#walk_property_settings',
      arrowPosition: 'top-right',
      content:
        (
          <div>
            <strong>Grid Customizer Hub</strong> <br /> <br />
            Click to open Grid settings. Instantly adjust layout, columns, filtering, and editing options—no coding needed.
          </div>
        )
    },
    {
      selector: '.search-container',
      arrowPosition: 'top-left-center',
      content: (
        <div>
          <strong>Rapid & Customizable Search</strong><br /><br />
          Use the toolbar search to quickly find records. Enable case sensitivity or accent handling for accurate results.
        </div>
      )
    },
    {
      selector: '#walk_property_Column_Date',
      arrowPosition: 'top-left',
      content:
        (
          <div>
            <strong>Smart Column Editor </strong><br /><br />
            Click to open column settings. Modify visibility, width, and formatting with real-time updates.
          </div>
        ),
    },
    {
      selector: '.e-toolbar-left',
      arrowPosition: 'top-right',
      content: (
        <div>
          <strong>Action Quickbar</strong><br /> <br />
          Add custom toolbar buttons to trigger actions like clear filters, expand rows, or export data—outside the Grid.
        </div>
      ),
    },
    {
      selector: '#aggregate-menu',
      arrowPosition: 'right-center',
      content: (
        <div>
          <strong>Concise Data Aggregation </strong><br /> <br />
          View and switch between aggregate types (Sum, Avg, Count) in the footer.
        </div>
      ),
    }
  ];

  
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchKey(value);
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        if (gridRef.current) gridRef.current.search(value);
      }, 400);
    };
  

  useEffect(() => {
    const gridContent = document.querySelector('.e-gridcontent');
    if (!gridContent) return;

    const handleInteraction = (e: Event) => {
      removeWalkthrough(e);
    };

    gridContent.addEventListener('mousedown', handleInteraction);
    gridContent.addEventListener('scroll', handleInteraction);
    gridContent.addEventListener('wheel', handleInteraction);

    return () => {
      gridContent.removeEventListener('mousedown', handleInteraction);
      gridContent.removeEventListener('scroll', handleInteraction);
      gridContent.addEventListener('wheel', handleInteraction);
    };
  }, []);

  const prevPositionRef = useRef({ top: 0, left: 0 });

  // Effect to handle step change: scroll container and highlight
  useEffect(() => {
    const paddingLeftRight = 15;
    if (stepIndex < 0 || stepIndex >= steps.length) return;

    const step = steps[stepIndex];
    const container = document.querySelector('.e-content') as HTMLElement;
    const element = document.querySelector(step.selector) as HTMLElement;
    if (!container || !element) return;

    // Remove old highlight, add new
    document.querySelectorAll('.walkthrough-highlight').forEach(el =>
      el.classList.remove('walkthrough-highlight')
    );
    element.classList.add('walkthrough-highlight');

    // Scroll logic simplified:
    if (!step.selector.includes('Column_Date') && !step.selector.includes('aggregate')) {
      container.scrollLeft = 0;
    } else {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      let newScrollLeft = container.scrollLeft;

      const elementLeftRelative = elementRect.left - containerRect.left;
      const elementRightRelative = elementRect.right - containerRect.left;

      if (step.selector.includes('Column_Date')) {
        newScrollLeft = elementLeftRelative + container.scrollLeft - (paddingLeftRight * 2);
      } else {
        if (elementRect.left < containerRect.left) {
          newScrollLeft -= containerRect.left - elementRect.left + paddingLeftRight;
        } else if (elementRect.right > containerRect.right) {
          newScrollLeft += elementRect.right - containerRect.right + paddingLeftRight;
        }
      }

      newScrollLeft = Math.max(0, Math.min(newScrollLeft, container.scrollWidth - containerRect.width));

      if (newScrollLeft !== container.scrollLeft) {
        container.scrollTo({ left: newScrollLeft, behavior: 'auto' });
      }
    }
  }, [stepIndex, steps]);

  // Effect to update tooltip position and handle scroll/resize events only once
  useEffect(() => {
    const updateTooltip = () => {
      const step = steps[stepIndex];
      if (!step) return;

      const element = document.querySelector(step.selector) as HTMLElement;
      if (!element) return;

      const tooltipWidth = 350;
      const tooltipHeight = 180;
      const paddingLeftRight = 15;
      const paddingTop = 10;
      const rect = element.getBoundingClientRect();

      let top = rect.bottom + window.scrollY + paddingTop;
      let left = rect.left + window.scrollX;

      if (step.selector.includes('aggregate')) {
        top = rect.top + window.scrollY + rect.height;
        left = rect.left + window.scrollX - tooltipWidth - paddingLeftRight;
      }

      // Clamp values
      left = Math.min(Math.max(left, paddingLeftRight), window.innerWidth - tooltipWidth - paddingLeftRight);
      top = Math.min(Math.max(top, paddingTop), window.innerHeight + window.scrollY - tooltipHeight - paddingTop);

      // Only update state if position changes
      const prev = prevPositionRef.current;
      if (Math.abs(prev.top - top) > 1 || Math.abs(prev.left - left) > 1) {
        prevPositionRef.current = { top, left };
        setPosition({ top, left });
      }

      const isToolbar = step.selector.includes('toolbar');
      const isSettingsIcon = step.selector.includes('walk_property_settings');
      const classMap = [
        ['walkthrough-tooltip-top-right', isToolbar ? 'walkthrough-tooltip-top-left-smaller' : isSettingsIcon ? 'walkthrough-tooltip-top-right-smaller' : 'walkthrough-tooltip-top-right'],
        ['walkthrough-tooltip-top-left-center', 'walkthrough-tooltip-top-left-center-smaller']
      ];

      const tooltipElement = document.querySelector('.walkthrough-tooltip')?.children?.[0] as HTMLElement | undefined;

      if (tooltipElement) {
        classMap.forEach(([largeClass, smallClass]) => {
          if (window.innerWidth < 768) {
            if (tooltipElement.classList.contains(largeClass)) {
              tooltipElement.classList.replace(largeClass, smallClass);
            }
          } else {
            if (tooltipElement.classList.contains(smallClass)) {
              tooltipElement.classList.replace(smallClass, largeClass);
            }
          }
        });
      }
    };

    // Debounced update function
    let debounceTimer: ReturnType<typeof setTimeout>;
    let hasScrolledToTooltip: boolean = false;

    const debouncedUpdate = () => {
      if (debounceTimer) clearTimeout(debounceTimer);

      const hScrollBar = document.querySelector('.e-toolbar .e-hscroll-bar') as HTMLElement;
      const tooltip = document.querySelector('.walkthrough-tooltip');
      if (hScrollBar && tooltip && !hasScrolledToTooltip) {
        hScrollBar.scrollTo({
          left: hScrollBar.scrollWidth,
          behavior: 'auto',
        });
        hasScrolledToTooltip = true;
      }

      debounceTimer = setTimeout(updateTooltip, 100);
    };

    // Initial update
    updateTooltip();
    debouncedUpdate();

    // Event handlers
    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('scroll', debouncedUpdate, true); // capture scroll on all ancestors

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('scroll', debouncedUpdate, true);
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [stepIndex, steps]);


  const startWalkthrough = () => setStepIndex(0);
  const nextStep = () => stepIndex < steps.length - 1 ? setStepIndex(stepIndex + 1) : endWalkthrough();
  const prevStep = () => stepIndex > 0 && setStepIndex(stepIndex - 1);
  const closeTooltip = () => endWalkthrough();
  const endWalkthrough = () => {
    document.querySelectorAll('.walkthrough-highlight').forEach((el) => el.classList.remove('walkthrough-highlight'));
    setStepIndex(-1);
  };

  const removeWalkthrough = (e: any) => {
    const tooltip = document.querySelector('.walkthrough-tooltip');
    if (tooltip && tooltip.contains(e.target)) return;
    if (tooltip) endWalkthrough();
    if (dialogInstance) {
      dialogInstance.visible = false;
    }
    if (menuObj) {
      menuObj.close();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [orderResponse] = await Promise.all([
          fetch('https://app.herofashion.com/order_panda'),
          // fetch('https://app.herofashion.com/PrintRgb/')
        ]);

        if (!orderResponse.ok) throw new Error("Failed to fetch data from APIs");
        const orderData: OrderData[] = await orderResponse.json();
        // const printData: any[] = await printResponse.json();

        // const printMap: Record<string, any> = {};
        // printData.forEach(item => {
        //   if (item.jobno_joint) printMap[item.jobno_joint] = item;
        // });

        // const mergedData = orderData.map((order) => {
        //   const matchingPrintData = printMap[order.jobno_oms] || {};
        //   return {
        //     ...order,
        //     prnclr: matchingPrintData.prnclr || null,
        //     prnfile1: matchingPrintData.prnfile1 || '',
        //     prnfile2: matchingPrintData.prnfile2 || ''
        //   };
        // });

        // const processedData = mergedData
        //   .filter((item) => {
        //     const dateStr = item.finaldelvdate || item.final_delivery_date;
        //     if (!dateStr) return true;
        //     const dateParts = dateStr.split(/[-/]/);
        //     let year = 0;
        //     if (dateParts.length === 3) {
        //       const p0 = parseInt(dateParts[0]);
        //       const p2 = parseInt(dateParts[2]);
        //       year = p0 > 1000 ? p0 : (p2 < 100 ? 2000 + p2 : p2);
        //     }
        //     return year <= 2127;
        //   })
        //   .sort((a, b) => {
        //     const typeA = (a.director_sample_order || '').toLowerCase();
        //     const typeB = (b.director_sample_order || '').toLowerCase();
        //     if (typeA !== typeB) {
        //       if (typeA === 'sample') return -1;
        //       if (typeB === 'sample') return 1;
        //       return typeA.localeCompare(typeB);
        //     }
        //     const dateA = new Date(a.finaldelvdate || a.final_delivery_date || 0).getTime();
        //     const dateB = new Date(b.finaldelvdate || b.final_delivery_date || 0).getTime();
        //     return dateA - dateB;
        //   });

        setDataSource(orderData);
        setTotalCount(orderData.length);
        setShowingCount(orderData.length);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[]);

  const gridPrivateMethods = {

    localeChanged: (value: string): void => {
      localization.current = value as string;
      setCulture(value as string);
      arabicStatus.current = value === "ar";
      if (arabicStatus.current) {
        gridInstance.enableRtl = true;
        enableRtlListView = true;
      }
      else {
        enableRtlListView = enableRtlListView ? enableRtlListView : false;
        gridInstance.enableRtl = false;
      }
    },

    themeChanged: (value: string): void => {
      const path = `https://cdn.syncfusion.com/ej2/29.1.33/${value}.css`;
      const primaryThemeLink = document.querySelector('.theme-primary') as HTMLLinkElement;
      const body = document.body;
      body.classList.forEach(cls => {
        if (cls.endsWith('-dark') || cls.endsWith('-light') || cls.startsWith('material') || cls.startsWith('fluent')) {
          body.classList.remove(cls);
        }
      });

      // Add the new theme
      body.classList.add(value);
      primaryThemeLink.href = path;

      // Update the current theme reference
      theme.current = value;
    },

    modeChanged: (value: string): void => {
      displayMode.current = value as string;
    },

    handleCheckboxChange: (id: string, checked: boolean) => {
      setCheckboxValues((prevValues) => {
        const newValues = {
          ...prevValues,
          [id]: checked,
        };
        return newValues;
      });
    },

    // Method to dynamically change dropdown values
    changeDropdownValue: (dropdownId: string, value: string) => {
      setDropdownValues((prevState) => {
        const newState = {
          ...prevState,
          [dropdownId]: value
        };
        dropdownValues = newState;
        return newState;
      });
    },

    // Method to dynamically change disabled state values
    changeDisableState: (disableId: string, value: boolean) => {
      setDisableValues((prevState) => {
        const newState = {
          ...prevState,
          [disableId]: value
        };
        disableValues = newState;
        return newState;
      });
    },


    handleClick: (value: string) => {
      
       let columns = gridInstance.getColumns();
       let commandColumn = columns.find(col => col.headerText === 'Commands');
      setDropdownValues((prev) => {
        if (selectedListItemRef.current === "Selection Settings") {
          gridInstance.selectionSettings.checkboxMode = prev.checkboxmodedefault as CheckboxSelectionType;
          gridInstance.selectionSettings.type = prev.selectiontype as SelectionType;
          if (prev.checkboxselection && (prev.checkboxmodedefault == "Default" || prev.checkboxmodedefault == "ResetOnRowClick")) {
            gridInstance.selectionSettings.enableSimpleMultiRowSelection = false;
          }
        }
        else if (selectedListItemRef.current === "Edit Settings") {
          gridInstance.editSettings.newRowPosition = prev.newrowposition as NewRowPosition;
          if (prev.editmode === 'Batch' && commandColumn) {
            commandColumn.visible = false;
            gridInstance.refreshColumns();
            gridInstance.toolbar = gridProperties.toolbarOptions.filter(item => item !== 'Edit');
            dialogObj?.hide();
          } else if (prev.editmode !== 'Batch' && commandColumn) {
            commandColumn.visible = true;
            gridInstance.refreshColumns();
            gridInstance.toolbar = gridProperties.toolbarOptions.filter(item => item !== 'Edit' && item !== 'Update' && item !== 'Delete' && item !== 'Cancel');
            dialogObj?.hide();
          }
          gridInstance.editSettings.mode = prev.editmode as EditMode; 
        }
        else if (selectedListItemRef.current === "Filter Settings") {
          gridInstance.filterSettings.type = prev.filtertype as FilterType;
          if (prev.filtertype === 'CheckBox' || prev.filtertype === 'Excel' || prev.filtertype === 'Menu') {
            let columns = gridInstance.getColumns();
            columns.forEach((col) => {
              if (col.field === 'OrderDate' || col.field === 'Freight' || col.field === 'ShipAddress' || col.field === 'Verified') {
                col.allowFiltering = false;
              }
            });
          }
          gridInstance.filterSettings.mode = prev.filterbarmode as FilterBarMode;
          gridInstance.filterSettings.loadingIndicator = prev.loadingindicator as IndicatorType;
        }
        else if (selectedListItemRef.current === "Web Standards") {
          localization.current = prev.localization;
          gridPrivateMethods.localeChanged(localization.current);
          theme.current = prev.theme;
          gridPrivateMethods.themeChanged(theme.current);
          displayMode.current = prev.interactiontypes;
          gridPrivateMethods.modeChanged(displayMode.current);
        }
        Object.keys(dropdownValues).forEach((prop) => {
          dropdownValues[prop] = prev[prop];
        });
        return prev;
      });
      setCheckboxValues((prev) => {
        if (selectedListItemRef.current === "Header Settings") {
          gridInstance.allowMultiSorting = prev.multisorting;
          gridInstance.allowSorting = prev.sorting;
          gridInstance.allowFiltering = prev.filtering;
          gridInstance.allowGrouping = prev.grouping;
          gridInstance.allowReordering = prev.reordering;
          gridInstance.allowResizing = prev.resizing;
        }
        else if (selectedListItemRef.current === "Selection Settings") {
          columns.forEach((col) => {
            if (col.type === 'checkbox') {
              col.visible = !!prev.checkboxselection; // true if enabled, false if not
              gridInstance.refreshColumns();
            }
          });
          gridInstance.selectionSettings.allowColumnSelection = prev.columnselection;
          gridInstance.selectionSettings.checkboxOnly = prev.checkboxonly;
          gridInstance.selectionSettings.persistSelection = prev.persistselection;
          gridInstance.selectionSettings.enableToggle = prev.toggle;
          gridInstance.selectionSettings.enableSimpleMultiRowSelection = prev.simplemultirow;
        }
        else if (selectedListItemRef.current === "Edit Settings") {
          gridInstance.editSettings.allowAdding = prev.adding;
          gridInstance.editSettings.allowEditOnDblClick = prev.editondoubleclick;
          if ((!prev.editing || !prev.deleting) && commandColumn) {
            commandColumn.visible = false;
            gridInstance.refreshColumns();
            gridInstance.toolbar = gridInstance.editSettings.mode === 'Batch' ? gridProperties.toolbarOptions.filter(item => item !== 'Edit') : !prev.deleting ? gridProperties.toolbarOptions.filter(item => item !== 'Delete') : gridProperties.toolbarOptions;
            dialogObj?.hide();
          }
          gridInstance.editSettings.allowEditing = prev.editing;
          gridInstance.editSettings.allowDeleting = prev.deleting;
          gridInstance.editSettings.allowNextRowEdit = prev.nextrowedit;
          gridInstance.editSettings.showConfirmDialog = prev.confirmdialog;
          gridInstance.editSettings.showDeleteConfirmDialog = prev.deletedialog;
        }
        else if (selectedListItemRef.current === "Filter Settings") {
          gridInstance.filterSettings.enableCaseSensitivity = prev.enablecasesensitivity;
          if (gridInstance.enableInfiniteScrolling) {
            gridInstance.infiniteScrollSettings = {
              enableCache: true, maxBlocks: 3, initialBlocks: 3
            };
            gridInstance.filterSettings.enableInfiniteScrolling = prev.enableinfinitescrolling;
          } else {
            gridInstance.filterSettings.enableInfiniteScrolling = prev.enableinfinitescrolling;
          }
          gridInstance.filterSettings.ignoreAccent = prev.ignoreaccent;
          gridInstance.filterSettings.showFilterBarOperator = prev.filterbar;
          gridInstance.filterSettings.showFilterBarStatus = prev.barstatus;
        }
        else if (selectedListItemRef.current === "Group Settings") {
          gridInstance.groupSettings.allowReordering = prev.groupreordering;
          gridInstance.groupSettings.showDropArea = prev.showdroparea;
          gridInstance.groupSettings.showGroupedColumn = prev.showgroupedcolumn;
          gridInstance.groupSettings.showToggleButton = prev.showtogglebutton;
          gridInstance.groupSettings.showUngroupButton = prev.showungroupbutton;
        }
        else if (selectedListItemRef.current === "Grid Settings") {
          gridInstance.allowPaging = prev.paging;
          gridInstance.autoFit = prev.autofit;
          gridInstance.setGridPager(null as unknown as HTMLElement);
          gridInstance.enableVirtualization = !prev.paging;
          gridInstance.showColumnMenu = prev.column_menu;
          gridInstance.allowTextWrap = prev.textwrap;
          gridInstance.autoFit = prev.autofit;
          gridInstance.enableAltRow = prev.altrow;
          if (gridInstance.enableAltRow) {
            gridInstance.enableAltRow = prev.altrow;
            let styleTag = document.getElementById("altrow-style") as HTMLStyleElement;
            if (prev.altrow) {
              if (!styleTag) {
                styleTag = document.createElement("style");
                styleTag.id = "altrow-style";
                document.head.appendChild(styleTag);
              }
              styleTag.innerHTML = `.e-grid .e-altrow { background-color: #008080 !important; }`;
            } else {
              if (styleTag) {
                styleTag.remove();
              }
            }
          }
          gridInstance.allowExcelExport = prev.excelexport;
          const toolbarExcelItem = document.getElementById("export_excel");
          if (!prev.excelexport) {
            toolbarExcelItem!.classList.add("e-disabled");
            toolbarExcelItem!.setAttribute("disabled", "true");
          } else {
            toolbarExcelItem!.classList.remove("e-disabled");
            toolbarExcelItem!.removeAttribute("disabled");
          }
          gridInstance.allowPdfExport = prev.pdfexport;
          const toolbarPdfItem = document.getElementById("export_pdf");
          if (!prev.pdfexport) {
            toolbarPdfItem!.classList.add("e-disabled");
            toolbarPdfItem!.setAttribute("disabled", "true");
          } else {
            toolbarPdfItem!.classList.remove("e-disabled");
            toolbarPdfItem!.removeAttribute("disabled");
          }
          gridInstance.allowRowDragAndDrop = prev.draganddrop;
          let columns = gridInstance.getColumns();
          if (prev.draganddrop) {
            columns.forEach((col) => {
              if (col.headerText === 'Commands' || col.field === 'Rating') {
                col.freeze = prev.draganddrop ? 'None' : 'Right';
              }
            });
          }
          gridInstance.allowSelection = prev.selection;
          gridInstance.enableHover = prev.hover;
        }
        else if (selectedListItemRef.current === "Web Standards") {
          if (!arabicStatus.current) {
            enableRtlListView = prev.rtl;
            dialogObj.enableRtl = prev.rtl;
            gridInstance.enableRtl = prev.rtl;
            listObj.enableRtl = prev.rtl;
          }
          Object.keys(dropdownRefs.current).forEach((key) => {
            dropdownRefs.current[key].enableRtl = prev.rtl;
          });
          Object.keys(checkboxRefs.current).forEach((key) => {
            checkboxRefs.current[key].enableRtl = prev.rtl;
          });
        }
        Object.keys(checkboxValues).forEach((prop) => {
          checkboxValues[prop] = prev[prop];
        });
        return prev;
      });

      if (value === "Save") {
        dialogObj?.hide();
      }
    },

    sortComparer: (reference: ValueType, comparer: ValueType): number => {
      if (typeof reference === "string" && typeof comparer === "string") {
        return reference.localeCompare(comparer);
      }
      if (typeof reference === "number" && typeof comparer === "number") {
        return reference - comparer;
      }
      if (reference instanceof Date && comparer instanceof Date) {
        return reference.getTime() - comparer.getTime();
      }
      if (typeof reference === "boolean" && typeof comparer === "boolean") {
        return Number(reference) - Number(comparer);
      }
      return 0;
    },
  };

  const dropdownDataSource = {
    filterBarTypeOptions: [
      { value: "Menu", text: "Menu" },
      { value: "CheckBox", text: "CheckBox" },
      { value: "Excel", text: "Excel" },
      { value: "FilterBar", text: "FilterBar" }
    ],
    shipCountryData: [
      { text: 'Germany', value: 'Germany' },
      { text: 'France', value: 'France' },
      { text: 'Brazil', value: 'Brazil' },
      { text: 'Belgium', value: 'Belgium' },
      { text: 'Switzerland', value: 'Switzerland' },
      { text: 'Venezuela', value: 'Venezuela' },
      { text: 'Austria', value: 'Austria' },
      { text: 'Mexico', value: 'Mexico' },
    ] as object[],
    columnFields: [
      'OrderID', 'CustomerName', 'ShipAddress', 'ProductName', 'ProductID',
      'Quantity', 'Freight', 'ShipCountry', 'Rating', 'ShipName'
    ],

    listViewData: [
      { text: 'Header Settings', id: 'list-01' },
      { text: 'Grid Settings', id: 'list-02' },
      { text: 'Group Settings', id: 'list-03' },
      { text: 'Filter Settings', id: 'list-04' },
      { text: 'Selection Settings', id: 'list-05' },
      { text: 'Edit Settings', id: 'list-06' },
      { text: 'Web Standards', id: 'list-07' }
    ],
    indicators: [
      { value: "Spinner", text: "Spinner" },
      { value: "Shimmer", text: "Shimmer" }
    ],

    selectiontype: [
      { value: "Single", text: "Single", isDisabled: true },
      { value: "Multiple", text: "Multiple", isDisabled: false }
    ],

    selectiontypeModified: [
      { value: "Single", text: "Single", isDisabled: false },
      { value: "Multiple", text: "Multiple", isDisabled: false }
    ],

    checkboxmode: [
      { value: "Default", text: "Default" },
      { value: "ResetOnRowClick", text: "ResetOnRowClick" }
    ],


    newRowPosition: [
      { value: "Top", text: "Top" },
      { value: "Bottom", text: "Bottom" }
    ],

    editMode: [
      { value: "Normal", text: "Normal", isDisabled: false },
      { value: "Dialog", text: "Dialog", isDisabled: false },
      { value: "Batch", text: "Batch", isDisabled: false }
    ],

    editModeModified: [
      { value: "Normal", text: "Normal", isDisabled: false },
      { value: "Dialog", text: "Dialog", isDisabled: false }
    ],


    filterBarModeOptions: [
      { value: "OnEnter", text: "OnEnter" },
      { value: "Immediate", text: "Immediate" }
    ],

    modeData: [
      { text: 'Mouse', value: 'Mouse' },
      { text: 'Touch', value: 'Touch' },
    ] as KeyDataType[],

    themeData: [
      { text: 'Material3', value: 'material3' },
      { text: 'Material3 Dark', value: 'material3-dark' },
      { text: 'Fluent', value: 'fluent' },
      { text: 'Fluent Dark', value: 'fluent-dark' }
    ],
    localizationData: [
      { text: 'English', value: 'en-US', image: 'https://ej2.syncfusion.com/javascript/demos/src/tree-grid/images/USA.png' },
      { text: 'Germany', value: 'de', image: 'https://ej2.syncfusion.com/javascript/demos/src/tree-grid/images/Germany.png' },
    //   { text: 'French', value: 'fr', image: France },
    //   { text: 'Arabic', value: 'ar', image: UAE },
    //   { text: 'Chinese', value: 'zh', image: China }
    ]
  };

  const gridCommonTemplates = {

    emptyMessageTemplate() {
      let srcImage: string = '';
      if (document.body.classList.value.indexOf('dark') > -1 || document.body.classList.value.indexOf('highcontrast') > -1) {
        srcImage = "https://ej2.syncfusion.com/react/demos/src/grid/images/emptyRecordTemplate_dark.svg";
      } else {
        srcImage = "https://ej2.syncfusion.com/react/demos/src/grid/images/emptyRecordTemplate_light.svg";
      }
      return (<div className='emptyRecordTemplate'>
        <img src={srcImage} className="e-emptyRecord" alt="No record" />
        <span>There is no data available to display at the moment.</span>
      </div>);
    },

    /* eslint-disable-next-line react/jsx-no-target-blank */
    productTemplate(props: any) {
      const productName = props?.ProductName ? props.ProductName.replace(/\s+/g, '-') : '';
      return (
        <div>
          <a
            href={`https://www.google.com/search?q=${productName}`} target="_blank"
            style={{ color: 'blue', cursor: 'pointer' }}
          >
            {props?.ProductID ?? ''}
          </a>
        </div>
      );
    },

    columnMenuSettings: () => {
      return (
        <div className='iconAlignment'>
          <span className="e-icons e-user icon" style={{ marginTop: '-2px' }}></span> Customer Details
        </div>
      )
    },

    columnClipModeSettings: (column: GridColumn) => {
      const align = column.headerTextAlign;
      const justify =
        align === 'Right' ? 'flex-end' :
          align === 'Center' ? 'center' : 'flex-start';
      return (
        <div className='settingsIconAlignment'>
          <div className='settingsIconText' style={{ justifyContent: justify }}>
            <div>Ship Address</div>
          </div>
          <span className='iconMarginAlign'>
            <MenuComponent ref={(scope: MenuComponent) => (menuShipColumn = scope)}
              items={menuItemProperties.columnMenuProperties}
              fields={menuFields}
              enableRtl={enableRtlListView}
              template={menuItemTemplates.menuSwitchTemplate}
              showItemOnClick={true}
              beforeOpen={() => {
                const settings = {
                  'Enable Grouping': gridInstance.allowGrouping,
                  'Enable Resizing': gridInstance.allowResizing
                };
                Object.entries(settings).forEach(([item, isEnabled]) => {
                  if (!isEnabled) {
                    menuShipColumn.enableItems([item], false);
                  }
                });
              }}
              select={() => {
                isHeaderTemplate = true;
              }}
              cssClass="custom-menu-column-clipmode"
            />
          </span>
        </div>
      )
    },

    columnMenuCheckboxSettings: (column: GridColumn) => {
      const align = column.headerTextAlign;
      const justify =
        align === 'Right' ? 'flex-end' :
          align === 'Center' ? 'center' : 'flex-start';
      return (
        <div className='settingsIconAlignment'>
          <div className='settingsIconText' style={{ justifyContent: justify }}>
            <span className="e-icons e-check-box icon"></span>
            <div>Verified</div>
          </div>
          <span className='iconMarginAlign'>
            <MenuComponent
              items={menuItemProperties.columnMenuCheckboxProperties}
              template={menuItemTemplates.menuSwitchTemplate}
              enableRtl={enableRtlListView}
              showItemOnClick={true}
              select={(args) => {
                isHeaderTemplate = true;
              }}
              cssClass="custom-menu-column-verified"
            /></span>
        </div>
      )
    },

    columnMenuDateFormatSettings: (column: GridColumn) => {
      const align = column.headerTextAlign;
      const justify =
        align === 'Right' ? 'flex-end' :
          align === 'Center' ? 'center' : 'flex-start';
      return (
        <div className='settingsIconAlignment'>
          <div className='settingsIconText' style={{ justifyContent: justify }}>
            <span className="e-icons e-day icon"></span>
            <div>Order Date</div>
          </div>
          <span className='iconMarginAlign'>
            <MenuComponent
              items={menuItemProperties.columnMenuDateFormatProperties}
              fields={menuFields}
              enableRtl={enableRtlListView}
              template={menuItemTemplates.menuSwitchTemplate}
              showItemOnClick={true}
              select={(args) => {
                isHeaderTemplate = true;
              }}
              cssClass="custom-menu-column-date"
            />
          </span>
        </div>
      )
    },

    columnMenuFormatSettings: (column: GridColumn) => {
      const align = column.headerTextAlign;
      const justify =
        align === 'Right' ? 'flex-end' :
          align === 'Center' ? 'center' : 'flex-start';
      return (
        <div className='settingsIconAlignment'>
          <div className='settingsIconText' style={{ justifyContent: justify }}>
            <span className="sf-icon-freight"></span>
            <div>Job_no</div>
          </div>
          <span className='iconMarginAlign'>
            <MenuComponent ref={(scope: MenuComponent) => (menuFreightColumn = scope)}
              items={menuItemProperties.columnMenuFormatProperties}
              fields={menuFields}
              enableRtl={enableRtlListView}
              template={menuItemTemplates.menuSwitchTemplate}
              showItemOnClick={true}
              beforeOpen={() => {
                const settings = {
                  'Enable Grouping': gridInstance.allowGrouping,
                  'Enable Reordering': gridInstance.allowReordering,
                  'Enable Resizing': gridInstance.allowResizing,
                  'Enable Editing': gridInstance.editSettings.allowEditing
                };
                Object.entries(settings).forEach(([item, isEnabled]) => {
                  if (!isEnabled) {
                    menuFreightColumn.enableItems([item], false);
                  }
                });
              }}
              select={() => {
                isHeaderTemplate = true;
              }}
              cssClass="custom-menu-column-number"
            />
          </span>
        </div>
      )
    },

    localeValueTemplate: (data: any) => {
      return (<div style={{ marginTop: "5px" }}><span><img style={{ width: '16px', height: '12px' }} className="country_image" src={data.image} alt={data.text} /><span> &nbsp;&nbsp; {data.text}</span></span></div>);
    },

    localizationFlagTemplate: (data: any) => {
      return (
        <span><img style={{ width: '16px', height: '12px' }} className="country_image" src={data.image} alt={data.text} /><span> &nbsp;&nbsp; {data.text}</span></span>
      );
    },

    selectItem: () => {
      if (selectedItemRef.current && listObj) {
        listObj.selectItem({ id: selectedItemRef.current.id });
      }
    },

    listTemplate: (data: any) => {
      return (<div id="sidebarList">
        <span className="text e-text-content" id={data.text} >{data.text}</span>
      </div>);
    },

    OnSelect: (args: SelectEventArgs) => {
      const selectedItem = (args.data as any).text || "Header Settings";
      selectedListItemRef.current = selectedItem;
      const listContent = document.getElementById("listContent");
      const newContent = customComponentTemplates.addPropertiesInsideDialogbox(selectedItem);
      if (listContent !== null && newContent !== null) {
        root = createRoot(listContent);
        root.render(newContent);
      }
    },

    sideBar: (): JSX.Element => {
      const dialogListContents = document.getElementById('listContent');
      if (dialogListContents) {
        dialogListContents.remove();
      }

      const listMainContent = document.querySelector(".listmaincontent");
      if (listMainContent) {
        listMainContent.remove();
      }
      return (
        <div id="sblist-wrapper" className="control-section">
          <div id="sidelistwrapper">
            <div className="listmaincontent">
              <div>
                <div id="listContent" className="listcontent">
                  {customComponentTemplates.addPropertiesInsideDialogbox("Header Settings")}
                </div>
              </div>
            </div>
          </div>

          <SidebarComponent id="listSidebar" ref={sidebarobj} enableDock={true}
            dockSize="0px" className="sidebar-list" width="350px"
            target=".listmaincontent"
            type="Auto"
            isOpen={true}
          >
            <ListViewComponent id="listSidebarList" enableRtl={enableRtlListView} ref={(list: any) => listObj = list} dataSource={dropdownDataSource.listViewData} height='100%' cssClass="e-template-list" template={gridCommonTemplates.listTemplate} fields={listFields} select={gridCommonTemplates.OnSelect}>
              <Inject services={[Virtualization]} />
            </ListViewComponent>
          </SidebarComponent>
        </div>
      );
    },

    dialogObjOpen: () => {
      setShowDialog(true);
      gridCommonTemplates.selectItem();
      const indicatorElement = document.getElementById("loadingindicator");
      const infinitescrollingElement = document.getElementById("enableinfinitescrolling");
      if (gridInstance.filterSettings.type === "FilterBar" || gridInstance.filterSettings.type === "Menu") {
        indicatorElement!.classList.add("e-disabled");
        indicatorElement!.setAttribute("disabled", "true");
        infinitescrollingElement!.classList.add("e-disabled");
        infinitescrollingElement!.setAttribute("disabled", "true");
      }
    },

    dialogObjClose: () => {
      if (selectedItemRef.current && listObj) {
        listObj.unselectItem(selectedItemRef.current);
        console.log("Restored Selected Item:", selectedItemRef.current.text);
      }
      setShowDialog(false);
    },

    footerTemplate: () => {
      return (
        <div className='dialog-footer' style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonComponent cssClass="e-link" onClick={() => gridPrivateMethods.handleClick('Save')}>
            Save
          </ButtonComponent>
          <ButtonComponent cssClass="e-link" onClick={() => gridPrivateMethods.handleClick('Apply')}>
            Apply
          </ButtonComponent>
        </div>
      );
    },


    settingsDialogTemplate: (): JSX.Element => {
      return (
        <div style={{ marginTop: '4px' }}>
          <span style={{ fontSize: '16px' }} id="walk_property_settings" className='e-icons e-settings icon'></span>
          <DialogComponent
            id="example_dialog"
            ref={(dialog: any) => dialogObj = dialog}
            enableRtl={enableRtlListView}
            visible={showDialog}
            isModal={true}
            header="Settings"
            height='100%'
            width='720px'
            content={gridCommonTemplates.sideBar}
            open={gridCommonTemplates.dialogObjOpen}
            close={gridCommonTemplates.dialogObjClose}
            footerTemplate={gridCommonTemplates.footerTemplate as any}
            showCloseIcon={true}
          >
          </DialogComponent>
        </div>);
    },

    customerDetailsTemplate: () => {
      return (
        <div className='iconAlignment'>
          <span className="e-icons e-user icon" style={{ marginTop: '-2px' }}></span> Customer Details
        </div>
      )
    },

    productDetailsTemplate: () => {
      return (
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <span className="sf-icon-order-details"></span> &nbsp;
          <span>Product Details</span>
        </div>
      )
    },

    shipCountryTemplate: () => {
      return (
        <div className="Mapimage" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <img src="https://ej2.syncfusion.com/react/demos/src/grid/images/Map.png" className="e-image" style={{ display: 'flex', alignItems: 'center' }} alt="Marker" />&nbsp;
          Ship Country
        </div>
      )
    },

    getCountryMessage: (shipCountry: string) => {
      switch (shipCountry) {
        case 'France':
          return France;
        case 'Germany':
          return 'https://ej2.syncfusion.com/javascript/demos/src/tree-grid/images/Germany.png';
        case 'Brazil':
          return 'https://ej2.syncfusion.com/react/demos/src/grid/images/country/Brazil.png';
        case 'Spain':
          return 'https://ej2.syncfusion.com/react/demos/src/grid/images/country/Spain.png';
        case 'Switzerland':
          return 'https://ej2.syncfusion.com/react/demos/src/grid/images/country/Switzerland.webp';
        case 'Italy':
          return 'https://ej2.syncfusion.com/react/demos/src/grid/images/country/Italy.png';
        default:
          return 'https://ej2.syncfusion.com/javascript/demos/src/tree-grid/images/USA.png';
      }
    },

    countryTemplate: (props: Orders): JSX.Element => {
      let countryImage = gridCommonTemplates.getCountryMessage(props.ShipCountry);
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={countryImage} alt={props.ShipCountry} style={{ width: '24px', height: '16px' }} />
          <span>{props.ShipCountry}</span>
        </div>
      );
    },

    orderDetailsTemplate: () => {
      return (
        <div className='templateText'>
          <span className="sf-icon-order-details"></span> &nbsp;
          <span>Order Details</span>
        </div>
      )
    },

    shippingDetailsTemplate: () => {
      return (
        <div className='templateText'>
          <span className="sf-icon-order-details"></span> &nbsp;
          <span>Shipping Information</span>
        </div>
      )
    },

    genderEditTemplate: (props: Orders): JSX.Element => {
      const genderData = [
        { text: 'Male', value: 'Male' },
        { text: 'Female', value: 'Female' }
      ];
      const [gender, setGender] = useState(props?.Gender || 'Male');
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <DropDownListComponent
            dataSource={genderData}
            value={gender}
            fields={{ text: 'text', value: 'value' }}
            change={(e) => {
              let columns = gridInstance.getColumns();
              columns.forEach((col) => {
                if (col.index === 3) {
                  isGenderEdit = true;
                  genderValue = e.value;
                }
              });
            }
            }
            popupHeight="120px"
            placeholder="Select Gender"
          />
        </div>
      );
    },

    imageTemplate: (props: Orders): JSX.Element => {
      return (
        <div className="image-container">
          <div className="profile-image">
            {isGenderEdit ? (
              <span className={genderValue === "Male" ? "sf-icon-male" : "sf-icon-female"}></span>
            ) : (
              <span className={props.Gender === "Male" ? "sf-icon-male" : "sf-icon-female"}></span>
            )}

          </div>
        </div>
      );
    }

  };

  const gridAggregateTemplates = {

    aggregateCustomization: (text: string) => {
      return (props: AggregateTemplateContext) => {
        const { Sum, Average, Min, Max, Count } = props as {
          Sum?: number;
          Average?: number;
          Min?: number;
          Max?: number;
          Count?: number;
        };
        const aggregationValue =
          Sum ?? Average ?? Min ?? Max ?? Count ?? 'N/A';
        return (
          <div id='aggregate-menu' style={{ display: 'inline-flex' }}>
            <MenuComponent ref={(scope: MenuComponent) => (menuObj = scope)}
              items={text === 'footer' ? menuItemProperties.aggregateValues : menuItemProperties.aggregateGroupValues}
              fields={menuFields}
              enableScrolling={true}
              enableRtl={enableRtlListView}
              template={menuItemTemplates.menuSwitchTemplate}
              showItemOnClick={true}
              cssClass="footer-sum"
              beforeOpen={(e) => {
                if (e.parentItem.text === 'Sum' || e.parentItem.text === 'Average' || e.parentItem.text === 'Min' || e.parentItem.text === 'Max' || e.parentItem.text === 'Count') {
                  (closest(e.element, '.e-menu-wrapper') as HTMLElement).style.height = '160px';
                }
              }}
              select={(e) => {
                const selectedText = e.item.text;
                const aggregateValues = text === 'footer' ? menuItemProperties.aggregateValues[0] :
                  menuItemProperties.aggregateGroupValues[0];
                // Update outer text
                aggregateValues.text = selectedText;
                // Update checkbox selections
                aggregateValues.items.forEach(item => {
                  item.checkbox = (item.text === selectedText);
                });
              }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: '#1C1B1F', fontSize: '14px', fontWeight: 'bold' }}>
                &nbsp; : &nbsp;
                <span style={{ color: '#B3261E', fontSize: '14px', fontWeight: '700' }}>
                  {aggregationValue}
                </span>
              </span>
            </div>
          </div>
        )
      }
    },

    GroupSummaryCalculation: (args: ChangeEventArgs, data?: any) => {
      if (gridInstance) {
        let aggregates: AggregateRowModel[] = gridInstance.aggregates as AggregateRowModel[];
        if (aggregates.length > 0 && aggregates[1].columns && aggregates[1].columns.length > 0) {
          aggregates[1].columns[0].type = data.properties.text;
          aggregates[1].columns[0].groupFooterTemplate = gridAggregateTemplates.aggregateCustomization('groupFooter');
        }
      }
    },

    SummaryCalculation: (args: ChangeEventArgs, data?: any) => {
      if (gridInstance) {
        let aggregates: AggregateRowModel[] = gridInstance.aggregates as AggregateRowModel[];
        if (aggregates.length > 0 && aggregates[0].columns && aggregates[0].columns.length > 0) {
          aggregates[0].columns[0].type = data.properties.text;
          aggregates[0].columns[0].footerTemplate = gridAggregateTemplates.aggregateCustomization('footer');
        }
      }
    },

    footerCountTemplate: (props: AggregateTemplateContext): JSX.Element => {
      return (
        <div className='templateText'>
          <span className="sf-icon-shopping-cart" style={{ fontSize: '18px' }}></span>
          <span style={{ color: '#1C1B1F', fontSize: '14px', fontWeight: 'bold', marginLeft: '5px' }}>
            Total Orders:
            <span style={{ color: '#B3261E', fontSize: '14px', fontWeight: '700', marginLeft: '5px' }}>
              {(props as { Count?: number }).Count}
            </span>
          </span>
        </div>
      )
    },

    footerAvgTemplate: (props: any): JSX.Element => {
      const displayValue = props.Average === " " || isNullOrUndefined(props.Average) ? 0 : Number(props.Average).toFixed(1);
      return <div style={{ textAlign: 'center' }}><span style={{ color: '#1C1B1F', fontSize: '14px', fontWeight: '700' }}>Avg Rating: &nbsp;<span style={{ color: '#B3261E', fontSize: '14px', fontWeight: '700' }}>{displayValue}</span></span></div>;
    },

    groupCaptionMaxTemplate: (props: AggregateTemplateContext): JSX.Element => {
      return (<div>
        <span className='groupCaptionMinText'>
          Min
        </span>
        <span> ${Number((props as { Min?: number | string }).Min ?? 0).toFixed(2)}</span> &nbsp; &nbsp;
        <span className='groupCaptionMaxText'>
          Max
        </span>
        <span> ${Number((props as { Max?: number | string }).Max ?? 0).toFixed(2)}</span>
      </div>);
    }

  };

  const menuItemMethods = {
    gridLineValueChange: (args: ChangeEventArgs, data?: any) => {
      if (gridInstance) {
        gridInstance.gridLines = data.properties.text;
      }
    },

    htmlEncodeChange: ((args: ChangeEventArgs) => {
      if (gridInstance) {
        let columns = gridInstance.getColumns();
        columns.forEach((col) => {
          if (col.headerText === 'Order ID') {
            if (args.checked) {
              col.disableHtmlEncode = false;
            } else {
              col.disableHtmlEncode = true;
            }
          }
        });
        gridInstance.refreshColumns();
      }

    }),

    enableCheckBoxChange: ((args: ChangeEventArgs) => {
      if (gridInstance) {
        let columns = gridInstance.getColumns();
        columns.forEach((col) => {
          if (col.field === 'Verified') {
            col.displayAsCheckBox = args.checked;
          }
        });
        gridInstance.refreshColumns();
      }
    }),

    hideSpecifiedColumn: ((args: ChangeEventArgs) => {
      if (gridInstance) {
        let columns = gridInstance.getColumns();
        columns.forEach((col) => {
          if (col.headerText === 'Verified') {
            col.visible = args.checked;
            gridInstance.refreshColumns();
          }
        });
      }

    }),

    singleColumnSettingsClipMode: ((args: ChangeEventArgs, data?: any) => {
      if (gridInstance) {
        let columns = gridInstance.getColumns();
        columns.forEach((col) => {
          if (col.field === "ShipAddress") {
            col.clipMode = data.properties.text;
            gridInstance.refreshColumns();
          }
        });
      }
    }),

    singleColumnSettingsDateFormat: ((args: ChangeEventArgs, data: any) => {
      let columns = gridInstance.getColumns();
      columns.forEach((col) => {
        if (col.field === 'OrderDate') {
          col.format = data.properties.text;
          gridInstance.refreshColumns();
        }
      });
    }),

    singleColumnSettingsHeaderTextAlign: ((args: ChangeEventArgs, data?: any) => {
      if (gridInstance) {
        let columns = gridInstance.getColumns();
        columns.forEach((col) => {
          if (col.field === "jobno_oms") {
            col.headerTextAlign = data.properties.text;
          }
        });
        gridInstance.refreshColumns();
      }
    }),

    singleColumnSettingsCellTextAlign: ((args: ChangeEventArgs, data?: any) => {
      if (gridInstance) {
        let columns = gridInstance.getColumns();
        columns.forEach((col) => {
          if (col.field === "jobno_oms") {
            col.textAlign = data.properties.text;
          }
        });
        gridInstance.refreshColumns();
      }
    }),

    enableColumnEditing: ((args: ChangeEventArgs) => {
      if (gridInstance) {
        let columns = gridInstance.getColumns();
        columns.forEach((col) => {
          if (col.index === 12) {
            col.allowEditing = args.checked;
          }
        });
      }
    }),

    enableColumnFiltering: ((args: ChangeEventArgs) => {
      if (gridInstance) {
        let columns = gridInstance.getColumns();
        columns.forEach((col) => {
          if (col.index === 12) {
            col.allowFiltering = args.checked;
          }
        });
      }
    }),

    enableColumnGrouping: ((args: ChangeEventArgs) => {
      if (gridInstance) {
        let columns = gridInstance.getColumns();
        columns.forEach((col) => {
          if (col.index === 12 || col.index === 15) {
            col.allowGrouping = args.checked;
          }
        });
      }
    }),

    enableColumnReordering: ((args: ChangeEventArgs) => {
      if (gridInstance) {
        let columns = gridInstance.getColumns();
        columns.forEach((col) => {
          if (col.index === 12) {
            col.allowReordering = args.checked;
          }
        });
      }
    }),

    enableColumnResize: ((args: ChangeEventArgs) => {
      if (gridInstance) {
        let columns = gridInstance.getColumns();
        columns.forEach((col) => {
          if (col.index === 12 || col.index === 15) {
            col.allowResizing = args.checked;
          }
        });
      }
    }),

    enableColumnSearching: ((args: ChangeEventArgs) => {
      if (gridInstance) {
        let columns = gridInstance.getColumns();
        columns.forEach((col) => {
          if (col.index === 12) {
            col.allowSearching = args.checked;
          }
        });
      }
    }),

    singleColumnSettingsFormat: ((args: ChangeEventArgs, data: any) => {
      if (gridInstance) {
        let columns = gridInstance.getColumns();
        columns.forEach((col) => {
          if (col.field === 'Freight') {
            col.format = data.properties.text;
            gridInstance.refreshColumns();
          }
        });

        const aggregateColumns = gridInstance.aggregates[0].columns;
        aggregateColumns?.forEach((col) => {
          if (col.field === "Freight") {
            col.format = data.properties.text;
          }
        });
      }
    }),

    setElementState: (element: HTMLElement | null, enabled: boolean) => {
      if (!element) return;
      if (enabled) {
        element.classList.remove("e-disabled");
        element.removeAttribute("disabled");
      } else {
        element.classList.add("e-disabled");
        element.setAttribute("disabled", "true");
      }
    },

    dropdownValueChange: (
      selectedListItem: string,
      items: GridPropertiesConfig,
      dropRef: any,
      checkRef: any
    ) => {
      const newrowpositionElement = document.getElementById("newrowposition");
      const filterbarmodeElement = document.getElementById("filterbarmode");
      const loadingIndicatorElement = document.getElementById("loadingindicator");
      const checkboxmodedefaultElement = document.getElementById("checkboxmodedefault");

      setDisableValues((prev) => {
        const update = { ...prev };

        if (selectedListItem === "Edit Settings") {
          const editMode = dropRef['editmode'].value;
          update.confirmdialog = true;
          checkRef['confirmdialog'].disabled = true;

          if (editMode === "Dialog") {
            update.nextrowedit = true;
            update.newrowposition = false;
          } else if (editMode === "Normal") {
            update.nextrowedit = false;
            update.newrowposition = true;
          } else if (editMode === "Batch") {
            update.confirmdialog = false;
            checkRef['confirmdialog'].disabled = false;
            update.nextrowedit = false;
            update.newrowposition = true;
          } 
          else {
            update.confirmdialog = false;
            update.nextrowedit = false;
            update.newrowposition = true;
          }

          checkRef['nextrowedit'].disabled = update.nextrowedit;
          dropRef['newrowposition'].enabled = update.newrowposition;
          menuItemMethods.setElementState(newrowpositionElement, update.newrowposition);
        }

        else if (selectedListItem === "Filter Settings") {
          const filterType = dropRef['filtertype'].value;

          const isFilterBar = filterType === "FilterBar";
          const isExcelOrCheckBox = filterType === "Excel" || filterType === "CheckBox";
          const isMenu = filterType === "Menu";

          update.filterbar = !isFilterBar;
          update.barstatus = !isFilterBar;
          update.filterbarmode = isFilterBar;
          update.loadingindicator = isExcelOrCheckBox;
          update.enableinfinitescrolling = !isFilterBar && !isMenu;

          checkRef['filterbar'].disabled = update.filterbar;
          checkRef['barstatus'].disabled = update.barstatus;
          dropRef['filterbarmode'].enabled = update.filterbarmode;
          dropRef['loadingindicator'].enabled = update.loadingindicator;
          checkRef['enableinfinitescrolling'].disabled = !update.enableinfinitescrolling;

          menuItemMethods.setElementState(filterbarmodeElement, update.filterbarmode);
          menuItemMethods.setElementState(loadingIndicatorElement, update.loadingindicator);
        }

        else if (selectedListItem === "Selection Settings") {
          const selectionType = dropRef['selectiontype'].value;
          const isMultiple = selectionType === "Multiple";

          update.simplemultirow = !isMultiple;
          update.toggle = false;
          update.checkboxselection = !isMultiple;
          update.persistselection = true;
          update.checkboxonly = true;
          update.checkboxmodedefault = true;

          checkRef['simplemultirow'].disabled = update.simplemultirow;
          checkRef['toggle'].disabled = update.toggle;
          checkRef['checkboxselection'].disabled = update.checkboxselection;
          checkRef['persistselection'].disabled = update.persistselection;
          checkRef['checkboxonly'].disabled = update.checkboxonly;
          dropRef['checkboxmodedefault'].disabled = update.checkboxmodedefault;
          menuItemMethods.setElementState(checkboxmodedefaultElement, !update.checkboxmodedefault);
        }

        Object.assign(disableValues, update);
        return update;
      });
    },
    
    toggleListItem: (itemText: string, enable: boolean, listObj: any, dropdownDataSource: any) => {
      const index = dropdownDataSource.listViewData.findIndex((item: any) => item.text === itemText);
      if (index !== -1 && listObj) {
        enable ? listObj.enableItem(dropdownDataSource.listViewData[index]) : listObj.disableItem(dropdownDataSource.listViewData[index]);
      }
    },

    toggleElement: (elementId: string, enable: boolean) => {
      const el = document.getElementById(elementId);
      if (el) {
        el.classList.toggle("e-disabled", !enable);
        el.toggleAttribute("disabled", !enable);
      }
    },

    checkboxValueChange: (selectedListItem: string, items: GridPropertiesConfig, checkRef: any, dropRef: any) => {
      setDisableValues(prev => {
        const updateCheckboxState = (key: string, state: boolean) => {
          checkRef[key].disabled = prev[key] = !state;
        };

        switch (selectedListItem) {
          case "Header Settings":
            menuItemMethods.toggleListItem("Filter Settings", checkRef['filtering'].checked, listObj, dropdownDataSource);
            updateCheckboxState("multisorting", checkRef['sorting'].checked);
            menuItemMethods.toggleListItem("Group Settings", checkRef['grouping'].checked, listObj, dropdownDataSource);
            break;

          case "Grid Settings":
            menuItemMethods.toggleListItem("Selection Settings", checkRef['selection'].checked, listObj, dropdownDataSource);
            updateCheckboxState("autofit", checkRef['column_menu'].checked);
            break;

          case "Selection Settings":
            const isCheckboxSelected = checkRef['checkboxselection'].checked;
            dropRef['selectiontype'].dataSource = isCheckboxSelected ? dropdownDataSource.selectiontype : dropdownDataSource.selectiontypeModified;
            dropRef['selectiontype'].value = dropdownValues['selectiontype'];

            ["simplemultirow", "toggle"].forEach(key => updateCheckboxState(key, !isCheckboxSelected));
            ["persistselection", "checkboxonly"].forEach(key => updateCheckboxState(key, isCheckboxSelected));
            dropRef['checkboxmodedefault'].disabled = prev.checkboxmodedefault = !isCheckboxSelected;
            menuItemMethods.toggleElement("checkboxmodedefault", isCheckboxSelected);
            break;

          case "Edit Settings":
            const isEditing = checkRef['editing'].checked;
            ["nextrowedit", "editondoubleclick"].forEach(key => updateCheckboxState(key, isEditing));
            dropRef['editmode'].enabled = prev.editMode = isEditing;
            menuItemMethods.toggleElement("editmode", isEditing);

            const isDialogMode = dropRef['editmode'].value === 'Dialog';
            const newRowEnabled = isEditing && !isDialogMode;
            dropRef['newrowposition'].enabled = prev.newrowposition = newRowEnabled;
            menuItemMethods.toggleElement("newrowposition", newRowEnabled);

            updateCheckboxState("deletedialog", checkRef['deleting'].checked);

            const isAdding = checkRef['adding'].checked;
            const addRowEnabled = isAdding && !isDialogMode;
            dropRef['newrowposition'].enabled = prev.newrowposition = addRowEnabled;
            menuItemMethods.toggleElement("newrowposition", addRowEnabled);
            break;
        }

        Object.keys(disableValues).forEach(prop => {
          disableValues[prop] = prev[prop];
        });

        return prev;
      });
    },

  };

  const menuItemProperties = {
    gridLineProperties: [
      {
        iconCss: 'e-icons e-border-all',
        items: [
          { text: 'Both', id: 'GridLine Both', method: menuItemMethods.gridLineValueChange, checkbox: true },
          { text: 'Default', id: 'GridLine Default', method: menuItemMethods.gridLineValueChange, checkbox: false },
          { text: 'Horizontal', id: 'GridLine Horizontal', method: menuItemMethods.gridLineValueChange, checkbox: false },
          { text: 'Vertical', id: 'GridLine Vertical', method: menuItemMethods.gridLineValueChange, checkbox: false },
          { text: 'None', id: 'GridLine None', method: menuItemMethods.gridLineValueChange, checkbox: false }
        ],
      },
    ],
    aggregateValues: [
      {
        text: 'Sum',
        items: [
          { text: 'Sum', id: 'Aggregate Sum', checkbox: true, method: gridAggregateTemplates.SummaryCalculation },
          { text: 'Average', id: 'Aggregate Average', checkbox: false, method: gridAggregateTemplates.SummaryCalculation },
          { text: 'Min', id: 'Aggregate Min', checkbox: false, method: gridAggregateTemplates.SummaryCalculation },
          { text: 'Max', id: 'Aggregate Max', checkbox: false, method: gridAggregateTemplates.SummaryCalculation },
          { text: 'Count', id: 'Aggregate Count', checkbox: false, method: gridAggregateTemplates.SummaryCalculation }
        ],
      },
    ],
    aggregateGroupValues: [
      {
        text: 'Sum',
        items: [
          { text: 'Sum', id: 'Group Aggregate Sum', checkbox: true, method: gridAggregateTemplates.GroupSummaryCalculation },
          { text: 'Average', id: 'Group Aggregate Average', checkbox: false, method: gridAggregateTemplates.GroupSummaryCalculation },
          { text: 'Min', id: 'Group Aggregate Min', checkbox: false, method: gridAggregateTemplates.GroupSummaryCalculation },
          { text: 'Max', id: 'Group Aggregate Max', checkbox: false, method: gridAggregateTemplates.GroupSummaryCalculation },
          { text: 'Count', id: 'Group Aggregate Count', checkbox: false, method: gridAggregateTemplates.GroupSummaryCalculation }
        ],
      },
    ],
    columnMenuDateFormatProperties: [
      {
        text: 'Column Date',
        iconCss: 'e-icons e-settings icon',
        items: [
          { text: 'yMMM', id: 'Date Format yMMM', method: menuItemMethods.singleColumnSettingsDateFormat, checkbox: false },
          { text: 'dd/MM/yyyy', id: 'Date Format dd/MM/yyyy', method: menuItemMethods.singleColumnSettingsDateFormat, checkbox: true },
          { text: 'dd.MM.yyyy', id: 'Date Format dd.MM.yyyy', method: menuItemMethods.singleColumnSettingsDateFormat, checkbox: false },
          { text: 'dd/MM/yyyy hh:mm a', id: 'Date Format dd/MM/yyyy hh:mm a', method: menuItemMethods.singleColumnSettingsDateFormat, checkbox: false },
          { text: 'MM/dd/yyyy hh:mm:ss a', id: 'Date Format MM/dd/yyyy hh:mm:ss a', method: menuItemMethods.singleColumnSettingsDateFormat, checkbox: false }
        ],
      },
    ],
    columnMenuFormatProperties: [
      {
        text: 'Column Number',
        iconCss: 'e-icons e-settings icon',
        items: [
          {
            text: 'Header Text Alignment',
            items: [
              { text: 'Left', id: 'Header Left', method: menuItemMethods.singleColumnSettingsHeaderTextAlign, checkbox: false },
              { text: 'Right', id: 'Header Right', method: menuItemMethods.singleColumnSettingsHeaderTextAlign, checkbox: true },
              { text: 'Center', id: 'Header Center', method: menuItemMethods.singleColumnSettingsHeaderTextAlign, checkbox: false },
              { text: 'Justify', id: 'Header Justify', method: menuItemMethods.singleColumnSettingsHeaderTextAlign, checkbox: false },
            ]
          },
          {
            text: 'Cell Text Alignment',
            items: [
              { text: 'Left', id: 'Cell Left', method: menuItemMethods.singleColumnSettingsCellTextAlign, checkbox: false },
              { text: 'Right', id: 'Cell Right', method: menuItemMethods.singleColumnSettingsCellTextAlign, checkbox: true },
              { text: 'Center', id: 'Cell Center', method: menuItemMethods.singleColumnSettingsCellTextAlign, checkbox: false },
              { text: 'Justify', id: 'Cell Justify', method: menuItemMethods.singleColumnSettingsCellTextAlign, checkbox: false },
            ]
          },
          {
            text: 'Data Operations',
            items: [
              { text: 'Enable Editing', method: menuItemMethods.enableColumnEditing, singlecheckbox: true },
              { text: 'Enable Grouping', method: menuItemMethods.enableColumnGrouping, singlecheckbox: true },
              { text: 'Enable Reordering', method: menuItemMethods.enableColumnReordering, singlecheckbox: true },
              { text: 'Enable Resizing', method: menuItemMethods.enableColumnResize, singlecheckbox: true },
              { text: 'Enable Searching', method: menuItemMethods.enableColumnSearching, singlecheckbox: true }
            ]
          },
          {
            text: 'Format',
            items: [
              { text: 'p0', id: 'Number Format p0', method: menuItemMethods.singleColumnSettingsFormat, checkbox: false },
              { text: 'p1', id: 'Number Format p1', method: menuItemMethods.singleColumnSettingsFormat, checkbox: false },
              { text: 'n0', id: 'Number Format n0', method: menuItemMethods.singleColumnSettingsFormat, checkbox: false },
              { text: 'n1', id: 'Number Format n1', method: menuItemMethods.singleColumnSettingsFormat, checkbox: false },
              { text: 'n2', id: 'Number Format n2', method: menuItemMethods.singleColumnSettingsFormat, checkbox: false },
              { text: 'C2', id: 'Number Format C2', method: menuItemMethods.singleColumnSettingsFormat, checkbox: true }
            ]
          }
        ],
      },
    ],
    columnMenuCheckboxProperties: [
      {
        text: 'Column Verified',
        iconCss: 'e-icons e-settings icon',
        items: [
          { text: 'Display as checkbox', method: menuItemMethods.enableCheckBoxChange, singlecheckbox: true },
          { text: 'Visible', method: menuItemMethods.hideSpecifiedColumn, singlecheckbox: true }
        ],
      },
    ],
    columnMenuProperties: [
      {
        text: 'Column Name',
        iconCss: 'e-icons e-settings icon',
        items: [
          {
            text: 'Clip Mode',
            items: [
              { text: 'Clip', id: 'ClipMode_Clip', method: menuItemMethods.singleColumnSettingsClipMode, checkbox: false },
              { text: 'Ellipsis', id: 'ClipMode_Ellipsis', method: menuItemMethods.singleColumnSettingsClipMode, checkbox: false },
              { text: 'EllipsisWithTooltip', id: 'ClipMode_EllipsisWithTooltip', method: menuItemMethods.singleColumnSettingsClipMode, checkbox: true },
            ]
          },
          { text: 'Enable Resizing', method: menuItemMethods.enableColumnResize, singlecheckbox: true },
          { text: 'Enable Grouping', method: menuItemMethods.enableColumnGrouping, singlecheckbox: true },
        ],
      },
    ]

  };

  const propertyDescription: { [key: string]: string } = {
    "Enable Editing": "All columns are editable by default. To disable editing for specific columns, you can update their value by setting the appropriate property.",
    "Enable Reordering": "The boolean value that indicates whether users can reorder columns in the Grid by dragging and dropping them. When the Grid is rendered with stacked headers, column reordering is restricted to columns within the same header level.",
    "Enable Searching": "All columns in the Grid are searchable by default. To disable search for a specific column, set its property to false in the column.",
    "Enable Resizing": "The boolean value that indicates whether users can adjust the width of a column by dragging its header edge. By default, resizing is allowed for all columns. To disable resizing for a specific column, set its property to false.",
    "Enable Sorting": "Enables sorting of grid columns by clicking the sort icon in the column header. The first click sorts the data in ascending order, and subsequent clicks toggle between ascending and descending. To disable sorting for a specific column, set allowSorting to false.",
    "Enable Multi-Column Sorting": "When sorting is enabled, users can sort multiple columns by holding Shift or Ctrl while clicking on the column headers.",
    "Enable Filtering": "A boolean value that controls the visibility of the filter bar for all grid columns. Users can customize the filter type using the type property. To disable filtering for a specific column, set its allowFiltering property to false.",
    "Enable Grouping": "Enables users to group or ungroup grid columns by dragging headers to the group drop area. To disable grouping for a specific column, set its allowGrouping property to false.",
    "Show Grouped Column Reordering": "Enables reordering of grouped grid columns in the droping area. To disable reordering for a specific column, set its property to false.",
    "Enable Column Reordering": "Enables reordering of grid columns by dragging and dropping. To disable reordering for a specific column, set its property to false.",
    "Enable Column Resizing": "Enables resizing of grid columns by dragging the edge of the column header. To disable resizing for a specific column, set its property to false.",
    "Enable Paging": "Enables a pager at the footer of the grid, allowing users to navigate through pages of data.",
    "Enable Immutable Mode": "The enableImmutableMode property is set to true, the grid will reuse old rows if it exists in the new result instead of full refresh while performing the grid actions.",
    "Enable Row Drag and Drop": "Enables users to drag and drop grid rows within the grid or to another.",
    "Show Column Menu": "A boolean value enables column menu options for each column when set to true. To disable the column menu for a specific column, set its property to false.",
    "Allow Text Wrap": "Enables text in column cells to wrap to the next line when it exceeds the column width.",
    "Auto-Fit Column Content": "A boolean value that determines whether column widths automatically adjust based on the grid's width. If not defined, columns expand to fill the available space.",
    "Enable Alternate Row Styling": "Enables alternate row styling in the grid for better readability. When set to true, the grid applies the e-altrow CSS class to every other row.",
    "Enable Row Hover Effect": "A boolean value that enables row hover effects in the grid. When set to true, the e-hover CSS class is applied to rows on hover for visual feedback.",
    "Enable Header Focus": "The enableHeaderFocus is set to true, then header element will be focused when focus moves to grid.",
    "Enable Excel Export": "A boolean value indicating whether users can export the grid to an Excel file. When set to true, Excel export is enabled.",
    "Enable PDF Export": "A boolean value indicating whether users can export the grid to Pdf. When set to true, Pdf export is enabled.",
    "Enable Virtual Scrolling": "The enableVirtualization property allows the Grid to render only the rows visible within the viewport and load subsequent rows on vertical scrolling. This helps in efficiently handling large datasets in the Grid.",
    "Enable Infinite Scrolling": "Loads and filters data continuously as you scroll, without needing to navigate through pages. This helps in handling large datasets smoothly.",
    "Show Group Drop Area": "A boolean value that controls the visibility of the group drop area at the top of the grid. When set to true, the drop area is displayed.",
    "Show Grouped Columns": "The grouped column is hidden from the grid after grouping, when it is set to false. The grouped column remains visible in the grid, when it is set to true.",
    "Show Toggle Button": "The toggle button appears in the column headers, allowing users to group or ungroup columns by clicking it, when it is set to true.",
    "Show Ungroup Icon in Header": "The ungroup button is visible in the drop area of a grouped column when it is set to true, allowing users to ungroup the column by clicking the button.",
    "Enable Case Sensitivity": "The grid filters records with exact case-sensitive matches based on the filter operator, when it is set to true.",
    "Ignore Accent": "The filter ignores diacritic characters or accents during filtering, when it is set to true.",
    "Filter Type": "Filter the records in the grid using various options such as menu, Excel-style filtering, filter bar, and checkboxes to efficiently refine and search data.",
    "Show Filter Bar Operator": "Enables a dropdown in the filter bar to select operators, and customizes filter menu operators based on column type—string, number, date, or boolean.",
    "Show Filter Bar Status": "Displays or hides the filtered status message on the pager when filtering by the specified text.",
    "Filter Bar Mode": "Filter bar modes control how filtering is triggered—either manually by pressing Enter (OnEnter) or automatically after a delay (Immediate), with a default delay of 1500ms.",
    "Loading Indicator Type": "Displays a visual indicator (like a spinner or shimmer) to show that filtering is in progress, improving user feedback during data operations.",
    "Enable Toggle Selection": "Allows users to toggle row selection by clicking on the selected row again.",
    "Enable Column Selection": "Allows users to select one or more columns in the grid, depending on the configured selection type.",
    "Selection Type": "Selection can be either single, allowing one row to be selected, or multiple, allowing selection of multiple rows.",
    "Enable Simple Multi Row Selection": "Enables multiple row selection with single clicks, without requiring Ctrl or modifier keys, when it is set to true.",
    "Enable CheckBox Selection": "Enables or disables the visibility of the checkbox column in the grid when it is set to true.",
    "Allow Checkbox Selection Only": "The row selection in the grid is allowed only through the checkbox column, when it is set to true.",
    "Checkbox Selection Mode": "The checkbox selection mode defines how rows are selected: In Default mode, users can select multiple rows one by one using either checkboxes or row clicks. In ResetOnRowClick mode, multiple selections are allowed through checkbox clicks, but clicking directly on a row clears all previous selections and selects only that row.",
    "Edit Mode": "Defines the editing mode: Normal for inline editing, Dialog for popup editing, and Batch for editing multiple cells before saving.",
    "Allow Adding Row": "The addition of new rows to the grid is allowed when it is set to true. If it is set to false, adding new rows is not permitted.",
    "Allow Next Row Edit": "The editing automatically moves to the next row after completing the current one, when it is set to true.",
    "New Row Position": "Specifies whether a new row is added at the top or bottom of the grid when set to true. If set to false, new rows cannot be added.",
    "Allow Editing Row": "The values in existing records can be updated on single click, when it is set to true. If it is set to false, editing of records is not allowed.",
    "Edit on Double Click": "The values in existing records can be deleted directly from the grid by double-clicking, when it is set to true. If it is set to false, deleting records through double-click is not allowed.",
    "Allow Delete Row": "The values in existing records can be deleted from the grid, when it is set to true. If it is set to false, deleting of records is not allowed.",
    "Show Unsaved Confirmation Dialog": "The confirmation dialog appears when batch changes are saved or discarded, when it is set to true. Otherwise, the confirmation dialog will not be shown.",
    "Show Delete Confirmation Dialog": "The confirmation dialog appears before the delete action is performed, when it is set true. Otherwise, the confirmation dialog will not be shown.",
    "Localization": "Localization is the process of adapting software, content, or applications to a specific region, language, or culture by translating text, formatting data, and modifying UI elements to align with local preferences.",
    "Theme": "A theme is a predefined set of visual styles, including colors, fonts, and layout, that determines the look and feel of an application or website. It helps create a consistent design across the entire interface.",
    "Interaction Type": "Interaction types are the various ways users engage with a system, such as clicking, typing, or touching.",
    "Enable RTL": "RTL (Right-to-Left) refers to the text direction used in languages like Arabic and Hebrew, where text is read and written starting from the right side of the page.",
    "Aggregate_Sum": "Calculates the total of all values in the column.",
    "Export": "Export the data as a PDF or Excel file using the available export properties",
    "Scrolling": "To enhance data loading and navigation in the Grid.",
    "Alignment": "Alignment of the columns header and cell contents.",
    "Data Operations": "Data operations in the Grid help manage and organize data through sorting, filtering, grouping, and paging.",
    "Aggregate_Average": "Computes the mean of all numeric values in the column.",
    "Aggregate_Min": "Displays the smallest value in the column.",
    "Aggregate_Max": "Displays the largest value in the column.",
    "Aggregate_Count": "Shows the number of records in the column.",
    "Group_Aggregate_Sum": "Calculates the total of all values in the column.",
    "Group_Aggregate_Average": "Computes the mean of all numeric values in the column.",
    "Group_Aggregate_Min": "Displays the smallest value in the column.",
    "Group_Aggregate_Max": "Displays the largest value in the column.",
    "Group_Aggregate_Count": "Shows the number of records in the column.",
    "Allow Selection": "A boolean value that determines whether grid records can be selected by clicking on it.",
    "Type": "Specifies the available filtering types, determining how data is filtered in the grid.",
    "Clip Mode": "Specifies how overflowed cell content is displayed in the grid.",
    "Freeze": "Specifies the column freeze direction in the grid.",
    "Header text alignment": "Define the alignment of column header which is used to align the text of column header.",
    "Cell text alignment": "Defines the alignment of the column in both header and content cells.",
    "Searching": "The allowSearching property is set to false, then it disables Searching of a particular column. By default all columns allow Searching.",
    "Display as HTML encode": "The disableHtmlEncode property is set to true, it encodes the HTML of the header and content cells.",
    "Format": "Formats the displayed value without altering the original data. Supports standard and custom number or date formats.",
    "Group by format": "The enableGroupByFormat property is set to true, then it groups the particular column by formatted values. By default no columns are group by format.",
    "Display as checkbox": "The displayAsCheckBox property is set to true, it displays the column value as a check box instead of Boolean value.",
    "Visible": "Controls column visibility in the grid. When visible is set to false, the column is hidden. By default, all columns are shown.",
    "Operator": "Defines the search operator for Column Chooser.",
    "Default": "This is the default checkboxMode, allowing users to select multiple rows by clicking them individually.",
    "ResetOnRowClick": "In ResetOnRowClick mode, clicking a row resets the previously selected row. Multiple rows can be selected using the CTRL or SHIFT key.",
    "Single": "Allows selection of only a row or a cell.",
    "Multiple": "Allows selection of multiple rows or cells.",
    "Normal": "Normal mode allows inline editing of a single row at a time.",
    "Dialog": "Dialog opens a pop-up dialog for editing the selected row",
    "Batch": "Batch enables multiple row edits before saving changes in bulk.",
    "Top": "Inserts the new row at the beginning of the grid.",
    "Bottom": "Adds the new row at the end of the grid.",
    "ClipMode_Clip": "Truncates the cell content when it overflows its area.",
    "ClipMode_Ellipsis": "Displays ellipsis when the cell content overflows its area.",
    "ClipMode_EllipsisWithTooltip": "Displays ellipsis when the cell content overflows its area also it will display tooltip while hover on ellipsis applied cell.",
    "ClipMode": "Defines the cell content’s overflow mode",
    "Enable Frozen": "To freeze a specific column in the Grid, set the isFrozen property of that column to true.",
    "Freeze_Left": "Freeze the column at left side.",
    "Freeze_Right": "Freeze the column at right side.",
    "Freeze_Fixed": "Freeze the column at center.",
    "Freeze_None": "Does not freeze the column.",
    "Header_Center": "Defines center alignment of the header text within the column.",
    "Header_Left": "Defines left alignment of the header text within the column.",
    "Header_Right": "Defines right alignment of the header text within the column.",
    "Header_Justify": "Defines justify alignment of the header text within the column.",
    "Cell_Center": "Defines center alignment of the content text within the cell.",
    "Cell_Justify": "Defines justify alignment of the content text within the cell.",
    "Cell_Left": "Defines left alignment of the content text within the cell.",
    "Cell_Right": "Defines right alignment of the content text within the cell.",
    "Number_Format_p0": "The number is converted to percentage with 0 decimal place",
    "Number_Format_p1": "The number is converted to percentage with 1 decimal place",
    "Number_Format_n0": "The number is rounded to 0 decimal place",
    "Number_Format_n1": "The number is rounded to 1 decimal place",
    "Number_Format_n2": "The number is rounded to 2 decimal place",
    "Number_Format_C2": "The currency symbol is appended to number and number is rounded to 2 decimal place",
    "Date_Format_yMMM": "Displays year and abbreviated month name",
    "Date_Format_dd/MM/yyyy": "Common date format (day-first) used in the UK, India, etc.",
    "Date_Format_dd.MM.yyyy": "European format using dots as separators",
    "Date_Format_dd/MM/yyyy_hh:mm_a": "Displays date with time in 12-hour format",
    "Date_Format_MM/dd/yyyy_hh:mm:ss_a": "US format with full timestamp and AM/PM",
    "Spinner": "Shows a rotating loader to indicate processing",
    "Shimmer": "Displays a shimmering effect as a placeholder until data loads.",
    "OnEnter": "Initiates filter operation after Enter key is pressed.",
    "Immediate": "Initiates filter operation after a certain time interval. By default, time interval is 1500 ms.",
    "Menu": "Specifies the filter type as menu.",
    "Checkbox": "Specifies the filter type as checkbox.",
    "FilterBar": "Specifies the filter type as filterbar.",
    "Excel": "Specifies the filter type as checkbox.",
    "Selection type": "Selection types include Single (selects one row or cell) and Multiple (selects multiple rows or cells).",
    "Small": " Compact rows with minimal spacing (25px) for a tighter layout.",
    "Medium": "Balanced spacing (36px) for better readability and a comfortable view.",
    "Large": "Wide spacing (60px) for a clear and spacious data display.",
    "GridLine_Default": "Displays grid lines based on the theme.",
    "GridLine_Both": "Displays both the horizontal and vertical grid lines.",
    "GridLine_Vertical": "Displays the vertical grid lines only.",
    "GridLine_Horizontal": "Displays the horizontal grid lines only.",
    "GridLine_None": "No grid lines are displayed.",
    "Persist Selection": "Row selection is retained across grid operations when it is set to true, and at least one column must be defined as a primary key.",
    "Enable Text Wrap": "When the cell/header content exceeds the column width, it wraps onto multiple lines to ensure the entire text is visible."
  };

  const menuItemTemplates = {

    gridLineCustomization: () => {
      return (
        <div id="gridLines">
          <MenuComponent
            items={menuItemProperties.gridLineProperties}
            fields={menuFields}
            enableRtl={enableRtlListView}
            template={menuItemTemplates.menuSwitchTemplate}
            showItemOnClick={true}
            cssClass='grid-line'
          />
        </div>
      )
    },

    buttonClick: (args: any) => {
      document.getElementById('dialogbox')!.style.left = `${args.clientX}px`;
      let topPosition = document.getElementById('search_box')!.getBoundingClientRect().height + args.clientY - 10;
      document.getElementById('dialogbox')!.style.top = `${topPosition}px`;
      const dialog = document.getElementById('dialogbox');
      const gridContainer = document.getElementById('overviewgrid');
      const viewportWidth = window.innerWidth;
      if (!dialog) return;
      const dialogWidth = dialog.offsetWidth;
      const containerRect = gridContainer?.getBoundingClientRect();
      const maxLeft = Math.min(viewportWidth, containerRect?.right || viewportWidth) - dialogWidth;
      let left = args.clientX;
      if (left > maxLeft) {
        left = maxLeft - 10;
      }
      dialog.style.left = `${left}px`;
      setStatus(true);
      dialogInstance?.show();
    },

    textValue: (args: ChangedEventArgs) => {
      setSearchText(() => {
        searchText = args.value ?? '';
        return searchText;
      });
    },

    dialogCreated: () => {
      dialogInstance?.hide();
    },

    dialogClose: () => {
      setStatus(false);
    },

    dialogOpen: () => {
      setStatus(true);
    },

    columnFieldsChange: (args: any) => {
      setSelectedField(() => {
        selectedField = args.value;
        const key = args.value as keyof typeof employeeDetails[0];
        const value = employeeDetails[0][key];
        const runtimeType = typeof value;
        // Normalize JS typeof to your operatorMap keys
        mappedType =
          runtimeType === 'number'
            ? 'integer'
            : runtimeType === 'string'
              ? 'string' : 'string';
        setSelectedField(selectedField);
        setSelectedDataType(mappedType);
        operatorOptions = operatorMap[mappedType];
        if (operatorDropdown) {
          operatorDropdown.current.dataSource = operatorOptions;
        }
        setSelectedOperator(null);
        return selectedField;
      });
    },

    operatorValueChange: (args: any) => {
      setSelectedOperator(() => {
        selectedOperator = args.value;
        return selectedOperator;
      });
    },

    caseSensitiveChange: (args: any) => {
      setCaseSensitiveChecked(() => {
        caseSensitiveChecked = args.checked;
        return caseSensitiveChecked;
      });
    },

    ignoreAccentChange: (args: any) => {
      setIgnoreAccentChecked(() => {
        ignoreAccentChecked = args.checked;
        return ignoreAccentChecked;
      });
    },

    createListBox: () => {
      return (
        <div className="filter-container">
          <div className="filter-row">
            <div className="search-column-group">
              <label>Search by</label>
              <DropDownListComponent
                id="search_by" key={selectedField || "ShipCountry"}
                dataSource={dropdownDataSource.columnFields}
                onChange={menuItemTemplates.columnFieldsChange}
                placeholder="ShipCountry"
                popupHeight="220px"
              />
            </div>

            <div className="search-operator-group">
              <label>Operator</label>
              <DropDownListComponent
                id="search_operator"
                ref={operatorDropdown}
                onChange={menuItemTemplates.operatorValueChange}
                dataSource={operatorOptions}
                fields={{ text: 'text', value: 'value' }}
                placeholder="equal"
                popupHeight="220px"
              />
            </div>
          </div>
          <div className="check-text">
            <label>Text Preferences</label>
            <div className="checkbox-group">
              <CheckBoxComponent id="case-sensitive"
                change={menuItemTemplates.caseSensitiveChange} checked={caseSensitiveChecked} /> &nbsp;&nbsp;
              <label>Case sensitive</label> &nbsp; | &nbsp; &nbsp;
              <CheckBoxComponent
                change={menuItemTemplates.ignoreAccentChange} id="ignore-accent" checked={ignoreAccentChecked} /> &nbsp; &nbsp;
              <label>Ignore accent</label>
            </div>
          </div>
        </div>
      )
    },

    chipClick: (args: any) => {
      if (!gridInstance) return;
      if (args.target.textContent === "Clear") {
        gridInstance.clearFiltering();
        gridInstance.search("");
        textboxInstance.value = "";
        dialogInstance!.hide();
      } else if (args.target.textContent === "Search") {
        if (selectedField && selectedOperator) {
          gridInstance.searchSettings = {
            fields: [selectedField],
            operator: selectedOperator,
            ignoreCase: caseSensitiveChecked,
            ignoreAccent: ignoreAccentChecked,
            key: searchText,
          };
          if (!caseSensitiveChecked) {
            gridCommonTemplates.emptyMessageTemplate();
          }
        } else {
          console.warn("Search field and operator are required.");
        }
      }
    },


    createDialogFooter: () => {
      return (
        <div >
          <ChipListComponent id="chip-choice" selection="Single" enableRtl={enableRtlListView} selectedChips={[1]} onClick={menuItemTemplates.chipClick}>
            <ChipsDirective>
              <ChipDirective text="Clear" cssClass="selectchip"></ChipDirective>
              <ChipDirective text="Search" cssClass="selectchip"></ChipDirective>
            </ChipsDirective>
          </ChipListComponent>
        </div>

      )
    },

    menuTextboxSearch: () => {
      const dialogContainer = document.getElementById('dialogbox');
      if (dialogContainer) {
        dialogContainer.remove();
      }
      return (
        <div className="search-container">
          <TextBoxComponent
            id="search_box"
            placeholder="Search..."
            onClick={menuItemTemplates.buttonClick}
            change={menuItemTemplates.textValue}
            cssClass="search-input"
            ref={(text: TextBoxComponent | null) => {
              if (text) {
                textboxInstance = text;
              }
            }}
          ></TextBoxComponent>
          <DialogComponent
            ref={(dialog: any) => dialogInstance = dialog}
            id="dialogbox"
            enableRtl={enableRtlListView}
            created={menuItemTemplates.dialogCreated}
            footerTemplate={menuItemTemplates.createDialogFooter}
            content={menuItemTemplates.createListBox}
            showCloseIcon={false}
            visible={status}
            width={'300px'}
            open={menuItemTemplates.dialogOpen}
            close={menuItemTemplates.dialogClose}
            height={'210px'}
          >
          </DialogComponent>
        </div>
      )
    },

    getLabelElement: (switchId: string | GridPropertiesGroup, treeViewElement: Element | null): HTMLElement | null => {
      let labelElement: HTMLElement | null = null;
      if (typeof switchId === "object" && !isNullOrUndefined(switchId) && Array.isArray(switchId["items"])) {
        switchId["items"].some((item: any) => {
          labelElement = treeViewElement!.querySelector('label') as HTMLElement;
          return !!labelElement;
        });
      }
      return labelElement;
    },


    beforeOpen: ((args: BeforeOpenEventArgs, switchId: string | any): void => {
      const targetElement = args.target as HTMLElement;
      const treeViewElement = targetElement.closest('.treeviewdiv');
      let labelElement: HTMLElement | null;
      let description: string;
      let labelText: string;

      if (treeViewElement) {
        if (switchId && Array.isArray(switchId["items"])) {
          labelElement = menuItemTemplates.getLabelElement(switchId, targetElement.parentElement);
          labelText = labelElement!.innerText;
          description = labelElement ? propertyDescription[labelText] : '';
        } else if (switchId.includes('switch')) {
          labelElement = targetElement.parentElement!.querySelector('label') as HTMLElement;
          labelText = labelElement!.innerText;
          description = labelElement ? propertyDescription[labelText] : '';
        } else if (switchId.includes('check')) {
          labelElement = targetElement.parentElement!.querySelector('label') as HTMLElement;
          labelText = switchId.split('_check')[0];
          description = labelElement ? propertyDescription[labelText] : '';
        }
        else {
          labelElement = treeViewElement.querySelector(`.${switchId?.replace(/\s+/g, "")}-custom-label`)?.querySelector('label') as HTMLElement;
          labelText = switchId;
          description = labelElement ? propertyDescription[labelText] : '';
        }
        if (labelElement === null) {
          labelElement = treeViewElement.querySelector('.e-checkbox-wrapper label .e-label') as HTMLElement;
          description = labelElement ? propertyDescription[labelElement.innerText.trim()] : '';
        }
        if (description && tooltipRefs.current[labelText]) {
          tooltipRefs.current[labelText]!.content = description;
        }
      }
    }),

    changeCheckBox: (args: ChangeEventArgs, checkId: string, checkRefs: any) => {
      setCheckedStates((prevState) => {
        const newState = {
          ...prevState,
          [checkId]: args.checked,
        };
        checkedStates = newState;

        // Common function to update group checkboxes by prefix
        const updateGroupCheckboxes = (prefix: string) => {
          if (checkId.includes(prefix)) {
            const checkInstance = Object.fromEntries(
              Object.entries(checkRefs.current).filter(([key, _]) =>
                key.startsWith(prefix)
              )
            );

            Object.entries(checkInstance).forEach(([id, ref]: [string, any]) => {
              const isChecked = id === checkId ? args.checked : false;
              if (ref && typeof ref.checked !== "undefined") {
                ref.checked = isChecked;
              }
              newState[id] = isChecked;
            });
          }
        };

        // Update based on different groups single check box selection
        ['Header', 'Cell', 'GridLine', 'Number_Format', 'Date_Format', 'Aggregate', 'ClipMode', 'Group_Aggregate'].forEach(prefix => {
          if (checkId.includes(prefix)) {
            updateGroupCheckboxes(prefix);
          }
        });

        return newState;
      });
    },

    changeSwitch: (args: ChangeEventArgs, switchId: string, data: any) => {
      setSwitchStates((prevState) => {
        const newState = {
          ...prevState,
          [switchId]: args.checked,
        };
        switchStates = newState;
        return newState;
      });
    },

    menuSwitchTemplate: (data: any) => {
      if (!isNullOrUndefined(data.properties.iconCss)) {
        let textId = data.properties.text.replace(/\s/g, "_");
        return (<div className={data.properties.iconCss === "e-icons e-settings icon" ? "iconviewdiv" : "treeviewdiv"}>
          <label>
            <span id={"walk_property_" + (textId || "default")} className={data.properties.iconCss}></span>
            &nbsp; {data.properties.text !== "Column Name" &&
              data.properties.text !== "Column Date" && data.properties.text !== "Column Number"
              && data.properties.text !== "Column Verified" ? data.properties.text : ""}
          </label>
        </div>);
      }
      else if (!isNullOrUndefined(data.singlecheckbox)) {
        let switchId = data.properties.text.replace(/\s/g, "_") + "_switch";
        return (
          <div className="treeviewdiv">
            <TooltipComponent ref={(t: any) => {
              if (t) tooltipRefs.current[data.properties.text] = t;
            }} windowCollision={true} mouseTrail={true}
              target='.single-column-exclamation-container' enableRtl={enableRtlListView} position="RightCenter" beforeOpen={(args) => menuItemTemplates.beforeOpen(args, switchId)} >
              <div>
                <CheckBoxComponent
                  id={switchId}
                  label={data.properties.text}
                  cssClass="custom-checkbox"
                  enableRtl={enableRtlListView}
                  change={(args) => {
                    if (args.event.target.innerText !== 'Visible') {
                      menuItemTemplates.changeSwitch(args, switchId, data);
                    }
                    data.method(args);
                  }}
                  checked={switchStates[switchId] ?? data.singlecheckbox}
                />
                <div className='single-column-exclamation-container' style={{ ...(enableRtlListView && { marginRight: '10px' }) }}>
                  <span className="e-icons e-circle-info icon" ></span>
                </div>
              </div>
            </TooltipComponent>
          </div>
        );
      }
      else if (!isNullOrUndefined(data.checkbox)) {
        let checkId = data.properties.id.replace(/\s/g, "_") + "_check";
        return (
          <div className="treeviewdiv">
            <TooltipComponent ref={(t: any) => {
              if (t) tooltipRefs.current[data.properties.id.replace(/\s/g, "_")] = t;
            }} windowCollision={true} mouseTrail={true}
              target='.single-column-exclamation-container' enableRtl={enableRtlListView} position="RightCenter" beforeOpen={(args) => menuItemTemplates.beforeOpen(args, checkId)} >
              <div><CheckBoxComponent id={checkId} enableRtl={enableRtlListView}
                ref={(instance: any) => {
                  if (instance) {
                    checkRefs.current[checkId] = instance;
                  }
                }}
                label={data.properties.text} cssClass='custom-checkbox'
                change={(args) => {
                  menuItemTemplates.changeCheckBox(args, checkId, checkRefs);
                  data.method(args, data);
                }} checked={checkedStates[checkId] ?? data.checkbox} />
                <div className="single-column-exclamation-container" style={{ ...(enableRtlListView && { marginRight: '10px' }) }}>
                  <span className="e-icons e-circle-info icon" ></span>
                </div>
              </div>
            </TooltipComponent>
          </div>
        );
      }
      else {
        return (<div className="treeviewdiv">
          <div className="treeName">
            <div className="setting-row"><label style={{
              fontWeight: 'normal'
            }}>{data.properties.text}</label>
            </div>
          </div>
        </div>);
      }
    },
  }

  const gridFilterTemplates = {

    filterTemplate: () => {
      return (
        <span></span>
      )
    },

    templateOptionsFreightNumericTextBox: {
      create: () => {
        numericElement = document.createElement('input');
        return numericElement;
      },
      write: (args: any) => {
        const numericTextObj = new NumericTextBox({
          cssClass: 'e-fltrtemp-focus',
          decimals: 2,
          format: 'n2',
          step: 0.02,
          enableRtl: enableRtlListView,
          change: gridFilterTemplates.handleFilterChange,
        });
        numericTextObj.appendTo(numericElement);
      },
    },

    templateOptionsQuantityNumericTextBox: {
      create: () => {
        numericElement = document.createElement('input');
        return numericElement;
      },
      write: (args: any) => {
        const numericTextObj = new NumericTextBox({
          cssClass: 'e-fltrtemp-focus',
          enableRtl: enableRtlListView,
          decimals: 0,
          format: 'n0',
          change: gridFilterTemplates.handleFilterChange,
        });
        numericTextObj.appendTo(numericElement);
      },
    },

    templateOptionsDatePicker: {
      create: () => {
        dateElement = document.createElement('input');
        return dateElement;
      },
      write: (args: any) => {
        const datePickerObj = new DatePicker({
          value: new Date(args.column.field),
          placeholder: 'Select the Order Date',
          enableRtl: enableRtlListView,
          change: gridFilterTemplates.handleFilterChange,
        });
        datePickerObj.appendTo(dateElement);
      },
    },

    createInputElement: () => createElement('input'),

    getUniqueFieldValues: (data: any[], field: string): any[] => {
      const uniqueSet = new Set(data.map(item => item[field]));
      return Array.from(uniqueSet).map(value => ({ [field]: value }));
    },

    createAutoCompleteFilter: (placeholder: string, dataSource: any[], appendElement: HTMLElement, options?: Partial<AutoComplete>) => {
      const autoComplete = new AutoComplete({
        dataSource,
        placeholder,
        change: gridFilterTemplates.handleFilterChange,
        ...(options || {})
      });
      autoComplete.appendTo(appendElement);
    },

    productIDFilter: {
      create: () => productIDInput = gridFilterTemplates.createInputElement(),
      write: () => gridFilterTemplates.createAutoCompleteFilter('Product ID', employeeDetails, productIDInput)
    },

    productNameFilter: {
      create: () => productNameInput = gridFilterTemplates.createInputElement(),
      write: () => {
        const data = gridFilterTemplates.getUniqueFieldValues(employeeDetails, 'ProductID');
        gridFilterTemplates.createAutoCompleteFilter('Product Name', data, productNameInput);
      }
    },

    customerNameFilter: {
      create: () => customerNameInput = gridFilterTemplates.createInputElement(),
      write: () => {
        const data = gridFilterTemplates.getUniqueFieldValues(employeeDetails, 'CustomerName');
        gridFilterTemplates.createAutoCompleteFilter('Customer Name', data, customerNameInput);
      }
    },

    customerMailIDFilter: {
      create: () => customerMailIDInput = gridFilterTemplates.createInputElement(),
      write: () => {
        const data = gridFilterTemplates.getUniqueFieldValues(employeeDetails, 'EmailID');
        gridFilterTemplates.createAutoCompleteFilter('Email ID', data, customerMailIDInput);
      }
    },

    shipCountryFilter: {
      create: () => shipCountryInput = gridFilterTemplates.createInputElement(),
      write: () => {
        const data = gridFilterTemplates.getUniqueFieldValues(employeeDetails, 'ShipCountry');
        gridFilterTemplates.createAutoCompleteFilter('Select the Ship Country', data, shipCountryInput, {
          showPopupButton: true,
          fields: { value: 'ShipCountry' }
        });
      }
    },

    orderIDFilter: {
      create: () => orderIDInput = gridFilterTemplates.createInputElement(),
      write: () => {
        const data = gridFilterTemplates.getUniqueFieldValues(employeeDetails, 'OrderID');
        gridFilterTemplates.createAutoCompleteFilter('Order ID', data, orderIDInput);
      }
    },

    handleFilterChange: (args: any) => {
      if (!isNullOrUndefined(args.element) || (!isNullOrUndefined(args.event) && !isNullOrUndefined(args.event.currentTarget))) {
        let targetElement = parentsUntil(args.element || args.event.currentTarget, 'e-filtertext');
        let columnName = targetElement.id.replace('_filterBarcell', '');
        if (args.value) {
          gridInstance.filterByColumn(columnName, 'equal', String(args.value));
        } else {
          gridInstance.removeFilteredColsByField(columnName);
        }
      }
    },

    templateCheckBox: {
      create: () => {
        checkboxElement = document.createElement('input');
        checkboxElement.setAttribute('type', "checkbox");
        checkboxElement.id = 'Verified';
        return checkboxElement;
      },
      write: (args: any) => {
        const checkbox = new CheckBox({
          checked: args.value,
          indeterminate: true,
          enableRtl: enableRtlListView,
          change: function (args) {
            var predicate = new Predicate('Verified', 'equal', args.checked);
            var filteredData = new DataManager(employeeDetails).executeLocal(new Query().where(predicate));
            gridInstance.dataSource = filteredData;
          }
        });
        checkbox.appendTo(checkboxElement);
      },
    },

    handlestatusFilterChange: (args: DdtSelectEventArgs) => {
      let columnName = "TrackingStatus";
      if (gridInstance) {
        if (args.action === "select") {
          if (!selectedValues.includes(args.itemData.text as string)) {
            selectedValues.push(args.itemData.text as string);
          }
        } else if (args.action === "un-select") {
          selectedValues = selectedValues.filter(value => value !== args.itemData.text);
        }
        let filterValues = selectedValues.map(value => (value === "Paid" ? true : false));
        if (selectedValues.length === 0 || filterValues.length > 1) {
          gridInstance.removeFilteredColsByField(columnName);
        } else {
          gridInstance.filterByColumn(columnName, 'equal', filterValues.length === 1 ? filterValues[0] : filterValues);
        }
      }
    },

    statusFilter: {
      create: (args: any) => {
        dropdownTreeElement = createElement('input');
        return dropdownTreeElement;
      },
      write: (args: any) => {
        let statusData = [{ status: 'Paid' }, { status: 'Not Paid' }];
        const dropInstance = new DropDownTree({
          fields: { dataSource: statusData, text: 'status', value: 'status' },
          showCheckBox: true,
          showSelectAll: true,
          enableRtl: enableRtlListView,
          value: statusData.map(item => item.status),
          placeholder: 'Select the Status',
          select: gridFilterTemplates.handlestatusFilterChange
        });
        dropInstance.appendTo(dropdownTreeElement);
      }
    }
  };

  const gridProperties = {
    filterOptions: { showFilterBarOperator: false, type:'Excel', showFilterBarStatus: false } as FilterSettingsModel,
    toolbarOptions: [
      { text: '', prefixIcon: 'e-add', id: 'add_icon', tooltipText: 'Add Records' },
      'Edit',
      'Delete',
      'Update',
      'Cancel',
      { type: 'Separator' },
      { text: '', prefixIcon: 'sf-icon-expand-collapse', id: 'expand_icon', tooltipText: 'Expand/Collapse' },
      { text: '', prefixIcon: 'sf-icon-clear-sorting', id: 'clearsorting_icon', tooltipText: 'Clear Sorting' },
      { text: '', prefixIcon: 'e-filter-clear icon', id: 'clearfilter_icon', tooltipText: 'Clear Filtering' },
      { type: 'Separator' },
      { text: '', prefixIcon: 'sf-icon-clear-selection', id: 'clear_selection', tooltipText: 'Clear Selection' },
      { text: '', prefixIcon: 'sf-icon-row-clear', id: 'clear_row_selection', tooltipText: 'Clear Row Selection' },
      { text: '', prefixIcon: 'sf-icon-column-clear', id: 'clear_column_selection', tooltipText: 'Clear Column Selection' },
      { text: '', prefixIcon: 'sf-icon-clear-cell', id: 'clear_cell_selection', tooltipText: 'Clear Cell Selection' },
      { type: 'Separator' },
      { text: '', template: menuItemTemplates.gridLineCustomization },
      { type: 'Separator' },
      { text: '', prefixIcon: 'e-csvexport', id: 'export_csv', tooltipText: 'Export CSV' },
      { text: '', prefixIcon: 'e-excelexport', id: 'export_excel', tooltipText: 'Export Excel' },
      { text: '', prefixIcon: 'e-pdfexport', id: 'export_pdf', tooltipText: 'Export PDF' },
      { text: '', template: menuItemTemplates.menuTextboxSearch, align: 'Right' },
      'ColumnChooser',
      { text: '', align: 'Right', id: 'grid_properties', template: gridCommonTemplates.settingsDialogTemplate }
    ] as (ToolbarItems | Object)[],

    pageOptions: { pageCount: 5, pageSizes: [5, 10, 12, 20, 30], pageSize: 30 },
    groupOptions: { allowReordering: true },
    editOptions: { allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true, showConfirmDialog: true, mode: 'Normal' as EditMode },
    contextMenuOptions: ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending', 'Group', 'Ungroup', 'Copy', 'Edit', 'Delete', 'Save', 'Cancel', 'FirstPage', 'PrevPage',
      'LastPage', 'NextPage'] as ContextMenuItem[] | ContextMenuItemModel[],
    sortingOptions: {
      columns: [{ field: 'OrderID', direction: 'Ascending' }, { field: 'Quantity', direction: 'Descending' }]
    } as SortSettingsModel,
    columnSelection: {
      allowColumnSelection: true, type: 'Multiple'
    } as SelectionSettingsModel,
    commands: [
      { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
      { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } },
      { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
      { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }
    ] as CommandModel[],
    aggregatetype: ['Min', 'Max'] as AggregateType | AggregateType[] | string,
    customerColumns: [
      {
        field: 'EmployeeImage',
        headerText: 'Image',
        visible: false,
        allowGrouping: false,
        textAlign: 'Center',
        minWidth: 55,
        maxWidth: 300,
        width: 100,
        filterTemplate: gridFilterTemplates.filterTemplate,
        allowFiltering: false,
        disableHtmlEncode: false,
        template: gridCommonTemplates.imageTemplate,
        editTemplate: gridCommonTemplates.genderEditTemplate
      },
      {
        field: 'CustomerName',
        editType: 'stringedit',
        headerText: 'Customer Name',
        minWidth: 73,
        maxWidth: 200,
        validationRules: customerIDRules,
        disableHtmlEncode: false,
        filterBarTemplate: gridFilterTemplates.customerNameFilter
      },
      {
        headerText: 'Email ID',
        field: 'EmailID',
        editType: 'stringedit',
        minWidth: 62,
        maxWidth: 270,
        width: 230,
        validationRules: emailIDRules,
        filterBarTemplate: gridFilterTemplates.customerMailIDFilter
      }
    ] as ColumnModel[],
    productColumns: [
      {
        field: 'ProductID',
        headerText: 'Product ID',
        textAlign: 'Right',
        minWidth: 160,
        maxWidth: 200,
        width: 170,
        validationRules: productIDRules,
        editType: 'stringedit',
        filterTemplate: gridFilterTemplates.filterTemplate,
        template: gridCommonTemplates.productTemplate,
        allowFiltering: false,
      },
      {
        field: 'ProductName',
        headerText: 'Product Name',
        clipMode: 'EllipsisWithTooltip',
        minWidth: 100,
        maxWidth: 250,
        width: 210,
        validationRules: customerIDRules,
        filterBarTemplate: gridFilterTemplates.productNameFilter
      }
    ] as ColumnModel[],
    orderColumns: [
      {
        field: 'OrderDate',
        headerText: 'Order Date',
        headerTemplate: gridCommonTemplates.columnMenuDateFormatSettings,
        format: 'yMd',
        type: 'date',
        minWidth: 95,
        maxWidth: 220,
        width: 180,
        allowSorting: false,
        showColumnMenu: false,
        textAlign: 'Right',
        headerTextAlign: 'Right',
        validationRules: orderDateRules,
        editType: "datepickeredit",
        filterBarTemplate: gridFilterTemplates.templateOptionsDatePicker,
      },
      {
        field: 'Quantity',
        minWidth: 65,
        maxWidth: 200,
        width: 130,
        textAlign: 'Right',
        validationRules: freightIDRules,
        filterBarTemplate: gridFilterTemplates.templateOptionsQuantityNumericTextBox,
        editType: "numericedit",
      },
      {
        field: 'Freight',
        allowSorting: false,
        showColumnMenu: false,
        headerTemplate: gridCommonTemplates.columnMenuFormatSettings,
        headerText: 'Freight ($)',
        width: 248,
        minWidth: 195,
        maxWidth: 280,
        format: 'C2',
        textAlign: 'Right',
        headerTextAlign: 'Right',
        validationRules: freightIDRules,
        filterBarTemplate: gridFilterTemplates.templateOptionsFreightNumericTextBox,
        editType: "numericedit",
      }
    ] as ColumnModel[],

    shippingColumns: [
      {
        field: 'ShipCountry',
        headerText: 'Ship Country',
        headerTemplate: gridCommonTemplates.shipCountryTemplate,
        width: 140,
        minWidth: 115,
        maxWidth: 200,
        template: gridCommonTemplates.countryTemplate,
        editType: 'dropdownedit',
        allowSorting: false,
        validationRules: shipCountryRules,
        dataSource: dropdownDataSource.shipCountryData,
        filterBarTemplate: gridFilterTemplates.shipCountryFilter,
      },
      {
        field: 'ShipAddress',
        headerText: 'Ship Address',
        width: 153,
        minWidth: 100,
        maxWidth: 250,
        allowSorting: false,
        showColumnMenu: false,
        clipMode: 'EllipsisWithTooltip',
        headerTemplate: gridCommonTemplates.columnClipModeSettings,
      },
      {
        field: 'ShipName',
        headerText: 'Ship Name',
        minWidth: 80,
        maxWidth: 200,
        width: 130,
        clipMode: 'EllipsisWithTooltip'
      }
    ] as ColumnModel[]

  };

  const gridPropertiesConfigurations: GridPropertiesConfigurations = {
    'Group Settings': [
      {
        groupField: 'General Settings',
        items: [
          { id: 'groupreordering', label: 'Show Grouped Column Reordering', defaultChecked: true },
          { id: 'showdroparea', label: 'Show Group Drop Area', defaultChecked: true },
          { id: 'showgroupedcolumn', label: 'Show Grouped Columns', defaultChecked: false },
          { id: 'showtogglebutton', label: 'Show Toggle Button', defaultChecked: false },
          { id: 'showungroupbutton', label: 'Show Ungroup Icon in Header', defaultChecked: false },
        ]
      }
    ],
    'Header Settings': [
      {
        groupField: 'General Settings',
        items: [
          { id: 'sorting', label: 'Enable Sorting', defaultChecked: true, disabled: false, method: menuItemMethods.checkboxValueChange },
          { id: 'multisorting', label: 'Enable Multi-Column Sorting', defaultChecked: true, disabled: false },
          { id: 'filtering', label: 'Enable Filtering', defaultChecked: true, disabled: false, method: menuItemMethods.checkboxValueChange },
          { id: 'grouping', label: 'Enable Grouping', defaultChecked: true, disabled: false, method: menuItemMethods.checkboxValueChange },
          { id: 'reordering', label: 'Enable Column Reordering', defaultChecked: true, disabled: false },
          { id: 'resizing', label: 'Enable Column Resizing', defaultChecked: true, disabled: false }
        ]
      }
    ],
    'Grid Settings': [
      {
        groupField: 'General Settings',
        items: [
          { id: 'selection', label: 'Allow Selection', defaultChecked: true, method: menuItemMethods.checkboxValueChange, disabled: false },
          { id: 'textwrap', label: 'Allow Text Wrap', defaultChecked: false, disabled: false },
          { id: 'paging', label: 'Enable Paging', defaultChecked: true, disabled: false },
          { id: 'draganddrop', label: 'Enable Row Drag and Drop', defaultChecked: false, disabled: false },
          { id: 'autofit', label: 'Auto-Fit Column Content', defaultChecked: true, disabled: true },
          { id: 'column_menu', label: 'Show Column Menu', defaultChecked: false, disabled: false, method: menuItemMethods.checkboxValueChange },
          { id: 'general_grid', type: 'Separator' }
        ]
      },
      {
        groupField: 'Appearance & Interaction',
        items: [
          { id: 'altrow', label: 'Enable Alternate Row Styling', defaultChecked: false, disabled: false },
          { id: 'hover', label: 'Enable Row Hover Effect', defaultChecked: true, disabled: false },
          { id: 'grid_appearance', type: 'Separator' }
        ]
      },
      {
        groupField: 'Data Export',
        items: [
          { id: 'excelexport', label: 'Enable Excel Export', defaultChecked: true, disabled: false },
          { id: 'pdfexport', label: 'Enable PDF Export', defaultChecked: true, disabled: false }
        ]
      }
    ],

    'Filter Settings': [
      {
        groupField: 'General Settings',
        items: [
          { id: 'enablecasesensitivity', label: 'Enable Case Sensitivity', defaultChecked: false, disabled: false },
          { id: 'ignoreaccent', label: 'Ignore Accent', defaultChecked: false, disabled: false },
          {
            id: 'filtertype', label: 'Filter Type', marginLeft: '49%', marginRTL: '44%', type: 'dropdown', dataSource: dropdownDataSource.filterBarTypeOptions, placeholder: selectedFilterType,
            method: menuItemMethods.dropdownValueChange, disabled: false,
            value: selectedFilterType
          },
          { id: 'grid_filter', type: 'Separator' }
        ]
      },
      {
        groupField: 'Filter Bar Settings',
        items: [
          { id: 'filterbar', label: 'Show Filter Bar Operator', defaultChecked: false, disabled: false },
          { id: 'barstatus', label: 'Show Filter Bar Status', defaultChecked: false, disabled: false },
          { id: 'filterbarmode', label: 'Filter Bar Mode', marginLeft: '42%', marginRTL: '37%', type: 'dropdown', dataSource: dropdownDataSource.filterBarModeOptions, placeholder: selectedFilterBarMode, value: selectedFilterBarMode, disabled: false },
          { id: 'grid_filter_bar', type: 'Separator' }
        ]
      },
      {
        groupField: 'Excel / Checkbox Filter Settings',
        items: [
          { id: 'enableinfinitescrolling', label: 'Enable Infinite Scrolling', disabled: true, defaultChecked: false },
          { id: 'loadingindicator', label: 'Loading Indicator Type', disabled: true, marginLeft: '34%', marginRTL: '25%', type: 'dropdown', dataSource: dropdownDataSource.indicators, placeholder: selectedIndicator, value: selectedIndicator }
        ]
      },
    ],
    'Edit Settings': [
      {
        groupField: 'General Settings',
        items: [
          {
            id: 'editmode', label: 'Edit Mode', type: 'dropdown', disabled: false, dataSource: dropdownDataSource.editMode, dataFields: { text: 'text', value: 'value', disabled: 'isDisabled' },
            method: menuItemMethods.dropdownValueChange,
            marginLeft: '48%', marginRTL: '44%', placeholder: selectEditMode, value: selectEditMode
          },
          { id: 'nextrowedit', label: 'Allow Next Row Edit', defaultChecked: true, disabled: false },
          {
            id: 'confirmdialog', label: 'Show Unsaved Confirmation Dialog',
            defaultChecked: true, disabled: true, method: menuItemMethods.checkboxValueChange,
          },
          { id: 'grid_edit', type: 'Separator' }
        ]
      },
      {
        groupField: 'Add Action Settings',
        items: [
          { id: 'adding', label: 'Allow Adding Row', defaultChecked: true, disabled: false, method: menuItemMethods.checkboxValueChange, },
          { id: 'newrowposition', label: 'New Row Position', type: 'dropdown', disabled: false, marginLeft: '39%', marginRTL: '33%', dataSource: dropdownDataSource.newRowPosition, placeholder: selectNewRowPosition, value: selectNewRowPosition },
          { id: 'grid_add', type: 'Separator' }
        ]
      },
      {
        groupField: 'Edit Action Settings',
        items: [
          { id: 'editing', label: 'Allow Editing Row', disabled: false, defaultChecked: true, method: menuItemMethods.checkboxValueChange },
          { id: 'editondoubleclick', label: 'Edit on Double Click', disabled: false, defaultChecked: true, method: menuItemMethods.checkboxValueChange, },
          { id: 'grid_edit', type: 'Separator' }
        ]
      },
      {
        groupField: 'Delete Action Settings',
        items: [
          { id: 'deleting', label: 'Allow Delete Row', disabled: false, defaultChecked: true, method: menuItemMethods.checkboxValueChange },
          { id: 'deletedialog', label: 'Show Delete Confirmation Dialog', disabled: false, defaultChecked: true }
        ]
      }
    ],
    'Selection Settings': [
      {
        groupField: 'General Settings',
        items: [
          {
            id: 'selectiontype', disabled: false, method: menuItemMethods.dropdownValueChange, label: 'Selection Type', type: 'dropdown', marginLeft: '43%', marginRTL: '39%',
            dataSource: dropdownDataSource.selectiontype, placeholder: selectionType, dataFields: { text: 'text', value: 'value', disabled: 'isDisabled' }, value: selectionType
          },
          { id: 'toggle', disabled: true, label: 'Enable Toggle Selection', defaultChecked: true },
          { id: 'columnselection', disabled: false, label: 'Enable Column Selection', defaultChecked: true },
          { id: 'simplemultirow', disabled: true, label: 'Enable Simple Multi Row Selection', defaultChecked: false },
          { id: 'grid_selection', type: 'Separator' }
        ]
      },
      {
        groupField: 'Checkbox Selection Settings',
        items: [
          { id: 'checkboxselection', label: 'Enable CheckBox Selection', defaultChecked: true, disabled: false, method: menuItemMethods.checkboxValueChange },
          { id: 'persistselection', label: 'Persist Selection', defaultChecked: false, disabled: false },
          { id: 'checkboxonly', label: 'Allow Checkbox Selection Only', defaultChecked: false, disabled: false, },
          {
            id: 'checkboxmodedefault', label: 'Checkbox Selection Mode', type: 'dropdown', marginLeft: '29%', marginRTL: '26%',
            dataSource: dropdownDataSource.checkboxmode, placeholder: selectedCheckMode, value: selectedCheckMode, disabled: false,
          }
        ]
      }
    ],
    'Web Standards': [
      {
        groupField: 'General Settings',
        items: [
          { id: 'rtl', label: 'Enable RTL', defaultChecked: false },
          { id: 'localization', label: 'Localization', type: 'dropdown', marginLeft: '45%', marginRTL: '40%', valueTemplate: gridCommonTemplates.localeValueTemplate, itemTemplate: gridCommonTemplates.localizationFlagTemplate, dataSource: dropdownDataSource.localizationData, placeholder: localization.current, value: localization.current },
          { id: 'theme', label: 'Theme', type: 'dropdown', marginLeft: '51%', marginRTL: '47%', dataSource: dropdownDataSource.themeData, placeholder: theme.current, value: theme.current },
          { id: 'interactiontype', label: 'Interaction Type', type: 'dropdown', marginLeft: '40%', marginRTL: '35%', dataSource: dropdownDataSource.modeData, placeholder: displayMode.current, value: displayMode.current }
        ]
      }
    ],
  };


  const customComponentTemplates = {

    toolbarDialog: (selectedText: any) => {
      dialogObj?.show();
      let result = dropdownDataSource.listViewData.find((item) => item.text.includes(selectedText));
      if (result && listObj) {
        selectedItemRef.current = result;
        const listContent = document.getElementById("listContent");
        const newContent = customComponentTemplates.addPropertiesInsideDialogbox(result.text);
        if (listContent !== null && newContent !== null) {
          root = createRoot(listContent);
          root.render(newContent);
        }
      }
    },


    addPropertiesInsideDialogbox: (selectedListItem: string) => {
      if (!(selectedListItem in gridPropertiesConfigurations)) return null;
      const gridProperties = gridPropertiesConfigurations[selectedListItem as keyof GridPropertiesConfigurations];
      if (!gridProperties) return null;
      return (
        <div className="checkbox-group">
          {gridProperties.map((propertyFields: any) => (
            <div className="treeviewdiv">
              <TooltipComponent ref={(t: any) => {
                if (propertyFields && Array.isArray(propertyFields["items"])) {
                  propertyFields["items"].forEach((item: any) => {
                    if (t) tooltipRefs.current[item.label] = t;
                  });
                } else {
                  if (t) tooltipRefs.current[propertyFields.label] = t;
                }
              }} windowCollision={true} mouseTrail={true}
                target='.exclamation-container' enableRtl={enableRtlListView} position="RightCenter" beforeOpen={(args) => menuItemTemplates.beforeOpen(args, propertyFields.label || propertyFields)}>
                {(() => {
                  return (
                    <div key={propertyFields.id || propertyFields.groupField}>
                      <div>
                        {/* Group Header */}
                        <div style={{ fontWeight: "500", fontSize: "15px", marginBottom: "10px" }}>{propertyFields.groupField}</div>

                        {/* Render Checkboxes or Dropdown for Group */}
                        {propertyFields.items.map((item: any) => (
                          <div key={item.id} id={item.id} className={`${item.label?.replace(/\s+/g, "")}-custom-label`}>
                            {item.type === "dropdown" ? (
                              // created div element for the dropdown list element
                              <div className="dropdown-with-label">
                                {/* created div element for the dropdown label element */}
                                <div
                                  style={{
                                    display: 'flex',
                                    marginTop: '5px',
                                    gap: '10px'
                                  }}
                                >
                                  {/* created dropdown label value */}
                                  <label
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "400",
                                      lineHeight: "15px",
                                      letterSpacing: "0.24px"
                                    }}
                                    className={`${item.label.replace(/\s+/g, "")}-custom-label`}
                                  >
                                    {item.label}
                                  </label>
                                  <div className="exclamation-container" >
                                    <span className="e-icons e-circle-info icon"></span>
                                  </div>
                                </div>
                                {/* created div element for the icon symbol */}

                                {/* created dropdown component */}
                                <div style={{ marginBottom: "5px" }}>
                                  <DropDownListComponent
                                    id={item.id}
                                    ref={(instance: any) => {
                                      if (instance) {
                                        dropdownRefs.current[item.id] = instance;
                                      }
                                    }}
                                    itemTemplate={item.itemTemplate}
                                    valueTemplate={item.valueTemplate}
                                    dataSource={item.dataSource}
                                    fields={item.dataFields ? item.dataFields : { text: 'text', value: 'value' }}
                                    value={dropdownValues[item.id] || item.placeholder}
                                    enableRtl={enableRtlListView}
                                    width={166}
                                    enabled={!item.disabled}
                                    created={(e) => {
                                      gridPrivateMethods.changeDisableState(item.id, disableValues[item.id] || item.disabled);
                                      gridPrivateMethods.changeDropdownValue(item.id, dropdownValues[item.id] || item.placeholder);
                                      if (!isNullOrUndefined(item.method)) {
                                        item.method(selectedListItem, item, dropdownRefs.current, checkboxRefs.current);
                                      }
                                    }}
                                    change={(e) => {
                                      gridPrivateMethods.changeDisableState(item.id, disableValues[item.id] || item.disabled);
                                      gridPrivateMethods.changeDropdownValue(item.id, e.value);
                                      if (!isNullOrUndefined(item.method)) {
                                        item.method(selectedListItem, item, dropdownRefs.current, checkboxRefs.current);
                                      }
                                    }}
                                    placeholder={item.placeholder}
                                  />
                                </div>
                              </div>
                            ) : item.type === "Separator" ? (
                              /* Separator Element */
                              <hr className="separator-line" />
                            ) : (
                              <div id={item.id} className={`${item.label?.replace(/\s+/g, "")}-custom-label`} style={{
                                display: "flex",
                                alignItems: "center"
                              }}>
                                {/* created checkbox component if the groupfield contains in the checkbox configurations */}
                                <CheckBoxComponent
                                  id={item.id}
                                  ref={(instance: any) => {
                                    if (instance) {
                                      checkboxRefs.current[item.id] = instance;
                                    }
                                  }}
                                  disabled={item.disabled}
                                  label={item.label}
                                  enableRtl={enableRtlListView}
                                  checked={checkboxValues[item.id] || item.defaultChecked}
                                  created={(e) => {
                                    gridPrivateMethods.changeDisableState(item.id, disableValues[item.id] || item.disabled);
                                    gridPrivateMethods.handleCheckboxChange(item.id, checkboxValues[item.id] || item.defaultChecked);
                                    if (!isNullOrUndefined(item.method)) {
                                      item.method(selectedListItem, item, checkboxRefs.current, dropdownRefs.current);
                                    }
                                  }}
                                  change={(e) => {
                                    gridPrivateMethods.changeDisableState(item.id, disableValues[item.id] || item.disabled);
                                    item.defaultChecked = e.checked;
                                    gridPrivateMethods.handleCheckboxChange(item.id, e.checked);
                                    if (!isNullOrUndefined(item.method)) {
                                      item.method(selectedListItem, item, checkboxRefs.current, dropdownRefs.current);
                                    }
                                  }}
                                />
                                &nbsp;&nbsp; &nbsp;
                                <div className="exclamation-container">
                                  <span className="e-icons e-circle-info icon"></span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </TooltipComponent>
            </div>
          ))}
        </div>
      );
    },

    trackingChipTemplate: (props: Orders): JSX.Element => {
      return (
        <ChipListComponent ref={chipStatusRef}
          style={{ height: '25px', ...(enableRtlListView ? { gap: '5px' } : {}) }} enableRtl={enableRtlListView} text={props.TrackingStatus ? 'Paid' : 'Not Paid'} cssClass={props.TrackingStatus ? "chip-paid" : "chip-not-paid"}></ChipListComponent>
      );
    },

    ratingTemplate: (props: Orders): JSX.Element => {
      return (
        <div>
          <RatingComponent id={'ratingTempalte' + props.EmployeeID} enableRtl={enableRtlListView} showLabel={true} labelPosition='Left' precision='Half' labelTemplate={"<span style='font-size:14px;'>" + props.Rating + "</span>"} name={'Rating'} value={props.Rating} readOnly={true} cssClass='e-custom-rating'></RatingComponent>
        </div>
      );
    },

    ratingEditTemplate: (props: Orders): JSX.Element => {
      const isRTL = document.getElementById('overviewgrid')?.classList.contains('e-rtl');
      const ratingClass = isRTL ? 'e-custom-rating e-rtl' : 'e-custom-rating';
      return (
        <div>
          {showEditLabel && (
            <label style={{ color: '#9b9696', fontSize: '11px', top: '-9px', display: "flex", direction: isRTL ? 'rtl' : 'ltr' }}>Rating</label>
          )}
          <RatingComponent id={'ratingEdit' + props.EmployeeID} name={'Rating'} enableRtl={enableRtlListView} value={props.Rating} cssClass={ratingClass} ></RatingComponent>
        </div>
      );
    },

    progressTemplate: (props: Orders): JSX.Element => {
      let colorValue: string = props.OrderStatus === 'Delivered' ? "#205107" : props.OrderStatus === 'Cancelled' ? '#B3261E' : '#914C00';
      return (
        <div style={{ width: '200px', textAlign: 'right' }}>
          <ProgressBarComponent
            id={"progress_" + props.OrderID} style={{ marginTop: '-8px' }}
            type="Linear"
            value={(props.OrderStatus === 'Delivered' || props.OrderStatus === 'Cancelled') ? 100 : 80}
            trackThickness={4}
            progressThickness={4}
            enableRtl={enableRtlListView}
            animation={{ enable: false }}
            trackColor={props.OrderStatus === 'Delivered' ? "rgba(32, 81, 7, 0.3)"
              : props.OrderStatus === 'Cancelled' ? "rgba(179, 38, 30, 0.3)"
                : "rgba(145, 76, 0, 0.3)"}
            progressColor={colorValue}
          ></ProgressBarComponent>
          <div style={{ marginTop: '-15px', marginRight: '10px', fontSize: '11px', fontWeight: '500', color: colorValue }}>
            {props.OrderStatus}
          </div>
        </div>
      );
    }

  };

  const handleGridEvent = {
    onGridCreated: () => {
      startWalkthrough();
    },

    onDataBound: () => {
      if (gridInstance) {
        gridInstance.scrollModule.refresh();
      }
    },

    exportComplete: () => {
      let columns = gridInstance.getColumns();
      columns.forEach((col) => {
        if (col.headerText === 'Image') {
          gridInstance.showColumns(['Image']);
        }
      });
    },

    actionBegin: (args: PageEventArgs | GroupEventArgs | FilterEventArgs | SearchEventArgs | SortEventArgs | AddEventArgs | SaveEventArgs | EditEventArgs | DeleteEventArgs | ActionEventArgs | NotifyArgs | ReorderEventArgs): void => {

      if ((isHeaderTemplate || ((args as any).target && (args as any).target.closest && (args as any).target.closest('.e-icons.e-settings.icon'))) && args.requestType === 'sorting') {
        isHeaderTemplate = false;
        args.cancel = true;
      }
      if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        showEditLabel = gridInstance.editSettings.mode === 'Dialog' ? true : false;
      }
      if (args.requestType === 'save' && batchFlag && imageStream) {
        ((args as any).data as Orders).EmployeeImage = imageStream;
        imageStream = '';
      }

      if (args.requestType === "grouping") {
        setExpandCollapseValue("grouping");
      } if (args.requestType === "ungrouping") {
        setExpandCollapseValue("ungrouping");
      }
    },

    excelPdfQueryCellInfo: (args: ExcelQueryCellInfoEventArgs) => {
      (args.data as Orders).Verified = true
      if (args.column.headerText === "Customer Image") {
        args.image = {
          base64: (args.data as Orders).EmployeeImage,
          height: 70,
          width: 70,
        };
      }
    },

    toolbarClick: (args: ContextMenuClickEventArgs): void => {
      if (args.item.id === 'clearsorting_icon') {
        gridInstance.clearSorting();
      } else if (args.item.id === 'clear_row_selection') {
        gridInstance.clearRowSelection();
      }
      else if (args.item.id === 'clear_column_selection') {
        gridInstance.selectionModule.clearColumnSelection();
      }
      else if (args.item.id === 'clear_cell_selection') {
        gridInstance.clearCellSelection();
      }
      else if (args.item.id === 'clearfilter_icon') {
        gridInstance.clearFiltering();
      }
      else if (args.item.id === 'expand_icon') {
        if (expandCollapseValue === 'grouping' && isExpand) {
          isExpand = false;
          gridInstance.groupModule.collapseAll();
        } else {
          gridInstance.groupModule.expandAll();
          isExpand = true;
        }
      }
      else if (args.item.id === 'clear_selection') {
        gridInstance.clearSelection();
      } else if (args.item.id === 'export_pdf') {
        gridInstance.hideColumns(['Image'], 'headerText');
        gridInstance?.pdfExport();
      } else if (args.item.id === 'export_excel') {
        gridInstance.hideColumns(['Image'], 'headerText');
        gridInstance?.excelExport();
      } else if (args.item.id === 'add_icon') {
        gridInstance?.addRecord();
      } else if (args.item.id === 'edit_icon') {
        const selectedRowIndex = gridInstance.getSelectedRowIndexes()[0];
        if (selectedRowIndex !== undefined) {
          gridInstance.startEdit();
          gridInstance.editCell(selectedRowIndex, 'CustomerName');
        }
      } else if (args.item.id === 'update_icon') {
        gridInstance?.endEdit();
      } else if (args.item.id === 'delete_icon') {
        gridInstance?.deleteRecord();
      } else if (args.item.id === 'cancel_icon') {
        gridInstance?.closeEdit();
      }
      else if (args.item.id === 'export_csv') {
        gridInstance?.csvExport();
      } else if (args.item.id === "grid_properties") {
        customComponentTemplates.toolbarDialog("Header Settings");
      }
    },

    queryCellInfo: (args: QueryCellInfoEventArgs): void => {
      if ((args.column as ColumnModel).field === 'Freight' && args.data && (args.data as Orders).Freight !== undefined) {
        const FreightData = (args.data as Orders).Freight;
        (args.cell as HTMLElement).style.backgroundColor = FreightData < 50 ? '#F9DEDC' : FreightData > 50 && FreightData < 100 ? 'transparent' : '#F9DEDC';
        (args.cell as HTMLElement).style.color = FreightData < 50 ? '#b91c1c'
          : FreightData > 50 && FreightData < 100 ? '#15803d' : '#b91c1c';
        (args.cell as HTMLElement).style.fontSize = '14px';
        (args.cell as HTMLElement).style.fontWeight = '700';
      }
    },

    beforePaste: (args: BeforePasteEventArgs): void => {
      if ((args.column as ColumnModel).field === 'Freight') {
        let numberParser = intl.getNumberParser({ format: 'c1' });
        (args as { value: number }).value = numberParser((args as { value: number }).value);
      }
    },

    cellSave: (args: CellSaveArgs): void => {
      if ((window.event?.target as HTMLElement).closest('.e-upload')) {
        args.cancel = true;
      }
      if (batchFlag && (args.column as ColumnModel).headerText === "Customer Image") {
        const existingIndex: number = batchEdit.findIndex((item) => item.orderID === (args.rowData as Orders).OrderID);
        if (existingIndex !== -1) {
          batchEdit[existingIndex].employeeImage = imageStream;
        } else {
          let newBatchEdit = {
            orderID: (args.rowData as Orders).OrderID,
            employeeImage: imageStream,
          };
          batchEdit.push(newBatchEdit);
        }
      }
    },

    cellSaved: (): void => {
      batchFlag = false;
    }
  };

  let menuRef!: MenuComponent;
  let menuMobileRef!: MenuComponent;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let isResized: boolean = false;
  let isDesktop: boolean = true;
  let isMenuDesktopOpened: boolean = false;
  let isMenuMobileOpened: boolean = false;
  let menuAppBarFields = { text: ['category', 'value'], children: ['options'] };


  useEffect(() => {
    const handleWindowResize = () => {
      isResized = true;

      if (isResized && (isMenuDesktopOpened || isMenuMobileOpened)) {
        isResized = false;
        menuRef?.close();
        menuMobileRef?.close();
      }
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const menuItems = [
    {
      category: 'LEARNING',
      options: [
        {
          icon: 'platform-image sf-icon-demos',
          link: 'https://ej2.syncfusion.com/react/demos/#/tailwind3/grid/overview',
          title: 'Demos',
          about: {
            value: 'Explore our exciting product demos.',
          },
        },
        {
          icon: 'platform-image sf-icon-documentation',
          link: 'https://ej2.syncfusion.com/react/documentation/grid/getting-started',
          title: 'Documentation',
          about: {
            value: 'Comprehensive guides for every product.',
          },
        },
        {
          icon: 'platform-image sf-icon-blog',
          link: 'https://www.syncfusion.com/blogs',
          title: 'Blog',
          about: {
            value: 'Discover new ideas and perspectives.',
          },
        },
        {
          icon: 'platform-image sf-icon-tutorial-videos',
          link: 'https://www.syncfusion.com/tutorial-videos/react/grid',
          title: 'Tutorial Videos',
          about: {
            value: 'Sharpen your skills with our tutorial videos.',
          },
        },
        {
          icon: 'platform-image sf-icon-video-guide',
          link: 'https://www.syncfusion.com/self-service-demo/react/',
          title: 'Video Guides',
          about: {
            value: 'Explore key features in minutes with our quick video guides.',
          },
          isNew: true,
        },
        {
          icon: 'platform-image sf-icon-showcase-app',
          link: 'https://www.syncfusion.com/showcase-apps/react',
          title: 'Showcase Apps',
          about: {
            value: 'Real-time apps built using our UI components.',
          },
          isNew: true,
        },
        {
          icon: 'react-ui-kit',
          link: 'https://ej2.syncfusion.com/react/essential-ui-kit/blocks/grid',
          title: 'React UI Kit',
          about: {
            value: 'Prebuilt UI blocks for modern, responsive React apps.',
          }
        }
      ],
    },
  ];

  const menuTemplate = (data: any) => {
    return (
      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className="menu-item"
        data-title={data.title}
      >
        {data.category && (
          <div className="menu-title">{data.category}</div>
        )}
        <div className="menusubitems">
          <div className="icon-spacing">
            <span className={data.icon} />
          </div>
          <span className="menu-item-title">{data.title}</span>
          {data.isNew && <span className="e-badge">NEW</span>}
        </div>
        <div className="description">{data.about?.value}</div>
      </a>
    );
  };


  /* eslint-disable react-hooks/exhaustive-deps */
  const initialGridRender: JSX.Element = useMemo(() => {
    return (
      <GridComponent ref={(grid: GridComponent | null) => {
        if (grid) {
          gridInstance = grid;
        }
      }} 
        enableAltRow={false} 
        dataSource={dataSource}
        id="overviewgrid" 
        gridLines={'Both'}
        // height={'100%'} width={"100%"}
        allowPaging={true}
        showColumnChooser={true}
        allowReordering={true}
        allowFiltering={true}
        // allowPdfExport={true}
        // enableRtl={false}
        // allowExcelExport={true}
        // allowRowDragAndDrop={false}
        allowTextWrap={true}
        allowSorting={true}
        allowSelection={true}
        allowGrouping={true}
        // enableStickyHeader={false}
        allowResizing={true}
        filterSettings={gridProperties.filterOptions}
        toolbar={gridProperties.toolbarOptions.filter(item => item !== 'Edit' && item !== 'Update' && item !== 'Delete' && item !== 'Cancel')}
        // pageSettings={gridProperties.pageOptions}
        // editSettings={gridProperties.editOptions}
        // groupSettings={gridProperties.groupOptions}
        // contextMenuItems={gridProperties.contextMenuOptions}
        // sortSettings={gridProperties.sortingOptions}
        selectionSettings={gridProperties.columnSelection}
        // actionBegin={handleGridEvent.actionBegin}
        // excelQueryCellInfo={handleGridEvent.excelPdfQueryCellInfo}
        // pdfQueryCellInfo={handleGridEvent.excelPdfQueryCellInfo}
        toolbarClick={handleGridEvent.toolbarClick}
        // queryCellInfo={handleGridEvent.queryCellInfo}
        // cellSave={handleGridEvent.cellSave}
        // cellSaved={handleGridEvent.cellSaved}
        // created={handleGridEvent.onGridCreated}
        // dataBound={handleGridEvent.onDataBound}
        // excelExportComplete={handleGridEvent.exportComplete}
        // pdfExportComplete={handleGridEvent.exportComplete}
        // emptyRecordTemplate={gridCommonTemplates.emptyMessageTemplate}
      >

          <ColumnsDirective>

            <ColumnDirective 
                type='checkbox' width="90"
            />
            
            <ColumnDirective 
            headerTemplate= {gridCommonTemplates.columnMenuFormatSettings}
            field="jobno_oms" freeze='Left' headerText="ORDER INFO" width="120" 
            
            // template={detailsTemplate1} 
            />
            <ColumnDirective field="mainimagepath" headerText="STYLE IMG" width="90" textAlign="Center" allowFiltering={false} 
            // template={imageFieldTemplate('mainimagepath')} 
            />
            <ColumnDirective field="Fdt" headerText="DELIVERY INFO" width="125" 
            // template={detailsTemplate2} 
            />

            {/* Print Data Columns */}
            <ColumnDirective field="prnfile1" headerText="PRN IMG 1" width="90" textAlign="Center" allowFiltering={false} 
            // template={imageFieldTemplate('prnfile1')} 
            />
            <ColumnDirective field="prnfile2" headerText="PRN IMG 2" width="90" textAlign="Center" allowFiltering={false} 
            // template={imageFieldTemplate('prnfile2')} 
            />
            <ColumnDirective field="prnclr" type="string" headerText="PRN COLOR" width="100" 
            // template={genericHighlighter('prnclr')} 
            />

            {/* Standard Columns */}
            <ColumnDirective field="u25" headerText="U25" width="90" 
            // template={genericHighlighter('u25')} 
            />
            <ColumnDirective field="abc" headerText="ABC" width="85" 
            // template={genericHighlighter('abc')} 
            />
            <ColumnDirective field="u46" headerText="U46" width="85" 
            // template={genericHighlighter('u46')} 
            />
            <ColumnDirective field="u37" headerText="AOP" width="90" 
            // template={genericHighlighter('u37')} 
            />
            <ColumnDirective field="printing_R" headerText="PRINTING" width="110" 
            // template={genericHighlighter('printing_R')} 
            />
            <ColumnDirective field="Emb" type="string" headerText="EMB" width="100" 
            // template={genericHighlighter('Emb')} 
            />
            <ColumnDirective field="buyer1" type="string" headerText="BUYER" width="120" 
            // template={genericHighlighter('buyer1')}
             />
            <ColumnDirective field="merch" headerText="MERCH" width="110" 
            // template={genericHighlighter('merch')} 
            />
            <ColumnDirective field="styleno" headerText="STYLE NO" width="110" 
            // template={genericHighlighter('styleno')} 
            />
            <ColumnDirective field="director_sample_order" headerText="director_sample_order" width="110" 
            // template={genericHighlighter('director_sample_order')} 
            />
            <ColumnDirective field="order_follow_up" headerText="FOLLOW UP" width="150" 
            // template={genericHighlighter('order_follow_up')} 
            />
            <ColumnDirective field="quality_controller" headerText="QC" width="130" 
            // template={genericHighlighter('quality_controller')} 
            />
            <ColumnDirective field="styledesc" headerText="DESCRIPTION" width="180" 
            // template={genericHighlighter('styledesc')} 
            />
            <ColumnDirective field="quantity" headerText="QTY" width="90" textAlign="Right" 
            // template={genericHighlighter('quantity')}
             />
            <ColumnDirective field="company_name" headerText="COMPANY" width="140"
            //  template={genericHighlighter('company_name')} 
             />
          </ColumnsDirective>

        <Inject services={[Sort, CommandColumn, Aggregate, Edit, Group, RowDD, Freeze, VirtualScroll, ContextMenu, ColumnMenu, Filter, LazyLoadGroup, Page, PdfExport, InfiniteScroll, ExcelExport, Reorder, Resize, Toolbar, Search, ColumnChooser]} />
      </GridComponent>
    )
  }, [dataSource]);

  return (
    <div id="overalContainer" onClick={(e: any) => { removeWalkthrough(e) }}>
      <div className="App">

              <div className="dashboard-header">
        
          <div className="header-title">
              HERO FASHION - ORDER DASHBOARD
              
          </div>
          
          {/* Filter and Count Grouped - Desktop: Beside Title | Mobile: Below Title */}
          <div className="header-controls">
              <input
                type="text"
                placeholder="Search all columns..."
                value={searchKey}
                onChange={onSearchChange}
                className="search-input"
              />
              
              <div className="count-display">
                  {showingCount} / {totalCount} Records
              </div>
          </div>
      </div>

        {/* <AppBarComponent colorMode="Dark" cssClass="appbar">
          <div className="syncfusion-logo">
            <a className="sync-logo-img" title="Syncfusion" aria-label="Syncfusion logo" href="https://www.syncfusion.com/">
            </a>
          </div>
          <div className="e-appbar-separator"></div>
          <div>
            <span className="title">Feature Rich React Data Grid</span>
          </div>

          {isDesktop && (
            <>
              <div id="github" className="desktop-only">
                <span className="githubdemo"> <span> <i className="fab fa-github"></i> </span>
                  <a href="https://github.com/SyncfusionExamples/react-feature-rich-datagrid" target="_blank" rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'white', fontSize: '15px' }}>GitHub</a></span>
              </div>

              <div id="menu" className="desktop-only">
                <MenuComponent id="listmenu" ref={(list: any) => menuRef = list}
                  items={menuItems}
                  showItemOnClick={true}
                  fields={menuAppBarFields}
                  template={menuTemplate}
                  cssClass="e-template-menu"
                  onOpen={() => {
                    isMenuDesktopOpened = true;
                  }}
                ></MenuComponent>
              </div>
              <div id="demo" className="desktop-only">
                <a
                  id="book-free-demo" target="_blank"
                  href="https://www.syncfusion.com/request-demo"
                >
                  <span className="bookdemo">BOOK A FREE DEMO</span>
                </a>
              </div>
              <div id="tryfreebutton" className="desktop-only">
                <a
                  id="download-now-button" target="_blank"
                  href="https://www.syncfusion.com/downloads/react/?tag=es-livesample-react-featurerich-datagrid"
                  className="menu-item btn btn--primary"
                >
                  <span className="tryfree">TRY IT FREE</span>
                </a>
              </div>
            </>
          )}

          <div className="hamburger mobile-only"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen)
            }
            }
          >
            ☰
          </div>

        </AppBarComponent > */}

        {/* Popup menu for mobile */}

        {mobileMenuOpen && (<div className="popup-menu mobile-only">

          <div id="github" className="mobile-only" style={{ display: 'flex', alignItems: 'center' }}>
            <span className="githubdemo" style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ padding: '2px', color: 'white' }}>
                <i className="fab fa-github"></i>
              </span>
              <a
                href="https://github.com/SyncfusionExamples/react-feature-rich-datagrid"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'white', fontSize: '15px', marginLeft: '5px' }}>GitHub</a></span>
          </div> <hr className="separator-line-mobile" />
          <div id="menumobile" className="mobile-only">
            <MenuComponent id="listmenu" ref={(list: any) => menuMobileRef = list}
              items={menuItems}
              showItemOnClick={true}
              enableScrolling={true}
              fields={menuAppBarFields}
              template={menuTemplate}
              cssClass="e-template-menu"
              onOpen={() => {
                isMenuMobileOpened = true;
              }}
              beforeOpen={(e) => {
                if (e.parentItem.category === 'LEARNING') {
                  (closest(e.element, '.e-menu-wrapper') as HTMLElement).style.height = '250px';
                }
                const menuWrapper = document.getElementById("menumobile");
                if (menuWrapper) {
                  (menuWrapper as HTMLElement).style.setProperty('height', '300px', 'important');
                }
              }}
              beforeClose={(e) => {
                const menuWrapper = document.getElementById("menumobile");
                if (menuWrapper) {
                  (menuWrapper as HTMLElement).style.setProperty('height', '');
                }
              }}
            ></MenuComponent>
          </div>
          <hr className="separator-line-mobile" />
          <div id="demo" className="mobile-only">
            <a
              id="book-free-demo" target="_blank"
              href="https://www.syncfusion.com/request-demo"
            >
              <span className="bookdemo">BOOK A FREE DEMO</span>
            </a>
          </div> <hr className="separator-line-mobile" />
          <div className="mobile-only">
            <a
              id="download-now-button" target="_blank"
              href="https://www.syncfusion.com/downloads/react/?tag=es-livesample-react-featurerich-datagrid"
              className="btn btn-free bold free-trial-gtag-sep15"
            >
              <span className="tryfree">TRY IT FREE</span>
            </a>
          </div>
        </div>
        )}
      </div>
      <div className='parent-Grid-Container'>
        {initialGridRender}
        {stepIndex >= 0 && stepIndex < steps.length && (
          <>
            <div className="walkthrough-overlay" />
            <div className="walkthrough-tooltip">
              <div
                className={'walkthrough-tooltip-' + steps[stepIndex].arrowPosition}
                style={{
                  top: position.top,
                  left: position.left,
                  display: position.top === 0 && position.left === 0 ? 'none' : 'block',
                  padding: '8px 16px 8px 16px',
                  background: '#f9f9f9',
                  borderRadius: '8px',
                  minWidth: '300px',
                }}
              >
                <button className="tooltip-close" onClick={closeTooltip}>×</button>

                {/* Slide content with arrows inside */}
                <div className="walkthrough-text" style={{ fontSize: '14px', marginBottom: '20px', position: 'relative', padding: '0 30px' }}>
                  <span className="inner-arrow left-arrow" onClick={prevStep} style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '14px',
                    color: '#888',
                    cursor: 'pointer'
                  }}>&#10094;</span>

                  {steps[stepIndex].content}

                  <span className="inner-arrow right-arrow" onClick={nextStep} style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '14px',
                    color: '#888',
                    cursor: 'pointer'
                  }}>&#10095;</span>
                </div>

                {/* Navigation dots */}
                <div
                  className="walkthrough-footer"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12px',
                    flexDirection: 'column'
                  }}
                >
                  <div
                    className="walkthrough-dots"
                    style={{ display: 'flex', gap: '8px' }}
                  >
                    {steps.map((_, idx) => (
                      <span
                        key={idx}
                        onClick={() => setStepIndex(idx)}
                        className={`walkthrough-dot ${idx === stepIndex ? 'active' : ''}`}
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: idx === stepIndex ? 'blue' : 'gray',
                          display: 'inline-block',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function loadLocalization() {
  const localization = [arLocalization, deLocalization, frLocalization, zhLocalization];
  for (let i = 0; i < localization.length; i++) {
    L10n.load(localization[i]);
  }
};

interface BatchOrders {
  orderID: number;
  employeeImage: string
}

export interface Orders {
  OrderID: number;
  CustomerName: string;
  ShipCountry: string;
  EmployeeID: number;
  EmployeeImage: string;
  Quantity: number;
  Rating: number;
  Freight: number;
  Verified: boolean;
  TrackingStatus: boolean;
  OrderStatus: string;
  Gender: string;
  ImageIndex: number;
}

export interface KeyDataType { [key: string]: Object; }

interface GridPropertiesConfig {
  id: string;
  label?: string;
  defaultChecked?: boolean;
  type?: string;
  dataSource?: object;
  placeholder?: string;
  method?: Function;
  value?: string;
  marginLeft?: string;
  marginRTL?: string;
  valueTemplate?: Function;
  itemTemplate?: Function;
  disabled?: boolean;
  dataFields?: FieldSettingsModel
}

interface GridPropertiesConfigurations {
  'Header Settings': GridPropertiesGroup[];
  'Grid Settings': GridPropertiesGroup[];
  'Group Settings': GridPropertiesGroup[];
  'Filter Settings': GridPropertiesGroup[];
  'Edit Settings': GridPropertiesGroup[];
  'Selection Settings': GridPropertiesGroup[];
  'Web Standards': GridPropertiesGroup[];
}

interface GridPropertiesGroup {
  groupField: string;
  items: GridPropertiesConfig[];
}

interface ChangeEventArgs {
  checked: boolean;
}
