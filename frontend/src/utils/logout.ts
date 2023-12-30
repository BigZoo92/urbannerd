import { Preferences } from '@capacitor/preferences';

export const logout = async () => {
  await Preferences.remove({ key: 'jwtToken' });
};