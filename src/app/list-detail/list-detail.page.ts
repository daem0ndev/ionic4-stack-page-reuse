import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NavParamsService } from '../nav-params.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.page.html',
  styleUrls: ['./list-detail.page.scss'],
})
export class ListDetailPage implements OnInit {

  public itemNumber: number;
  public timeStamp: string;

  constructor(private router: Router, private route: ActivatedRoute, private navParamsService: NavParamsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.itemNumber = parseInt(paramMap.get('number'), 10);
    });

    this.route.queryParamMap.subscribe(paramMap => {
      const navId = paramMap.get('navId');
      const navParams = this.navParamsService.get(navId);

      this.timeStamp = navParams.timeStamp;
    });
  }

  onListDetailMoreClicked() {
    const navId = this.navParamsService.set(undefined);

    this.router.navigate(['/list-detail-more'], { queryParams: { navId } });
  }

  onItemClicked(number: number) {
    const navId = this.navParamsService.set({
      timeStamp: new Date().toLocaleString()
    });

    this.router.navigate(['/list-detail', number], { queryParams: { navId } });
  }
}
