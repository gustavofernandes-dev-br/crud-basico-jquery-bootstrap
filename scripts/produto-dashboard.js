$(document).ready(function () {

    inicializarPagina();
    gerarGraficoDeClientes();

    $("#btnPesquisa").click(function () {
        gerarGraficoDeClientes();
    })

})

function inicializarPagina() {

    //calcular a data atual - 15 dias
    var dataMin = new Date();
    dataMin.setDate(dataMin.getDate() - 15);

    //calcular a data atual + 15 dias
    var dataMax = new Date();
    dataMax.setDate(dataMax.getDate() + 15);

    $("#dataMin").val(getFormattedDate(dataMin));
    $("#dataMax").val(getFormattedDate(dataMax));

    $("#dataMin").mask('99/99/9999');
    $("#dataMax").mask('99/99/9999');
}

function gerarGraficoDeClientes() {

    var dataMin = getFormattedDateABNT($("#dataMin").val());
    var dataMax = getFormattedDateABNT($("#dataMax").val());

    var request = environment.apiClienteUrl + "/" + dataMin + "/" + dataMax;
    console.log(request);

    $.ajax({
        type: 'GET',
        url: environment.apiClienteUrl + "/" + dataMin + "/" + dataMax,
        success: function (data) {

            var array = [];

            for (var i = 0; i < data.length; i++) {
                array.push([
                    data[i].name, data[i].data[0]
                   
                ]);
                console.log(data[i].name )
                console.log(data[i].data[0] )
            }

            new Highcharts.Chart({
                chart: {
                    type: 'pie',
                    renderTo: 'graficoProdutos'
                },
                title: {
                    verticalAlign: 'middle',
                    floating: true,
                    text: 'Cadastro de Produtos<br/>por período'
                },
                plotOptions: {
                    pie: {
                        innerSize: '75%',
                        dataLabels: {
                            enabled: true
                        },
                        showInLegend: true
                    }
                },
                exporting: { enabled: true },
                credits: {
                    enabled: false
                },
                series: [{
                    data: array
                }]
            });

        }
    })
}