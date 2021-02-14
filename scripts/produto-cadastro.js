var Autoriza = false;

$(document).ready(function () {
    Inicializar();
    EnterNosCampos();
    CadastrarProduto();
    limparFormulario();
   // $('#sim').click(
     //   Autoriza = true
    //)

});

function limparFormulario() {
    //evento quando o botão de cadastro for clicado
    $("#btnLimpar").click(function () {
        if (window.confirm('Deseja limpar os campos do formulário?')) {
            //limpar os campos
            $(".campo").val('');
            //limpar as mensagens de erro
            $(".msg-erro").html('');
        }
    });
}

function Inicializar() {
    $("#msg-sucesso").hide();
    $("#nome").focus();
    $('#dataCompra').mask("99/99/9999");

    $("#preco").maskMoney({
        //prefix: "R$:",
        decimal: ",",
        thousands: "."
    });
}

function validarProduto(produto) {
    var erros = {}; //JSON vazio!

    if (!produto.nome || produto.nome.trim().length < 3) {
        erros.nome = "Por favor, informe uma descrição para o produto com pelo menos 3 caracteres.";
    }

    if (!produto.preco || produto.preco <= 0 || produto.preco.trim() === "") {
        erros.preco = "Por favor, informe o preço do produto.";
    }

    if (!produto.quantidade || produto.quantidade == 0 || produto.quantidade.trim() == "") {
        //$('#modal').modal('toggle')
        //if (!Autoriza) {
            erros.quantidade = "Por gentileza, Informe a quantidade."
        //}
    }
    if (!produto.dataCompra) {
        erros.dataCompra = "Por favor, informe a data da compra.";
    }
    return erros;
}

function CadastrarProduto() {
    $('#btnCadastro').click(function () {
        var produto = {
            nome: $('#nome').val(),
            preco: $('#preco').val(),
            quantidade: $('#quantidade').val(),
            dataCompra: $('#dataCompra').val()
        }
        console.log($('#quantidade').val());
        $('.msg-erro').html('');
        $("#msg-sucesso").hide();
        var erros = validarProduto(produto);

        if (Object.keys(erros).length === 0) {
            $.ajax({
                type: 'POST',
                url: environment.apiClienteUrl ,
                //url: "http://jsprojetofinal-001-site1.ftempurl.com/api/produto",
                data: JSON.stringify(produto),
                contentType: 'application/json',
                success: function (data) { //promisse

                    $("#msg-sucesso-texto").html(data);
                    $("#msg-sucesso").show();
                    $(".campo").val('');
                },
                error: function (e) { //promisse
                    console.log("ERRO: " + e);
                }
            });
            
        }
        else {
            $("#erro-nome").html(erros.nome);
            $("#erro-preco").html(erros.preco);
            $("#erro-quantidade").html(erros.quantidade);
            $("#erro-dataCompra").html(erros.dataCompra);
            Object.entries(erros).forEach(([key, value]) => {
                console.log(key + ' ' + value);  
                if(value != "")
                {
                    $("#erro-" & key).focus();
                   // break;
                }    
            });
        }

    })
}


function EnterNosCampos() {
    /* ao pressionar uma tecla em um campo que seja de class="pula" */
    $('.upper').keydown(function (e) {

    })

    $('.pula').keyup(function (e) {
        this.value = this.value.toUpperCase();
        /*
         * verifica se o evento é Keycode (para IE e outros browsers)
         * se não for pega o evento Which (Firefox)
        */
        var tecla = (e.keyCode ? e.keyCode : e.which);

        /* verifica se a tecla pressionada foi o ENTER */
        if (tecla == 13) {
            /* guarda o seletor do campo que foi pressionado Enter */
            campo = $('.pula');
            /* pega o indice do elemento*/
            indice = campo.index(this);
            /*soma mais um ao indice e verifica se não é null
             *se não for é porque existe outro elemento
            */
            if (campo[indice + 1] != null) {
                /* adiciona mais 1 no valor do indice */
                proximo = campo[indice + 1];
                /* passa o foco para o proximo elemento */
                proximo.focus();
            }
        }
        /* impede o sumbit caso esteja dentro de um form */
        e.preventDefault(e);

        //return false;
    })

}


