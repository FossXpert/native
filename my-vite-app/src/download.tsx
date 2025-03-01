import { Document, Page, pdf, StyleSheet, Text, View } from "@react-pdf/renderer";
const relatedDocumentData = "hello";

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
    
    // Convert Blob to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string; // Full Base64 data URL
      const pdfBlob = base64ToBlob(base64Data);

      // Create Object URL for Download
      const blobUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "RelatedDoc.pdf";

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up URL to prevent memory leaks
      URL.revokeObjectURL(blobUrl);
    };

    reader.readAsDataURL(blob); // Convert to Base64
  } catch (error) {
    console.error("Download Error:", error);
  }

}
const base64ToBlob = (base64: string, contentType = "application/pdf") => {
  const byteCharacters = atob(base64.split(",")[1]); // Remove `data:application/pdf;base64,`
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i += 512) {
    const slice = byteCharacters.slice(i, i + 512);
    const byteNumbers = new Array(slice.length);

    for (let j = 0; j < slice.length; j++) {
      byteNumbers[j] = slice.charCodeAt(j);
    }

    byteArrays.push(new Uint8Array(byteNumbers));
  }

  return new Blob(byteArrays, { type: contentType });
};


// Helper function to save Blob as file (Without Opening)