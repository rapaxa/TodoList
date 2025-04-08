import {Filter} from "../App.tsx";
import {Button} from "@mui/material";

type FilterButtonsProps = {
    onFilterChange: (filter: Filter) => void;
    activeFilter: Filter;
};

export const FilterButtons = ({onFilterChange,activeFilter}: FilterButtonsProps) => {
    return  (
        <div>
            <Button
                onClick={() => onFilterChange('all')}
                variant={"outlined"}
                size={"small"}
                disableElevation
                color={activeFilter === "all"?"secondary" :"primary"}
            >All</Button>
            <Button
                variant={"outlined"}
                onClick={() => onFilterChange('active')}
                size={"small"}
                disableElevation
                color={activeFilter === "active"?"secondary" :"primary"}
            >Active</Button>
            <Button
                onClick={() => onFilterChange('completed')}
                size={"small"}
                variant={"outlined"}
                disableElevation
                color={activeFilter === "completed"?"secondary" :"primary"}
            >Completed</Button>
        </div>
    );
}


