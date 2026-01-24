import { Component } from '@angular/core';
import { Header } from "app/shared/components/header/header";
import { Footer } from "app/shared/components/footer/footer";

@Component({
  selector: 'app-home',
  imports: [Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
