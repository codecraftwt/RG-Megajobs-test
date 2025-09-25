import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { h, w } from 'walstar-rn-responsive'
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';



const { width, height } = Dimensions.get('window');

const ResumeViewer = ({ route, navigation }) => {
  const { resumeUrl } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPdf, setIsPdf] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Check if the file is a PDF
    if (resumeUrl && resumeUrl.toLowerCase().endsWith('.pdf')) {
      setIsPdf(true);
    }
    console.log('Resume URL:', resumeUrl);
  }, [resumeUrl]);

  const handleLoadStart = () => {
    setLoading(true);
    setError(null);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    setLoading(false);
    setError('Failed to load resume');
    console.error('WebView error:', nativeEvent);
  };

  const renderPdfViewer = () => {
    // For PDF files, use Google Docs viewer or direct PDF rendering
    const pdfUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(resumeUrl)}`;
    
    return (
      <WebView
        source={{ uri: pdfUrl }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading PDF...</Text>
          </View>
        )}
      />
    );
  };

  const renderWebView = () => {
    // For other file types (images, docs, etc.)
    return (
      <WebView
        source={{ uri: resumeUrl }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading document...</Text>
          </View>
        )}
      />
    );
  };

//  const handleDownload = async () => {
//   console.log("coming in handleDownload");
//   try {
//     // Check if component is mounted and app is active
//     if (!navigation.isFocused()) {
//       console.log('Component not focused, skipping alert');
//       return;
//     }

//         Toast.show({
//               text1:"Failed to download resume",
//               position: 'bottom',
//               type: 'error'
//              });
//   } catch (error) {
//     console.error('Download error:', error);
//     if (navigation.isFocused()) {
//                 Toast.show({
//               text1:"Failed to download resume",
//               position: 'bottom',
//               type: 'error'
//             });
//     }
//   }
// };

 const handleDownload = async () => {
    console.log("coming in handleDownload");
    
    if (isDownloading) {
      Alert.alert('Info', 'Download already in progress');
      return;
    }

    try {
      // Check if component is mounted and app is active
      if (!navigation.isFocused()) {
        console.log('Component not focused, skipping download');
        return;
      }

      if (!resumeUrl) {
        Alert.alert('Error', 'No resume available for download');
        return;
      }

      // Request storage permission for Android
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message: 'App needs access to your storage to download resumes',
              buttonPositive: 'OK',
            }
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission Denied', 'Storage permission is required to download files');
            return;
          }
        } catch (permissionError) {
          console.error('Permission error:', permissionError);
          Alert.alert('Error', 'Failed to request storage permission');
          return;
        }
      }

      setIsDownloading(true);

      // Show downloading alert
      Alert.alert('Downloading', 'Your resume is being downloaded...');

      // Get file extension from URL
      const fileExtension = resumeUrl.split('.').pop() || 'pdf';
      const fileName = `resume_${Date.now()}.${fileExtension}`;

      // Define download path
      let downloadPath;
      
      if (Platform.OS === 'android') {
        downloadPath = RNFetchBlob.fs.dirs.DownloadDir + '/' + fileName;
      } else {
        // For iOS, use DocumentDirectory
        downloadPath = RNFetchBlob.fs.dirs.DocumentDir + '/' + fileName;
      }

      console.log('Download path:', downloadPath);

      // Download the file
      const result = await RNFetchBlob.config({
        fileCache: true,
        path: downloadPath,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: downloadPath,
          description: 'Resume Download',
          mime: 'application/pdf'
        }
      }).fetch('GET', resumeUrl);

      // Check if download was successful
      if (result.info().status === 200) {
        console.log('Download completed: ', result.path());
        
        // For Android, scan the file to make it visible in gallery/downloads
        if (Platform.OS === 'android') {
          RNFetchBlob.fs.scanFile([{ path: result.path(), mime: 'application/pdf' }]);
        }

        Alert.alert(
          'Success', 
          `Resume downloaded successfully!\n\nSaved to: ${Platform.OS === 'android' ? 'Downloads folder' : 'Documents folder'}`,
          [
            { 
              text: 'Open File', 
              onPress: () => {
                // Open the file
                if (Platform.OS === 'android') {
                  RNFetchBlob.android.actionViewIntent(result.path(), 'application/pdf');
                } else {
                  // For iOS, you might need to use a different method
                  console.log('File saved at:', result.path());
                }
              }
            },
            { text: 'OK', style: 'cancel' }
          ]
        );

      } else {
        throw new Error(`Download failed with status: ${result.info().status}`);
      }

    } catch (error) {
      console.error('Download error:', error);
      
      let errorMessage = "Failed to download resume";
      
      if (error.message.includes('Network request failed')) {
        errorMessage = "Network error. Please check your internet connection";
      } else if (error.message.includes('permission')) {
        errorMessage = "Storage permission denied";
      } else if (error.message.includes('404')) {
        errorMessage = "Resume file not found on server";
      }

      Alert.alert('Download Failed', errorMessage);
    } finally {
      setIsDownloading(false);
    }
  };


  const handleShare = () => {

      if (!resumeUrl) {
          Toast.show({
              text1:"No file selected to copy.",
              position: 'bottom',
              type: 'error'
            });
    return;
  }

  Clipboard.setString(resumeUrl);
  Toast.show({
              text1:"copied to clipboard",
              position: 'bottom',
              type: 'success'
            });
  };

  if (!resumeUrl) {
    return (
      <SafeAreaProvider style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Resume Viewer</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <MaterialIcons name="description" size={64} color="#999" />
          <Text style={styles.errorText}>No resume URL provided</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.title} numberOfLines={1}>
          {isPdf ? 'PDF Resume' : 'Resume Viewer'}
        </Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <MaterialIcons name="share" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDownload} style={styles.actionButton}>
            <MaterialIcons name="file-download" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>
            {isPdf ? 'Loading PDF...' : 'Loading document...'}
          </Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={64} color="#FF3B30" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              setError(null);
              setLoading(true);
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* WebView Content */}
      <View style={styles.webviewContainer}>
        {isPdf ? renderPdfViewer() : renderWebView()}
      </View>

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText} numberOfLines={1}>
          {resumeUrl.split('/').pop()}
        </Text>
        <Text style={styles.footerText}>
          {isPdf ? 'PDF Document' : 'Document'}
        </Text>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: h(3),
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default ResumeViewer;