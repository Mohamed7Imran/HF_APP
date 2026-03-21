import React, { useEffect, useState } from "react";
import { api } from "../../auth/auth";

function Machine_allocate() {
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [lines, setLines] = useState([]);
  const [selectedLine, setSelectedLine] = useState(null);
  const [allocatedMachines, setAllocatedMachines] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [popup, setPopup] = useState({ open: false, machineId: null });
  const [searchEmp, setSearchEmp] = useState("");
  const [selectedEmp, setSelectedEmp] = useState(null);

  // --- Load Units ---
  useEffect(() => {
    api.get("/qcapp/api/units/").then((res) => {
      setUnits(res.data);
      if (res.data.length > 0) setSelectedUnit(res.data[0].id);
    });
  }, []);

  // --- Load Lines for Unit ---
  useEffect(() => {
    if (!selectedUnit) return;
    api.get(`/qcapp/api/lines/?unit=${selectedUnit}`).then((res) => setLines(res.data));
    setSelectedLine(null);
  }, [selectedUnit]);

  // --- Load Allocated Machines for Line + Unit ---
  useEffect(() => {
    if (!selectedLine) {
      setAllocatedMachines([]);
      return;
    }
    api
      .get(`/qcapp/api/allocations/?line=${selectedLine}&unit=${selectedUnit}`)
      .then((res) => setAllocatedMachines(res.data))
      .catch((err) => console.error(err));
  }, [selectedLine, selectedUnit]);

  // --- Load Employees ---
  useEffect(() => {
    api.get("/qcapp/api/employees/").then((res) => setEmployees(res.data));
  }, []);

  // --- Open Popup ---
  const openPopup = (machineId) => {
    setPopup({ open: true, machineId });
    setSelectedEmp(null);
    setSearchEmp("");
  };

  // --- Close Popup ---
  const closePopup = () => setPopup({ open: false, machineId: null });

  // --- Save Employee Allocation ---
  const saveAllocation = () => {
    if (!selectedEmp || !popup.machineId) return;
    api
      .post("/qcapp/api/emp_allocate/", {
        emp_code: selectedEmp,
        machine_id: popup.machineId,
        unit: selectedUnit,
        line: selectedLine
      })
      .then(() => {
        closePopup();
        // Refresh allocated machines
        api
          .get(`/qcapp/api/allocations/?line=${selectedLine}&unit=${selectedUnit}`)
          .then((res) => setAllocatedMachines(res.data));
      })
      .catch((err) => console.error(err));
  };

  // --- Filter employees by search ---
  const filteredEmployees = employees.filter(
    (e) =>
      e.name?.toLowerCase().includes(searchEmp.toLowerCase()) ||
      e.code?.toString().includes(searchEmp)
  );



  const toggleStatus = (machineId, empCode) => {
  const allocation = allocatedMachines.find(a => a.machine.id === machineId);
  if (!allocation) return;

  const emp = allocation.employees.find(e => e.emp_code === empCode);
  if (!emp) return;

  const newStatus = !emp.status;
  

  // 🔥 Confirmation alert
  const confirmChange = window.confirm(
    `Are you sure you want to mark this employee as ${newStatus ? "ONLINE" : "OFFLINE"}?`
  );

  if (!confirmChange) return; // ❌ stop if user cancels

  // Send POST with status
  api
    .post("/qcapp/api/emp_allocate/", {
      emp_code: empCode,
      machine_id: machineId,
      unit: selectedUnit,
      line: selectedLine,
      status: newStatus ? 1 : 0
    })
    .then(() => {
      setAllocatedMachines(prev =>
        prev.map(a =>
          a.machine.id === machineId
            ? {
                ...a,
                employees: a.employees.map(e =>
                  e.emp_code === empCode ? { ...e, status: newStatus } : e
                ),
              }
            : a
        )
      );
    })
    .catch((err) => console.error(err));
};

  return (
    <div className="h-screen overflow-hidden bg-[#F1F5F9] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">Machine Assets</h1>
          <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tighter">
            Inventory Management
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-green-700 uppercase">Live</span>
        </div>
      </header>

      <main className="flex-1 overflow-hidden p-3 md:p-5 flex flex-col gap-4">
        {/* Unit Tabs */}
        <div className="shrink-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-widest">Select Unit</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {units.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setSelectedUnit(unit.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                  selectedUnit === unit.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {unit.name}
              </button>
            ))}
          </div>
        </div>

        {/* Line Tabs */}
        {selectedUnit && (
          <div className="shrink-0 animate-in fade-in slide-in-from-top-1">
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
              {lines.map((line) => (
                <button
                  key={line.id}
                  onClick={() => setSelectedLine(line.id)}
                  className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all border ${
                    selectedLine === line.id
                      ? "bg-slate-800 text-white border-slate-800"
                      : "bg-white text-slate-400 border-slate-100"
                  }`}
                >
                  L-{line.line_number}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Allocation Table */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center shrink-0">
            <h3 className="text-sm font-bold text-slate-700">Allocation List</h3>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
              Count: {allocatedMachines.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {!selectedLine ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-300">
                <p className="text-xs italic">Select a line to view machines</p>
              </div>
            ) : allocatedMachines.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-100">
                  <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Machine Identity</th>
                    <th className="px-4 py-2 hidden sm:table-cell">Time</th>
                    <th className="px-4 py-2">Photo</th> {/* New column */}
                    <th className="px-4 py-2 text-center">Employee</th> {/* New column */}
                   
                    <th className="px-4 py-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {allocatedMachines.map((a) => (
                    <tr key={a.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-4 py-3 text-xs font-bold text-blue-600">#{a.machine.id}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold text-slate-700">{a.machine.Identity}</span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-[10px] text-slate-400 font-medium">
                          {new Date(a.allocated_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </td>

                      {/* Photo Column */}
                      <td className="px-4 py-3 text-center">
                        {a.employees[0]?.photo ? (
                          <img src={a.employees[0].photo} alt={a.employees[0].emp_code} className="w-6 h-6 rounded-full object-cover" />
                        ) : (
                          <div className="w-6 h-6 bg-slate-200 rounded-full" />
                        )}
                      </td>

                      {/* Employee Column */}
                      <td className="px-4 py-3 text-center ">
                        <span className="text-[10px] font-bold text-slate-700">
                          {a.employees[0]?.emp_code || "N/A"}
                        </span>
                        <button
                          onClick={() => openPopup(a.machine.id)}
                          className="ml-2 text-[10px] font-bold text-red-600 bg-green-50 px-2 py-1 rounded-md border border-green-100"
                        >
                          Assign Employee
                        </button>
                      </td>

                      <td className="px-4 py-3 text-right">
                        {a.employees[0] ? (
                          <button
                            onClick={() => toggleStatus(a.machine.id, a.employees[0].emp_code)}
                            className={`text-[10px] font-bold px-2 py-1 rounded-md border transition-colors ${
                              a.employees[0].status
                                ? "text-green-600 bg-green-50 border-green-100 hover:bg-green-100"
                                : "text-red-600 bg-red-50 border-red-100 hover:bg-red-100"
                            }`}
                          >
                            {a.employees[0].status ? "ONLINE" : "OFFLINE"}
                          </button>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                            N/A
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-300">
                <p className="text-xs italic">No allocations found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Employee Popup */}
      {popup.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-80 max-h-[80vh] overflow-y-auto flex flex-col gap-3">
            <h3 className="font-bold text-sm text-slate-700">
              Assign Employee to Machine #{popup.machineId} and {popup.Identity}
            </h3>
            <input
              type="text"
              value={searchEmp}
              onChange={(e) => setSearchEmp(e.target.value)}
              placeholder="Search employee..."
              className="px-3 py-2 border rounded text-sm"
            />
            <ul className="flex flex-col gap-1 max-h-60 overflow-y-auto">
              {filteredEmployees.map((emp) => (
                <li
                  key={emp.code}
                  onClick={() => setSelectedEmp(emp.code)}
                  className={`px-2 py-1 rounded cursor-pointer text-sm ${
                    selectedEmp === emp.code ? "bg-blue-600 text-white" : "hover:bg-slate-100"
                  }`}
                >
                  {emp.code} - {emp.name}
                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={closePopup}
                className="px-3 py-1 text-sm border rounded hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={saveAllocation}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scrollbar CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
      `}} />
    </div>
  );
}

export default Machine_allocate;