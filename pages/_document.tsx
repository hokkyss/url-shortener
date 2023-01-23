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
				<Head>
					<meta
						name="description"
						content="Link shortener by hokkyss (Hokki Suwanda)"
					/>
					<link rel="icon" href="/favicon.ico" />
					{/* <link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Public+Sans&display=swap"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/> */}
				</Head>
				<body>
					<NextScript />
					<Main />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
