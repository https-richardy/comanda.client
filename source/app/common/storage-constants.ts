/**
 * StorageConstants is a static class that contains the keys used in localStorage.
 * It centralizes key definitions to avoid duplication and facilitate maintenance.
 */
export class StorageConstants {

    /**
     * Key used to store the user's authentication token.
     * @example 'authentication.token'
     */
    public static readonly AuthenticationToken = 'authentication.token';

    /**
     * Key used to store the logged-in user's information.
     * @example 'profile.information'
     */
    public static readonly ProfileInformation = 'profile.information';

    /**
     * Key used to store the system settings.
     * @example 'system.settings'
     */
    public static readonly SystemSettings = "system.settings";
}

