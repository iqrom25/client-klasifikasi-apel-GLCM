import React from "react";
import Swal from "sweetalert2";
import heic2any from "heic2any";
import Table from "../components/table";
import { useMutation } from "@tanstack/react-query";
import { postDataUji } from "../services/pelatihanApi";
import Loading from "../components/loading";
import Spinner from "../components/spinner";




const Pengujian = props => {
  const{sudut} = props;

  const inputRef = React.useRef();
  const [preview, setPreview] = React.useState(null);
  const [dataUji,setDataUji] = React.useState(null);
  const [hasil,setHasil] = React.useState({});
  const [tetanggaTerdekat,setTetanggaTerdekat] = React.useState([]);
  const [loading,setLoading]=React.useState(false);
  const [loadImage,setLoadImage] = React.useState(false);
  const [grayscale, setGraycale] = React.useState(null);
  const [showGrayscale, setShowGraycale] = React.useState(false);
  const mutation = useMutation(postDataUji,{
    onSuccess: result=>{
      const data = result.data;
      setHasil(data.data.hasil);
      setGraycale(data.data.grayscale);
      setTetanggaTerdekat(data.data.tetanggaTerdekat);
    },
    onError:(error)=>{
      const response = error.response.data;
      setTimeout(() => {
        Swal.fire({
          icon: 'error',
          title: `Error : ${response.code}`,
          text: response.message,
        })
      }, 1000);

    }
  });

  const handleSelectImage = e => {
    inputRef.current.click();
  };

  const handleInputChange = async e => {
    setLoadImage(true)
    const file =  e.target.files?.[0];
    let img = file;

    if(!file) {
      setLoadImage(false)
      setDataUji(null);
      setPreview(null);
      return;
    }

    const imageName = file.name.toLowerCase();


    if(imageName.includes('.heic')){
      const blobUrl = URL.createObjectURL(file)
      const blobRes = await fetch(blobUrl);
      const blob = await blobRes.blob();

      img = await heic2any({blob});
    }

    const url = URL.createObjectURL(img);

    setDataUji(file);

    setPreview(url);
    setLoadImage(false)
  };

  const handleProses = e =>{
    const form = new FormData();
    form.append('Gambar',dataUji);
    form.append('Sudut',sudut);
    mutation.mutate(form);
  }

  const handleGrayscale = e=>{
    setShowGraycale(!showGrayscale)
  }

  React.useEffect(()=>{
    if(mutation.isLoading){
      setLoading(true);
      setTimeout(()=>{
        setLoading(false)
      },1000)
    }
  },[mutation.isLoading])



  return (
    <div className="row mb-3">
      <div className="col-4">
        <div
          className="border-img my-3 ms-3"
          onClick={handleSelectImage}
          style={{ "--display": preview || loadImage ? "none" : "block" }}
        >
          <input
            type="file"
            className="input-image"
            ref={inputRef}
            accept="image/*"
            onChange={handleInputChange}
          />
          <img
            className={`img-preview ${preview  ? null : "d-none"}`}
            src={preview}
            alt="data-uji"
          />
          
          {loadImage ? <Spinner />:null}
        </div>
        <div className="grayscale-border ms-3 mb-2">
          <img
              className={`img-preview ${showGrayscale?null:'d-none'}`}
              src={`data:image/bmp;base64,${grayscale}`}
              alt="data-uji"
          />
        </div>
        <button 
        className="btn btn-proses custom-btn-shadow ms-3" 
        onClick={handleProses}
        disabled={dataUji === null}
        >Proses
        </button>

        <button 
        className={`btn btn-proses ${mutation.isSuccess?null:`d-none`} custom-btn-shadow ms-3`}
        onClick={handleGrayscale}
        >
          {`${showGrayscale?'Hide':'Show'} Grayscale`}
        </button>
      
      </div>
      <div className="col-8">
        <div className="form-pengujian mt-5 mb-3">
          <div className="row">
            <div className="col-6">
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Red</label>
                <div className="col-sm-4">
                  <input type="text" className="form-control" value={hasil.red} disabled />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Green</label>
                <div className="col-sm-4">
                  <input type="text" className="form-control" value={hasil.green} disabled />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Blue</label>
                <div className="col-sm-4">
                  <input type="text" className="form-control" value={hasil.blue} disabled />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Energi</label>
                <div className="col-sm-4">
                  <input type="text" className="form-control" value={hasil.glcm?.energi} disabled />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Kontras</label>
                <div className="col-sm-4">
                  <input type="text" className="form-control" value={hasil.glcm?.kontras} disabled />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Homogenitas</label>
                <div className="col-sm-4">
                  <input type="text" className="form-control" value={hasil.glcm?.homogenitas} disabled />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Korelasi</label>
                <div className="col-sm-4">
                  <input type="text" className="form-control" value={hasil.glcm?.korelasi} disabled />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label" >Kelas</label>
                <div className="col-sm-4">
                  <input type="text" className="form-control" value={hasil.kelas} disabled />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        mutation.isSuccess?
        (
          <div className="col-12 mt-4 px-4">
            <h5 className="ms-3">Data Tetangga Terdekat</h5>
            <Table data={tetanggaTerdekat} type={"pengujian"}/>
          </div>
      ):null
     }
     {loading ? <Loading /> : null}
    </div>
      
  );
};

export default Pengujian;
