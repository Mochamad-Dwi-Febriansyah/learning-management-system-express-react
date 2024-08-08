import Header from "../organisms/Home/Header/Index.jsx"
import Hero from "../organisms/Home/Hero/Index.jsx"
import Feature from "../organisms/Home/Feature/Index.jsx"
import Why from "../organisms/Home/Why/Index.jsx"
import Method from "../organisms/Home/Method/Index.jsx"
import Contact from "../organisms/Home/Contact/Index.jsx"
import PropTypes from "prop-types"


const HomeLayout = ({children}) => {
    return (
        <>
        <Header>
            {children}
        </Header>
        <Hero />
        <Feature />
        <Why />
        <Method />
        <Contact /> 
        </>
    )
}
HomeLayout.propTypes = {
    children: PropTypes.node, 
  }

export default HomeLayout