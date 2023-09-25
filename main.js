//Define quanto tempo é que a função LoadData deve ser executada a cada milisecond
var myVar = setInterval(LoadData, 1000);

//
// http_request = new XMLHttpRequest();

function LoadData() {
	$.ajax({
		url: 'view.php',
		type: "POST",
		dataType: 'json',
		success: function (data) {

			//	Limpa todos os objectos HTML filhos do tbody para mostrar a info actualizada puxada pela chamada AJAX
			$('#record').empty();

			//Percorre os dados fornecidos pela reposta via AJAX
			for (var i = 0; i < data.length; i++) {

				var commentId = data[i].id;

				//Mostrar os Post Principais
				if (data[i].parent_comment == 0) {

					var row = 
					$('<div class="container post-container d-flex mb-3">\
							<img src="avatar.jpg" width="50px" height="50px"/>\
							<div class="sub-container ms-3 d-flex flex-column">\
								<div class="rounded msg-user bg-body-secondary py-2 px-3">\
									<div class="user_name"><strong>'  + data[i].student +  '</strong></div>\
									<p class="msg_post">' + data[i].post + '</p>\
								</div>\
								<div class="votes-replies d-flex justify-content-between">\
									<div class="votes-replies-items d-flex gap-2">\
										<div class="votes">Votos</div>\
										<a href="#" data-id="' + commentId + '" title="Add this item" class="open-ReplyModal" data-bs-toggle="modal" data-bs-target="#ReplyModal">Reply</a>\
										<div class="num-replies">3 Respostas</div>\
									</div>\
									<div class="date">'  + data[i].date + '</div>\
								</div>\
							</div>\
					</div>')


					// Encapsule| Adicione ao elemento tbody os objectos da variavel row como filhos da tbody 
					$('#record').append(row);


					//Mostrar as respostas dos Posts
					for (var r = 0; r < data.length; r++) {
						if (data[r].parent_comment == commentId) {



							var comments = 
							$('<div class="ms-5 container post-container d-flex mb-3">\
									<img src="avatar.jpg" width="50px" height="50px"/>\
									<div class="sub-container ms-3 d-flex flex-column">\
										<div class="rounded msg-user bg-body-secondary py-2 px-3">\
											<div class="user_name"><strong>'  + data[r].student +  '</strong></div>\
											<p class="msg_post">' + data[r].post + '</p>\
										</div>\
										<div class="votes-replies d-flex justify-content-between">\
											<div class="votes-replies-items d-flex gap-2">\
												<div class="votes">Votos</div>\
											</div>\
											<div class="date">'  + data[r].date + '</div>\
										</div>\
									</div>\
							</div>')
		
						
							// Encapsule| Adicione ao elemento tbody os objectos da variavel row como filhos da tbody 
							$('#record').append(comments);
						}
					}
				}
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('Error: ' + textStatus + ' - ' + errorThrown);
		}
	});
}


// Ao Clicar no link *Reply*, Puxe o valor do atributo => "data-id"
// Jogue este valor para o <input> oculto que está no Modal que vai abrir

$(document).on("click", ".open-ReplyModal", function () {
	var commentid = $(this).data('id');
	$(".modal-body #commentid").val(commentid);
});



//Post data to the server
$(document).ready(function () {
	$('#butsave').on('click', function () {
		$("#butsave").attr("disabled", "disabled");
		var id = document.forms["frm"]["Pcommentid"].value;
		var name = document.forms["frm"]["name"].value;
		var msg = document.forms["frm"]["msg"].value;
		if (name != "" && msg != "") {
			$.ajax({
				url: "save.php",
				type: "POST",
				data: {
					id: id,
					name: name,
					msg: msg,
				},
				cache: false,
				success: function (dataResult) {
					var dataResult = JSON.parse(dataResult);
					if (dataResult.statusCode == 200) {
						$("#butsave").removeAttr("disabled");
						document.forms["frm"]["Pcommentid"].value = "";
						document.forms["frm"]["name"].value = "";
						document.forms["frm"]["msg"].value = "";
						LoadData();
					}
					else if (dataResult.statusCode == 201) {
						alert("Error occured !");
					}

				}
			});
		}
		else {
			alert('Please fill all the field !');
		}
	});
});

//Reply comment
$(document).ready(function () {
	$('#btnreply').on('click', function () {
		$("#btnreply").attr("disabled", "disabled");
		var id = document.forms["frm1"]["Rcommentid"].value;
		var name = document.forms["frm1"]["Rname"].value;
		var msg = document.forms["frm1"]["Rmsg"].value;
		if (name != "" && msg != "") {
			$.ajax({
				url: "save.php",
				type: "POST",
				data: {
					id: id,
					name: name,
					msg: msg,
				},
				cache: false,
				success: function (dataResult) {
					var dataResult = JSON.parse(dataResult);
					if (dataResult.statusCode == 200) {
						$("#btnreply").removeAttr("disabled");
						document.forms["frm1"]["Rcommentid"].value = "";
						document.forms["frm1"]["Rname"].value = "";
						document.forms["frm1"]["Rmsg"].value = "";
						LoadData();
						$("#ReplyModal").modal("hide");
					}
					else if (dataResult.statusCode == 201) {
						alert("Error occured !");
					}

				}
			});
		}
		else {
			alert('Please fill all the field !');
		}
	});
});




