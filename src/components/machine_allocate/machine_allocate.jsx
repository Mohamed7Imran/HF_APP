import React, { useEffect, useState, useContext, useRef } from "react";
import { api } from "../../auth/auth";
import { UserContext } from "../../UserContext";
import { Html5Qrcode } from "html5-qrcode";

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
  const { role } = useContext(UserContext);

  // Scanner States
  const [showScanner, setShowScanner] = useState(false);
  const [scanStep, setScanStep] = useState(1); 
  const [scannedMachine, setScannedMachine] = useState(null);
  const [scannedEmployee, setScannedEmployee] = useState(null);
  const [scannedSequence, setScannedSequence] = useState("");
  const [error, setError] = useState("");
  const [showManualInScanner, setShowManualInScanner] = useState(false);
  
  // Camera States
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    api.get("/qcapp/api/units/").then((res) => {
      setUnits(res.data);
      if (res.data.length > 0) {
        const match = role?.match(/\d+/);
        const allowedUnit = role === "admin" ? res.data[0] : res.data.find((u) => u.id.toString() === match?.[0]);
        if (allowedUnit) setSelectedUnit(allowedUnit.id);
      }
    });
    api.get("/qcapp/api/employees/").then((res) => setEmployees(res.data));

    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length > 0) {
        setCameras(devices);
        setSelectedCameraId(devices[0].id);
      }
    }).catch(err => console.error("Camera fetch error", err));
  }, [role]);

  useEffect(() => {
    if (!selectedUnit) return;
    api.get(`/qcapp/api/lines/?unit=${selectedUnit}`).then((res) => setLines(res.data));
    setSelectedLine(null);
  }, [selectedUnit]);

  const fetchAllocations = () => {
    if (!selectedLine) return;
    api.get(`/qcapp/api/allocations/?line=${selectedLine}&unit=${selectedUnit}`)
      .then((res) => setAllocatedMachines(res.data));
  };

  useEffect(() => { fetchAllocations(); }, [selectedLine, selectedUnit]);

  // Scanner Hook
  useEffect(() => {
    if (showScanner && scanStep < 4 && !error && selectedCameraId && !showManualInScanner) {
      const html5QrCode = new Html5Qrcode("reader");
      html5QrCodeRef.current = html5QrCode;

      html5QrCode.start(
        selectedCameraId,
        { fps: 20, qrbox: { width: 250, height: 250 } },
        (decodedText) => handleScanSuccess(decodedText.trim())
      ).catch(err => console.error("Start Error", err));

      return () => {
        if (html5QrCodeRef.current?.isScanning) {
          html5QrCodeRef.current.stop().catch(() => {});
        }
      };
    }
  }, [showScanner, scanStep, selectedCameraId, error, showManualInScanner]);

  const handleScanSuccess = (val) => {
    if (scanStep === 1) {
      const mObj = allocatedMachines.find(m => m.machine.Identity === val || m.machine.id.toString() === val);
      if (mObj) {
        setScannedMachine({ id: mObj.machine.id, identity: mObj.machine.Identity });
        setScanStep(2);
      } else {
        setError(`Machine ${val} not found.`);
      }
    } else if (scanStep === 2) {
      const eObj = employees.find(e => e.code.toString() === val);
      if (eObj) {
        setScannedEmployee(eObj);
        setScanStep(3); 
      } else {
        setError(`Employee ID ${val} invalid.`);
      }
    } else if (scanStep === 3) {
      setScannedSequence(val);
      setScanStep(4);
    }
  };

  const resetScanner = async () => {
    // Stop camera before closing state to prevent blank screen/crash
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        await html5QrCodeRef.current.stop();
      } catch (e) {
        console.log("Stop error", e);
      }
    }
    setShowScanner(false);
    setScanStep(1);
    setScannedMachine(null);
    setScannedEmployee(null);
    setScannedSequence("");
    setError("");
    setShowManualInScanner(false);
    setSearchEmp("");
  };

  const handleAllocationSubmit = (empCode, mId, seq) => {
    api.post("/qcapp/api/emp_allocate/", {
      emp_code: empCode, machine_id: mId, unit: selectedUnit, line: selectedLine, sequence: seq
    }).then(() => {
      fetchAllocations();
      resetScanner();
      setPopup({ open: false, machineId: null });
    });
  };

  const toggleStatus = (mId, eCode, currStatus) => {
    api.post("/qcapp/api/emp_allocate/", {
      emp_code: eCode, machine_id: mId, unit: selectedUnit, line: selectedLine, 
      status: currStatus ? 0 : 1
    }).then(() => fetchAllocations());
  };

  const sortedAllocations = [...allocatedMachines].sort((a, b) => {
    const getW = (i) => !i.employees?.[0] ? 3 : (i.employees[0].status === 1 ? 1 : 2);
    return getW(a) - getW(b);
  });

  return (
    <div className="h-screen flex flex-col bg-[#F1F5F9] font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-4 shadow-sm flex justify-between items-center z-10">
        <h1 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic">Control Panel</h1>
        <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-green-700 uppercase">System Live</span>
        </div>
      </header>

      <main className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
        {/* Filters */}
        <div className="space-y-3 shrink-0">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {units.map((u) => (
              <button key={u.id} onClick={() => setSelectedUnit(u.id)}
                className={`px-6 py-2 rounded-2xl text-xs font-bold shrink-0 ${selectedUnit === u.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-white text-slate-500 border"}`}>
                {u.name}
              </button>
            ))}
          </div>
          {selectedUnit && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {lines.map((l) => (
                <button key={l.id} onClick={() => setSelectedLine(l.id)}
                  className={`px-4 py-2 rounded-xl text-[11px] font-black shrink-0 ${selectedLine === l.id ? "bg-slate-800 text-white" : "bg-white text-slate-400 border border-slate-100"}`}>
                  LINE {l.line_number}
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedLine && (
          <button onClick={() => setShowScanner(true)} className="bg-indigo-600 p-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
            <span className="text-xl">📸</span>
            <span className="text-sm font-black text-white uppercase tracking-widest">New Allocation Scan</span>
          </button>
        )}

        {/* Table */}
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-slate-50/90 backdrop-blur-md z-10 border-b border-slate-100">
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-5">Machine</th>
                  <th className="px-6 py-5">Employee</th>
                  <th className="px-6 py-5">Sequence</th>
                  <th className="px-6 py-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sortedAllocations.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-black text-slate-800">{a.machine.Identity}</div>
                      <div className="text-[10px] font-bold text-indigo-500 uppercase">#{a.machine.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      {a.employees?.[0] ? (
                        <div className="flex items-center gap-3">
                          <img src={a.employees[0].photo || 'https://via.placeholder.com/40'} className="h-10 w-10 rounded-full border-2 border-white shadow-sm" alt=""/>
                          <div>
                            <div className="text-xs font-black text-slate-700">{a.employees[0].emp_code}</div>
                            <button onClick={() => setPopup({ open: true, machineId: a.machine.id })} className="text-[9px] font-bold text-indigo-600 uppercase">Change</button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => setPopup({ open: true, machineId: a.machine.id })} className="text-[10px] font-black text-slate-300 border border-dashed px-3 py-1 rounded-lg uppercase">Assign</button>
                      )}
                    </td>
                    <td className="px-6 py-4"><div className="text-sm font-black text-slate-800">{a.employees?.[0]?.sequence || "—"}</div></td>
                    <td className="px-6 py-4 text-right">
                      {a.employees?.[0] && (
                        <button onClick={() => toggleStatus(a.machine.id, a.employees[0].emp_code, a.employees[0].status)}
                          className={`w-20 py-2 rounded-xl text-[9px] font-black transition-all ${a.employees[0].status ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                          {a.employees[0].status ? "ONLINE" : "OFFLINE"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- SCANNER MODAL --- */}
      {showScanner && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl relative">
            <div className="p-8 pb-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step {scanStep} of 4</span>
                <button onClick={resetScanner} className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 text-xl font-bold">&times;</button>
              </div>
              
              {/* Camera Change Dropdown */}
              {scanStep < 4 && cameras.length > 0 && !showManualInScanner && (
                <div className="mb-4">
                  <select 
                    value={selectedCameraId}
                    onChange={(e) => setSelectedCameraId(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-100 p-3 rounded-2xl text-[11px] font-bold text-slate-700 outline-none focus:border-indigo-500"
                  >
                    {cameras.map(cam => <option key={cam.id} value={cam.id}>{cam.label || `Camera ${cam.id}`}</option>)}
                  </select>
                </div>
              )}

              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4].map(s => <div key={s} className={`h-1.5 flex-1 rounded-full ${scanStep >= s ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>)}
              </div>
              
              <h2 className="text-center text-xl font-black text-slate-800 uppercase tracking-tight">
                {scanStep === 1 ? "Scan Machine" : scanStep === 2 ? (showManualInScanner ? "Search Employee" : "Scan Employee") : scanStep === 3 ? "Scan Sequence" : "Review"}
              </h2>
            </div>

            <div className="px-8 pb-10">
              {error ? (
                <div className="text-center py-6">
                  <p className="text-red-500 font-bold mb-4">{error}</p>
                  <button onClick={() => setError("")} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase">Try Again</button>
                </div>
              ) : (
                <>
                  {scanStep < 4 ? (
                    <div className="flex flex-col items-center">
                      {scanStep === 2 && showManualInScanner ? (
                        <div className="w-full animate-in fade-in duration-300">
                          <input type="text" placeholder="Search Name or Code..." autoFocus onChange={(e) => setSearchEmp(e.target.value)}
                            className="w-full p-4 bg-slate-100 rounded-2xl text-sm font-bold outline-none mb-3 border-2 border-indigo-50" />
                          <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-2 pr-1">
                            {employees.filter(e => e.name.toLowerCase().includes(searchEmp.toLowerCase()) || e.code.toString().includes(searchEmp)).map(emp => (
                                <div key={emp.code} onClick={() => { setScannedEmployee(emp); setShowManualInScanner(false); setScanStep(3); }}
                                  className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer hover:bg-indigo-50 border border-slate-50 transition-all">
                                  <img src={emp.photo || 'https://via.placeholder.com/40'} className="h-9 w-9 rounded-full border shadow-sm" alt=""/>
                                  <div className="flex flex-col"><span className="text-[11px] font-black text-slate-700">{emp.code}</span><span className="text-[10px] font-bold text-slate-400 uppercase">{emp.name}</span></div>
                                </div>
                            ))}
                          </div>
                          <button onClick={() => setShowManualInScanner(false)} className="mt-4 w-full text-[10px] font-black text-slate-400 uppercase">Back to Camera</button>
                        </div>
                      ) : (
                        <div className="w-full">
                          <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden border-[10px] border-slate-50 bg-slate-50 shadow-inner">
                            <div id="reader" className="w-full h-full"></div>
                          </div>
                          {scanStep === 2 && (
                            <button onClick={() => setShowManualInScanner(true)} className="mt-6 w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg">⌨️ Manual Selection</button>
                          )}
                          {scanStep === 3 && (
                            <button onClick={() => { setScannedSequence("N/A"); setScanStep(4); }} className="mt-6 w-full py-4 border-2 border-indigo-600 text-indigo-600 rounded-2xl font-black uppercase tracking-widest">Skip Sequence</button>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-6">
                      <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">✅</div>
                      <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200 text-left space-y-4">
                         <div className="flex justify-between"><span className="text-[10px] font-black text-slate-400 uppercase">Machine</span><span className="text-xs font-black text-slate-800">{scannedMachine?.identity}</span></div>
                         <div className="flex justify-between"><span className="text-[10px] font-black text-slate-400 uppercase">Employee</span><span className="text-xs font-black text-slate-800">{scannedEmployee?.code}</span></div>
                         <div className="flex justify-between"><span className="text-[10px] font-black text-slate-400 uppercase">Sequence</span><span className="text-xs font-black text-slate-800">{scannedSequence || "N/A"}</span></div>
                      </div>
                      <button onClick={() => handleAllocationSubmit(scannedEmployee.code, scannedMachine.id, scannedSequence)} className="w-full bg-indigo-600 py-5 rounded-[2rem] text-white font-black uppercase tracking-widest shadow-xl shadow-indigo-100">Confirm & Allocate</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- TABLE CHANGE POPUP --- */}
      {popup.open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="p-6 bg-slate-50 border-b flex justify-between items-center">
              <h3 className="font-black text-slate-800 uppercase text-sm tracking-tighter">Assign Machine #{popup.machineId}</h3>
              <button onClick={() => setPopup({open:false})} className="text-slate-400 text-xl">&times;</button>
            </div>
            <div className="p-6">
              <input type="text" placeholder="Search..." onChange={(e) => setSearchEmp(e.target.value)}
                className="w-full p-4 bg-slate-100 rounded-2xl text-sm font-bold outline-none mb-4" />
              <div className="max-h-64 overflow-y-auto custom-scrollbar space-y-2 pr-2">
                {employees.filter(e => e.name.toLowerCase().includes(searchEmp.toLowerCase()) || e.code.toString().includes(searchEmp)).map(emp => (
                  <div key={emp.code} onClick={() => setSelectedEmp(emp.code)}
                    className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border-2 ${selectedEmp === emp.code ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-transparent text-slate-600'}`}>
                    <img src={emp.photo || 'https://via.placeholder.com/40'} className="h-8 w-8 rounded-full" alt=""/>
                    <span className="text-xs font-black">{emp.code} - {emp.name}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => handleAllocationSubmit(selectedEmp, popup.machineId, "")} className="w-full mt-6 bg-indigo-600 py-4 rounded-2xl text-white font-black uppercase text-xs tracking-widest">Update Allocation</button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        #reader__dashboard, #reader__header_message, .html5-qrcode-element, #reader__status_span { display: none !important; }
        #reader video { width: 100% !important; height: 100% !important; object-fit: cover !important; }
        #reader { border: none !important; }
      `}} />
    </div>
  );
}

export default Machine_allocate;