import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Intro = ({ goods_id }) => {
	const [image1, setImage1] = useState("");
	const [image2, setImage2] = useState("");
	const [image3, setImage3] = useState("");

	const fetchData = async () => {
		try {
			const response = await axios.get(`http://www.wowmkt.kr/project/${goods_id}/img`);
			setImage1(response.data.image1);
			setImage2(response.data.image2);
			setImage3(response.data.image3);
			console.log(image3);
		} catch (error) {
			console.error('Error:', error);
		}
	}

	useEffect(() => { fetchData(); }, []);

	return (
		<div>
			<div style={{display:'flex', flexDirection:'column'}}>
				<img src={image1} style={{maxWidth:'100%'}}/>
				<img src={image2} style={{maxWidth:'100%'}}/>
				<img src={image3} style={{maxWidth:'100%'}}/>
			</div>
		</div>
	);
}

export default Intro;
