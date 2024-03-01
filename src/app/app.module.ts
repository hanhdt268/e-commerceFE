import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {NavbarComponent} from './component/navbar/navbar.component';
import {FooterComponent} from './component/footer/footer.component';
import {ClientDashbordComponent} from './pages/user/client-dashbord/client-dashbord.component';
import {DashbordComponent} from './pages/admin/dashbord/dashbord.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {authInterceptorProvides} from './service/auth.interceptor';
import {AddCategoryComponent} from './pages/admin/add-category/add-category.component';
import {UpdateCategoryComponent} from './pages/admin/update-category/update-category.component';
import {ViewCategoryComponent} from './pages/admin/view-category/view-category.component';
import {AddManufacturerComponent} from './pages/admin/add-manufacturer/add-manufacturer.component';
import {UpdateManufacturerComponent} from './pages/admin/update-manufacturer/update-manufacturer.component';
import {ViewManufacturerComponent} from './pages/admin/view-manufacturer/view-manufacturer.component';
import {SidebarComponent} from './pages/admin/sidebar/sidebar.component';
import {AddproductLpComponent} from './pages/admin/addproduct-lp/addproduct-lp.component';
import {AddproductSpComponent} from './pages/admin/addproduct-sp/addproduct-sp.component';
import {AddproductAcComponent} from './pages/admin/addproduct-ac/addproduct-ac.component';
import {UpdateProductComponent} from './pages/admin/update-product/update-product.component';
import {AddProductComponent} from './pages/admin/add-product/add-product.component';
import {MatTabsModule} from '@angular/material/tabs';
import {UploadFileComponent} from './pages/upload-file/upload-file.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from 'src/environments/environment';
import {ViewproductComponent} from './pages/admin/viewproduct/viewproduct.component';
import {HomeComponent} from './pages/user/home/home.component';
import {CartComponent} from './pages/user/cart/cart.component';
import {BuyProductComponent} from './pages/user/buy-product/buy-product.component';
import {ProductViewDetaisComponent} from './pages/user/product-view-detais/product-view-detais.component';
import {SidebarUserComponent} from './pages/user/sidebar-user/sidebar-user.component';
import {ViewProductBySearchComponent} from './pages/user/view-product-by-search/view-product-by-search.component';
import {ClickOutsideDirective} from './click-outside.directive';
import {ProfileComponent} from './pages/profile/profile.component';
import {UpProfileComponent} from './pages/up-profile/up-profile.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {ViewOrderDetailsComponent} from './pages/admin/view-order-details/view-order-details.component';
import {ManagerAccountComponent} from './pages/admin/manager-account/manager-account.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DashboardAdminComponent} from './pages/admin/dashboard-admin/dashboard-admin.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {WebSocketService} from "./WebSocketService";
import {ReviewComponent} from './pages/user/review/review.component';
import {CompareProductComponent} from './pages/user/compare-product/compare-product.component';
import {NgxPaginationModule} from "ngx-pagination";
import {AddShipperComponent} from './pages/admin/add-shipper/add-shipper.component';
import {UploadMutipleFileComponent} from './pages/upload-mutiple-file/upload-mutiple-file.component';
import {DashboardShipperComponent} from './pages/shipper/dashboard-shipper/dashboard-shipper.component';
import {CommonComponent} from './pages/shipper/common/common.component';
import {StatisticsComponent} from './pages/shipper/statistics/statistics.component';
import {ManageReviewComponent} from './pages/admin/manage-review/manage-review.component';
import {NumberOnlyDirective} from './number-only.directive';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ClientDashbordComponent,
    DashbordComponent,
    LoginComponent,
    SignupComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    ViewCategoryComponent,
    AddManufacturerComponent,
    UpdateManufacturerComponent,
    ViewManufacturerComponent,
    SidebarComponent,
    AddproductLpComponent,
    AddproductSpComponent,
    AddproductAcComponent,
    UpdateProductComponent,
    AddProductComponent,
    UploadFileComponent,
    ViewproductComponent,
    HomeComponent,
    CartComponent,
    BuyProductComponent,
    ProductViewDetaisComponent,
    SidebarUserComponent,
    ViewProductBySearchComponent,
    ClickOutsideDirective,
    ProfileComponent,
    UpProfileComponent,
    ViewOrderDetailsComponent,
    ManagerAccountComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardAdminComponent,
    ReviewComponent,
    CompareProductComponent,
    AddShipperComponent,
    UploadMutipleFileComponent,
    DashboardShipperComponent,
    CommonComponent,
    StatisticsComponent,
    ManageReviewComponent,
    NumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTabsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    NgApexchartsModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [authInterceptorProvides, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule {
}


