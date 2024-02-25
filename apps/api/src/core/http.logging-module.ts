import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { HttpService, HttpModule as BaseHttpModule } from '@nestjs/axios';

@Module({
  imports: [BaseHttpModule],
  exports: [BaseHttpModule],
})
export class LoggingHttpModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  public onModuleInit(): any {
    const logger = new Logger('OUT');

    const axios = this.httpService.axiosRef;
    axios.interceptors.request.use(function (config) {
      config['metadata'] = {
        ...config['metadata'],
        requestData: config.data,
        requestParams: config.params,
        startDate: new Date(),
      };
      return config;
    });
    axios.interceptors.response.use(
      (response) => {
        const { config } = response;
        config['metadata'] = { ...config['metadata'], endDate: new Date() };
        const duration =
          config['metadata'].endDate.getTime() -
          config['metadata'].startDate.getTime();

        const requestData = JSON.stringify(
          config['metadata'].requestData,
          null,
          2,
        );
        const requestParams = JSON.stringify(
          config['metadata'].requestParams,
          null,
          2,
        );
        logger.debug(
          `${config.method.toUpperCase()} ${response.status} ${config.url} ${
            requestData ?? ''
          } ${requestParams ?? ''} ${duration}ms`,
        );
        return response;
      },
      (err) => {
        const { config, response } = err;
        config['metadata'] = { ...config['metadata'], endDate: new Date() };
        const duration =
          config['metadata'].endDate.getTime() -
          config['metadata'].startDate.getTime();

        const requestData = JSON.stringify(
          config['metadata'].requestData,
          null,
          2,
        );
        const requestParams = JSON.stringify(
          config['metadata'].requestParams,
          null,
          2,
        );
        logger.error(
          `${config.method.toUpperCase()} ${response.status} ${config.url} ${
            requestData ?? ''
          } ${requestParams ?? ''} ${duration}ms`,
        );

        return Promise.reject(err);
      },
    );
  }
}
