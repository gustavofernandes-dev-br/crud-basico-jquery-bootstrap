//inicializando o jquery


$(document).ready(function () {

    inicializarPagina();
    consultarProdutos();
    atualizarProduto();

});

function inicializarPagina() {
    $("#msg-sucesso").hide();
}

function getFormattedDateAlternative(date) {
    var year = date.substring(0, 4);
    var month = date.substring(5, 7);
    var day = date.substring(8, 10);
    

    return day + '/' + month + '/' + year;
}

function consultarProdutos() {
    //requisição AJAX para a API (GET)
    console.log("aeeee")
    $.ajax({
        type: 'GET',
        url: environment.apiClienteUrl ,
        //url: "http://jsprojetofinal-001-site1.ftempurl.com/api/produto",
        success: function (data) {
            //var PrecoTotal = 0.0;
            $("#qtdT").html(data.length);
            console.log(data.length)
            var result = "";

            for (var i = 0; i < data.length; i++) {
                var produto = data[i];
               // PrecoTotal += parseFloat(produto.preco.replace(",","."));
                result += "<tr>";

                result += "<td>"
                    + produto.nome
                    + "</td>";
                result += "<td>"
                    + produto.preco
                    + "</td>";
                result += "<td>"
                    + produto.quantidade
                    + "</td>";
                result += "<td class='text-center'>" + getFormattedDateAlternative(produto.dataCompra) + "</td>";


                result += "<td>"
                    + "<button class='btn btn-primary btn-sm mr-1' data-toggle='modal' data-target='#janelaedicao' onclick=\"exibirProduto('" + produto.id + "')\">Atualizar</button>"
                    + "<button class='btn btn-danger btn-sm' onclick=\"excluirProduto('" + produto.id + "')\">Excluir</button>"
                    + "</td>";


                result += "</tr>";
            }
            //$("#precoT").html(PrecoTotal);
            $("#tabelaProdutos tbody").html(result);


            $('#tabelaProdutos').DataTable({
                "destroy": true,
                "pageLength": 5,
                "lengthMenu": [3, 5, 10, 25, 50, 75, 100],
                "language": {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Filtrar registros",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    },
                    "select": {
                        "rows": {
                            "_": "Selecionado %d linhas",
                            "0": "Nenhuma linha selecionada",
                            "1": "Selecionado 1 linha"
                        }
                    }
                }
            });
        },
        error: function (e) {
            console.log(e);
        }
    })
}

function excluirProduto(id) {
    if (window.confirm('Deseja realmente excluir o produto?')) {
        $.ajax({
            type: 'DELETE',
            url: environment.apiClienteUrl + "/" + id,
            //url: "http://jsprojetofinal-001-site1.ftempurl.com/api/produto/" + id,
            success: function (data) {
                window.alert(data);
                consultarProdutos();
            },
            error: function (e) {
                console.log(e);
            }
        });
    }
}

function exibirProduto(id) {

    $("#msg-sucesso").hide();
    $(".msg-erro").html('');

    $.ajax({
        type: 'GET',
        url: environment.apiClienteUrl + "/" + id,
        success: function (data) {
            $("#preco").val(data.preco);
            $("#nome").val(data.nome);
            $("#dataCompra").val(getFormattedDateAlternative(data.dataCompra));
            $("#quantidade").val(data.quantidade);
            $("#produtoId").val(data.id);

        }
    });
}

function atualizarProduto() {

    $("#btnAtualizar").click(function () {

        var produto = {
            nome: $("#nome").val(),
            preco: $("#preco").val(),
            quantidade: $("#quantidade").val(),
            dataCompra: getFormattedDateABNT( $("#dataCompra").val()),  
            id: $("#produtoId").val(),     
            
        };
        console.log(produto.id)
        var errors = validarProduto(produto);

        //verificar se a variavel 'errors' (JSON) não contem atributos
        if (Object.keys(errors).length === 0) {
            console.log("sem erro")
            $.ajax({
                type: 'PUT',
                url: environment.apiClienteUrl,    
               // url:  "http://jsprojetofinal-001-site1.ftempurl.com/api/produto" ,
                data: JSON.stringify(produto),
                contentType: 'application/json',
                success: function (data) { //promisse

                    $("#msg-sucesso-texto").html(data);
                    $("#msg-sucesso").show();

                    $("#janelaedicao").modal('toggle');

                    consultarProdutos();
                },
                error: function (e) { //promisse
                    console.log("ERRO: " + e);
                }
            });

        }
        else {

            $("#erro-nome").html(errors.nome);
            $("#erro-cpf").html(errors.cpf);
            $("#erro-email").html(errors.email);
            $("#erro-dataNascimento").html(errors.dataNascimento);
            $("#erro-cep").html(errors.cep);
            $("#erro-numero").html(errors.numero);
            $("#erro-complemento").html(errors.complemento);
            $("#erro-logradouro").html(errors.logradouro);
            $("#erro-bairro").html(errors.bairro);
            $("#erro-cidade").html(errors.cidade);
            $("#erro-estado").html(errors.estado);
        }

    })

}