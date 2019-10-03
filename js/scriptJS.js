const urgencyData = {
    "I GOT TIME": "our expert translator can take a reasonable amount of time perfecting your translation.",
    "AVERAGE": "you will get the best translation.",
    "YESTERDAY": "we will do our best to make translation as soon as possible."
  };

(function($){
	$('.item-translate-subject').click(function(){
		$('.item-translate-subject.active').removeClass('active');
		$(this).addClass('active')
	})

	$('.col.item-tone').click(function(){
		$('.col.item-tone.active').removeClass('active');
		$(this).addClass('active')
	})
	$('.item-translate-subject').keypress(function(){
		$('.item-translate-subject.active').removeClass('active');
		$(this).addClass('active')
	})

	$('.col.item-tone').keypress(function(){
		$('.col.item-tone.active').removeClass('active');
		$(this).addClass('active')
	})


	$('#formOrder').submit(function(e){
		$(this).addClass('validated');
		const formElements = this.elements;
		for(let i = 0; i<formElements.length; i++){
			if(!formElements[i].validity.valid){
				e.preventDefault();
				return;
			}
		}
	})
	$("#urgentRange").change(function(){
		const value = this.value;
		let index=0;
		const textBlock = $('.time-urgent');
		let destText = '';
		let destKey = '';
		for( let key in urgencyData ){
			index++;
			if(index == value){
				destText = urgencyData[key];
				destKey = key;
			}
		}
		if(destText){
			$('.time-urgent .average').text(destKey);
			$('.time-urgent .urgent-text').text(destText);
		}
		$('.input-decoration-1').css('visibility','visible')
		$('.input-decoration-2').css('visibility','visible')
		$('.input-decoration-3').css('visibility','visible')
		$('.input-decoration-'+value).css('visibility','hidden')
	})

	/**file input**/

	function initFileUploader(){
		let filesToUpload = [];

		const itemTemplate = function(itemData){

			const fileHtml = `<li class="upload-files-item">
				<div class="row">
					<div class="col-4 upload-file-info-name">
						${itemData.name}
					</div>
					<div class="col upload-file-info-size">
						${itemData.size}kb
					</div>
					<div class="col upload-file-info-words">
						${itemData.countWords}
					</div>
					<div class="col upload-file-info-remove"
						data-name="${itemData.name}"
						data-last-modified="${itemData.lastModified}"
					></div>
				</div>
			</li>`
			return fileHtml;
		
		}

		const setFilesInHtml = function (){
			let filesHtml = '';
			for(let i=0; i<filesToUpload.length; i++){
				let fileData = {};
				fileData.name = filesToUpload[i].name;
				fileData.size = filesToUpload[i].size/1024;
				fileData.countWords = 2578;
				fileData.lastModified = filesToUpload[i].lastModified;
				filesHtml += itemTemplate(fileData);
			}
			if(filesHtml){
				$('.upload-files-info .upload-files-item').remove();
				$('.upload-files-info').append(filesHtml);
				$('.upload-files-info').css('display','block');
				initDeleteFile();
			} else{
				$('.upload-files-info').css('display','none');
			}
		}

		const initDeleteFile = function(){
			$('.upload-files-info .upload-files-item .upload-file-info-remove').click(function(e){
				const fileName = $(this).data('name');
				const lastModified = $(this).data('lastModified');
				const fileIndex = filesToUpload.findIndex(function(item){
						return ((item.name === fileName) && (item.lastModified === lastModified))
				})
				console.log(fileIndex);
				if(fileIndex !== -1){
					filesToUpload.splice(fileIndex, 1);
					console.log(filesToUpload);
					setFilesInHtml();
				}
			})
		}

		$('#uploadFiles').change(function(e){
			const currentFilesToUpload = [];
			const files = this.files;
			for(let i=0; i<files.length; i++){
				currentFilesToUpload.push(files[i]);
			}
			filesToUpload = currentFilesToUpload;
			setFilesInHtml();
		})
	}

	initFileUploader();


}($))
