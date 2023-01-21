import { getPerformance } from 'firebase/performance';
import * as React from 'react';
import { PerformanceProvider, useFirebaseApp } from 'reactfire';

const CustomPerformanceProvider = React.memo(
	function CustomPerformanceProvider({ children }: React.PropsWithChildren) {
		const app = useFirebaseApp();
		const sdk = React.useMemo(
			() => (typeof window !== 'undefined' ? getPerformance(app) : null),
			[app]
		);

		if (sdk) {
			return <PerformanceProvider sdk={sdk}>{children}</PerformanceProvider>;
		}
		return <React.Fragment>{children}</React.Fragment>;
	}
);

export default CustomPerformanceProvider;
