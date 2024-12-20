import { getTypeJustificatif } from "@/redux/actions/donneesdebases/paiement/typeJustificatifAction";
import { MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import ExcelJS from 'exceljs';
import { exportBlob } from "@/components/lib/shared/const&style";



export const ExcelExportAllMenuItem = (props) => {
  const { hideMenu } = props;
  const dispatch: any = useDispatch();
  const getExcelAll = (allData) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet();

    const fieldsToExport = [
      { field: 'label', header: 'Type justificatif', width: 40, column: 1 },
      { field: 'description', header: 'Description', width: 40, column: 2 },
      { field: `proofDocumentNature`, header: 'Nature justificatif', width: 40, column: 3 },

    ];


    // Trier le tableau allData par ordre alphabétique de label
    allData.sort((a, b) => a.label.localeCompare(b.label));
    // Trier le tableau allData par ordre d'actif à non actif
    allData.sort((a, b) => (a.isActive > b.isActive ? -1 : 1));



    const headers = fieldsToExport.map((field) => field.header);
    worksheet.addRow(headers);

    // Configure les styles des en-têtes
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFF' } }; // Police en gras et blanche
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1b365f' } }; // Fond en bleu
    });

    // Configure les largeurs de colonnes
    fieldsToExport.forEach((col) => {
      worksheet.getColumn(col.column).width = col.width;
    });

    allData.forEach((row) => {
      const rowData = fieldsToExport.map((field) => row[field.field]);
      worksheet.addRow(rowData);
    });

    return workbook.xlsx.writeBuffer().then((buffer) => {
      return new Blob([Buffer.from(buffer)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    });
  };


  const handleExportAll = async () => {
    try {
      // Attendre que exportAllData soit terminé
      const allData = await dispatch(getTypeJustificatif());
      const mappedData = allData.map((row) => ({
        ...row,
        isActive: row.isActive === true ? 'Oui' : 'Non',
        proofDocumentNature: row.proofDocumentNature ? row.proofDocumentNature.label : '',
      }));

      const blob = await getExcelAll(mappedData);
      exportBlob(blob, 'Type_De_Justificatif.xlsx');
      hideMenu?.();
    } catch (error) {
      console.error('Erreur lors de l\'exportation Excel :', error);
    }
  };

  return (
    <MenuItem onClick={handleExportAll}>
      Télécharger en Excel
    </MenuItem>
  );
};




export const JsonExportAllMenuItem = (props) => {
  const { hideMenu } = props;

  const dispatch: any = useDispatch();
  const getJson = async () => {
    try {
      // Fetch data asynchronously
      const response = await dispatch(getTypeJustificatif());
      const exportableRows = response || [];

      // Format the data. Here we keep the entire row object
      const data = exportableRows.map((row) => {
        const formattedRow = {};
        Object.keys(row).forEach((field) => {
          formattedRow[field] = row[field];
        });
        return formattedRow;
      });

      // Stringify with some indentation
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Erreur lors de la récupération des données pour l\'export JSON :', error);
      throw error; // Propagez l'erreur pour une gestion ultérieure si nécessaire
    }
  };


  const handleExportJson = async () => {
    try {
      const jsonString = await getJson();
      const blob = new Blob([jsonString], {
        type: 'text/json',
      });
      exportBlob(blob, 'Type_De_Justificatif.json');

      // Hide the export menu after the export
      hideMenu?.();
    } catch (error) {
      console.error('Erreur lors de l\'export JSON :', error);
    }
  };

  return (
    <MenuItem onClick={handleExportJson}>
      Télécharger en JSON
    </MenuItem>
  );
}