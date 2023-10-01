

//Define quanto tempo é que a função LoadData deve ser executada a cada milisecond
// var myVar = setInterval(LoadData, 5000);
//Some execute ao carregar a página uma vez apenas
window.onload = LoadData()

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

				//====================================================================================
				//	FUNÇÃO RESPONSÁVEL POR CALCULAR A DIFERENÇA DAS HORAS EM QUE O POST FOI FEITO
				//====================================================================================
				function calcularDiferencaTempo(dataString) {
					// Converte a string em um objeto Date
					const dataInscricao = new Date(dataString);

					// Obtém a data atual
					const dataAtual = new Date();

					// Calcula a diferença em milissegundos
					const diferencaEmMilissegundos = dataAtual - dataInscricao;

					// Converte a diferença em segundos, minutos, horas, dias, semanas, meses e anos
					const diferencaEmSegundos = Math.floor(diferencaEmMilissegundos / 1000);
					const diferencaEmMinutos = Math.floor(diferencaEmSegundos / 60);
					const diferencaEmHoras = Math.floor(diferencaEmMinutos / 60);
					const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
					const diferencaEmSemanas = Math.floor(diferencaEmDias / 7);
					const diferencaEmMeses = Math.floor(diferencaEmDias / 30.44); // Média de dias em um mês
					const diferencaEmAnos = Math.floor(diferencaEmDias / 365);

					if (diferencaEmSegundos < 30) {
						return `Agora`;
					} else if (diferencaEmSegundos < 60) {
						return `${diferencaEmSegundos} s`;
					} else if (diferencaEmMinutos < 60) {
						return `${diferencaEmMinutos} min`;
					} else if (diferencaEmHoras < 24) {
						return `${diferencaEmHoras} horas`;
					} else if (diferencaEmDias === 0) {
						return "hoje";
					} else if (diferencaEmDias === 1) {
						return "ontem";
					} else if (diferencaEmDias <= 7) {
						return `${diferencaEmDias} dias`;
					} else if (diferencaEmSemanas <= 4) {
						return `${diferencaEmSemanas} semanas`;
					} else if (diferencaEmMeses <= 12) {
						return `${diferencaEmMeses} meses`;
					} else {
						return `${diferencaEmAnos} anos`;
					}
				}


				//====================================================================================00
				let dataInscricao = data[i].date;
				const hora_post = calcularDiferencaTempo(dataInscricao);
				//====================================================================================00

				//Mostrar os Post Principais
				if (data[i].parent_comment == 0) {

					var posts =
						$('<div class="post-container d-flex mb-3">\
							<img src="avatar.jpg" width="50px" height="50px"/>\
							<div class="sub-container ms-3 d-flex flex-column" style ="max-width: 400px">\
								<div class="shape-msg msg-user bg-body-secondary py-2 px-3">\
									<div class="user_name"><strong>'  + data[i].student + '</strong></div>\
									<p class="msg_post">' + data[i].post + '</p>\
									<div class="date_post text-end">'  + hora_post + '</div>\
								</div>\
									<div class="votes-replies-items d-flex gap-2">\
										<div class="votes text-success fw-bold d-flex align-items-center gap-1" role="button"><ion-icon name="caret-up-outline"></ion-icon> 3</div>\
										<a href="#" data-id="' + commentId + '" title="Add this item" class="open-ReplyModal" data-bs-toggle="modal" data-bs-target="#ReplyModal">Reply</a>\
										<div class="num-replies fw-bold text-secondary" role="button" id="show-replies"><ion-icon name="chatbubbles-outline"></ion-icon> 3 Respostas</div>\
									</div>\
							</div>\
					</div>')


					// Encapsule| Adicione ao elemento tbody os objectos da variavel posts como filhos da tbody 
					$('#record').append(posts);


					//Mostrar as respostas dos Posts
					for (var r = 0; r < data.length; r++) {

						//====================================================================================00
						let dataInscricao = data[r].date;
						const hora_replie = calcularDiferencaTempo(dataInscricao);
						//====================================================================================00

						if (data[r].parent_comment == commentId) {



							var replies =
								$('<div class="ms-5 replies-container d-flex mb-3">\
											<img src="avatar.jpg" width="35px" height="35px"/>\
											<div class="sub-container ms-2 d-flex flex-column" style ="max-width: 400px">\
												<div class="shape-msg msg-user bg-primary-subtle py-2 px-3">\
													<div class="user_name"><strong>'  + data[r].student + '</strong></div>\
													<p class="msg_post">' + data[r].post + '</p>\
													<div class="date_post text-end">'  + hora_replie + '</div>\
												</div>\
												<div class="votes-replies d-flex">\
													<div class="votes-replies-items d-flex gap-2">\
														<div class="votes text-success fw-bold d-flex align-items-center gap-1" role="button"><ion-icon name="caret-up-outline"></ion-icon> 3</div>\
													</div>\
												</div>\
											</div>\
							    	</div>')



							// Encapsule| Adicione ao elemento tbody os objectos da variavel row como filhos da tbody 
							$('#record').append(replies);
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

//Mostrar as respostas

$(document).on("click", "#show-replies", () => {
	// console.log('mostrar as respostas')
	$('.replies-container').removeClass('d-none');

})













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




