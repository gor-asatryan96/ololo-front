export function sendRequest(url, method, body, contentType = 'json') {
  const headers = {
    'Content-Type': `application/${contentType}`,
  };

  const options = {
    method,
    headers,
    body: body
      ? JSON.stringify(body)
      : null,
  };

  return fetch(url, options).then(data => data.json());
}
