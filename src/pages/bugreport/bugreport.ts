import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {BugreportProvider} from "../../providers/bugreport/bugreport";
import {TabsPage} from "../tabs/tabs";

@Component({
    selector: 'page-bugreport',
    templateUrl: 'bugreport.html'
})
export class BugreportPage {

    @ViewChild('descriptionarea') descriptionarea: ElementRef;

    // The bugreport fields
    bugReport: { title: string, description: string } = {
        title: '',
        description: ''
    };

    // Our translated text strings
    private sendingBugReportErrorString: string;
    private sendingBugReportSuccessString: string;
    private bugReportSubmitNoTitle: string;
    private bugReportSubmitNoDescription: string;

    constructor(private bugReportProvider: BugreportProvider, private navCtrl: NavController,
                private toastCtrl: ToastController, private translateService: TranslateService) {
        this.translateService.get(['SENDING_BUG_REPORT_ERROR', 'SENDING_BUG_REPORT_SUCCESS',
            'BUG_REPORT_SUBMIT_NO_TITLE', 'BUG_REPORT_SUBMIT_NO_DESCRIPTION'])
            .subscribe((values) => {
                this.sendingBugReportErrorString = values['SENDING_BUG_REPORT_ERROR'];
                this.sendingBugReportSuccessString = values['SENDING_BUG_REPORT_SUCCESS'];
                this.bugReportSubmitNoTitle = values['BUG_REPORT_SUBMIT_NO_TITLE'];
                this.bugReportSubmitNoDescription = values['BUG_REPORT_SUBMIT_NO_DESCRIPTION'];
            });
    }

    sendBugReport() {
        if (this.checkInputs()) {
            this.bugReportProvider.sendBugReport(this.bugReport)
                .then((resp) => {
                    // Send bug report success
                    let toast = this.toastCtrl.create({
                        message: this.sendingBugReportSuccessString,
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                    this.openHomePage();
                })
                .catch((error) => {
                    // Unable to send bug report
                    let toast = this.toastCtrl.create({
                        message: this.sendingBugReportErrorString,
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                });
        }
    }

    checkInputs() {
        if (this.bugReport.title === "") {
            let toast = this.toastCtrl.create({
                message: this.bugReportSubmitNoTitle,
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
            return false;
        }
        if (this.bugReport.description === "") {
            let toast = this.toastCtrl.create({
                message: this.bugReportSubmitNoDescription,
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
            return false;
        }
        return true;
    }

    openHomePage() {
        this.navCtrl.setRoot(TabsPage);
    }

    resize() {
        this.descriptionarea.nativeElement.style.height
            = this.descriptionarea.nativeElement.scrollHeight + 'px';
    }

}
