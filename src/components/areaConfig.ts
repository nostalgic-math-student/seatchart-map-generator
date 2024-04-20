







type AreaConfig = {
    id: string;
    title: string;
    rows: number;
    columns: number;
    indexerLabel: string;
    seatColor: string;
    disabledSeats: { row: number, col: number }[];
    coords: number[];
    polygon: number[][];
};

const generateMapConfig = (areas: AreaConfig[]): string => {
    const areaStrings = areas.map(area => {
        const disabledSeatsString = area.disabledSeats.map(seat => `{ row: ${seat.row}, col: ${seat.col} }`).join(",\n            ");
        return `{
      Options: {
        reservedSeats: [],
        legendVisible: false,
        cart: { visible: false },
        map: {
          rows: ${area.rows},
          columns: ${area.columns},
          indexerColumns: {
            visible: true,
            label: (col: number) => \`${area.indexerLabel}\${${area.columns} - col}\`,
          },
          seatTypes: {
            default: {
              label: "${area.seatColor}",
              cssClass: "${area.seatColor}",
            },
          },
          disabledSeats: [
            ${disabledSeatsString}
          ],
        },
      },
      id: "${area.id}",
      title: "${area.title}",
      shape: "poly",
      name: "${area.seatColor}",
      fillColor: "#eab54d4d",
      strokeColor: "#eab54d4d",
      coords: [${area.coords.join(", ")}],
      polygon: [
        ${area.polygon.map(p => `[${p.join(", ")}]`).join(",\n        ")}
      ],
    }`;
    });

    return `import { SeatIndex } from "seatchart";

const getDefaultMap = () => ({
  name: "Orchestra-map",
  areas: [
    ${areaStrings.join(",\n    ")}
  ],
});

export default getDefaultMap;`;
};

// Example usage:
const areas: AreaConfig[] = [
    {
        id: "01",
        title: "Orange Top Left",
        rows: 4,
        columns: 5,
        indexerLabel: "30",
        seatColor: "Orange",
        disabledSeats: [{ row: 0, col: 0 }, { row: 1, col: 0 }, { row: 0, col: 1 }],
        coords: [441, 139, 374, 206, 445, 229, 490, 153],
        polygon: [[441, 137], [374, 206], [445, 229], [493, 153]]
    }
    // Add more area configurations as needed
];

console.log(generateMapConfig(areas));
