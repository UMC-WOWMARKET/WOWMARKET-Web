import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Intro = () => {
	const [image1, setImage1] = useState("");
	const [image2, setImage2] = useState("");
	const [image3, setImage3] = useState("");

	axios.interceptors.request.use((config) => {
		/* JWT 토큰 */
		const userAccessToken = localStorage.getItem("accessToken");
		if (userAccessToken) {
			console.log(userAccessToken);
			config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
		}
		return config;
	});

	const fetchData = async () => {
		try {
			const response = await axios.get('http://www.wowmkt.kr/project/1/img');
			setImage1(response.data.image1);
			setImage2(response.data.image2);
			setImage3(response.data.image3);
		} catch (error) {
			console.error('Error:', error);
		}
	}

	useEffect(() => { fetchData(); }, []);

	return (
		<div>
			<div>
				console.log(userAccessToken);
				<img src={image1}/>
				<img src={image2}/>
				<img src={image3}/>
			</div>
		</div>
	);
}

export default Intro;
