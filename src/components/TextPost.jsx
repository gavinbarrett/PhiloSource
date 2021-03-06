import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
const zlib = require('zlib');
import './sass/TextPost.scss';

export const TextPost = ({title, user, tags, file, hash, changeFilename, updateHash}) => {
	const [digest, updateDigest] = useState(null);
	const history = useHistory();

	useEffect(() => {
		const upHash = () => {
			updateDigest(hash);
		}
		upHash();
	}, []);

	const display = async () => {
		// call fetch and pull file with hash
		const resp = await fetch(`/get_text/?hash=${digest}`, {method: 'GET'});
		const result = await resp.json();
		const file = result['file'];
		if (file) {
			// read base64 into a buffer
			const buffer = Buffer.from(file, 'base64');
			// construct pdf file object
			const pdf = new File([buffer], {type: 'application/json'});
			changeFilename(title);
			//await updateHash(hash);
			history.push(`/pdfrenderer/${hash}`);
		}
	}

	return (<div id="postwrapper" onClick={display}>
		<div className="text-details">
			<div className="posttitle">{title}</div>
			<div className="posttags">{tags}</div>
		</div>
		<div className="upload-details">
			<p>{`Uploaded by: ${user}`}</p>
		</div>
	</div>);
}
