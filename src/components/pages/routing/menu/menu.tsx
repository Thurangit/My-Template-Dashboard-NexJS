import RootLayout from "@/components/layouts/layout";
import GetAllMenu from "./getAll";
import Breadcrumbs from "@/components/shared/breadcrumbs";




const Menu = () => {

    return(
          <RootLayout>
            <Breadcrumbs/>
            <GetAllMenu/>
          </RootLayout>
    )


}

export default Menu;