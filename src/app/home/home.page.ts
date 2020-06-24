import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private storage: Storage) { }

  init() {
    (<any> window).zposvefdplugin.efdInit(
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
      // let d: string;
      // const data = `{\"license\":\"684821956905\",\"sn\":\"951711000831\",\"sw_version\":\"2.14\",
      // \"model\":\"IS-100\",\"manufacture\":\"Inspur\",\"imei\":\"865740037141467\",\"os\":\"Linux2.6.36\",\"hw_sn\":\"\",\"id\":null}`;
      const data1 = {
        id: '010100000056',
        secret: `MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBANt/
        FkxwVwpZGIy2wRgSQPw/
        fd4MpZnoVVaTDCDwSqQSgaJjwuLRJvIhJ1h+b85iEXI4xQDXYy6703lgPBiwPTJy21kcVlkA+
        7MQx1QXuRiv6j2AJ7ZG4Kx/
        5GEdKazrSgSb6XpS5BbheNiqSy9GdWvJTJgs6VhO3lfNanxhO5HDAgMBAAECgYEAly
        LM8dkwtblfhBSapL587LOzMWA37t/hUvlxkoSigJMVnAFhQdiOHo7hjreQuOUh6ipYzBmC
        +7ztAlhXSRChMYLzFcOYS2SrF0nLosOGT+R4dFOWyyfkv2V10KzAjL+v7gB+kTT/
        pGmQNklwfEbxNpVqY9iGMGKn8v/h4CS067ECQQD004NkhKwVriaMuDX6dhWi8fXyZ+
        1pF/KirbtVwWO1GJui58Kn4+6OJJZbjyU7CCbwfoaqeRN3jbV7ACiR7ZcdAkEA5YOgiRK6VgVPIQDOoQFpoCAn/
        SY2UUDCbd5C6v4ram0aaRc4RwavUEA2IqDSX34HmPpmxQRIpgao+
        L4smyQWXwJBAMryAnryl4upPv9rPCOQe0MFe7EjgWOanGFJzn65vqNB8NHLeEqf4QInRhRDxsL2cQDugUcS8pYp/
        AQoD3lYD+kCQBISEwm318P+FwTaM2qp2c8puPxNjelH2AcegNZPvMtcW7/
        6fAvbkuIWrCx9zRKHscFxtbW9aJrp21P6ZTix1rECQQC6Mui4chGh2/
        g4d5fpiPhlt38ukZBdRya0zu35/nUWBa4BN1C/Pg3oL+xbWI+5d+JmISSpmf3ZNOUg73vDEnI6`,
        code: 200,
        desc: 'success'
      };

      // console.log(encodedValue);
      const busid = 'R-R-01';
      const bus = {
        license: '023020415552',
        sn: 'ZPOS V-EFD',
        sw_version: '1.2',
        model: 'IP-100',
        manufacture: 'obby phiri',
        imei: '0000000000000000',
        os: 'linux: 2.6.36',
        hw_sn: '3458392322'
      };

      (<any> window).zposvefdplugin.initVEFD('023020415552', bus, '20415552', busid,
        (msg) => {
          console.log('response ' + msg);
          this.storage.set('zra_init_data', msg).then((res) => {
            console.log('ZRA Init data stored');
          });
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
  taxInfo(): Promise<any> {
    return new Promise(resolve => {
      let initData: any;
      let bid: string;
      const busid = 'R-R-02';
      this.storage.get('zra_init_data').then(res => {
        console.log('ZRA INIT DATA1 - ' + JSON.stringify(res));
        // console.log('ZRA INIT DATA2 - ' + JSON.stringify(JSON.parse(res)));
        initData = JSON.parse(res);
        console.log('ZRA INIT DATA1111 - ' + JSON.stringify(initData));
        bid = initData.id;

        const bus = {
          id: bid
        };

        console.log('ID----' + initData.id);
        (<any> window).zposvefdplugin.initVEFD(initData.id, bus, initData.secret, busid,
          (msg) => {
            console.log('response ' + msg);

            console.log('ZRA TaxInfo data stored' + JSON.stringify(JSON.parse(msg)));

            // resolve(msg);
          },
          (err) => {
            console.log(err);

          }
        );
      });

    }).catch(err => { console.log(err); });

  }

}
