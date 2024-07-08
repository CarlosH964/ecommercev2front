import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';


@Component({
  selector: 'app-shadow-user',
  standalone: true,
  templateUrl: './shadow-user.component.html',
  styleUrls: ['./shadow-user.component.css'],
  imports: [SharedModule]
})
export class ShadowUserComponent {

}
