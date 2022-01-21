export const ifUserIsRequired = (user, userRequired) => {
  const REAPEAH = "31120920";
  const INSTABILITY = "53771040";
  const QUIN = "56649026";
  const REPEPETEST = "756281104";
  const TRISTO = "185934665";
  const ALLOWED_IDS = [REAPEAH, INSTABILITY, QUIN, REPEPETEST, TRISTO];
  if (!userRequired) return true;
  if (ALLOWED_IDS.includes(user?.id)) return true;
  return false;
};
