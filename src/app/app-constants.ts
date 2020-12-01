export class AppConstants {
  public static HOST = 'http://localhost:8090';
  public static API_V1 = '/api/v1';
  public static AUTH_API_V1 = AppConstants.HOST + AppConstants.API_V1 + '/auth';
  public static STORAGE_API_V1 = AppConstants.HOST + AppConstants.API_V1 + '/storage';
  public static DIRECTORY_TREE_API_V1 = AppConstants.STORAGE_API_V1 + '/directories';
  public static FILE_API_V1 = AppConstants.STORAGE_API_V1 + '/files';
  public static OPERATIONS_API_V1 = AppConstants.STORAGE_API_V1 + '/operations';
}
