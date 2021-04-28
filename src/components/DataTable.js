import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./styles.css";
import Tr from "./Tr";
import EditIcon from "../icons/editIcon";
import DeleteIcon from "../icons/deleteIcon";

function DataTable({
  items,
  groupBy,
  handleSortData,
  handleRowClick,
  handleEditClick,
  handleDeleteClick,
  handleDoneClick,
}) {
  const [state, setState] = useState({
    sortedBy: { first_name: "ascending" },
  });

  useEffect(() => {
    if (!state.sortedBy) return;
    const sortKey = Object.keys(state.sortedBy)[0];
    const direction = state.sortedBy[sortKey];
    handleSortData(direction, sortKey);
  }, [state.sortedBy]);

  const tableBody = (key, value) => {
    // let tableData = value ? value : items;
    return (
      <tbody>
        {items.map((row, i) => {
          let TextClass = row.currentState == "Completed" ? "completed-cl" : "";
          return (
            <>
              {i == 0 && key ? (
                <tr>
                  <td>{key}</td>
                </tr>
              ) : null}
              <tr>
                <td className={TextClass} onClick={() => handleRowClick(row)}>
                  {row.title}
                </td>
                <td className={TextClass} onClick={() => handleRowClick(row)}>
                  {row.description}
                </td>
                <td className={TextClass} onClick={() => handleRowClick(row)}>
                  {row.priority}
                </td>
                <td className={TextClass} onClick={() => handleRowClick(row)}>
                  {row.createdAt}
                </td>
                <td className={TextClass} onClick={() => handleRowClick(row)}>
                  {row.dueDate}
                </td>
                <td>
                  <div style={{ display: "flex" }}>
                    <Button onClick={() => handleEditClick(row)}>
                      <EditIcon />
                    </Button>
                    {row.currentState == "Completed" ? (
                      <Button
                        variant="info"
                        onClick={() => handleDoneClick(row, true)}
                        style={{ margin: "0em 0.5em" }}
                      >
                        Re Open
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => handleDoneClick(row)}
                        style={{ margin: "0em 0.5em" }}
                      >
                        Done
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(row)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    );
  };

  return (
    <table className="__dml_table" cellSpacing={0} cellPadding={0}>
      <thead>
        <tr>
          <Tr
            label="Title"
            sortedBy={state.sortedBy}
            sort={{ key: "title", changer: setState }}
          />
          <Tr
            label="Descrition"
            sortedBy={state.sortedBy}
            sort={{ key: "descrition", changer: setState }}
          />
          <Tr
            label="Priority"
            sortedBy={state.sortedBy}
            sort={{ key: "priority", changer: setState }}
          />
          <Tr
            label="Created On"
            sortedBy={state.sortedBy}
            sort={{ key: "createdAt", changer: setState }}
          />
          <Tr
            label="Due By"
            sortedBy={state.sortedBy}
            sort={{ key: "dueby", changer: setState }}
          />
          <Tr label="Actions" />
        </tr>
      </thead>
      {tableBody()}
      {/* groupby logic */}
      {/* {groupBy == "none"
        ? tableBody()
        : Object.entries(items).forEach(
            ([key, value]) => {
              console.log("key===>", key);
              console.log("value===>", value);
            }
            // tableBody(key, value)
          )} */}
    </table>
  );
}

export default DataTable;
