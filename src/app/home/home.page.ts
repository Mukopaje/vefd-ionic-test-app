import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TaxService } from '../tax.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  initData: any;
  invoiceData: any;

  tax0: any;
  tax1: any;

  constructor(private storage: Storage, private taxService: TaxService) {
    this.log();
  }

  async log() {
    try {
      const initData = await this.storage.get('zra_init_data');
      const invoice_info = await this.storage.get('zra_invoice_data');
      this.initData = JSON.parse(initData);
      this.invoiceData = JSON.parse(invoice_info);
      console.log('Init Data ' + this.initData);
      console.log('Invoice Info' + this.invoiceData);

      this.tax0 = await this.taxService.getTaxDetails('tax0', this.initData);
      console.log('Tax0 - ' + JSON.stringify(this.tax0))

      this.tax1 = await this.taxService.getTaxDetails('tax1', this.invoiceData);
      console.log('Tax1 - ' + JSON.stringify(this.tax1))
    } catch (error) {
      console.log(error);
    }
  }

  async saveTaxDetails() {
    try {
      if(!this.tax0) this.tax0 = {};
      if(!this.tax1) this.tax1 = {};
      this.tax0.data = this.initData;
      const tax0 = await this.taxService.saveTaxDetails('tax2', this.tax0);
      console.log('Tax2 - ' + JSON.stringify(tax0))

      this.tax1.data = JSON.parse(this.invoiceData);
      const tax1 = await this.taxService.saveTaxDetails('tax3', this.tax1);
      console.log('Tax3 - ' + JSON.stringify(tax1))
    } catch (error) {
      console.log(error);
    }
  }

  async saveInfo() {
    try {
      await this.log()
    } catch (error) {
      console.log(error);
    }
  }

  init() {
    (<any>window).zravefd.efdInit(
      (msg) => {
        console.log(msg);

        // if (msg === 1) {
        //   console.log('Service is available!!');
        // } else {
        //   console.log('Service not available!!');
        // }

      },
      (err) => {
        console.log(err);
      }
    );
  }

  initVEFD(): Promise<any> {
    return new Promise(resolve => {
      // console.log(encodedValue);
      const busid = 'R-R-01';
      const bus = {
        license: '595917741934',
        sn: 'ZPOS V-EFD',
        sw_version: '1.2',
        model: 'IP-100',
        manufacture: 'obby phiri',
        imei: '0000000000000000',
        os: 'linux: 2.6.36',
        hw_sn: '3458392322'
      };

      // const bus = {id: '010100001142'};
      (<any>window).zravefd.initVEFD(bus.license, bus, '', busid, '17741934',
        //(<any> window).zravefd.initVEFD('023020415552', bus, data1.secret, 'R-R-02', data1.key,
        (msg) => {
          console.log('response ' + msg);
          this.storage.set('zra_init_data', JSON.stringify(msg)).then((res) => {
            this.taxService.saveTaxDetails("tax0", msg)
            console.log('ZRA Init data stored');
          }).then(res => {
            console.log('Saved to saver0 ' + JSON.stringify(res))
          })
          // resolve(msg);
        },
        (err) => {
          console.log(err);

        }
      );
    }).catch(err => { console.log(err); });

  }

  /*
  *ZRA Tax information application
  *
  * */
  invoiceApplication(): Promise<any> {
    return new Promise(resolve => {
      let initData: any;
      let bid: string;
      const busid = 'INVOICE-APP-R';
      this.storage.get('zra_init_data').then(res => {
        console.log('ZRA INIT DATA1 - ' + res);
        console.log('ZRA INIT DATA2 - ' + JSON.parse(res));
        initData = JSON.parse(res);
        console.log('ZRA INIT DATA1111 - ' + JSON.stringify(initData));
        bid = initData.content.id;

        const bus = {
          id: bid
        };

        console.log('ID----' + initData.content.id);
        console.log('Secret----' + initData.content.secret);
        (<any>window).zravefd.callVEFD(initData.content.id, bus, initData.content.secret, busid, initData.key,
          (msg) => {
            console.log('response ' + JSON.stringify(msg));
            this.storage.set('zra_invoice_data', JSON.stringify(msg)).then((res) => {
              console.log('ZRA Invoice data stored');
              this.taxService.saveTaxDetails("tax1", msg)
            }).then(res => {
              console.log('Saved to saver1 ' + JSON.stringify(res))
            })
          },
          (err) => {
            console.log(err);

          }
        );
      });

    }).catch(err => { console.log(err); });

  }

}
