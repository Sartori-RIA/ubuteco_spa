import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NguCarouselModule} from '@ngu/carousel';
import {SharedModule} from '../../shared/shared.module';

import {HomeComponent} from './home.component';
import {HeaderComponent} from './header/header.component';
import {IntroComponent} from './intro/intro.component';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {ServicesComponent} from './services/services.component';
import {CtaComponent} from './cta/cta.component';
import {PricingsComponent} from './pricings/pricings.component';
import {ContactComponent} from './contact/contact.component';
import {FooterComponent} from './footer/footer.component';
import {TestimonialsComponent} from './testimonials/testimonials.component';
import {PortfolioCarouselComponent} from './portfolio-carousel/portfolio-carousel.component';
import {TestimonialsCarouselComponent} from './testimonials-carousel/testimonials-carousel.component';
import {ServicesCarouselComponent} from './services-carousel/services-carousel.component';
import {DemoComponent} from './demo/demo.component';
import {HomeRoutingModule} from './home-routing.module';
import {CookieCodeToolsModule} from '../../../../../tools/src/lib/cookie-code-tools.module';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CookieCodeToolsModule,
    SharedModule,
    NguCarouselModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    IntroComponent,
    PortfolioComponent,
    ServicesComponent,
    CtaComponent,
    PricingsComponent,
    ContactComponent,
    FooterComponent,
    TestimonialsComponent,
    PortfolioCarouselComponent,
    TestimonialsCarouselComponent,
    ServicesCarouselComponent,
    DemoComponent,
  ],
})
export class HomeModule {
}
