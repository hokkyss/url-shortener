import { getAnalytics } from 'firebase/analytics';
import * as React from 'react';
import { AnalyticsProvider } from 'reactfire';

const CustomAnalyticsProvider = React.memo(function CustomAnalyticsProvider({
	children,
}: React.PropsWithChildren) {
	const analytics = React.useMemo(
		() => (typeof window !== 'undefined' ? getAnalytics() : null),
		[]
	);

	React.useEffect(() => {
		if (!analytics) return;
	}, [analytics]);

	if (analytics) {
		return <AnalyticsProvider sdk={analytics}>{children}</AnalyticsProvider>;
	}
	return <React.Fragment>{children}</React.Fragment>;
});

export default CustomAnalyticsProvider;
