export const extractLinks = (rawHTML: string): string[] => {

  const doc = document.createElement('html');
  doc.innerHTML = rawHTML;
  const links = doc.getElementsByTagName('a')
  const urls: Array<any> = [];

  for (let i = 0; i < links.length; i++) {
    urls.push(links[i].getAttribute('href'));
  }

  return urls.filter(Boolean) as string[];
};

export const getHashParameters = (hash: string) => {
  const hashParams = {};
  hash.substr(1).split('&').forEach((queryString: string) => {
    const splitedString = queryString.split('=');
    const key = splitedString[0];
    const value = decodeURIComponent(splitedString[1]);
    hashParams[key] = value;
  });

  return hashParams;
}
