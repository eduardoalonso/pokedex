import { useContext } from "react";
import FilterContext from "../context/FilterContext";

const useFilters = () => {
    return useContext(FilterContext);
}

export default useFilters;