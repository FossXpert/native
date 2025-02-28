import RNFetchBlob from "react-native-blob-util";
import { Document, Page, pdf, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Platform, PermissionsAndroid } from "react-native";
const relatedDocumentData = "hello w0rlds";


export const fileDownload = async () => {
  if (!relatedDocumentData) return;

  const workId =  "hello";
  const styles = StyleSheet.create({
    page: { flexDirection: "column", padding: 25 },
    section: { margin: 0 },
    text: {
      fontSize: 10,
      fontFamily: "Courier",
      wordBreak: "break-word",
      whiteSpace: "pre-wrap",
    },
    text1: {
      fontSize: 12,
      fontFamily: "Courier-Bold",
    },
  });

  const MyDocument = () => (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text1}>
            {`${workId ? `RELATED DOCUMENT FOR ${workId}` : `RELATED DOCUMENT`}`}
          </Text>
          <Text style={styles.text}>{relatedDocumentData || "No data available"}</Text>
        </View>
      </Page>
    </Document>
  );

  try {
    // Request storage permission (Android only)
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.error("Storage permission denied");
        return;
      }
    }

    // Generate the PDF as a Blob
    const pdfBlob = await pdf(<MyDocument />).toBlob();

    // Convert Blob to File URI and Save
    await savePdfBlob(pdfBlob);

    console.log("PDF saved successfully!");
  } catch (error) {
    console.error("File download error:", error);
  }
};

// Helper function to save Blob as file (Without Opening)
const savePdfBlob = async (blob: Blob) => {
  const path =
    Platform.OS === "ios"
      ? `${RNFetchBlob.fs.dirs.DocumentDir}/RelatedDoc.pdf`
      : `${RNFetchBlob.fs.dirs.DownloadDir}/RelatedDoc.pdf`;

  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(blob);
  return new Promise<void>((resolve, reject) => {
    fileReader.onloadend = async () => {
      const buffer = fileReader.result as string | ArrayBuffer;
      if (buffer) {
        await RNFetchBlob.fs.writeFile(path, buffer.toString(), "ascii");
        resolve();
      } else {
        reject(new Error("Buffer is null"));
      }
      resolve();
    };
    fileReader.onerror = (error) => reject(error);
  });
};
