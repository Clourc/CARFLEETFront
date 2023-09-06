import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CguComponent } from './cgu/cgu.component';
import { RouterModule, Routes } from '@angular/router';
import { MentionsComponent } from './mentions/mentions.component';
import { CookiesComponent } from './cookies/cookies.component';
import { ContactComponent } from './contact/contact.component';

const miscRoutes : Routes= [
  {path: 'cgu', component: CguComponent},
  { path:'mentions', component: MentionsComponent},
  {path:'cookies', component: CookiesComponent},
  {path:'contact', component: ContactComponent}
];




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    CguComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(miscRoutes)
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class MiscModule { }
