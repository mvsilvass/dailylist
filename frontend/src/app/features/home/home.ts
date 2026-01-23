import { Component } from '@angular/core';
import { Header } from "app/shared/components/header/header";

@Component({
  selector: 'app-home',
  imports: [Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
