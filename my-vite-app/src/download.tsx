import { Document, Page, pdf, StyleSheet, Text, View } from "@react-pdf/renderer";
const relatedDocumentData = "helljnbhbhbhhs";

interface MyDocumentProps {
  data: string;
}


export const fileDownload = async () => {
  if (!relatedDocumentData) return;


  // Font.register({
  //   family:'VerizonNHGTX-Regular',
  //   src: '../../../assets/fonts/Verizon_NHG/VerizonNHGTX-Regular.ttf'
  // })
  const styles = StyleSheet.create({
    page: { flexDirection: "column", padding: 25 },
    section: { margin: 0 },
    text: {
      fontSize: 10,
      fontFamily: 'Courier',
      wordBreak: "break-word",
      whiteSpace: "pre-wrap",
    },
    text1: {
      fontSize: 12,
      fontFamily: 'Courier-Bold',
    }
  })


  const workId = "1234";
  const MyDocument: React.FC<MyDocumentProps> = ({ data }) => (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text1}>
            {workId}
          </Text>
          <Text style={styles.text}>
            {data || "No data available"}
          </Text>
        </View>
      </Page>
    </Document>
  )


  try {
    const blob = await pdf(<MyDocument data={relatedDocumentData} />).toBlob();

    // For iOS: Convert Blob to Data URL and trigger download
    const dataURL = await blobToDataURL(blob);

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "RelatedDoc.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.log("error", error);
  }

}
const blobToDataURL = (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};


// Helper function to save Blob as file (Without Opening)