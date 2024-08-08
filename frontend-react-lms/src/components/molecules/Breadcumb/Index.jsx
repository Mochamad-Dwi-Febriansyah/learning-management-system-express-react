import PropTypes from "prop-types"

const Breadcrumb =({items, current}) => {
    return (
        <>
        <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                {items.map((item, index) =>(
                <li className="breadcrumb-item text-sm" key={index}>
                  <a className="opacity-5 text-white" href="#">
                    {item.name}
                  </a>
                </li>
                ))}
                <li
                  className="breadcrumb-item text-sm text-white active"
                  aria-current="page"
                >
                  {current}
                </li>
              </ol>
              <h6 className="font-weight-bolder text-white mb-0">{current}</h6>
            </nav>
        </>
    )
}

Breadcrumb.propTypes = {
    items: PropTypes.bool.isRequired,
    current: PropTypes.func.isRequired
}

export default Breadcrumb