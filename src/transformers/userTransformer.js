export function jwtToUser(jwt) {
  const processedData = {
    permissionLevel: jwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
    userID: jwt.aud,
    tokenExpiry: jwt.exp  
  };

  return processedData;
}