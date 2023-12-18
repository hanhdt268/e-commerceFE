import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ClientDashbordComponent} from './pages/user/client-dashbord/client-dashbord.component';
import {DashbordComponent} from './pages/admin/dashbord/dashbord.component';
import {AdminGuard} from './service/admin.guard';
import {ViewCategoryComponent} from './pages/admin/view-category/view-category.component';
import {ViewManufacturerComponent} from './pages/admin/view-manufacturer/view-manufacturer.component';
import {AddProductComponent} from './pages/admin/add-product/add-product.component';
import {AddproductAcComponent} from './pages/admin/addproduct-ac/addproduct-ac.component';
import {ProductResolveService} from './service/product-resolve.service';
import {ViewproductComponent} from "./pages/admin/viewproduct/viewproduct.component";
import {UpdateProductComponent} from "./pages/admin/update-product/update-product.component";
import {AddproductSpComponent} from "./pages/admin/addproduct-sp/addproduct-sp.component";
import {ClientGuard} from "./service/client.guard";
import {HomeComponent} from "./pages/user/home/home.component";
import {CartComponent} from "./pages/user/cart/cart.component";
import {ProductViewDetaisComponent} from "./pages/user/product-view-detais/product-view-detais.component";
import {BuyProductComponent} from "./pages/user/buy-product/buy-product.component";
import {ViewProductBySearchComponent} from "./pages/user/view-product-by-search/view-product-by-search.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {MyOrdersComponent} from "./pages/user/my-orders/my-orders.component";
import {OrderDetailsComponent} from "./pages/admin/order-details/order-details.component";
import {ManagerAccountComponent} from "./pages/admin/manager-account/manager-account.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";
import {DashboardAdminComponent} from "./pages/admin/dashboard-admin/dashboard-admin.component";
import {DeliveryComponent} from "./pages/shipper/delivery/delivery.component";
import {ShipperGuard} from "./service/shipper.guard";
import {CompareProductComponent} from "./pages/user/compare-product/compare-product.component";
import {CommonComponent} from "./pages/shipper/common/common.component";
import {StatisticsComponent} from "./pages/shipper/statistics/statistics.component";
import {ManageReviewComponent} from "./pages/admin/manage-review/manage-review.component";

const routes: Routes = [
  {
    path: "admin",
    component: DashbordComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: DashboardAdminComponent
      },
      {
        path: 'categories',
        component: ViewCategoryComponent
      },
      {
        path: 'manufacturer',
        component: ViewManufacturerComponent
      },
      {
        path: 'product',
        component: AddProductComponent,
        resolve: {
          product: ProductResolveService
        }
      },
      {
        path: 'add-accessory',
        component: AddproductAcComponent,
      },
      {
        path: 'product/:cateId',
        component: ViewproductComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "review",
        component: ManageReviewComponent,
      },
      // {
      //   path: 'update-product',
      //   component: UpdateProductComponent
      // },
      {
        path: 'add-product',
        component: UpdateProductComponent,
        resolve: {
          product: ProductResolveService
        }
      },
      {
        path: 'add-accessory',
        component: AddproductAcComponent
      },
      {
        path: 'add-smartphone',
        component: AddproductSpComponent
      },
      {
        path: 'orderDetails',
        component: OrderDetailsComponent
      },
      {
        path: 'manager-account',
        component: ManagerAccountComponent
      }
    ]
  },

  {
    path: "homepage",
    component: ClientDashbordComponent,
    canActivate: [ClientGuard],
    children: [
      {
        path: ':manuId',
        component: HomeComponent,
        resolve: {
          product: ProductResolveService,
        },
      },
      {
        path: 'search/:search/:manuId',
        component: ViewProductBySearchComponent,
        resolve: {
          product: ProductResolveService
        }
      }

    ]
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: "signup",
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "shipper",
    component: CommonComponent,
    canActivate: [ShipperGuard],
    children: [
      {
        path: "",
        component: DeliveryComponent,
      },
      {
        path: "dashboard",
        component: StatisticsComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
    ]
  },

  {
    path: 'cart',
    component: CartComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'compare/:pid/voi/:productId',
    component: CompareProductComponent,
    pathMatch: 'full'
  },
  {
    path: "buyProduct/:cartId",
    component: BuyProductComponent,
    canActivate: [ClientGuard],
    // resolve: {
    //   productDetails: BuyProductResolverServiceService
    // },

  },
  {
    path: 'productViewDetails',
    component: ProductViewDetaisComponent,
    resolve: {
      product: ProductResolveService
    }
  },
  {
    path: "signup",
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'myOrders',
    component: MyOrdersComponent,

    canActivate: [ClientGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
