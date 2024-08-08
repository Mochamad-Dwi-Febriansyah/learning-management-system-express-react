import Img from "../../../../assets/img/e96b16297c982e50a6788f8ecf89b71d.png" 

const Feature = () => {
  return (
    <>
      <section className=" py-4">
            <div className="container">
                <div className="row py-3 py-lg-5 bg-white rounded gap-2 reverse px-5 shadow">
                    <div className="col-md">
                        <img className="bg-warning" src={Img} alt="" width="100%" />
                    </div>
                    <div className="col-md">
                        <h3 className="mb-3">Ringkus Creative</h3>
                        <p className="">Ringkus adalah alat terbaru yang dirancang untuk membantu pengguna  dan mengelola informasi penting dengan cepat dan efisien</p>
                    </div>
                </div>
            </div>
        </section> 
    </>
  );
};

export default Feature;
