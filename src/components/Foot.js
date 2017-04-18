import React from 'react';
const Foot = (a) => {
	if(!a.exist) {
		return null
	}
	return  <div className="app-footer">
				<Link  className="app-button current"  to="/">我的理财</Link>
				<Link  className="app-button"  to="/about">About</Link>
				<Link  className="app-button"  to="/topics">topics</Link>
			</div>
}

export default Foot