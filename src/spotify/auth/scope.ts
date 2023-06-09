export enum SpotifyOAuthScope {
  UGCImageUpload = 'ugc-image-upload',
  UserReadPlaybackState = 'user-read-playback-state',
  UserModifyPlaybackState = 'user-modify-playback-state',
  UserReadCurrentlyPlaying = 'user-read-currently-playing',
  AppRemoteControl = 'app-remote-control',
  Streaming = 'streaming',
  PlaylistReadPrivate = 'playlist-read-private',
  PlaylistReadCollaborative = 'playlist-read-collaborative',
  PlaylistModifyPrivate = 'playlist-modify-private',
  PlaylistModifyPublic = 'playlist-modify-public',
  UserFollowModify = 'user-follow-modify',
  UserFollowRead = 'user-follow-read',
  UserReadPlaybackPosition = 'user-read-playback-position',
  UserTopRead = 'user-top-read',
  UserReadRecentlyPlayed = 'user-read-recently-played',
  UserLibraryModify = 'user-library-modify',
  UserLibraryRead = 'user-library-read',
  UserReadEmail = 'user-read-email',
  UserReadPrivate = 'user-read-private',
}

export function scopesToParam(scopes: SpotifyOAuthScope[]): string {
  return scopes.join(' ')
}
