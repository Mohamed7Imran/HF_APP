import { useParams, useNavigate } from "react-router-dom";

export default function LineDetail() {
    const { unit, line } = useParams();
    const navigate = useNavigate();

    const inspections = [
        {
            id: 'first-piece',
            title: 'First Piece Output',
            subtitle: 'Quality Assurance Protocol',
            icon: "📄",  // Replace with your icon or SVG component
        },
        {
            id: 'roving-qc',
            title: 'Roving QC Inspection',
            subtitle: 'Quality Assurance Protocol',
            icon: "📋",
        }
    ];

    const handleSelect = (inspectionId) => {
        navigate(`/qc-admin/qc-entry/${unit}/${line}/first-piece`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">

            <div className="mt-12">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold">
                        Unit {unit} - Line {line}
                    </h1>
                    <p className="text-gray-600 mt-2">Select the type of quality check</p>
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