import React, { useState, useEffect, useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../../../index.css";
import { Camera, Image as ImageIcon, Save, Plus, Minus, AlertTriangle } from "lucide-react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

// Import images
import oil from "../assets/Oil.jpg";
import setoff from "../assets/Set Off2.jpg";
// import patches from "../assets/Patches.jpg";
import yarn from "../assets/Yarn Mistake.jpg";
import hole from "../assets/Hole.jpg";
// import gsm from "../assets/GSM Hole.jpg";
// import compact from "../assets/Compact Kadi.jpg";
import needleImg from "../assets/Needle Line.jpg";
// import stain from "../assets/Stain.jpg";
// import roll from "../assets/Roll Joint.jpg";

const QualityInspectionFullScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { rollData, r_code, h_code } = location.state || {};
  const rollNumber = rollData?.rlno || "";

  const defectTypes = [
    { id: 1, name: "OIL", hindi: "तेल", tamil: "ஆயில்", img: oil },
    { id: 2, name: "HOLES", hindi: "छेद", tamil: "ஹோல்ஸ்", img: hole },
    { id: 3, name: "SET OFF", hindi: "सेट ऑफ", tamil: "செட் ஆப்", img: setoff },
    { id: 4, name: "NEEDLE LINE", hindi: "सुई रेखा", tamil: "நீடில் லைன்", img: needleImg },
    { id: 5, name: "YARN MISTAKE", hindi: "यार्न मिस्टैक", tamil: "யான் மிஸ்டேக்", img: yarn },
    { id: 6, name: "POOVARI", hindi: " पूवारी", tamil: "பூவாரி", img: null },
    { id: 7, name: "LYCRA CUT", hindi: "लाइक्रा कट", tamil: "லைக்ரா வெட்டு", img: null },
    { id: 8, name: "NEPS", hindi: "नेप्स", tamil: "நேப்ஸ்", img: null },
    { id: 9, name: "NA HOLES", hindi: "ना होल", tamil: "நா ஹோல்", img: null }
  ];

  const POPUP_DEFECTS = ["OIL", "HOLES", "POOVARI", "LYCRA CUT", "NEPS", "NA HOLES"];
  const DECREASE_POPUP_DEFECTS = ["SET OFF", "YARN MISTAKE"];

  // --- STATE ---
  const [defectData, setDefectData] = useState(defectTypes.map(() => ({ count: 0, meter: "", display: "" })));
  const [time, setTime] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeDefectIndex, setActiveDefectIndex] = useState(null);
  const [showDecreasePopup, setShowDecreasePopup] = useState(false);
  const [activeDecreaseIndex, setActiveDecreaseIndex] = useState(null);
  const [showNeedlePopup, setShowNeedlePopup] = useState(false);
  const [needleMeterValue, setNeedleMeterValue] = useState("");
  const [capturedImage, setCapturedImage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);

  const cameraInputRef = useRef(null);
  const timerStartRef = useRef(null);
  const payloadRef = useRef(null);
  const hasCheckedInitialRef = useRef(false);

  // --- LOGIC HELPERS ---
  const formatTime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${ss}`;
  };

  const safeNumber = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const getPayload = () => {
    const getVal = (name) => {
      const idx = defectTypes.findIndex((d) => d.name === name);
      return idx !== -1 ? (defectData[idx].display || "") : "";
    };

    return {
      dt: new Date().toISOString().split("T")[0],
      rlno: String(rollNumber),
      hole: getVal("HOLES"),
      setoff: getVal("SET OFF"),
      needle_line: getVal("NEEDLE LINE"),
      oil_line: getVal("OIL"),
      oil_drops: "",
      remark: String(remarks || ""),
      poovari: getVal("POOVARI"),
      yarn_mistake: getVal("YARN MISTAKE"),
      lycra_cut: getVal("LYCRA CUT"),
      yarn_uneven: "",
      neps: getVal("NEPS"),
      timer: formatTime(time),
      dia: String(safeNumber(rollData?.dia)),
      na_holes: getVal("NA HOLES"),
      empid: r_code,
      mach_id: id,
      m12: "",
      loop_len: String(safeNumber(rollData?.ll)),
      image: capturedImage || "",
      submit: isSubmitted
    };
  };

  const defectFieldMap = {
    "OIL": "oil_line", "HOLES": "hole", "SET OFF": "setoff",
    "NEEDLE LINE": "needle_line", "POOVARI": "poovari",
    "YARN MISTAKE": "yarn_mistake", "LYCRA CUT": "lycra_cut",
    "NEPS": "neps", "NA HOLES": "na_holes",
  };

  useEffect(()=> {
    document.title = `Machine ${id}`;
  }, [id])

  // --- API SYNC ---
  // -- POST
  useEffect(() => {
    if (!rollNumber || hasCheckedInitialRef.current) return;
    
    const postOnce = async () => {
      const baseUrl = `https://app.herofashion.com/coraroll/`;
      const detailUrl = `${baseUrl}${rollNumber}/`;
      
      const checkRes = await fetch(detailUrl);
      if (checkRes.ok) {
        hasCheckedInitialRef.current = true;
        return;
      }
      
      await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getPayload()),
      });
      
      hasCheckedInitialRef.current = true;
    };
    
    postOnce();
  }, [rollNumber]);  
  
  useEffect(() => {
    payloadRef.current = getPayload();
  }, [defectData, remarks, time, rollNumber, capturedImage]);
  
  //PUT
  useEffect(() => {
    const interval = setInterval(() => {
      if (rollNumber && payloadRef.current) {
        fetch(`https://app.herofashion.com/coraroll/${rollNumber}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadRef.current),
        }).catch(err => console.error("Auto-sync error:", err));
      }
    }, 2000); // put works in every 2 seconds
    return () => clearInterval(interval);
  }, [rollNumber]);
  
  useEffect(() => {
    if (rollNumber) fetchRollData();
  }, [rollNumber]);
  
  //GET
  const fetchRollData = async () => {
    try {
      const res = await fetch(`https://app.herofashion.com/coraroll/${rollNumber}/`);
      if (!res.ok) return;
      const data = await res.json();
      
      setCapturedImage(data.image || "");
      setRemarks(data.remark || "");
      
      setDefectData(defectTypes.map((defect) => {
        const value = data[defectFieldMap[defect.name]] || "";
        let count = 0, meter = "";
        if (value) {
          const cMatch = value.match(/C-(\d+)/);
          const mMatch = value.match(/M-(\d+)/);
          if (cMatch) count = Number(cMatch[1]);
          if (mMatch) meter = mMatch[1];
        }
        return { count, meter, display: value };
      }));
      
      if (data.timer) {
        const parts = data.timer.split(":").map(Number);
        const seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
        setTime(seconds);
        timerStartRef.current = Date.now() - seconds * 1000;
      }
    } catch (err) { console.error("GET error:", err); }
  };

  useEffect(() => {
    timerStartRef.current = Date.now() - (time * 1000);
    const interval = setInterval(() => {
      setTime(Math.floor((Date.now() - timerStartRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- CORE LOGIC: UPDATE DEFECTS ---
  const updateDefect = (index, deltaCount = 0, newMeter = null) => {
    setDefectData((prev) => {
      const data = [...prev];
      const item = { ...data[index] };
      const defectName = defectTypes[index].name;

      // 1. Update Count (prevent negative)
      const updatedCount = item.count + deltaCount;
      item.count = updatedCount < 0 ? 0 : updatedCount;

      // 2. Update Meter (if provided)
      if (newMeter !== null) {
        item.meter = String(newMeter);
      }

      // 3. Update Display String
      const parts = [];
      
      // EXCLUSION FOR NEEDLE LINE: Only show "C-" if NOT Needle Line
      if (defectName !== "NEEDLE LINE" && item.count > 0) {
        parts.push(`C-${item.count}`);
      }

      // Show "M-" if meter exists
      if (item.meter && item.meter !== "" && item.meter !== "0") {
        parts.push(`M-${item.meter}`);
      }

      item.display = parts.join(" ").toUpperCase();

      data[index] = item;
      return data;
    });
    setShowModal(false);
  };

  const handlePlusClick = (index, name) => {
    if (name === "NEEDLE LINE") {
      setActiveDefectIndex(index);
      setNeedleMeterValue(defectData[index].meter); // Pre-fill existing value
      setShowNeedlePopup(true);
    } else if (POPUP_DEFECTS.includes(name)) {
      setActiveDefectIndex(index);
      setShowModal(true);
    } else {
      updateDefect(index, 1);
    }
  };

  const handleMinusClick = (index, name) => {
    if (name === "NEEDLE LINE") {
      // Logic Change: Now opens the NeedleMeterPopup to change/clear the value
      setActiveDefectIndex(index);
      setNeedleMeterValue(defectData[index].meter); // Pre-fill existing value
      setShowNeedlePopup(true);
    } else if (DECREASE_POPUP_DEFECTS.includes(name)) {
      setActiveDecreaseIndex(index);
      setShowDecreasePopup(true);
    } else if (POPUP_DEFECTS.includes(name)) {
      setActiveDefectIndex(index);
      setShowModal(true);
    } else {
      updateDefect(index, -1);
    }
  };

  const handleImageCapture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewImage(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);
    formData.append("rlno", rollNumber);
    const res = await fetch("https://app.herofashion.com/upload-roll-image/", { method: "POST", body: formData });
    const data = await res.json();
    setCapturedImage(data.image);
  };

  const HeaderField = ({ label, value }) => (
    <div className="col">
      <span className="fw-bold small d-block" style={{ color: "#2563EB" }}>{label}</span>
      <span className="fw-semibold small">{value || "---"}</span>
    </div>
  );

  return (
    <div className="min-vh-100 bg-light p-md-4 p-2 d-flex flex-column position-relative">
      
      {/* MODALS */}
      {showModal && (
        <CountMeterModal 
          initialData={defectData[activeDefectIndex]} 
          onClose={() => setShowModal(false)} 
          onSave={(c, m) => updateDefect(activeDefectIndex, c - defectData[activeDefectIndex].count, m)} 
        />
      )}
      
      {showDecreasePopup && (
        <ConfirmDecreaseModal 
          onConfirm={() => { updateDefect(activeDecreaseIndex, -1); setShowDecreasePopup(false); }} 
          onCancel={() => setShowDecreasePopup(false)} 
        />
      )}

      {showNeedlePopup && (
        <NeedleMeterPopup
          value={needleMeterValue}
          setValue={setNeedleMeterValue}
          onSave={() => {
            // Set deltaCount to 0 because we only want to update the Meter text
            updateDefect(activeDefectIndex, 0, needleMeterValue);
            setNeedleMeterValue("");
            setShowNeedlePopup(false);
          }}
          onClose={() => setShowNeedlePopup(false)}
        />
      )}

      {showSubmitPopup && (
        <SubmitConfirmModal 
          onCancel={() => setShowSubmitPopup(false)}
          onConfirm={async () => {
            setIsSubmitted(true);
            const final = { ...getPayload(), submit: true };
            await fetch(`https://app.herofashion.com/coraroll/${rollNumber}/`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(final),
            });
            navigate(-1);
          }}
        />
      )}

      <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} style={{ display: "none" }} onChange={handleImageCapture} />

      <div className="bg-white border rounded shadow-sm grow d-flex flex-column">
        {/* Header Section */}
        <div className="p-md-4 p-2">
          <div className="row g-0">
            <div className="col-12 col-lg-10 pe-lg-4">
              <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 g-2 mb-3">
                <HeaderField label="MACHINE ID" value={id} />
                <HeaderField label="ROLL NO" value={rollNumber} />
                <HeaderField label="JOB NO" value={rollData?.jobno} />
                <HeaderField label="COLOR" value={rollData?.colour} />
                <HeaderField label="PONO" value={rollData?.pono} />
              </div>
              <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 g-2 pb-3 border-bottom">
                <HeaderField label="PDC REF" value={rollData?.pdcref} />
                <HeaderField label="FABRIC" value={rollData?.fabricdescription} />
                <HeaderField label="WEIGHT" value={rollData?.weight} />
                <HeaderField label="DIA" value={rollData?.dia} />
                <HeaderField label="LOOP LENGTH" value={rollData?.ll} />
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div className="fw-bold fs-4 font-monospace">{formatTime(time)}</div>
                <button className="btn btn-danger text-white fw-bold px-4 py-2 d-flex align-items-center gap-2"
                  disabled={isSubmitted} onClick={() => setShowSubmitPopup(true)}>
                  <Save size={18} /> Submit
                </button>
              </div>
            </div>

            <div className="col-lg-2 ps-4 border-start d-none d-lg-flex flex-column gap-2">
              <button className="btn btn-primary btn-sm d-flex align-items-center justify-content-center gap-2" onClick={() => cameraInputRef.current.click()}><Camera size={16} /> Capture</button>
              <button className="btn btn-primary btn-sm d-flex align-items-center justify-content-center gap-2" onClick={() => setShowImage(!showImage)}><ImageIcon size={16} /> View</button>
              <div className="p-1 bg-white mt-1 border text-center" style={{ height: "150px" }}>
                {showImage && (previewImage || capturedImage) ? (
                  <img src={previewImage || `https://app.herofashion.com${capturedImage}`} alt="Captured" className="w-100 h-100 object-fit-contain" />
                ) : <span className="small text-muted">No Image</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Defect Grid */}
        <div className="bg-light border-top border-bottom grow d-flex flex-column overflow-hidden">
          <div className="d-flex flex-nowrap overflow-auto h-100 p-1 gap-1">
            {defectTypes.map((defect, index) => (
              <div key={defect.id} className="d-flex flex-column border rounded bg-white shadow-sm" style={{ minWidth: "128px", flex: "1 0 128px" }}>
                <div className="bg-light text-center py-2 border-bottom">
                  <div className="fw-bold fs-6">{defect.name}</div>
                  <div className="fw-bold text-secondary fs-6" style={{ fontSize: "0.7rem" }}>{defect.tamil}</div>
                  <div className="fw-bold text-secondary fs-6" style={{ fontSize: "0.7rem" }}>{defect.hindi}</div>
                </div>
                <div className="p-3 d-flex align-items-center justify-content-center grow">
                  {defect.img ? (
                    <img src={defect.img} alt={defect.name} style={{ width: "80px", height: "80px", objectFit: "cover" }} className="rounded border" />
                  ) : <span className="text-muted small">No Image</span>}
                </div>
                <div className="px-2 pb-2">
                  <input type="text" className="form-control form-control-sm text-center fw-bold bg-white" readOnly value={defectData[index].display} />
                </div>
                <div className="d-flex flex-column">
                  <button onClick={() => handlePlusClick(index, defect.name)} className="btn btn-success rounded-0 d-flex align-items-center justify-content-center py-2"><Plus size={20} /></button>
                  <button onClick={() => handleMinusClick(index, defect.name)} className="btn btn-danger d-flex align-items-center justify-content-center rounded-0 py-2"><Minus size={20} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white">
          <label className="fw-bold small">Remarks:</label>
          <input type="text" className="form-control mt-1" placeholder="Add notes..." value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const CountMeterModal = ({ initialData, onClose, onSave }) => {
  const [count, setCount] = useState(initialData.count || 0);
  const [meter, setMeter] = useState(initialData.meter || "");

  const adjustCount = (val) => setCount(prev => Math.max(0, prev + val));
  const adjustMeter = (val) => setMeter(prev => {
    const next = (Number(prev) || 0) + val;
    return next >= 0 ? String(next) : "";
  });

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" style={{ zIndex: 3000 }}>
      <div className="bg-white p-4 rounded-3 shadow" style={{ width: "380px" }}>
        <h5 className="fw-bold mb-4 text-center border-bottom pb-2">Update Defect Details</h5>
        
        <div className="mb-4">
          <label className="fw-bold mb-2 d-block">Defect Count:</label>
          <div className="input-group">
            <button className="btn btn-danger px-3" onClick={() => adjustCount(-1)}>-</button>
            <input type="number" className="form-control text-center fw-bold" value={count} onChange={(e) => setCount(Number(e.target.value))} />
            <button className="btn btn-success px-3" onClick={() => adjustCount(1)}>+</button>
          </div>
        </div>

        <div className="mb-4">
          <label className="fw-bold mb-2 d-block">Meter Point:</label>
          <div className="input-group">
            <button className="btn btn-danger px-3" onClick={() => adjustMeter(-1)}>-</button>
            <input type="number" className="form-control text-center fw-bold" value={meter} placeholder="0" onChange={(e) => setMeter(e.target.value)} />
            <button className="btn btn-success px-3" onClick={() => adjustMeter(1)}>+</button>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-light border w-100" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary w-100 fw-bold" onClick={() => onSave(count, meter)}>Apply</button>
        </div>
      </div>
    </div>
  );
};

const NeedleMeterPopup = ({ value, setValue, onSave, onClose }) => (
  <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" style={{ zIndex: 3000 }}>
    <div className="bg-white p-4 rounded shadow" style={{ width: "320px" }}>
      <h6 className="fw-bold mb-3">Needle Line Meter Position:</h6>
      <input className="form-control text-center fw-bold mb-3 fs-5" type="number" value={value} autoFocus onChange={(e) => setValue(e.target.value)} />
      <div className="d-flex gap-2">
        <button className="btn btn-secondary w-100" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary w-100" onClick={onSave}>Save</button>
      </div>
    </div>
  </div>
);

const ConfirmDecreaseModal = ({ onConfirm, onCancel }) => (
  <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" style={{ zIndex: 3000 }}>
    <div className="bg-white p-4 rounded shadow text-center" style={{ width: "320px" }}>
      <AlertTriangle color="#f59e0b" size={48} className="mb-2" />
      <h5 className="fw-bold">Confirm Decrease</h5>
      <p className="text-muted small">Are you sure you want to reduce the defect count?</p>
      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-outline-secondary w-100" onClick={onCancel}>No</button>
        <button className="btn btn-danger w-100" onClick={onConfirm}>Yes, Decrease</button>
      </div>
    </div>
  </div>
);

const SubmitConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" style={{ zIndex: 3000 }}>
    <div className="bg-white p-4 rounded shadow text-center" style={{ width: "350px" }}>
      <AlertTriangle color="#dc3545" size={48} className="mb-2" />
      <h5 className="fw-bold">Submit Roll?</h5>
      <p className="text-muted">Once submitted, you cannot edit this roll data.</p>
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-secondary w-100" onClick={onCancel}>Cancel</button>
        <button className="btn btn-danger w-100 fw-bold" onClick={onConfirm}>Confirm & Submit</button>
      </div>
    </div>
  </div>
);

export default QualityInspectionFullScreen;