import { useParams, useNavigate } from "react-router-dom";

export default function LineDetail() {
    const { unit, line } = useParams();
    const navigate = useNavigate();

    const inspections = [
        {
            id: 'first-piece',
            title: 'First Piece Output',
            subtitle: 'Quality Assurance Protocol',
            icon: "📄",
        },
        {
            id: 'roving-qc',
            title: 'Roving QC Inspection',
            subtitle: 'Quality Assurance Protocol',
            icon: "📋",
        }
    ];

    // const handleSelect = (inspectionId) => {
    //     navigate(`/qc-admin/qc-entry/${unit}/${line}/${inspectionId}`);
    // };

    const handleSelect = async (inspectionId) => {
  if (inspectionId !== "first-piece") {
    navigate(`/qc-admin/qc-entry/${unit}/${line}/${inspectionId}`);
    return;
  }

  try {
    const res = await fetch(`https://hfapi.herofashion.com/qcapp/get_last_bundle/?unit=${unit}&line=${line}`);
    const data = await res.json();

    if (!data.bundle_id) {
    //   alert("No bundle found");
      navigate(`/qc-admin/qc-entry/${unit}/${line}/${inspectionId}`);
      return;
    }

    // ✅ COMPLETED → go to scan page
    if (data.is_completed) {
      navigate(`/qc-admin/qc-entry/${unit}/${line}/first-piece`, {
        state: { bundle_id: data.bundle_id }
      });
    }

    // 🔄 NOT COMPLETED → resume defects page
    else {
      navigate(`/qc-admin/defects/${unit}/${line}`, {
        state: {
          bundle_id: data.bundle_id,
          bundleNo: data.bundle_no,
          jobNo: data.jobno,
          product: data.product,
          colour: data.color,
          size: data.size,
          pieces: data.total_pieces,
          inspected: data.piece_no
        }
      });
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">

            <div className="mt-12">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold">
                        Unit {unit} - Line {line}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Select the type of quality check
                    </p>
                </div>

                <div className="w-full max-w-md space-y-4">
                    {inspections.map(({ id, title, subtitle, icon }) => (
                        <button
                            key={id}
                            onClick={() => handleSelect(id)}
                            className={`flex items-center justify-between w-full p-10 rounded-lg border
                                ${id === 'first-piece'
                                    ? "bg-green-50 border-green-300"
                                    : "bg-white border-gray-300"
                                }
                                hover:bg-green-100 transition`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-green-200 text-green-700 p-2 rounded-md text-xl">
                                    {icon}
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-gray-900">{title}</p>
                                    <p className="text-gray-500 text-sm">{subtitle}</p>
                                </div>
                            </div>

                            <div className="text-green-400 text-xl font-bold">
                                →
                            </div>
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}