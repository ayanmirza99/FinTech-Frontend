import React from "react";

const TransactionReport = ({
  data,
  pageNumber,
  totalPages,
  date,
  totalAmount,
}) => {
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "4mm",
  };

  const cellStyle = {
    border: "0.3mm solid black",
    padding: "1mm",
    paddingBottom: "4mm",
    textAlign: "center",
    height: "10mm",
  };

  return (
    <div
      id={`page`}
      style={{
        width: "210mm",
        height: "297mm",
        display: "none",
        padding: "10mm",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {pageNumber === 1 && (
        <div
          style={{
            fontSize: "6mm",
            textAlign: "center",
            marginBottom: "5mm",
            fontWeight: "bold",
          }}
        >
          Transaction Report as of {date}
        </div>
      )}
      <table style={tableStyle}>
        <thead>
          <tr>
            {[
              "Sr.No.",
              "Sender",
              "Receiver",
              "Amount",
              "Description",
              "Timestamp",
            ].map((header, index) => (
              <th key={index} style={{ ...cellStyle, fontWeight: "bold" }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((txn, idx) => (
            <tr key={txn._id}>
              <td style={cellStyle}>{idx + 1}</td>
              <td style={cellStyle}>{txn.sender}</td>
              <td style={cellStyle}>{txn.receiver}</td>
              <td style={cellStyle}>{txn.amount}</td>
              <td style={cellStyle}>{txn.description}</td>
              <td style={cellStyle}>
                {new Date(txn.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
        {pageNumber === totalPages && (
          <tfoot>
            <tr>
              <td
                colSpan={3}
                style={{
                  ...cellStyle,
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                Total
              </td>
              <td style={{ ...cellStyle, fontWeight: "bold" }}>
                {totalAmount}
              </td>
              <td colSpan={2} style={cellStyle}></td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default TransactionReport;
