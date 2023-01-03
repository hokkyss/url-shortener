import { getAnalytics } from 'firebase/analytics';
import * as React from 'react';
import { AnalyticsProvider } from 'reactfire';

const CustomAnalyticsProvider = React.memo(function CustomAnalyticsProvider({
	children,
}: React.PropsWithChildren) {
	const sdk = React.useMemo(
		() => (typeof window !== 'undefined' ? getAnalytics() : null),
		[]
	);

	if (sdk) {
		return <AnalyticsProvider sdk={sdk}>{children}</AnalyticsProvider>;
	}
	return <React.Fragment>{children}</React.Fragment>;
});

export default CustomAnalyticsProvider;
