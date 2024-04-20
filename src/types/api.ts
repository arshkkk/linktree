export type IApiResponse<TData = undefined | unknown> = {
  success: boolean;
  data: TData;
  message: string;
};
