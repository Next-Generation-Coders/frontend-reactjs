// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import StoreSupport from '@widgets/StoreSupport';
import ProductColorBars from '@widgets/ProductColorBars';
import BrandProducts from '@widgets/BrandProducts';
import BasicProductDisplay from '@widgets/BasicProductDisplay';
import BrandMenu from '@widgets/BrandMenu';
import ShoppingCart from '@widgets/ShoppingCart';
import DisplayUsers from "@widgets/UserManagement";
import DisplayRequests from "@widgets/RoleRequests";

const widgets = {
    // brand_menu: <BrandMenu/>,
    // brand_products: <BrandProducts/>,
    // product_display: <BasicProductDisplay/>,
    // color_bars: <ProductColorBars/>,
    // shopping_cart: <ShoppingCart/>,
    // support: <StoreSupport/>
    users:<DisplayRequests/>
}

const RoleRequests = () => {
    return (
        <>
            <PageHeader title="User management"/>
            <AppGrid id="user_management" widgets={widgets}/>
        </>
    )
}

export default RoleRequests