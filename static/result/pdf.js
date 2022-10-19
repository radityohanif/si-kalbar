$(document).ready(function () {
    $.get("http://127.0.0.1:5008/data/pdf",
        function (res) {
            const data = JSON.parse(res)
            let daftarKabupaten = []
            
            // reformat data respon 
            let banyakData = Object.values(data["Kabupaten"]).length
            for (let i = 0; i < banyakData; i++) {
                let kabupaten = {}
                Object.keys(data).map((key) => {
                    kabupaten[key] = Object.values(data[key])[i]
                })
                daftarKabupaten.push(kabupaten)
            }

            // inisiasi isi form daftar kabupaten
            const formSelect = document.getElementById("form_daftarKabupaten")
            daftarKabupaten.map((data, index) => {
                let formOption = `<option value="${index}">${data["Kabupaten"]}</option>`
                formSelect.insertAdjacentHTML("beforeend", formOption)
            })

            // inisasi grafik dari item pertama daftarKabupaten
            createGrafik(daftarKabupaten[0])
            
            // simpan data respon (karena bersifat sementara) pada localStorage
            localStorage.setItem("daftarKabupaten", JSON.stringify(daftarKabupaten))
        }
    );
});

function createGrafik(data) {
    delete data["Kabupaten"]
    var chart = echarts.init(document.getElementById('chart'))
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: Object.keys(data),
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Jumlah',
                type: 'bar',
                barWidth: '60%',
                data: Object.values(data)
            }
        ]
    }
    chart.setOption(option)
}

/**
 * Menambahkan event pada form daftar kabupaten
 * Ketika diklik memperbarui grafik sesuai dengan data kabupaten tertentu
 */
const formSelect = document.getElementById("form_daftarKabupaten")
formSelect.addEventListener("change", () => {
    console.log("formSelect Change...")
    const daftarKabupaten = JSON.parse(
        localStorage.getItem("daftarKabupaten")
    )
    createGrafik(daftarKabupaten[formSelect.value])
})