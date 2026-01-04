/**
 * 取得 API domain
 * - 本地開發：使用環境變數中設定的值
 * - 生產環境：使用當前 domain 加上前綴 ttt-api
 */
export function getApiDomain(): string {
  // 本地開發環境
  if (process.env.NODE_ENV === 'development' || typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_DOMAIN || 'https://localhost:7183';
  }

  // 生產環境：動態生成 API domain
  if (typeof window !== 'undefined') {
    const currentHost = window.location.host; // 例如: ttt.reddo.dev
    const { protocol } = window.location; // https:

    // 如果是 localhost，使用環境變數
    if (currentHost.includes('localhost')) {
      return process.env.NEXT_PUBLIC_API_DOMAIN || 'https://localhost:7183';
    }

    // 將 ttt.xxx.xxx 替換為 ttt-api.xxx.xxx
    const apiHost = currentHost.replace(/^ttt\./, 'ttt-api.');

    return `${protocol}//${apiHost}`;
  }

  // 伺服器端渲染時的 fallback
  return process.env.NEXT_PUBLIC_API_DOMAIN || '';
}
