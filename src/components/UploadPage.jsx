import React, {useState} from 'react';
import Dropzone, {useDropzone} from 'react-dropzone';

const Uploader = () => {
	return (<div>uploader</div>);
}

const UploadPage = () => {
	
	const [file, updateFile] = useState(null);
	const [tags, updateTags] = useState(null);

	const dropped = async (file) => {
		console.log(file);
		await updateFile(file[0]);
	}

	const upload = async () => {
		// grab metadata tags
		let tags = document.getElementById("metatags").value.split(" ");
		// filter empty strings
		const filtered = tags.filter((elem) => { return elem.length != 0 });
		// create a new form data object
		let text = new FormData();
		// add supplied file and the tags to the form data
		text.append("textfile", file);
		text.append("tags", JSON.stringify(filtered));
		// send the post request
		const resp = await fetch('/upload', {method: 'POST', body: text});
		console.log(resp);
	}

	return (<div id="uploadpagewrapper">
		<Dropzone id="dropzone" type="file" accept="application/pdf" onDrop={dropped}>
			{({getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles}) => (
				
			<div id="dropper" {...getRootProps()}>
				<input type="file" {...getInputProps()}/>
				{!isDragActive && acceptedFiles.length == 0 && "Click here or drag a file to upload!"}
				{isDragActive && !isDragReject && "Drop your file here!"}
				{isDragActive && isDragReject && "Please enter an image file"}
				{acceptedFiles.length > 0 && !isDragActive && !isDragReject && acceptedFiles[0].name}
			</div>
			)}
		</Dropzone>
		<input id="metatags" type="text" placeholder="put metadata tags here"/>

		<button type="submit" onClick={upload}>Upload</button>
	</div>);
}

export default UploadPage;
