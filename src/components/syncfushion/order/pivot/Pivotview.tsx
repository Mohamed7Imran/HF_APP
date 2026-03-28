import React, { useEffect, useRef, useState } from "react";
import {
  PivotViewComponent,
  FieldList,
  Inject,
  PivotView,
  Toolbar,
} from "@syncfusion/ej2-react-pivotview";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-react-pivotview/styles/material.css";

export default function Pivot() {
  const pivotRef = useRef<any>(null);
  const [data, setData] = useState<any[]>([]);

  // ✅ API CALL
  useEffect(() => {
    fetch("https://app.herofashion.com/order_panda/")
      .then((res) => res.json())
      .then((resData) => {
        console.log("API DATA:", resData);

        // If API returns array
        setData(resData);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Fix FieldList popup target
  const setTarget = () => {
    if (pivotRef.current) {
      pivotRef.current.pivotFieldListModule.dialogRenderer.fieldListDialog.target =
        document.body;
    }
  };

  return (
    <div id="wrapper">
      <PivotViewComponent
        ref={pivotRef}
        height="550"
        dataBound={setTarget}
        showFieldList={true}
        showToolbar={true}
        toolbar={["FieldList"]}
        allowCalculatedField={true}
        allowDeferLayoutUpdate={true}
        showValuesButton={true}
        dataSourceSettings={{
          dataSource: data,
          rows: [
            { name: "buyer", caption: "Buyer" },
            { name: "production_unit", caption: "Unit" }
          ],
          columns: [
            { name: "finaldelvdate", caption: "Delivery Date" }
          ],
          values: [
            {
              name: "quantity",
              caption: "Total Qty",
              type: "Sum"
            }
          ],
          filters: [
            { name: "shipment_complete", caption: "Shipment Status" },
            { name: "stylename", caption: "Style" }
          ]
        }}
      >
        <Inject services={[FieldList, Toolbar]} />
      </PivotViewComponent>
    </div>
  );
}