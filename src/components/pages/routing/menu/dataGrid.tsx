import {
    DataGrid,
    GridPagination,
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarExportContainer,
    GridToolbarDensitySelector,
    GridPrintExportMenuItem,
    GridColDef

} from '@mui/x-data-grid';
import { frFR } from '@mui/x-data-grid/locales';
import Chip from '@mui/material/Chip';
import { Paper } from '@mui/material';
import MuiPagination from '@mui/material/Pagination';
import { useMemo } from 'react';
import RestoreIcon from '@mui/icons-material/Restore';
import Tooltip from '@mui/material/Tooltip';
import { GridToolbarColumnsButton } from '@mui/x-data-grid';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Link from 'next/link';
import NotInterestedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { PrivilegeActionButton } from '@/utils/privilege';
import Loading from '@/components/shared/loading';
import AddIcon from '@mui/icons-material/Add';


const Tableau: React.FC<any> = ({
    load,
    sortedData,
    setRowSelectionModel,
    rowSelectionModel,
    loading,
    paginate,
    updatePage,
    params,
    handleSortChange,
    handleFilterChange,
    handleOpenModalDelete,
    handleOpenMOdalRestore,
    handleOpenModalUpdate,
    handleOpenModalDetail,
    handleOpenModalAdd
}) => {
    // Gérer la sélection des lignes
    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: 'label',
                headerName: 'Nom du menu',
                headerClassName: 'super-app-theme--header',
                flex: 0.5,
                editable: false,
            },
            {
                field: 'icon',
                headerName: 'Icone',
                headerClassName: 'super-app-theme--header',
                flex: 0.5,
                editable: false
            },
            {
                field: 'isActive',
                headerName: 'Actif',
                headerClassName: 'super-app-theme--header',
                flex: 0.5,
                type: 'boolean',

                renderCell: (params) => (
                    <Chip
                        label={params.value ? 'Oui' : 'Non'}
                        color={params.value ? 'success' : 'error'}
                    />
                ),
                editable: false
            },
            {
                field: 'actions',
                type: 'actions',
                flex: 0.5,
                headerClassName: 'super-app-theme--header',
                cellClassName: 'super-app-theme--cell',
                getActions: (params) => {
                    const actions = [];

                    // Vérifier si la ligne est sélectionnée
                    //const isSelected = isRowSelected(params.id);

                    if (rowSelectionModel.length !== 0) {
                        // Ne pas afficher les boutons si la ligne est sélectionnée
                    } else {
                        actions.push(
                            <Tooltip title="Voir plus" key="Voir plus">
                                <GridActionsCellItem
                                    onClick={() => handleOpenModalDetail(params)}
                                    icon={<VisibilityOutlinedIcon sx={{ color: '#6b6a6a' }} />}
                                    label="Voir Plus"
                                />
                            </Tooltip>
                        );
                        if (params.row.isActive) {
                            actions.push(
                                // <PrivilegeActionButton lecture="donneesdebases.paiements.justificatifs.lecture"
                                //     ecriture="donneesdebases.paiements.justificatifs.ecriture"
                                //     modification=""
                                //     suppression="">
                                    <Tooltip title="Modifier" key="edit">
                                        <GridActionsCellItem
                                            icon={<EditTwoToneIcon />}
                                            label="Modifier"
                                            onClick={() => handleOpenModalUpdate(params)}
                                        />
                                    </Tooltip>
                                // </PrivilegeActionButton>
                            );
                        }
                        if (params.row.isActive) {
                            actions.push(
                                // <PrivilegeActionButton lecture="donneesdebases.paiements.justificatifs.lecture"
                                //     ecriture="donneesdebases.paiements.justificatifs.ecriture"
                                //     modification=""
                                //     suppression="">
                                    <Tooltip title="Ajouter sous-menu" key="add">
                                        <GridActionsCellItem
                                            icon={<AddIcon sx={{ color: '#57ca22' }} />}
                                            label="ajouer"
                                            onClick={() => handleOpenModalAdd(params)}
                                        />
                                    </Tooltip>
                                // </PrivilegeActionButton>
                            );
                        }

                        if (params.row.isActive) {
                            actions.push(
                                // <PrivilegeActionButton lecture="donneesdebases.paiements.justificatifs.lecture"
                                //     ecriture="donneesdebases.paiements.justificatifs.ecriture"
                                //     modification="donneesdebases.paiements.justificatifs.modification"
                                //     suppression="">
                                    <Tooltip title="Supprimer" key="delete">
                                        <GridActionsCellItem
                                            icon={<NotInterestedIcon sx={{ color: '#FF1943' }} />}
                                            label="Supprimer"
                                            onClick={() => handleOpenModalDelete(params)}
                                        />
                                    </Tooltip>
                                // </PrivilegeActionButton>
                            );
                        } else {
                            actions.push(
                                <Tooltip title="Restaurer" key="restore">
                                    <GridActionsCellItem
                                        icon={<RestoreIcon sx={{ color: '#9c27b0' }} />}
                                        label="Restaurer"
                                        onClick={() => handleOpenMOdalRestore(params)}
                                    />
                                </Tooltip>
                            );
                        }

                    }
                    return actions;
                }
            }
        ],
        [
            handleOpenModalDelete,
            handleOpenModalUpdate,
            handleOpenMOdalRestore,
            handleOpenModalDetail,
            handleOpenModalAdd,
            rowSelectionModel
        ]
    );

    function Pagination({ onPageChange, className }: any) {
        return (
            <MuiPagination
                color="primary"
                className={className}
                count={Math.ceil(paginate.totalCount / params.pageSize)}
                page={params.page}
                onChange={(event, newPage) => {
                    onPageChange(event, newPage - 1);
                }}
            />
        );
    }

    function CustomPagination(props:any) {
        return <GridPagination ActionsComponent={Pagination} {...props} />;
    }

    const displayRows = sortedData.map((row:any) => ({
        ...row,
    }));
    const printOptions = {
        fileName: 'Type justificatif',
        hideToolbar: true,
        hideFooter: true
    };
    function MyCustomToolbar() {
        return (
            <>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                    }}
                >
                    <Tooltip title="actifs" placement="top">
                        <Chip
                            label={`${paginate.totalActif} Menus`}
                            // color={'primary'}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px'
                            }}
                        />
                    </Tooltip>
                    <GridToolbarContainer
                        style={{
                            alignSelf: 'flex-end',
                            marginTop: '-10px'
                        }}
                    >
                        {/* <PrivilegeActionButton lecture="donneesdebases.paiements.justificatifs.lecture"
                            ecriture=""
                            modification=""
                            suppression="">
                            <UploadFile url={settings.TYPE_JUSTIFICATIF_URL} />
                        </PrivilegeActionButton> */}
                        <GridToolbarColumnsButton />
                        <GridToolbarDensitySelector />
                        <GridToolbarExportContainer>
                            <GridPrintExportMenuItem options={printOptions} />
                        </GridToolbarExportContainer>
                    </GridToolbarContainer>
                </div>
            </>
        );
    }

    return (
        <>
            {load ? (
                <Loading />
            ) : (
                <Paper elevation={3} style={{ padding: '10px', marginTop: '-10px' }}
                    sx={{
                        width: '100%',
                        height: 500,
                        '& .super-app-theme--header': {
                            backgroundColor: '#1b365f',
                            color: '#ffffff'
                        },
                        ' .MuiDataGrid-columnHeader': {
                            backgroundColor: '#1b365f',
                            color: '#ffffff'
                        },
                        '& .super-app-theme--cell': {
                            align: 'right'
                        },
                        '& .MuiDataGrid-columnHeader .MuiSvgIcon-root': {
                            color: '#ffffff'
                        }
                    }}
                >
                    <DataGrid
                        sx={{ backgroundColor: '#ffffff', border: 'none', marginTop: '10px' }}
                        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                        rows={displayRows}
                        columns={columns}
                        checkboxSelection
                        disableColumnFilter
                        disableRowSelectionOnClick
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 }
                            },
                            filter: {
                                filterModel: {
                                    items: [],
                                    quickFilterExcludeHiddenColumns: true
                                }
                            }
                        }}
                        paginationMode="server"
                        rowCount={paginate?.totalCount || 0}
                        onPaginationModelChange={updatePage}
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            setRowSelectionModel([...newRowSelectionModel]);
                        }}
                        onSortModelChange={(model) => handleSortChange(model)}
                        onFilterModelChange={(model) => handleFilterChange(model)}
                        rowSelectionModel={rowSelectionModel}
                        pageSizeOptions={[5, 10, 15, 20, 25]}
                        slots={{
                            toolbar: MyCustomToolbar,
                            pagination: CustomPagination
                        }}
                        loading={loading}
                    />
                </Paper>
            )}
        </>
    );
};
export default Tableau;