import { getAnalytics } from 'firebase/analytics';
import * as React from 'react';
import { AnalyticsProvider, useFirebaseApp } from 'reactfire';

const CustomAnalyticsProvider = React.memo(function CustomAnalyticsProvider({
	children,
}: React.PropsWithChildren) {
	const app = useFirebaseApp();
	const analytics = React.useMemo(
		() => (typeof window !== 'undefined' ? getAnalytics(app) : null),
		[app]
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
