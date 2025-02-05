import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
	return (
		<div className="horizontalMenucontainer">
			<div className="page">
				<div className="main-container container">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default AuthLayout;
