import DOMPurify from 'isomorphic-dompurify'
export function sanitizeHtml(html:string){return DOMPurify.sanitize(html,{USE_PROFILES:{html:true},FORBID_TAGS:['script','style','iframe','object','embed'],FORBID_ATTR:['onerror','onclick','onload','onmouseover']})}
