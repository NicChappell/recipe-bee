// import dependencies
import axios from 'axios'

const setAuthToken = token => {
	if (token) {
		// apply token to request header
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		// delete token from request header
		delete axios.defaults.headers.common['Authorization']
	}
}

export default setAuthToken
