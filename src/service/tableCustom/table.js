import React from "react";
import "./table.css";

class TableService extends React.Component {
  render() {
    const { headers, data } = this.props;

    return (
      <div className="table-wrapper">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="sticky-header" scope="col">
                #
              </th>
              {headers.map((header, index) => (
                <th className="sticky-header" scope="col" key={index}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  <th scope="row">{rowIndex + 1}</th>
                  {item.map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length + 1} className="no-data">
                  ❗ No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableService;
