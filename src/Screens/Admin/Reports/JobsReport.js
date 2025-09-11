import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { f, h, w } from 'walstar-rn-responsive';
import { globalColors } from '../../../Theme/globalColors';
import CommonButton from '../../../Components/CommonButton';
import { DataTable } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import ExcelJS from 'exceljs';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import NoData from '../../Common/Nodata';
import AppBar from '../../../Components/AppBar';
import UserSearchBar from '../../../Components/UserSearchBar';

const JobsReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtereditems, setFiltereditems] = useState([]);
  const { t } = useTranslation();


  //filteration via query
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFiltereditems(items);
    } else {
      const filteredData = items?.filter(item =>
        item.subName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFiltereditems(filteredData);
    }
  }, [searchQuery, items]);


  //fake table data
  const [items] = useState([
    {
      subName: "JobName 1",
      chargePerMonth: "Rs 2000.00",
      requestStatus: "Pending",
      requestDate: "2024-04-25",
      subStatus: "Active"
    },
    {
      subName: "JobName 2",
      chargePerMonth: "Rs 1500.00",
      requestStatus: "Approved",
      requestDate: "2024-04-20",
      subStatus: "Active"
    },
    {
      subName: "JobName 3",
      chargePerMonth: "Rs 2500.00",
      requestStatus: "Rejected",
      requestDate: "2024-04-18",
      subStatus: "Inactive"
    },
    {
      subName: "JobName 4",
      chargePerMonth: "Rs 1800.00",
      requestStatus: "Pending",
      requestDate: "2024-04-15",
      subStatus: "Active"
    },
    {
      subName: "JobName 5",
      chargePerMonth: "Rs 2200.00",
      requestStatus: "Approved",
      requestDate: "2024-04-12",
      subStatus: "Active"
    },
    {
      subName: "JobName 6",
      chargePerMonth: "Rs 1700.00",
      requestStatus: "Pending",
      requestDate: "2024-04-10",
      subStatus: "Inactive"
    },
    {
      subName: "JobName 7",
      chargePerMonth: "Rs 2300.00",
      requestStatus: "Approved",
      requestDate: "2024-04-08",
      subStatus: "Active"
    },
    {
      subName: "JobName 8",
      chargePerMonth: "Rs 1600.00",
      requestStatus: "Rejected",
      requestDate: "2024-04-05",
      subStatus: "Active"
    },
    {
      subName: "JobName 9",
      chargePerMonth: "Rs 2700.00",
      requestStatus: "Pending",
      requestDate: "2024-04-02",
      subStatus: "Inactive"
    },
    {
      subName: "JobName 10",
      chargePerMonth: "Rs 1900.00",
      requestStatus: "Approved",
      requestDate: "2024-03-30",
      subStatus: "Active"
    },
   ]);


   // pdf creation
   const createPDF = async () => {
    const htmlContent = generateHTML(items);
    let options = {
      html: htmlContent,
      fileName: 'Jobs Report',
      directory: '',
    };

    try {
      let file = await RNHTMLtoPDF.convert(options);
      alert(`Pdf File is saved to : ${file.filePath}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const generateHTML = (data) => {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>City Applications</title>
      <style>
          table {
              border-collapse: collapse;
              width: 100%;
          }
          th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
          }
      </style>
      </head>
      <body>
      <h3 style="text-align:center"> Jobs Report </h3>
      
      <table id="cityTable">
          <thead>
              <tr>
                  <th>Sub Name</th>
                  <th>Charge Per Month</th>
                  <th>sub Status</th>
              </tr>
          </thead>
          <tbody id="cityTableBody">
            ${data.map(item => `
              <tr>
                <td>${item.subName}</td>
                <td>${item.chargePerMonth}</td>
                <td>${item.subStatus}</td>
              </tr>
            `).join('')}
          </tbody>
      </table>
      </body>
      </html>`;
  };


  //excel creation
  const generateShareableExcel = async () => {
    const fileName = 'Jobs Report.xlsx';
    const fileUri = `${RNFS.ExternalDirectoryPath}/${fileName}`;
    try {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Gram JOb';
      workbook.created = new Date();
      const worksheet = workbook.addWorksheet('Jobs Report', {});
      worksheet.columns = [
        { header: 'Sub Name', key: 'SubName', width: 15 },
        { header: 'Charge', key: 'charge', width: 12 },
        { header: 'Status', key: 'status', width: 12 },
      ];
      items.map((item)=> worksheet.addRow({ SubName:item.subName, charge:item.chargePerMonth, status:item.subStatus}));
      const buffer = await workbook.xlsx.writeBuffer();
      const nodeBuffer = Buffer.from(buffer);
      const bufferStr = nodeBuffer.toString('base64');
      await RNFS.writeFile(fileUri, bufferStr, 'base64');
      alert(`Excel File is saved to : ${fileUri}`);
    } catch (error) {
      console.error('Error generating or saving Excel file:', error);
    }
  };

 
  //report screen
  return (
    <View style={{flex:1,backgroundColor:globalColors.backgroundshade}}>
      <AppBar navtitle={t('Jobs Report')}/>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <UserSearchBar handleSearch={handleSearch} placeholder={t('searchPlaceholdejobsreport')}/>
        <View style={{flexDirection:'row',marginBottom:h(4), marginHorizontal:'10%', gap:w(10),justifyContent:'space-between'}}>
          <CommonButton btnstyles={{paddingVertical:w(1)}} onpress={createPDF} title={t('Export Pdf')} />
          <CommonButton btnstyles={{paddingVertical:w(1)}} onpress={generateShareableExcel} title={t('Export Excel')}/>
        </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <DataTable >
      <DataTable.Header style={{backgroundColor:globalColors.shinygrey,borderBottomColor:globalColors.shinygrey,height:h(8),alignItems:'center'}} >
        <DataTable.Title style={styles.datatablecellHead}><Text style={styles.txtHead}>Sub. Name</Text></DataTable.Title>
        <DataTable.Title style={styles.datatablecellHead}><Text style={styles.txtHead}>Charge/Month</Text></DataTable.Title>
        <DataTable.Title style={styles.datatablecellHead}><Text style={styles.txtHead}>Request Status</Text></DataTable.Title>
        <DataTable.Title style={styles.datatablecellHead}><Text style={styles.txtHead}>Request Date</Text></DataTable.Title>
        <DataTable.Title style={styles.datatablecellHead}><Text style={styles.txtHead}>Sub. Status</Text></DataTable.Title>
        <DataTable.Title style={[styles.datatablecellHead,{width:w(20)}]}><Text style={styles.txtHead}>Option</Text></DataTable.Title>
      </DataTable.Header>
      <FlatList
              data={filtereditems}
              renderItem={({item, index}) => (
                <DataTable.Row
                  style={{
                    borderWidth: w(0.4),
                    borderColor: globalColors.shinygrey,
                    backgroundColor: globalColors.pinkishwhite,
                  }}
                  key={index}>
                  <DataTable.Cell
                    style={[styles.datatablecell, {marginStart: w(0)}]}>
                    <Text style={styles.txtitem}>{item.subName}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.datatablecell}>
                    <Text style={styles.txtitem}>{item.chargePerMonth}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.datatablecell}>
                    <Text style={styles.txtitem}>{item.requestStatus}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.datatablecell}>
                    <Text style={styles.txtitem}>{item.requestDate}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.datatablecell}>
                    <Text style={styles.txtitem}>{item.subStatus}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={[styles.datatablecell, {width: w(20)}]}>
                    <Text style={styles.txtitem}>...</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
              ListEmptyComponent={<NoData text={'No Matching Job Report'} />}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{paddingBottom: h(2)}}
              showsVerticalScrollIndicator={false}
            />
          </DataTable>
      </ScrollView> 
      {/* </ScrollView> */}
    </View>
  )
}

export default  JobsReport 


const styles = StyleSheet.create({
  datatablecell:{
    width:w(33),
    justifyContent:'flex-start',
    fontSize: f(2), 
    marginStart:w(2),
  },
  datatablecellHead:{
    width:w(33),
    justifyContent:'flex-start',
    fontSize: f(2), 
    alignItems:'center'
    },
  txtitem:{
    color:globalColors.cellgrey,
    fontSize:f(1.3),
    fontFamily:'BaiJamjuree-Medium',
    paddingVertical:h(2)
  },
  txtHead:{
    color:globalColors.txtgrey,
    fontSize:f(1.45),
    fontFamily:'BaiJamjuree-SemiBold',
  }
})