import { useCallback, useEffect, useState } from 'react';

export const useMergedList = (list: [] | undefined) => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    if (!Array.isArray(list) || !list.length) return;
    setDataList(l => [...l, ...list]);
  }, [list]);

  const reset = useCallback(() => setDataList([]), []);

  return [dataList, reset] as const;
};
