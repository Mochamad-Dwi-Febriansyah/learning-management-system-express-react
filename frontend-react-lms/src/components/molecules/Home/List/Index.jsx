import ListItem from "../../../atoms/Home/ListItem/Index.jsx"

const List = () => {
    return (
        <>
         <ul className="navbar-nav mx-auto mb-lg-0 gap-1">
            <ListItem text="Beranda" linkTo="#"/>
            <ListItem text="Tentang Kami" linkTo="#tentang_kami"/>
            <ListItem text="Hubungi Kami" linkTo="#hubungi_kami"/> 
            </ul>
        </>
    )
}

export default List