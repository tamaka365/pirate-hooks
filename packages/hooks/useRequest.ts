import { useCallback, useEffect, useMemo, useState } from 'react';

import useMemoizedCallback from './useMemoizedCallback';

declare type Obj = Record<string, any>;

type Data = { code: number; data: Obj; msg: string } | undefined;

type Options<T> = {
  params?: T;
  optional?: (keyof T)[];
  auto?: boolean;
  auth?: boolean;
};

function useRequest<T extends Obj = never>(
  request: (params?: T) => Promise<Data>,
  options?: Options<T>
) {
  const opsJson = useMemo(
    () => JSON.stringify(options, (k, v) => (v === undefined ? null : v)),
    [options]
  );

  const {
    params,
    auto = true,
    optional,
    auth = false,
  } = useMemo(() => JSON.parse(opsJson) || {}, [opsJson]);

  const [data, setData] = useState<Data>();
  const [error, setError] = useState<unknown>();

  const [preParams, setPreParams] = useState<T>();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [getToken, resetToken] = [
    () => ({
      loginToken: '',
    }),
    () => {},
  ]; // useLoginToken();

  // 是否可以执行
  const isReady = useMemo(() => {
    if (params) {
      const filteredArray = Object.entries(params).filter(
        ([k]) => !optional?.includes(k)
      );

      for (const [, v] of filteredArray) {
        if (v === null) {
          return false;
        }
      }
    }

    return true;
  }, [optional, params]);

  // 重制状态
  const reset = useCallback(() => {
    setIsSuccess(false);
    setIsError(false);
    setError(undefined);
    setIsLoading(true);
  }, []);

  // 请求成功回调
  const handleSuccess = useCallback((data: Data) => {
    setData(data);
    setIsSuccess(true);
  }, []);

  // 请求失败回调
  const handleError = useCallback((error: unknown) => {
    setIsError(true);
    setError(error);
  }, []);

  // 请求完成回调
  const handleFinish = useCallback((data: Data, error: unknown) => {
    setIsLoading(false);
  }, []);

  interface Run {
    (args?: T): any;
  }

  const run = useMemoizedCallback(async args => {
    if (!isReady) {
      return;
    }

    reset();

    let pars = { ...params, ...args };

    if (auth) {
      const { loginToken } = await getToken();
      if (!loginToken) {
        return;
      }
      pars.login_token = loginToken;
    }

    let data = undefined;
    let error = undefined;

    try {
      data = await request(pars);

      const { code, msg } = data || {};
      if (code === 10001 && msg === 'token expired') {
        resetToken();
        return await run(args);
      }

      handleSuccess(data);
      setPreParams(pars);
    } catch (e) {
      error = e;
      handleError(error);
    }

    handleFinish(data, error);

    return data;
  }) as Run;

  const refresh = useMemoizedCallback(() => {
    if (preParams) {
      run(preParams);
    }
  });

  const [finish, setFinish] = useState(true);

  useEffect(() => {
    setFinish(false);
  }, [opsJson]);

  // 自动执行
  useEffect(() => {
    if (auto && !finish) {
      setFinish(true);
      run();
    }
  }, [auto, finish, run]);

  return { data, run, refresh, isLoading, isSuccess, isError, error };
}

interface PirateArgs {
  onBeforeStart: () => void;
  onBeforeFinish: () => void;
  onFinish: () => void;
}

class Pirate {
  constructor({ onBeforeStart, onBeforeFinish, onFinish }: PirateArgs) {
    //
  }
}
