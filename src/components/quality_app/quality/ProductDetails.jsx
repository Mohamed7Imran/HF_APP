import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ProductionDetails() {
  const { unit, line } = useParams();
  const navigate = useNavigate();

  // Form states
  const [jobNo, setJobNo] = useState("");
  const [product, setProduct] = useState("");
  const [colour, setColour] = useState("");
  const [size, setSize] = useState("");
  const [bundleNo, setBundleNo] = useState("");
  const [pieces, setPieces] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const canContinue = jobNo && product && pieces;

  // QR Scanner Logic
  useEffect(() => {
    let scanner = null;
    if (isScanning) {
      scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      scanner.render(onScanSuccess, onScanError);
    }

    function onScanSuccess(decodedText) {
      // Ingaye neenga logic yeluthalam (e.g., Decoded text-ai parse panni fields-ai fill pannalam)
      setBundleNo(decodedText); 
      setIsScanning(false);
      scanner.clear();
    }

    function onScanError(err) {
      // console.warn(err);
    }

    return () => {
      if (scanner) scanner.clear();
    };
  }, [isScanning]);

  const handleContinue = () => {
    if (!canContinue) return;
    navigate(`/qc-entry/${unit}/${line}/first-piece/defects`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 flex flex-col items-center">
      
      {/* Scanner Overlay (Modal) */}
      {isScanning && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4 ">
          <div className="bg-white rounded-2xl p-4 w-full max-w-md">
            <div id="reader"></div>
            <button 
              onClick={() => setIsScanning(false)}
              className="w-full mt-4 py-3 bg-red-500 text-white font-bold rounded-xl"
            >
              Close Camera
            </button>
          </div>
        </div>
      )}

      <div className="w-full mt-14 max-w-[800px] bg-white rounded-[32px] p-2 md:p-12 shadow-sm border border-slate-100">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="h-12 w-12 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-[28px] font-bold text-[#0F172A]">Production Details</h1>
              <p className="text-slate-400 font-medium text-lg">Enter or scan job information</p>
              <p className="text-blue-600 text-md font-extrabold">Unit - {unit} / Line - {line}</p>
            </div>
          
          </div>
          
          {/* QR Icon Button */}
          <button 
            onClick={() => setIsScanning(true)}
            className="h-14 w-14 bg-[#0F172A] rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H10V10H4V4ZM4 14H10V20H4V14ZM14 4H20V10H14V4ZM14 14H17V17H14V14ZM17 17H20V20H17V17ZM17 14H20V17H17V14ZM14 17H17V20H14V17Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Job No */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Job No</label>
              <div className="relative">
                <select
                  value={jobNo}
                  onChange={(e) => setJobNo(e.target.value)}
                  className="w-full h-[60px] px-5 rounded-2xl border border-slate-200 bg-white text-slate-400 font-medium focus:border-blue-400 focus:ring-0 appearance-none outline-none"
                >
                  <option value="">Select Job</option>
                  <option value="J001">Job #001</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Product</label>
              <div className="relative">
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full h-[60px] px-5 rounded-2xl border border-slate-200 bg-white text-slate-400 font-medium focus:border-blue-400 focus:ring-0 appearance-none outline-none"
                >
                  <option value="">Select Product</option>
                  <option value="T-Shirt">T-Shirt</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Colour */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Colour</label>
              <div className="relative">
                <select
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                  className="w-full h-[60px] px-5 rounded-2xl border border-slate-200 bg-white text-slate-400 font-medium focus:border-blue-400 focus:ring-0 appearance-none outline-none"
                >
                  <option value="">Select Colour</option>
                  <option value="Navy">Navy Blue</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Size</label>
              <div className="relative">
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full h-[60px] px-5 rounded-2xl border border-slate-200 bg-white text-slate-400 font-medium focus:border-blue-400 focus:ring-0 appearance-none outline-none"
                >
                  <option value="">Select Size</option>
                  <option value="XL">Extra Large (XL)</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Bundle No */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Bundle No</label>
              <div className="relative">
                <input
                  type="text"
                  value={bundleNo}
                  onChange={(e) => setBundleNo(e.target.value)}
                  placeholder="Scan or enter bundle"
                  className="w-full h-[60px] px-5 rounded-2xl border border-slate-200 bg-white text-slate-600 font-medium focus:border-blue-400 outline-none placeholder:text-slate-300"
                />
                <button 
                  type="button"
                  onClick={() => setIsScanning(true)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Pieces */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Pieces (Pcs)</label>
              <input
                type="number"
                value={pieces}
                onChange={(e) => setPieces(e.target.value)}
                placeholder="Enter Pcs"
                className="w-full h-[60px] px-5 rounded-2xl border border-slate-200 bg-white text-slate-600 font-medium focus:border-blue-400 outline-none placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={!canContinue}
              className={`w-full h-[70px] rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all ${
                canContinue 
                ? 'bg-[#E2E8F0] text-[#64748B] hover:bg-[#CBD5E1]' 
                : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed opacity-60'
              }`}
            >
              Continue to Defects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}