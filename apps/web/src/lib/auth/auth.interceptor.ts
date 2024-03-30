import { AxiosInstance } from 'axios';

const AuthInterceptor = (
  api: AxiosInstance,
  logout: () => void,
  refresh: () => void
) => {
  let isRefreshing: boolean = false;
  let failedQueue: Array<object> = [];

  api.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
      const initialRequest = error.config;

      if (
        error.response.status === 401 &&
        initialRequest.url === '/auth/refresh'
      ) {
        isRefreshing = false;
        failedQueue = [];
        logout();
        return Promise.reject(error);
      } else if (error.response.status === 401 && !initialRequest._retry) {
        if (isRefreshing) {
          try {
            failedQueue.push(error.config);
          } catch (err) {
            return Promise.reject(err);
          }
        }

        initialRequest._retry = true;
        isRefreshing = true;

        try {
          refresh();

          const retryOriginalRequest = await api(initialRequest);

          for (const requestConfig of failedQueue) {
            await api(requestConfig);
          }

          failedQueue = [];
          return retryOriginalRequest;
        } catch (error) {
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};

export default AuthInterceptor;
