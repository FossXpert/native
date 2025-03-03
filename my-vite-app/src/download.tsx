import { Document, Page, pdf, StyleSheet, Text, View } from "@react-pdf/renderer";
import data from "./assets/data.json";

const relatedDocumentData = data.text;

console.log(relatedDocumentData);
interface MyDocumentProps {
  data: string;
}


export const fileDownload = async () => {
  if (!relatedDocumentData) return;

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
    
    if ((window as any).ReactNativeWebView) {
      // For React Native WebView
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        // Send message to React Native
        (window as any).ReactNativeWebView.postMessage(JSON.stringify({
          data: base64Data,
          filename: 'RelatedDoc.pdf'
        }));
      };
      reader.readAsDataURL(blob);
    } else {
      // For web browsers
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "RelatedDoc.pdf";
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
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