import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Product } from "../../model/Product";
import { LocalNotifications } from "@ionic-native/local-notifications";

/*
  Generated class for the ReminderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ReminderProvider {

  constructor(private localNotifications: LocalNotifications) {
    console.log('Hello ReminderProvider Provider');
  }

  public setReminderFor(product: Product) {
    product.updateRemainingWarranty();

    if (product.reminder.dismissed || product.warrantyStatus == null)
      return;

    let remainingDays = product.warrantyStatus.remainingDays;
    let remaindBeforeDays = product.reminder.beforeDays;
    let remindInDays = remainingDays - remaindBeforeDays;

    let remindAt = new Date();
    remindAt.setDate(remindAt.getDate() + remindInDays);
    remindAt.setUTCHours(12, 0, 0, 0);

    let notificationText;

    if (remainingDays < 1)
      return;

    notificationText = "'" + product.brand + " " + product.name + "' warranty expires in " + remainingDays + " days";

    this.localNotifications.getAll().then(n => {
      console.log("getAll", n);

      var maxId = 0;
      var existingEntry = null;
      for (var i = 0; i < n.length; i++) {
        let entry = n[i];
        let data = JSON.parse(entry.data);

        if (data.productId === product._id) {
          existingEntry = entry;
          break;
        }

        if (maxId < entry.id) {
          maxId = entry.id;
        }
      }

      // Update existing product notification
      if (existingEntry != null) {
        if (existingEntry.at * 1000 != remindAt.getTime()) {
          this.localNotifications.update({
            id: existingEntry.id,
            at: remindAt,
            text: notificationText
          });
        }
      }
      // Create a notification for the product
      else {
        this.localNotifications.schedule({
          id: maxId + 1,
          title: 'UseUpp',
          text: notificationText,
          sound: 'res://platform_default',
          badge: 1,
          data: { productId: product._id },
          at: remindAt
        });
      }
    });
  }

  public removeReminderForProduct(product: Product) {
    this.localNotifications.getAll().then(n => {

      for (var i = 0; i < n.length; i++) {
        let entry = n[i];
        let data = JSON.parse(entry.data);

        if (data.productId === product._id) {
          this.localNotifications.cancel(entry.id).then(() => {
            console.info("Canceled notification for product: " + product._id);
          }).catch(err => console.log("BBBBBBBBBB", err));
          break;
        }
      }
    }).catch(err => console.log("AAAAAAAAAA", err));
  }
}
