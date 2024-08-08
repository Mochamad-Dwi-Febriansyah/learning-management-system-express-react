import Img from "../../../../assets/img/e96b16297c982e50a6788f8ecf89b71d.png" 

const Why = () => {
  return (
    <>
       <section className="py-4 img-bottom-variasi bg-gradasi" id="tentang_kami">
        <div className="container">
            <div className="row py-3 py-lg-5 gap-2 align-items-center">
                <h2 className="text-center mb-4 fw-medium">Kenapa sih Ringkus Time Dibuat?</h2>
                <div className="col-md">
                    <p className="">Ringkus adalah alat terbaru yang dirancang untuk membantu pengguna  dan mengelola informasi penting dengan cepat dan efisien. Ringkus adalah alat terbaru yang dirancang untuk membantu pengguna  dan mengelola informasi penting dengan cepat dan efisien.</p>
                </div>
                <div className="col-md">
                    <img className="" src={Img} alt="" width="100%"/>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Why;
