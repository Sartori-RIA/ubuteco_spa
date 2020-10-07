import {AfterViewInit, Component} from '@angular/core';
import {User} from '../../core/models/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit {

  user: User = this.activatedRoute.snapshot.data.user;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;
  }

}
