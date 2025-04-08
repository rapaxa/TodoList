import {Button} from "./Button.tsx";
import {Filter} from "../App.tsx";
type FilterButtonsProps = {
    onFilterChange: (filter: Filter) => void;
};

export const FilterButtons = ({ onFilterChange }: FilterButtonsProps) => (
    <div>
        <Button title={'All'} onClickHandler={() => onFilterChange('all')} />
        <Button  title={'Active'} onClickHandler={() => onFilterChange('active')} />
        <Button  title={'Completed'} onClickHandler={() => onFilterChange('completed')} />
    </div>
);
