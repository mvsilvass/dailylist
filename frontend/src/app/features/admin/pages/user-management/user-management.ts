import { Component } from '@angular/core';
import { SearchBar } from "src/app/shared/components/search-bar/search-bar";

@Component({
  selector: 'app-user-management',
  imports: [SearchBar],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {

  onSearch($event: string) {
    alert($event);
  }

}
