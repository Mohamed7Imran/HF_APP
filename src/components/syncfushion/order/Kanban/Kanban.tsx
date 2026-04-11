import * as ReactDOM from 'react-dom';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { useState, useEffect } from 'react';
import { Ajax } from '@syncfusion/ej2-base';
function App() {
 const [kanbanData, setKanbanData] = useState([]);
  const ajaxUrl = 'https://app.herofashion.com/diwasg/';

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const ajax = new Ajax({
      url: "https://app.herofashion.com/diwasg/",
      type: 'GET',
      mode: true, // cross-domain
      onSuccess: (result: any) => {
        const data = JSON.parse(result);
        setKanbanData(data);
      },
      onFailure: (error: any) => {
        console.error('Load failed:', error);
      }
    });
    ajax.send();
  };

  const handleActionComplete = (args: any) => {
    debugger;
    if (args.requestType === 'cardCreated' && args.addedRecords) {
      // Handle Insert
      args.addedRecords.forEach((card: any) => {
        const ajax = new Ajax({
          url: ajaxUrl,
          type: 'POST',
          mode: true,
          contentType: 'application/json',
          data: JSON.stringify({ action: 'insert', data: card }),
          onSuccess: (result: any) => {
            console.log('Card inserted successfully');
          },
          onFailure: (error: any) => {
            console.error('Insert failed:', error);
          }
        });
        ajax.send();
      });
    } 
        else if (args.requestType === 'cardChanged' && args.changedRecords) {
      // Handle Update
      let updateUrl=ajaxUrl + args.changedRecords[0]['asgby_name']+ "/";
      args.changedRecords.forEach((card: any) => {
        const ajax = new Ajax({
          url: updateUrl,
          type: 'PUT',
          mode: true,
          contentType: 'application/json',
          data: JSON.stringify(args.changedRecords[0]),
          onSuccess: (result: any) => {
            console.log('Card updated successfully');
          },
          onFailure: (error: any) => {
            console.error('Update failed:', error);
          }
        });
        ajax.send();
      });
    }
 
    else if (args.requestType === 'cardRemoved' && args.deletedRecords) {
      // Handle Delete
      args.deletedRecords.forEach((card: any) => {
        const ajax = new Ajax({
          url: ajaxUrl,
          type: 'POST',
          mode: true,
          contentType: 'application/json',
          data: JSON.stringify({ action: 'delete', data: card }),
          onSuccess: () => {
            console.log('Card removed successfully');
          },
          onFailure: (error: any) => {
            console.error('Remove failed:', error);
          }
        });
        ajax.send();
      });
    }
  };

  return (
    <div>
      <KanbanComponent 
        id="kanban" 
        keyField="worktype1" 
        dataSource={kanbanData}
        actionComplete={handleActionComplete}
        cardSettings={{
          contentField: "wrkcat",
          headerField: "entryno", 
        }}
        swimlaneSettings={{ keyField: "asgby_code" }}
      >
        <ColumnsDirective>
          <ColumnDirective headerText="To Do" keyField="Ordinary" showAddButton={true}/>
          <ColumnDirective headerText="In Progress" keyField="InProgress"/>
          <ColumnDirective headerText="Review" keyField="Testing"/>
          <ColumnDirective headerText="Done" keyField="Close"/>
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
}

export default App;