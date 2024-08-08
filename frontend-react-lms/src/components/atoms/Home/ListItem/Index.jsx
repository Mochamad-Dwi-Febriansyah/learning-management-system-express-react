import PropTypes from "prop-types"

const ListItem = ({text, linkTo}) => {
    return (
        <>
             <li className="nav-item">
                <a className="nav-link fw-medium" aria-current="page" href={linkTo}>
                  {text}
                </a>
              </li>
        </>
    )
}

ListItem.propTypes = {
  text: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired
}

export default ListItem