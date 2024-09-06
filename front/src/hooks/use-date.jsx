import { useMemo } from "react";
import moment from 'moment';

function useDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return useMemo(() => {
        if(!date) return '-';
        return moment(date).format(format);
    }, [date, format]);
}

export default useDate;