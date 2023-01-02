import Document, {
	DocumentContext,
	Html,
	Head,
	Main,
	NextScript,
} from 'next/document';

class CustomDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);

		return initialProps;
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<NextScript />
					<Main />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
