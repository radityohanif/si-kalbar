from flask import Flask, jsonify, request, render_template
import camelot
import tabula
import pandas as pd
import json

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/discover")
def discover():
    return render_template("discover.html")

# ================================== BACKEND SECTION ==================================
@app.route("/data/pdf")
def get_data_pdf():
    data_pdf_raw = tabula.read_pdf("data\\data.pdf") #PDF to Dataframe Pandas
    data_pdf = data_pdf_raw[0]
    data_pdf_total_keseluruhan = data_pdf.iloc[-1, 2:-1] #[row, col]
    data_pdf_isi = data_pdf.iloc[2:-1, 2:-1] #[row, col]
    data_pdf_isi.columns = [
        "Kabupaten",
        "Jumlah RT",
        "Total Pengurus RT",
        "Jumlah RW",
        "Total Pengurus RW",
        "Jumlah PKK",
        "Total Pengurus PKK",
        "Jumlah Karang Taruna",
        "Total Pengurus Karang Taruna",
        "Jumlah Posyandu",
        "Total Pengurus Posyandu",
        "Total Kader Posyandu",
        "Jumlah LPM",
        "Total Pengurus LPM",
        "Jumlah Tani",
        "Total Pengurus Tani",
        "Jumlah Sadar Wisata",
        "Total Pengurus Sadar Wisata",
    ]
    data_pdf_isi = data_pdf_isi.reset_index(drop=True) # reset index pada dataframe
    return data_pdf_isi.to_json()

@app.route("/data/json")
def get_data_json():
    with open("data\\data.json") as file:
        data = json.load(file)
        return jsonify(data)

@app.route("/data/csv")
def get_data_csv():
    df = pd.read_csv("data\\data.csv")
    return df.to_json()
# ================================== BACKEND SECTION ==================================

# ================================== FRONT END SECTION ==================================
@app.route("/result/json")
def echarts_json_data():
    return render_template("result/json.html")

@app.route("/result/csv")
def echarts_csv_data():
    return render_template("result/csv.html")

@app.route("/result/pdf")
def echarts_pdf_data():
    return render_template("result/pdf.html")
# ================================== FRONT END SECTION ==================================

if __name__ == "__main__":
    app.run(port=5008, debug=True)