import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js/lib/core';
import hlJavaScript from 'highlight.js/lib/languages/javascript';
import hlTypeScript from 'highlight.js/lib/languages/typescript';
import hlCSS from 'highlight.js/lib/languages/css';
import hlSCSS from 'highlight.js/lib/languages/scss';
import hlPlainText from 'highlight.js/lib/languages/plaintext';
import sanitizeHTML from 'sanitize-html';

hljs.registerLanguage('js', hlJavaScript);
hljs.registerLanguage('ts', hlTypeScript);
hljs.registerLanguage('css', hlCSS);
hljs.registerLanguage('scss', hlSCSS);
hljs.registerLanguage('txt', hlPlainText);
hljs.configure({
	classPrefix: '',
});

const md = new MarkdownIt({
	highlight(str, lang) {
		if (!lang || !hljs.getLanguage(lang)) {
			return '';
		}
		return hljs.highlight(str, { language: lang }).value;
	},
});

function parseMarkdownSanitized(markdown: string) {
	const dangerousHTML = md.render(markdown);
	const sanitizedHTML = sanitizeHTML(dangerousHTML, {
		allowedTags: sanitizeHTML.defaults.allowedTags.concat(
			'img',
			'h1',
			'h2',
			'h3',
			'span',
			'div',
			'pre',
			'code'
		),
		allowedAttributes: {
			img: ['src', 'alt'],
			a: ['href', 'name', 'target', 'title'],
			code: ['class'],
			pre: ['class'],
			span: ['class'],
		},
		selfClosing: ['img'],
	});
	return sanitizedHTML;
}
export default parseMarkdownSanitized;
