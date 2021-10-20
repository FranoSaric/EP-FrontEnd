import TextField from "@material-ui/core/TextField";

function FilterInput(props) {
    const { item, applyValue } = props;

    const handleFilterChange = (event) => {
        applyValue({ ...item, value: event.target.value });
    };

    return (
        <TextField
            name="custom-filter-operator"
            label="Filter value"
            placeholder="Filter value"
            onChange={handleFilterChange}
        />
    );
}

export const numberOperators = [
    {
        label: "<",
        value: "<",
        InputComponent: FilterInput,
    },
    {
        label: ">",
        value: ">",
        InputComponent: FilterInput,
    },
    {
        label: "=",
        value: "=",
        InputComponent: FilterInput,
    },
];

export const stringOperators = [
    {
        label: "contains",
        value: "contains",
        InputComponent: FilterInput,
    },
    {
        label: "equals",
        value: "equals",
        InputComponent: FilterInput,
    },
    {
        label: "starts with",
        value: "startsWith",
        InputComponent: FilterInput,
    },
    {
        label: "ends with",
        value: "endsWith",
        InputComponent: FilterInput,
    },
];
