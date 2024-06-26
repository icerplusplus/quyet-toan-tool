import * as XLSX from "xlsx";

export interface CreateNewDocumentWithInputProps {
  type: "03 cham com PN 5_2" | "Cham_Com_TG_TG,PN";
  dateFrom: number;
  dateTo: number;
  data: {
    stt: number;
    fullname: string;
  }[]
}
export const predefinedColumns = ["Stt", "Họ và tên"];

export const Excel = {
  createNewDocument: (
    input: CreateNewDocumentWithInputProps,
    // setData: (jsonData: any) => void,
    setColumns: (columns: string[]) => void
  ) => {
    // Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(input.data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, input.type.toString());

    // Convert workbook to binary string
    // const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });

    // Convert binary string to ArrayBuffer
    // const s2ab = (s: any) => {
    //   const buf = new ArrayBuffer(s.length);
    //   const view = new Uint8Array(buf);
    //   for (let i = 0; i < s.length; i++) {
    //     view[i] = s.charCodeAt(i) & 0xff;
    //   }
    //   return buf;
    // };

    // Predefined columns
    

    // Generate numeric columns within a specified range
    const generateNumericColumns = (start: number, end: number) => {
      return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
    };
    

    // Combine predefined columns and numeric columns
    const columns = [...predefinedColumns, ...generateNumericColumns(input.dateFrom, input.dateTo), 'Tổng số']; 
    setColumns(columns);

    // const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

    // Create a temporary link to download the blob
    // const url = URL.createObjectURL(blob);

    // Read the Excel file from the blob
    // const reader = new FileReader();
    // reader.onload = (e: any) => {
    //   const arrayBuffer = e.target.result;
    //   const data = new Uint8Array(arrayBuffer);
    //   const workbook = XLSX.read(data, { type: "array" });

    //   // Get the first worksheet
    //   const worksheetName = workbook.SheetNames[0];
    //   const worksheet = workbook.Sheets[worksheetName];

  
    // };
    // reader.readAsArrayBuffer(blob);
  },
  convertWorksheetToJSON: (worksheet: XLSX.WorkSheet) => {
    return XLSX.utils.sheet_to_json(worksheet) as any;
  },
  handleFileUpload: (event: any, setData: (jsonData: any) => void) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        setData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  },
  caculateAndRenderXLSXFile: () => {
    // Read input.xlsx file
    // const jsonData = Excel.convertWorksheetToJSON()
    
    // Convert it to json type

    // TODO: handle count days when users go to hospital, input, output, ... 
  }
};
