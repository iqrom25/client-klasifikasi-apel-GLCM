import React from "react";

const Konfigurasi = props => {
  const { onChangeSudut, sudut,fold, onChangeFold } = props;

  const handleRadioChange = e => {
    onChangeSudut(parseInt(e.target.value));
  };

  const handleFoldChange = e => {
    onChangeFold(parseInt(e.target.value));
  };

  return (
    <div style={{ margin: "3rem" }}>
      <div className="row">
        <div className="jenis-sudut ">
          <div className="radio-pilihan">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="sudut"
                onChange={handleRadioChange}
                value={0}
                defaultChecked={sudut === 0}
              />
              <label className="form-check-label">0 derajat</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="sudut"
                onChange={handleRadioChange}
                value={45}
                defaultChecked={sudut === 45}
              />
              <label className="form-check-label">45 derajat</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="sudut"
                onChange={handleRadioChange}
                value={90}
                defaultChecked={sudut === 90}
              />
              <label className="form-check-label">90 derajat</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="sudut"
                onChange={handleRadioChange}
                value={135}
                defaultChecked={sudut === 135}
              />
              <label className="form-check-label">135 derajat</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="pengaturan-k-fold ">
          <div className="my-3 row">
            <label className="col-sm-4 col-form-label">Jumlah Fold</label>
            <div className="col-sm-4">
              <input
                type="number"
                className="form-control"
                onChange={handleFoldChange}
                defaultValue={fold}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Konfigurasi;
