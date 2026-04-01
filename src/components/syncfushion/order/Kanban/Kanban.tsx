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

    const columnTemplate = (props: any) => {
        return (<div className="header-template-wrap">
                <div className={"header-icon e-icons " + props.keyField}></div>
                <div className="header-text">{props.headerText}</div>
            </div>);
    }

  return (
    <KanbanComponent
      id="kanban"
      keyField="worktype1"
      dataSource={data}
      cardSettings={{
        contentField: "wrkcat",
        headerField: "entryno"
      }}
      swimlaneSettings={{ keyField: "asgby_code" }}
    >
      <ColumnsDirective>
        <ColumnDirective headerText="To Do" keyField="Ordinary" template={columnTemplate} allowToggle={true}/>
        <ColumnDirective headerText="In Progress" keyField="InProgress" template={columnTemplate}/>
        <ColumnDirective headerText="Testing" keyField="Testing" template={columnTemplate}/>
        <ColumnDirective headerText="Done" keyField="Close" template={columnTemplate}/>
      </ColumnsDirective>
    </KanbanComponent>
  );
}

export default App;
