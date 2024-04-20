import React, { useState } from "react";

type Area = {
    fillColor: string;
    strokeColor: string;
    shape:string;
    name:string;
    id: string;
    title: string;
    map: Map;
    indexerLabel: string;
    coords: number[];
    seatColor: string;
    polygon: number[][];
};

type Map = {
    rows: number;
    columns: number;
    disabledSeats: { row: number; col: number }[];
}

type indexerColumns = {
    visible: string;
}

type indexerRows = {
    visible: string;    
}

/*
Options: {
        reservedSeats: [],
        legendVisible: false,
        cart: { visible: false },
        map: {
          rows: 4,
          columns: 12,
          indexerColumns: {
            visible: true,
            label: (col: number) => {
              if (col + 1 < 10) {
                return `40${col + 1}`;
              } else {
                return `4${col + 1}`;
              }
            },
          },
          indexerRows: {
            visible: true,
            label: (row: number) => `${String.fromCharCode(87 + row)}`,
          },
          seatTypes: {
            default: {
              label: "Yellow",
              cssClass: "Yellow",
            },
          },
          disabledSeats: [],
        },
      },
      id: "24",
      title: "Yellow Top Right",
      shape: "poly",
      name: "Pink",
      fillColor: "#eab54d4d",
      strokeColor: "#eab54d4d",
      coords: [961, 740, 961, 866, 1090, 829, 1088, 704],
      polygon: [
        [961, 740],
        [961, 866],
        [1090, 829],
        [1088, 704],
      ],
*/
const AreaForm = () => {
    const [areas, setAreas] = useState<Area[]>([]);
    const [formData, setFormData] = useState({
        fillColor:"#f54242",
        strokeColor:"#f54242",
        shape:"poly",
        name:"",
        id: "",
        title: "",
        rows:"",
        columns:"",
        indexerLabel: "",
        seatColor: "",
        disabledSeats: "",
        coords: "",
        polygon: "",
        map:{rows:"", columns:"", disabledSeats:""},
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddArea = () => {
        const newArea: Area = {
            ...formData,
            map : { rows: parseInt(formData.rows, 10), columns: parseInt(formData.columns, 10) , disabledSeats:[{row:1,col:0}],},
            coords: JSON.parse(`[${formData.coords}]`),
            polygon: JSON.parse(formData.polygon)
        };
        setAreas(prev => [...prev, newArea]);
    };

    const generateConfigString = () => {
        const config = areas.map(area => `
{
    Options: {
        reservedSeats: [],
        cart: { visible: false },
        legendVisible: false,
        map: {
            seatLabel: (index: SeatIndex) => {
                if (index.col + 1 < 10) {
                    return \`\${String.fromCharCode(65 + index.row)}\${String.fromCharCode(65 + index.row)}40\${index.col + 1}\`;
                } else {
                    return \`\${String.fromCharCode(65 + index.row)}\${String.fromCharCode(65 + index.row)}4\${index.col + 1}\`;
                }
            },
            rows: ${area.map.rows},
            columns: ${area.map.columns},
            indexerColumns: {
                visible: true,
                label: (col: number) => {
                    if (col + 1 < 10) {
                        return \`40\${col + 1}\`;
                    } else {
                        return \`4\${col + 1}\`;
                    }
                },
            },
            indexerRows: {
                visible: true,
                label: (row: number) => \`\${String.fromCharCode(65 + row)}\${String.fromCharCode(65 + row)}\`,
            },
            seatTypes: {
                default: {
                    label: "${area.seatColor}",
                    cssClass: "${area.seatColor}",
                },
            },
            disabledSeats: [${area.map.disabledSeats.map(seat => `{ row: ${seat.row}, col: ${seat.col} }`).join(', ')}],
        },
    },
    id: "${area.id}",
    title: "${area.title}",
    shape: "poly",
    name: "${area.seatColor}",
    fillColor: "#eab54d4d",
    strokeColor: "#f54242",
    coords: [${area.coords.join(', ')}],
    polygon: [${area.polygon.map(poly => `[${poly.join(', ')}]`).join(', ')}],
},
        `).join('');
        console.log(config);
        navigator.clipboard.writeText(`[${config}]`).then(() => {
            alert('Configuration has been copied to clipboard!');
        }, err => {
            console.error('Failed to copy configuration: ', err);
        });
    };

    const generateConfig = () => {
        // Logic from previous example to generate config string
        alert("Check console for the generated config.");
        console.log(areas); // Implement generateMapConfig function logic here
    };

    const handleDeleteArea = (index: number) => {
        setAreas(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleChange} className="input input-bordered" />
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="input input-bordered" />
                <input type="text" name="name" placeholder="name (section color)" value={formData.name} onChange={handleChange} className="input input-bordered" />
                <input type="number" name="rows" placeholder="Rows" value={formData.rows} onChange={handleChange} className="input input-bordered" />
                <input type="number" name="columns" placeholder="Columns" value={formData.columns} onChange={handleChange} className="input input-bordered" />
                <input type="text" name="indexerLabel" placeholder="Indexer Label" value={formData.indexerLabel} onChange={handleChange} className="input input-bordered" />
                <input type="text" name="seatColor" placeholder="Seat Color" value={formData.seatColor} onChange={handleChange} className="input input-bordered" />
                <input type="text" name="disabledSeats" placeholder="Disabled Seats (e.g., [{ row: 1, col: 2 }])" value={formData.disabledSeats} onChange={handleChange} className="input input-bordered" />
                <input type="text" name="coords" placeholder="Coordinates (e.g., 441, 139, ...)" value={formData.coords} onChange={handleChange} className="input input-bordered" />
                <textarea name="polygon" placeholder="Polygon (e.g., [[441, 137], [374, 206], ...])" value={formData.polygon} onChange={handleChange} className="input input-bordered h-24"></textarea>
            </div>
            <div className="container space-x-2">
                <button onClick={handleAddArea} className="btn btn-primary">Add Area</button>
                <button onClick={generateConfig} className="btn btn-secondary">Generate Config</button>
                <button onClick={generateConfigString} className="btn btn-info">Copy Config to Clipboard</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {areas.map((area, index) => (
                    <div key={index} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{area.title}</h2>
                            <p>ID: {area.id}</p>
                            <p>Rows: {area.map.rows}, Columns: {area.map.columns}</p>
                            <p>Indexer Label: {area.indexerLabel}</p>
                            <p>Seat Color: {area.seatColor}</p>
                            <p>Disabled Seats: {JSON.stringify(area.map.disabledSeats)}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-error btn-xs" onClick={() => handleDeleteArea(index)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AreaForm;
