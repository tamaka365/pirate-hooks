interface createArgs {
  baseURL: string;
  headers: Record<string, any>;
}

class Fetcher {
  fetch() {}

  constructor() {}

  get() {}

  post() {}

  put() {}

  patch() {}

  delete() {}

  create(args) {
    return this;
  }
}

const ft = new Fetcher();

function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

function createInstance() {
  const context = new Fetcher();

  const instance = bind(Fetcher.prototype.fetch, context);

  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

const fetcher = createInstance();

type FormMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

const baseURL = 'SERVER.API_SERVER';

const client = fetcher.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

type requestParams = {
  method?: FormMethod;
  params?: Record<string, any>;
};

const request = async (url: string, { method, params }: requestParams) => {
  const response = await client.request({
    url,
    method: method || 'get',
    params: !method || method === 'get' ? params : undefined,
    data: method === 'post' ? params : undefined,
  });
  return response.data;
};

export default request;
