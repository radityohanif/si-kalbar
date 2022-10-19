$(document).ready(function () {
    $.get("http://127.0.0.1:5008/data/json", 
        function (data) {
            let jumlahTipologi = getJumlahTipologi(data)
            console.log(jumlahTipologi)
            createGrafik(jumlahTipologi)
        }
    );
});

function getJumlahTipologi(data){
    let jumlahTipologi = Object()
    let jenisTipologi = Array()
    for(let i=0; i<data.length; i++){
        if(!(jenisTipologi.includes(data[i].Tipologi))){
            jenisTipologi.push(data[i].Tipologi)
            jumlahTipologi[data[i].Tipologi] = 1
        }
        else {
            jumlahTipologi[data[i].Tipologi] += 1
        }
    }
    // Post Process data jumlahTipologi
    let result = Array() 
    let keys = Object.keys(jumlahTipologi)
    let values = Object.values(jumlahTipologi)
    for(let i=0; i<keys.length; i++){
        let item = Object()
        item.name = keys[i]
        item.value = values[i]
        result.push(item)
    }

    return result
}

function createGrafik(dataInput) {
    var chart = echarts.init(document.getElementById('chart'))
    chart.setOption(
        {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'horizontal',
                left: 'center'
            },
            series: [
                {
                    name: 'Tipologi',
                    type: 'pie',
                    radius: '50%',
                    data: dataInput,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    )
}