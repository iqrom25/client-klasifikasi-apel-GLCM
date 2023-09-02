import DataTable from "react-data-table-component";
import { pelatihanColumns } from "../const/table/pelatihan";
import { pengujianColumns } from "../const/table/pengujian";

const Table = props => {
  const { data, type } = props;

  let columns = [];
  let dataTable = [];

  if (type === "pelatihan") {
    columns = pelatihanColumns;
    dataTable = data.map((ctx,i)=> ({...ctx,row:i+1}));
  }

  if (type === "pengujian") {
    columns = pengujianColumns;
    dataTable =data;
  }

  const customStyles = {
    headCells: {
      style: {
        color: "white",
        backgroundColor: "black"
      }
    }
  };

  return (
    <DataTable

      columns={columns}
      data={dataTable}
      customStyles={customStyles}
      pagination
    />
  );
};

export default Table;
