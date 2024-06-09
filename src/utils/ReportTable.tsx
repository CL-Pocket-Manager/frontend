import { View, Document, Page } from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import PropTypes from "prop-types";

const ReportTable = (props: { data: any }) => {
  const { data } = props;
  return (
    <Document>
      <Page>
        <View style={{ margin: 20 }}>
          <Table
            tdStyle={{
              padding: "2px",
            }}
          >
            <TH
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              <TD>Food Item</TD>
              <TD>Unit</TD>
              <TD>Qty/Unit</TD>
              <TD>Need</TD>
            </TH>
            {data.map(
              (item: any, index: number) =>
                item.stock < item.par && (
                  <TR
                    key={item.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#ddd" : "#fff",
                      fontSize: 12,
                    }}
                  >
                    <TD>{item.name}</TD>
                    <TD>{item.unit}</TD>
                    <TD>{item.qtyPerUnit}</TD>
                    <TD>{item.par - item.stock}</TD>
                  </TR>
                )
            )}
          </Table>
        </View>
      </Page>
    </Document>
  );
};

ReportTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ReportTable;
