import React from "react";
import { Excel } from "../../libs/excel";
import "./index.css";

const ExcelGenerator = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [columns, setColumns] = React.useState<string[]>([]);

  let countAllObjs = 0

  React.useEffect(() => {
    // repare data before render table

    // render table
    Excel.createNewDocument(
      { dateFrom: 1, dateTo: 31, type: "03 cham com PN 5_2", data },
      setColumns
    );
  }, []);

  return (
    <div>
      {/* <button onClick={generateExcel}>Generate and Show Excel Data</button> */}
      <input
        type="file"
        accept=".xlsx"
        onChange={(e: any) => Excel.handleFileUpload(e, setData)}
      />
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            let ignoreDays = row["Số ngày không ở trong trại"].split(
              ","
            ) as string[];
            ignoreDays = ignoreDays.map((item) => item.trim());
            return (
              <>
                <tr key={index}>
                  {columns.map((column, colIndex) => {
                    const countDaysIn =
                      columns.filter((column) => !ignoreDays.includes(column))
                        .length - 3;
                    return colIndex === 0 || colIndex === 1 ? (
                      <td key={colIndex}>{row[column] || ""}</td>
                    ) : column === "Tổng số" ? (
                      <td key={colIndex}>{countDaysIn.toString()}</td>
                    ) : ignoreDays.includes(column) ? (
                      <td key={colIndex}></td>
                    ) : (
                      <td
                        className="text-red-500 text-xl font-bold"
                        key={colIndex}
                      >
                        *
                      </td>
                    );
                  })}
                </tr>
              </>
            );
          })}
          <tr key={"rs"}>
            {columns.map((column, colIndex) => {
              if (colIndex === 0) return <td key={`tspn-${colIndex}`}>{""}</td>;
              if (colIndex === 1)
                return (
                  <td key={`tspn-${colIndex}`}>{"Tổng số phạm nhân: "}</td>
                );
              let sumObjs = 0
              
              for (let row = 0; row < data.length; row++) {
                let ignoreDays = data[row]["Số ngày không ở trong trại"].split(
                  ","
                ) as string[];
                ignoreDays = ignoreDays.map((item) => item.trim());
                
                if (!ignoreDays.includes(column) && column !== 'Tổng số') {
                  sumObjs+=1
                  countAllObjs+=1
                }
              }
              return column === 'Tổng số' ? <td key={`tspn-${colIndex}`}>{countAllObjs}</td> : <td key={`tspn-${colIndex}`}>{sumObjs}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExcelGenerator;
