import { useState, useEffect, useRef, useMemo } from 'react';
import * as React from "react";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Sort,
  Filter,
  Toolbar,
  Edit
} from '@syncfusion/ej2-react-grids';

import './style.css';

let formObject: FormValidator;

function Form() {
  const buyerRef = useRef<any>(null);
  const [dateOfBirth, setDateOfBirth] = useState<any>(null);

  // API data
  const [buyerData, setBuyerData] = useState<any[]>([]);
  const [gridData, setGridData] = useState<any[]>([]);
  const [orderno, setOrderno] = useState('');

  // selected buyer
  const [selectedBuyer, setSelectedBuyer] = useState<any>({
    buyerid: '',
    buyername: ''
  });

  // ================= API LOAD =================
  useEffect(() => {
    fetch("https://app.herofashion.com/web_socket/")
      .then((res) => res.json())
      .then((data) => {
        setBuyerData(data);
        setGridData(data); // load grid initially
      })
      .catch((err) => console.error(err));
  }, []);

  // ================= VALIDATOR =================
  useEffect(() => {
    const options = {
      rules: {
        buyerid: {
          required: [true, '* Please select buyer id'],
        },
        orderno: {
          required: [true, '* Please enter order number'],
        },
        date: {
          required: [true, '* Please select date'],
        },
      },
    };

    formObject = new FormValidator('#form1', options);
  }, []);

  // ================= HANDLERS =================
  const dateChangeHandler = (event: any) => {
    setDateOfBirth(event.value);
  };

  const onBuyerSelect = (e: any) => {
    const item = e.itemData;

    if (item) {
      setSelectedBuyer({
        buyerid: item.buyerid,
        buyername: item.buyername
      });
    }
  };

  const onSubmit = () => {
    if (formObject.validate()) {
      const newRecord = {
        buyerid: selectedBuyer.buyerid,
        buyername: selectedBuyer.buyername,
        orderno: orderno,
        date: dateOfBirth
          ? new Date(dateOfBirth).toLocaleDateString()
          : '',
        refresh: 'Pending'
      };

      setGridData([...gridData, newRecord]);

      // reset
      (formObject as any).element.reset();
      setDateOfBirth(null);
      setOrderno('');
      setSelectedBuyer({ buyerid: '', buyername: '' });
    }
  };

    const toolbarOptions: any[] = [
      "Search",
      'Add',
      'Edit',
      'Delete'
    ];

  // ================= UI =================
  return (
  <div className="page-container">

    {/* ===== CARD ===== */}
    <div className="form-card">

      <h2 className="form-title">Syncfusion Buyer Basic Form</h2>

      {/* ===== FORM ===== */}
      <form id="form1" className="form-grid">

        {/* Buyer ID */}
        <div className="form-group">
          <AutoCompleteComponent
            ref={buyerRef}
            name="buyerid"
            dataSource={buyerData}
            fields={{ value: 'buyerid' }}
            placeholder="Select Buyer ID"
            change={onBuyerSelect}
            filterType="Contains"
            floatLabelType="Auto"
            data-msg-containerid="errorBuyer"
          />
          <div id="errorBuyer" />
        </div>

        {/* Buyer Name */}
        <div className="form-group">
          <TextBoxComponent
            value={selectedBuyer.buyername}
            placeholder="Buyer Name"
            floatLabelType="Auto"
            readonly={true}
          />
        </div>

        {/* Order No */}
        <div className="form-group">
          <TextBoxComponent
            name="orderno"
            value={orderno}
            change={(e: any) => setOrderno(e.value)}
            placeholder="Order No"
            floatLabelType="Auto"
            data-msg-containerid="errorOrder"
          />
          <div id="errorOrder" />
        </div>

        {/* Date */}
        <div className="form-group">
          <DatePickerComponent
            name="date"
            value={dateOfBirth}
            change={dateChangeHandler}
            placeholder="Select Date"
            floatLabelType="Auto"
            data-msg-containerid="errorDate"
          />
          <div id="errorDate" />
        </div>

      </form>

      {/* ===== BUTTON ===== */}
      <div className="form-actions">
        <ButtonComponent cssClass="e-primary" onClick={onSubmit}>
          Submit
        </ButtonComponent>
      </div>
    </div>

    {/* ===== GRID ===== */}
    <div className="grid-card">
      <GridComponent
        dataSource={gridData}
        allowPaging={true}
        allowSorting={true}
        height={350}
        editSettings={{
          allowAdding: true,
          allowDeleting: true,
          allowEditing: true,
          allowDoubleClick: true,
          mode: "Dialog"
         }
        }
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          <ColumnDirective field="buyerid" headerText="Buyer ID" width="150" />
          <ColumnDirective field="buyername" headerText="Buyer Name" width="200" />
          <ColumnDirective field="orderno" headerText="Order No" width="150" />
          <ColumnDirective field="date" headerText="Date" width="150" />
          <ColumnDirective field="refresh" headerText="Status" width="150" />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Toolbar, Edit]} />
      </GridComponent>
    </div>

  </div>
);
}

export default Form;