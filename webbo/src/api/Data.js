import React, { useState } from "react";
/**
 * this component is currently not in usage, it may be delted in the future
 * @param
 * @returns
 */
export function useData(nekiProp) {
    const [dataSet, setDataSet] = useState([]);
    let loadedData = [];
    async function loadDataSet(pageSize) {
        loadedData = await FetchData();
        let temp = getPageData(loadedData, pageSize);
        setDataSet(temp);
    }

    function getPage(page) {
        return dataSet[page];
    }
    function getDataSet() {
        return dataSet;
    }
    return { dataSet, loadDataSet, getPage, getDataSet };
}

async function FetchData() {
    const api = "https://jsonplaceholder.typicode.com/photos";
    const dataArray = [];
    try {
        await fetch(api, {
            method: "GET",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }
                return response.json();
            })
            .then((data) => {
                data.forEach((element) => {
                    dataArray.push(element);
                });
                // console.log("Iz date, api: "+api);
                // console.log(dataArray);
            });
    } catch (error) {
        return [];
    }
    return dataArray;
}

//vraca niz nizova objekata
export function getPageData(rows, pageSize) {
    let counter = 0;
    let arrayOfArrays = [];
    let array = [];
    rows.forEach((row) => {
        array.push(row);
        if (counter + 1 === pageSize) {
            arrayOfArrays.push(array);
            array = [];
            counter = 0;
        } else {
            counter = counter + 1;
        }
    });
    arrayOfArrays.push(array);
    return arrayOfArrays;
}

export async function getByParameter({ filter, page, pageSize }) {
    let dataArray = await FetchData();

    dataArray = filterData({ filter, dataArray });
    let pagedData = getPageData(dataArray, pageSize);

    const numberOfRows = dataArray.length;
    const pageOfRows = pagedData[page];

    return { numberOfRows, pageOfRows };
}

export function filterData({ filter, dataArray }) {
    if (filter === undefined) {
        console.log("filter was undefined");
        return dataArray;
    }

    if (filter.value === undefined) {
        console.log("filter value was undefined");
        return dataArray;
    }

    const column = filter.columnField;
    const operator = filter.operatorValue;
    const value = filter.value.toString();
    if (operator === "contains") {
        return dataArray.filter((element) =>
            element[column].toString().includes(value)
        );
    }
    if (operator === "equals") {
        if (value === "") {
            return dataArray;
        }
        return dataArray.filter(
            (element) => element[column].toString() === value
        );
    }
    if (operator === "<") {
        if (value === "") {
            return dataArray;
        }
        return dataArray.filter((element) => element[column] < value);
    }

    return dataArray;
}

export default FetchData;
