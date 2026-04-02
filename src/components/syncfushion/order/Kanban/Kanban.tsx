import * as React from 'react';
import { useEffect, useState } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://app.herofashion.com/diwasg/")   // 🔴 replace with your API
        .then(res => res.json())
        .then(result => {
            setData(result);   // ✅ set API data
        })
        .catch(err => console.log(err));
    }, []);

  return (
    <KanbanComponent
      id="kanban"
      keyField="entryno"
      dataSource={data}
      cardSettings={{
        contentField: "Summary",
        headerField: "Id"
      }}
    >
      <ColumnsDirective>
        <ColumnDirective headerText="To Do" keyField="Open" />
        <ColumnDirective headerText="In Progress" keyField="InProgress" />
        <ColumnDirective headerText="Testing" keyField="Testing" />
        <ColumnDirective headerText="Done" keyField="Close" />
      </ColumnsDirective>
    </KanbanComponent>
  );
}

export default App;
