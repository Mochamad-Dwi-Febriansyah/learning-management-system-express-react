import Img from "../../../../assets/img/3142c9eb7c783a895421bd3d929e4a11.png"
import Button from "../../../atoms/Home/Button/Index";

const Hero = () => {
  return (
    <>
      <section className="py-4 img-bottom-variasi">
        <div className="container">
          <div className="row py-3 py-lg-5 align-items-center gap-2">
            <div className="col-lg">
              <h2 className="mt-5 mb-3 fw-bold">
                Ringkus<span className="text-warning"></span>{" "}
              </h2>
              <p>
                adalah alat terbaru yang dirancang untuk membantu pengguna dan
                mengelola informasi penting dengan cepat dan efisien.
              </p>
              <Button type="button" className="btn bg-white text-dark rounded-pill shadow-lg btn-custom z-index-999 btn-selengkapnya px-4 p-2">
              Selengkapnya →
              </Button> 
            </div>
            <div className="col-lg">
              <img src={Img} alt="" width="100%" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
