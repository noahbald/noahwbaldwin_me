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
			return hljs.highlightAuto(str, [lang]).value;
		}
		return hljs.highlight(str, { language: lang }).value;
	},
});
md.use(function resizeImage(md) {
	const imageRenderer = md.renderer.rules.image;
	if (!imageRenderer) {
		return;
	}

	md.renderer.rules.image = (tokens, index, options, env, self) => {
		const src = tokens[index].attrGet('src');
		tokens[index].attrSet('src', `${src}?cloudinary=c_scale,w_680`);

		return imageRenderer(tokens, index, options, env, self);
	};
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
			img: ['src', 'alt', 'width', 'height', 'style'],
			a: ['href', 'name', 'target', 'title'],
			code: ['class'],
			pre: ['class'],
			span: ['class'],
			ol: ['start'],
		},
		selfClosing: ['img'],
	});
	return sanitizedHTML;
}
export default parseMarkdownSanitized;
