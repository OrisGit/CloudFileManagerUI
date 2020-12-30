export class AppConstants {
  public static HOST = 'http://localhost:8090';
  public static API_V1 = '/api/v1';
  public static AUTH_API_V1 = AppConstants.HOST + AppConstants.API_V1 + '/auth';
  public static GAMES_API = AppConstants.HOST + AppConstants.API_V1 + '/games';
  public static DEVELOPERS_API = AppConstants.HOST + AppConstants.API_V1 + '/developers';
  public static GENRE_API = AppConstants.HOST + AppConstants.API_V1 + '/genres';
  public static PLATFORM_API = AppConstants.HOST + AppConstants.API_V1 + '/platforms';
  public static PUBLISHER_API = AppConstants.HOST + AppConstants.API_V1 + '/publishers';
}
