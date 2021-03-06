import {Component, OnInit, ViewChild} from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {UserService} from '../../../../services/user.service.client';
import {User} from '../../../../models/user.model.client';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-widget-image-new',
  templateUrl: './widget-image-new.component.html',
  styleUrls: ['./widget-image-new.component.css']
})
export class WidgetImageNewComponent implements OnInit {
  @ViewChild('f') widgetForm: NgForm;
  pageId: String;
  widget: Widget

  text: string;
  size: number;
  url: string;
  width: string;

  baseUrl: String;
  websiteId: String;
  widgetId: String;
  userId: String;
  user: User;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) { }

  createWidget() {
    this.text = this.widgetForm.value.text;
    this.size = this.widgetForm.value.size;
    this.url = this.widgetForm.value.url;
    this.width = this.widgetForm.value.width;

    this.widget = new Widget(undefined, 'IMAGE', this.pageId, this.size, this.text, this.width, this.url);
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(
      () => {
        // this.widget = data;
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
      }
    );
  }
  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.user = this.sharedService.user;
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = this.user._id;
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
    });
  }

}
