import fetch from 'node-fetch';

const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';

export async function translate(query: string): Promise<string> {
  if (!query) return query

  const params = new URLSearchParams();
  params.append('source', 'en');
  params.append('target', 'ko');
  params.append('text', query);

  const resp = await fetch(apiUrl, {
    method: 'POST',
    body: params,
    headers: {
      'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
      'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!,
    },
  })

  if (!resp.ok) {
    console.error('fail to translate', query, resp.status)
    return ''
  }
  const json = await resp.json() as { message: { result: { translatedText: string } } }
  return json.message.result.translatedText || ''
}
