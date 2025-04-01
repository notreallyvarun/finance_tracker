import { useMemo, useState } from "react";
import {
  FinancialRecord,
  useFinancialRecords,
} from "../../contexts/financial-record-context";
import { useTable, Column, CellProps } from "react-table";

interface EditableCellProps extends CellProps<FinancialRecord> {
  updateRecord: (rowIndex: number, columnId: string, value: string) => void;
  editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(initialValue?.toString() ?? ""); // Ensure string type

  return (
    <div>
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          style={{ width: "100%" }}
          onBlur={() => {
            setIsEditing(false);
            updateRecord(row.index, column.id, value);
          }}
        />
      ) : (
        <span onClick={() => editable && setIsEditing(true)}>{value}</span>
      )}
    </div>
  );
};

export const FinancialRecordList = () => {
  const { records, setRecords } = useFinancialRecords();

  // Ensure `setRecords` exists in the context
  if (!setRecords) {
    throw new Error("setRecords is undefined. Ensure it is provided in context.");
  }

  const updateRecord = (rowIndex: number, columnId: string, newValue: string) => {
    setRecords((prevRecords: FinancialRecord[]) =>
      prevRecords.map((record: FinancialRecord, index: number) =>
        index === rowIndex ? { ...record, [columnId]: newValue } : record
      )
    );
  };

  const columns: Column<FinancialRecord>[] = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ value, row, column }) => (
          <EditableCell
            value={value}
            row={row}
            column={column}
            updateRecord={updateRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ value }) => <span>{String(value)}</span>, // Ensure string conversion
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => <span>{String(value)}</span>, // Convert to string
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: records,
    });

  return (
    <div className="table-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
