import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import CustomToolbar from "./CustomToolbar";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";

//number generator for id's of filter if multi filtering is enabled
function IdGenerator() {
    return Math.round(Math.random() * 1000);
}

/**
 *
 * @param {array} columns - array of objects defining each column for table
 * @param {function} getByParameter - returns rows of data for one page of table view,
 * @param {array} pageSizeOptions - array of integers which represents page size(number of rows per page) options for table,
 * @param {integer} initialPageSize - initial number of rows per page
 * @param {function} dataGridClasses - classes for datagrid, makeStyles((theme) => ()
 * @param {string} tableName - name of table in usage
 * @callback getByParameter
 * @returns
 */
function DataTable(props) {
    //states
    const [filterModel, setFilterModel] = useState({
        items: [
            // {
            //     columnField: "",
            //     id: IdGenerator(),
            //     operatorValue: "",
            //     value: "",
            // },
            // { columnField: 'firstName',id: IdGenerator(),operatorValue: 'contains', value: 'a'},
        ],
    });
    //vrijednost property-a sort mora biti "asc", "desc" ili null
    const [sortModel, setSortModel] = useState([
        // {field: "coulumnName", sort: "asc"},
    ]);
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [pageSize, setPageSize] = useState(
        sessionStorage.getItem(props.tableName)
            ? JSON.parse(sessionStorage.getItem(props.tableName)).pageSize
            : props.initialPageSize
    );
    const [page, setPage] = useState(
        sessionStorage.getItem(props.tableName)
            ? JSON.parse(sessionStorage.getItem(props.tableName)).page
            : 0
    );
    //functionality states
    const [isFilterLoaded, setIsFilterLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    //
    async function dataGetter() {
        setLoading(true);
        let filter = filterModel.items[0];
        let sort=sortModel[0];
        let specialFilter = props.specialFilter;
        let startTime = props.startTime;
        let endTime = props.endTime;
        let numberOfClassroom = props.numberOfClassroom;
        const objekt = await props.getByParameter({ filter, page, pageSize, sort, specialFilter, startTime, endTime, numberOfClassroom });
        setRowCount(objekt.numberOfRows);
        setRows(objekt.pageOfRows);
        setLoading(false);
    }

    //this is default handler for filtering, it should not be changed
    useEffect(() => {
        let isSubscribed = true;
        let timer;
        if (isSubscribed) {
            const filter = filterModel.items[0];
            timer = setTimeout(() => {
                if (filter !== undefined) {
                    if (filter.value !== undefined) {
                        if (filter.value !== "") {
                            if (!isFilterLoaded) {
                                // console.log("filter loaded!");
                                setIsFilterLoaded(true);
                            }
                            // console.log("data getter called from default position");

                            dataGetter();
                        }

                        if (filter.value === "" && isFilterLoaded) {
                            // console.log("filter unloaded, data getter called from 'filter value defined'");
                            setIsFilterLoaded(false);
                            dataGetter();
                        }
                    } else {
                        if (isFilterLoaded) {
                            setIsFilterLoaded(false);
                            // console.log("filter unloaded, data getter called from 'filter value undefined'");
                            dataGetter();
                        }
                    }
                }
            }, 2000);
        }
        return () => {
            isSubscribed = false;
            clearTimeout(timer);
        };
    }, [filterModel]);

    //default handler for paging, it should not be changed
    useEffect(() => {
        dataGetter();

        sessionStorage.setItem(
            props.tableName,
            JSON.stringify({ page: page, pageSize: pageSize })
        );
    }, [page, pageSize, props.refreshState, sortModel, props.specialFilter]);

    const pageSizeChangeHandler = (event) => {
        setPageSize(event);
    };

    const pageChangeHandler = (newPage) => {
        setPage(newPage);
    };

    const filterChangeHandler = (model) => {
        setFilterModel(model);
    };
    
    const sortChangeHandler = (model) => {
        setSortModel(model);
    }
    // console.log("page: ", page, "pageSize: ", pageSize);
    return (
        <DataGrid
            //filtering
            filterMode="server"
            filterModel={filterModel}
            onFilterModelChange={filterChangeHandler}
            //pagination
            pagination
            page={page}
            pageSize={pageSize}
            rowsPerPageOptions={props.pageSizeOptions}
            onPageSizeChange={pageSizeChangeHandler}
            paginationMode="server"
            rowCount={rowCount}
            onPageChange={pageChangeHandler}
            //sorting
            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={sortChangeHandler}
            //ostalo
            autoHeight={true}
            className={props.dataGridClasses}
            rows={rows || []}
            columns={props.columns}
            disableSelectionOnClicks
            loading={loading}
            //custom components
            components={{
                Toolbar: CustomToolbar,
            }}
            componentsProps={{
                toolbar: { tableName: props.tableName },
            }}
        />
    );
}

export default DataTable;
