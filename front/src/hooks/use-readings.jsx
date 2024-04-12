import { useContext } from "react";
import { ReadingsContext } from '../context/ReadingsContext';

export const useReadings = () => {
    return useContext(ReadingsContext);
};