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
            qc_type: "first_piece"
        },
        {
            id: 'roving-qc',
            title: 'Roving QC Inspection',
            subtitle: 'Quality Assurance Protocol',
            icon: "📋",
            qc_type: "roving_qc"
        }
    ];

    const handleSelect = async (inspection) => {
        const { id, qc_type } = inspection;

        // 👉 If not first-piece, just navigate
        if (id !== "first-piece") {
            navigate(`/qc-admin/qc-entry/${unit}/${line}/${id}`);
            return;
        }

        try {
            const res = await fetch(
                `https://hfapi.herofashion.com/qcapp/get_last_bundle/?unit=${unit}&line=${line}&qc_type=${qc_type}`
            );
            const data = await res.json();

            // 👉 No bundle found
            if (!data.bundle_id) {
                navigate(`/qc-admin/qc-entry/${unit}/${line}/${id}`);
                return;
            }

            // ✅ COMPLETED → go to scan page
            if (data.is_completed) {
                navigate(`/qc-admin/qc-entry/${unit}/${line}/first-piece`, {
                    state: { bundle_id: data.bundle_id }
                });
            }
            // 🔄 NOT COMPLETED → resume defects
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
                    {inspections.map((inspection) => (
                        <button
                            key={inspection.id}
                            onClick={() => handleSelect(inspection)}
                            className={`flex items-center justify-between w-full p-10 rounded-lg border
                                ${inspection.id === 'first-piece'
                                    ? "bg-green-50 border-green-300"
                                    : "bg-white border-gray-300"
                                }
                                hover:bg-green-100 transition`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-green-200 text-green-700 p-2 rounded-md text-xl">
                                    {inspection.icon}
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-gray-900">{inspection.title}</p>
                                    <p className="text-gray-500 text-sm">{inspection.subtitle}</p>
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