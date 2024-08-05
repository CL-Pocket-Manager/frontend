import { View, Document, Text, Page } from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import PropTypes from "prop-types";

const ReportTable = (props: { data: any; itemDict: any }) => {
  const { data, itemDict } = props;
  return (
    <Document>
      <Page>
        <View style={{ margin: 20 }}>
          <Text style={{ textAlign: "center", marginBottom: "10px" }}>
            {new Date(data.archiveDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
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
              <TD>Item</TD>
              <TD>Par</TD>
              <TD>Stock</TD>
              <TD>Need</TD>
            </TH>
            {data.items.map(
              (item: any, index: number) =>
                item.stock < item.par && (
                  <TR
                    key={item._id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#ddd" : "#fff",
                      fontSize: 12,
                    }}
                  >
                    <TD>{itemDict[item.item]}</TD>
                    <TD>{item.par}</TD>
                    <TD>{item.stock}</TD>
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
