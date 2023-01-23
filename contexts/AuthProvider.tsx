import { getAuth } from 'firebase/auth';
import Router from 'next/router';
import * as React from 'react';
import { AuthProvider, useFirebaseApp } from 'reactfire';

const CustomAuthProvider = React.memo(function CustomAuthProvider({
	children,
}: React.PropsWithChildren) {
	const app = useFirebaseApp();
	const auth = React.useMemo(() => getAuth(app), [app]);

	React.useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				Router.replace('/');
			}
		});

		return unsubscribe;
	}, [auth]);

	if (auth) {
		return <AuthProvider sdk={auth}>{children}</AuthProvider>;
	}
	return <React.Fragment>{children}</React.Fragment>;
});

export default CustomAuthProvider;
